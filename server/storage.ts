import {
  users,
  courses,
  enrollments,
  assignments,
  submissions,
  activities,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type Assignment,
  type InsertAssignment,
  type Submission,
  type InsertSubmission,
  type Activity,
  type InsertActivity,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, count } from "drizzle-orm";

export interface IStorage {
  // User operations - mandatory for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCoursesByTeacher(teacherId: string): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course>;
  deleteCourse(id: number): Promise<void>;
  
  // Enrollment operations
  getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]>;
  getEnrollmentsByCourse(courseId: number): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollment(id: number, enrollment: Partial<InsertEnrollment>): Promise<Enrollment>;
  
  // Assignment operations
  getAssignmentsByCourse(courseId: number): Promise<Assignment[]>;
  getAssignment(id: number): Promise<Assignment | undefined>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  updateAssignment(id: number, assignment: Partial<InsertAssignment>): Promise<Assignment>;
  deleteAssignment(id: number): Promise<void>;
  
  // Submission operations
  getSubmissionsByStudent(studentId: string): Promise<Submission[]>;
  getSubmissionsByAssignment(assignmentId: number): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  updateSubmission(id: number, submission: Partial<InsertSubmission>): Promise<Submission>;
  
  // Activity operations
  getActivitiesByUser(userId: string, limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Dashboard statistics
  getDashboardStats(userId: string, role: string): Promise<{
    totalStudents?: number;
    activeCourses?: number;
    assignmentsDue?: number;
    averageRating?: number;
    enrolledCourses?: number;
    completedCourses?: number;
    pendingAssignments?: number;
    averageGrade?: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt));
  }

  async getCoursesByTeacher(teacherId: string): Promise<Course[]> {
    return await db.select().from(courses)
      .where(and(eq(courses.teacherId, teacherId), eq(courses.isActive, true)))
      .orderBy(desc(courses.createdAt));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    
    // Create activity for course creation
    await this.createActivity({
      userId: course.teacherId,
      type: "course_created",
      description: `Created new course: ${course.title}`,
      relatedId: newCourse.id,
    });
    
    return newCourse;
  }

  async updateCourse(id: number, course: Partial<InsertCourse>): Promise<Course> {
    const [updatedCourse] = await db
      .update(courses)
      .set({ ...course, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return updatedCourse;
  }

  async deleteCourse(id: number): Promise<void> {
    await db.update(courses).set({ isActive: false }).where(eq(courses.id, id));
  }

  // Enrollment operations
  async getEnrollmentsByStudent(studentId: string): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.studentId, studentId));
  }

  async getEnrollmentsByCourse(courseId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.courseId, courseId));
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [newEnrollment] = await db.insert(enrollments).values(enrollment).returning();
    
    // Create activity for enrollment
    const course = await this.getCourse(enrollment.courseId);
    if (course) {
      await this.createActivity({
        userId: enrollment.studentId,
        type: "enrollment",
        description: `Enrolled in course: ${course.title}`,
        relatedId: course.id,
      });
    }
    
    return newEnrollment;
  }

  async updateEnrollment(id: number, enrollment: Partial<InsertEnrollment>): Promise<Enrollment> {
    const [updatedEnrollment] = await db
      .update(enrollments)
      .set(enrollment)
      .where(eq(enrollments.id, id))
      .returning();
    return updatedEnrollment;
  }

  // Assignment operations
  async getAssignmentsByCourse(courseId: number): Promise<Assignment[]> {
    return await db.select().from(assignments).where(eq(assignments.courseId, courseId)).orderBy(desc(assignments.createdAt));
  }

  async getAssignment(id: number): Promise<Assignment | undefined> {
    const [assignment] = await db.select().from(assignments).where(eq(assignments.id, id));
    return assignment;
  }

  async createAssignment(assignment: InsertAssignment): Promise<Assignment> {
    const [newAssignment] = await db.insert(assignments).values(assignment).returning();
    
    // Create activity for assignment creation
    const course = await this.getCourse(assignment.courseId);
    if (course) {
      await this.createActivity({
        userId: course.teacherId,
        type: "assignment_created",
        description: `Created assignment: ${assignment.title}`,
        relatedId: newAssignment.id,
      });
    }
    
    return newAssignment;
  }

  async updateAssignment(id: number, assignment: Partial<InsertAssignment>): Promise<Assignment> {
    const [updatedAssignment] = await db
      .update(assignments)
      .set(assignment)
      .where(eq(assignments.id, id))
      .returning();
    return updatedAssignment;
  }

  async deleteAssignment(id: number): Promise<void> {
    await db.delete(assignments).where(eq(assignments.id, id));
  }

  // Submission operations
  async getSubmissionsByStudent(studentId: string): Promise<Submission[]> {
    return await db.select().from(submissions).where(eq(submissions.studentId, studentId)).orderBy(desc(submissions.submittedAt));
  }

  async getSubmissionsByAssignment(assignmentId: number): Promise<Submission[]> {
    return await db.select().from(submissions).where(eq(submissions.assignmentId, assignmentId));
  }

  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db.insert(submissions).values(submission).returning();
    
    // Create activity for submission
    const assignment = await this.getAssignment(submission.assignmentId);
    if (assignment) {
      await this.createActivity({
        userId: submission.studentId,
        type: "submission",
        description: `Submitted assignment: ${assignment.title}`,
        relatedId: assignment.id,
      });
    }
    
    return newSubmission;
  }

  async updateSubmission(id: number, submission: Partial<InsertSubmission>): Promise<Submission> {
    const [updatedSubmission] = await db
      .update(submissions)
      .set(submission)
      .where(eq(submissions.id, id))
      .returning();
    return updatedSubmission;
  }

  // Activity operations
  async getActivitiesByUser(userId: string, limit = 10): Promise<Activity[]> {
    return await db.select().from(activities)
      .where(eq(activities.userId, userId))
      .orderBy(desc(activities.createdAt))
      .limit(limit);
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [newActivity] = await db.insert(activities).values(activity).returning();
    return newActivity;
  }

  // Dashboard statistics
  async getDashboardStats(userId: string, role: string): Promise<{
    totalStudents?: number;
    activeCourses?: number;
    assignmentsDue?: number;
    averageRating?: number;
    enrolledCourses?: number;
    completedCourses?: number;
    pendingAssignments?: number;
    averageGrade?: number;
  }> {
    const stats: any = {};

    if (role === "teacher") {
      // Get teacher's courses
      const teacherCourses = await this.getCoursesByTeacher(userId);
      stats.activeCourses = teacherCourses.length;

      // Get total students across all courses
      if (teacherCourses.length > 0) {
        const courseIds = teacherCourses.map(c => c.id);
        const totalStudentsResult = await db
          .select({ count: count() })
          .from(enrollments)
          .where(sql`${enrollments.courseId} = ANY(${courseIds})`);
        stats.totalStudents = totalStudentsResult[0]?.count || 0;

        // Get assignments due soon
        const assignmentsDueResult = await db
          .select({ count: count() })
          .from(assignments)
          .where(
            and(
              sql`${assignments.courseId} = ANY(${courseIds})`,
              sql`${assignments.dueDate} >= NOW()`,
              sql`${assignments.dueDate} <= NOW() + INTERVAL '7 days'`
            )
          );
        stats.assignmentsDue = assignmentsDueResult[0]?.count || 0;
      }

      stats.averageRating = 4.8; // Placeholder - would calculate from ratings table
    } else if (role === "student") {
      // Get student's enrollments
      const studentEnrollments = await this.getEnrollmentsByStudent(userId);
      stats.enrolledCourses = studentEnrollments.length;

      // Get completed courses
      const completedCount = studentEnrollments.filter(e => e.completionRate === 100).length;
      stats.completedCourses = completedCount;

      // Get pending assignments
      if (studentEnrollments.length > 0) {
        const courseIds = studentEnrollments.map(e => e.courseId);
        const allAssignments = await db
          .select()
          .from(assignments)
          .where(sql`${assignments.courseId} = ANY(${courseIds})`);

        const studentSubmissions = await this.getSubmissionsByStudent(userId);
        const submittedAssignmentIds = studentSubmissions.map(s => s.assignmentId);

        const pendingAssignments = allAssignments.filter(a => !submittedAssignmentIds.includes(a.id));
        stats.pendingAssignments = pendingAssignments.length;
      }

      // Calculate average grade
      const studentSubmissions = await this.getSubmissionsByStudent(userId);
      const gradedSubmissions = studentSubmissions.filter(s => s.grade !== null);
      if (gradedSubmissions.length > 0) {
        const totalGrade = gradedSubmissions.reduce((sum, s) => sum + (s.grade || 0), 0);
        stats.averageGrade = Math.round((totalGrade / gradedSubmissions.length) * 100) / 100;
      }
    }

    return stats;
  }
}

export const storage = new DatabaseStorage();

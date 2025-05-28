import {
  users,
  courses,
  enrollments,
  analytics,
  type User,
  type UpsertUser,
  type Course,
  type InsertCourse,
  type Enrollment,
  type InsertEnrollment,
  type Analytics,
  type InsertAnalytics,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, count, sql } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course>;
  
  // Enrollment operations
  getEnrollments(userId?: string): Promise<Enrollment[]>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: string, progress: number): Promise<Enrollment>;
  
  // Analytics operations
  getAnalytics(): Promise<Analytics[]>;
  updateAnalytic(metric: string, value: number, category?: string): Promise<Analytics>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
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
    return await db.select().from(courses).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course;
  }

  async createCourse(courseData: InsertCourse): Promise<Course> {
    const [course] = await db.insert(courses).values(courseData).returning();
    return course;
  }

  async updateCourse(id: string, updates: Partial<InsertCourse>): Promise<Course> {
    const [course] = await db
      .update(courses)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  // Enrollment operations
  async getEnrollments(userId?: string): Promise<Enrollment[]> {
    if (userId) {
      return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
    }
    return await db.select().from(enrollments);
  }

  async createEnrollment(enrollmentData: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db.insert(enrollments).values(enrollmentData).returning();
    
    // Update course enrollment count
    await db
      .update(courses)
      .set({ 
        enrolledCount: sql`${courses.enrolledCount} + 1`,
        updatedAt: new Date()
      })
      .where(eq(courses.id, enrollmentData.courseId));
    
    return enrollment;
  }

  async updateEnrollmentProgress(id: string, progress: number): Promise<Enrollment> {
    const [enrollment] = await db
      .update(enrollments)
      .set({ 
        progress,
        completed: progress >= 100,
      })
      .where(eq(enrollments.id, id))
      .returning();
    return enrollment;
  }

  // Analytics operations
  async getAnalytics(): Promise<Analytics[]> {
    return await db.select().from(analytics);
  }

  async updateAnalytic(metric: string, value: number, category?: string): Promise<Analytics> {
    const [analytic] = await db
      .insert(analytics)
      .values({
        id: crypto.randomUUID(),
        metric,
        value,
        category,
      })
      .onConflictDoUpdate({
        target: [analytics.metric],
        set: {
          value,
          updatedAt: new Date(),
        },
      })
      .returning();
    return analytic;
  }
}

export const storage = new DatabaseStorage();
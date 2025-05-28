import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for authentication
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for authentication and profiles
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: varchar("role").notNull().default("student"), // student, teacher, parent, principal, administrator
  department: varchar("department"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  instructor: varchar("instructor").notNull(),
  category: varchar("category").notNull(),
  difficulty: varchar("difficulty").notNull().default("beginner"),
  duration: varchar("duration"),
  university: varchar("university"),
  enrolledCount: integer("enrolled_count").default(0),
  rating: integer("rating").default(5),
  imageUrl: varchar("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enrollments table
export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().notNull(),
  userId: varchar("user_id").notNull(),
  courseId: varchar("course_id").notNull(),
  progress: integer("progress").default(0),
  completed: boolean("completed").default(false),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

// Analytics table for dashboard metrics
export const analytics = pgTable("analytics", {
  id: varchar("id").primaryKey().notNull(),
  metric: varchar("metric").notNull(),
  value: integer("value").notNull(),
  category: varchar("category"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Type exports for authentication (required for Replit Auth)
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Course types
export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
export const insertCourseSchema = createInsertSchema(courses);
export type InsertCourseType = z.infer<typeof insertCourseSchema>;

// Enrollment types
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;
export const insertEnrollmentSchema = createInsertSchema(enrollments);
export type InsertEnrollmentType = z.infer<typeof insertEnrollmentSchema>;

// Analytics types
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = typeof analytics.$inferInsert;
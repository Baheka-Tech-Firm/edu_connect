import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, BookOpen } from "lucide-react";
import { Course } from "@shared/schema";

interface CoursePerformanceProps {
  role: string;
}

export default function CoursePerformance({ role }: CoursePerformanceProps) {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
          <p className="text-sm text-slate-500">
            Your {role === 'teacher' ? 'top performing courses' : 'enrolled courses'} this month
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="flex items-center">
                  <div className="h-12 w-12 bg-slate-200 rounded-lg"></div>
                  <div className="ml-3 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-24"></div>
                    <div className="h-3 bg-slate-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-4 bg-slate-200 rounded w-20"></div>
                  <div className="text-right space-y-1">
                    <div className="h-4 bg-slate-200 rounded w-8"></div>
                    <div className="h-3 bg-slate-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayCourses = courses?.slice(0, 3) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Performance</CardTitle>
        <p className="text-sm text-slate-500">
          Your {role === 'teacher' ? 'top performing courses' : 'enrolled courses'} this month
        </p>
      </CardHeader>
      <CardContent>
        {displayCourses.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">
              {role === 'teacher' ? 'No courses created yet' : 'No courses enrolled'}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {role === 'teacher' 
                ? 'Create your first course to see performance metrics.'
                : 'Enroll in courses to see your progress here.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayCourses.map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Course thumbnail */}
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    {course.imageUrl ? (
                      <img 
                        src={course.imageUrl} 
                        alt={course.title}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {course.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-slate-900 line-clamp-1">
                      {course.title}
                    </p>
                    <p className="text-sm text-slate-500">0 students</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-slate-600">4.8</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-secondary-600">0%</p>
                    <p className="text-xs text-slate-500">
                      {role === 'teacher' ? 'completion' : 'progress'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {displayCourses.length > 0 && (
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              View all courses
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

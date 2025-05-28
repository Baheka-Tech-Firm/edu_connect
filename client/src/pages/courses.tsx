import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Clock, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import CourseCreationModal from "@/components/course-creation-modal";
import { Course } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Courses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCourseModal, setShowCourseModal] = useState(false);

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (courseId: number) => {
      await apiRequest("DELETE", `/api/courses/${courseId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/courses"] });
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete course",
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleDeleteCourse = (courseId: number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteMutation.mutate(courseId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation user={user} />
      
      <div className="flex">
        <Sidebar role={user.role} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Page Header */}
              <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:text-3xl sm:truncate">
                    {user.role === 'teacher' ? 'My Courses' : 'Available Courses'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {user.role === 'teacher' 
                      ? 'Manage your courses and track student progress'
                      : 'Browse and enroll in courses'
                    }
                  </p>
                </div>
                
                {user.role === 'teacher' && (
                  <div className="mt-4 flex md:mt-0 md:ml-4">
                    <Button onClick={() => setShowCourseModal(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Course
                    </Button>
                  </div>
                )}
              </div>

              {/* Courses Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-slate-200 rounded-t-lg"></div>
                      <CardHeader>
                        <div className="h-6 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="h-4 bg-slate-200 rounded"></div>
                          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : courses?.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center">
                    <Plus className="h-12 w-12 text-slate-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-slate-900">
                    {user.role === 'teacher' ? 'No courses created yet' : 'No courses available'}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {user.role === 'teacher' 
                      ? 'Get started by creating your first course.'
                      : 'Check back later for new courses.'
                    }
                  </p>
                  {user.role === 'teacher' && (
                    <Button 
                      className="mt-4" 
                      onClick={() => setShowCourseModal(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Course
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses?.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      {/* Course Image */}
                      <div className="h-48 bg-gradient-to-r from-primary-500 to-secondary-500 relative">
                        {course.imageUrl ? (
                          <img 
                            src={course.imageUrl} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-white text-center">
                              <div className="text-4xl font-bold mb-2">
                                {course.title.charAt(0)}
                              </div>
                              <div className="text-sm opacity-80">
                                {course.title}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <Badge 
                            variant={course.level === 'beginner' ? 'secondary' : 
                                   course.level === 'intermediate' ? 'default' : 'destructive'}
                          >
                            {course.level}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {course.description || 'No description available'}
                        </p>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-4">
                          {/* Course Stats */}
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              <span>0 students</span>
                            </div>
                            {course.duration && (
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{course.duration} weeks</span>
                              </div>
                            )}
                          </div>

                          {/* Rating */}
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-slate-600">4.8</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            {user.role === 'teacher' && course.teacherId === user.id ? (
                              <>
                                <Button variant="outline" size="sm" className="flex-1">
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleDeleteCourse(course.id)}
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            ) : user.role === 'student' ? (
                              <Button className="w-full" size="sm">
                                Enroll Now
                              </Button>
                            ) : (
                              <Button variant="outline" className="w-full" size="sm">
                                View Details
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Course Creation Modal */}
      {user.role === 'teacher' && (
        <CourseCreationModal 
          isOpen={showCourseModal} 
          onClose={() => setShowCourseModal(false)} 
        />
      )}
    </div>
  );
}

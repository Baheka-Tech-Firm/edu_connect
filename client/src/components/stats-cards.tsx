import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Book, ClipboardCheck, Star, BookOpen, Trophy, Clock, Target } from "lucide-react";

interface StatsCardsProps {
  role: string;
}

export default function StatsCards({ role }: StatsCardsProps) {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const getStatsConfig = () => {
    if (role === "teacher") {
      return [
        {
          title: "Total Students",
          value: stats?.totalStudents ?? 0,
          icon: Users,
          color: "text-primary-600",
          bgColor: "bg-primary-100",
        },
        {
          title: "Active Courses",
          value: stats?.activeCourses ?? 0,
          icon: Book,
          color: "text-secondary-600",
          bgColor: "bg-secondary-100",
        },
        {
          title: "Assignments Due",
          value: stats?.assignmentsDue ?? 0,
          icon: ClipboardCheck,
          color: "text-accent-600",
          bgColor: "bg-accent-100",
        },
        {
          title: "Average Rating",
          value: stats?.averageRating ?? "N/A",
          icon: Star,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        },
      ];
    } else if (role === "student") {
      return [
        {
          title: "Enrolled Courses",
          value: stats?.enrolledCourses ?? 0,
          icon: BookOpen,
          color: "text-primary-600",
          bgColor: "bg-primary-100",
        },
        {
          title: "Completed Courses",
          value: stats?.completedCourses ?? 0,
          icon: Trophy,
          color: "text-secondary-600",
          bgColor: "bg-secondary-100",
        },
        {
          title: "Pending Assignments",
          value: stats?.pendingAssignments ?? 0,
          icon: Clock,
          color: "text-accent-600",
          bgColor: "bg-accent-100",
        },
        {
          title: "Average Grade",
          value: stats?.averageGrade ?? "N/A",
          icon: Target,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        },
      ];
    } else {
      return [
        {
          title: "Total Users",
          value: "0",
          icon: Users,
          color: "text-primary-600",
          bgColor: "bg-primary-100",
        },
        {
          title: "Active Courses",
          value: "0",
          icon: Book,
          color: "text-secondary-600",
          bgColor: "bg-secondary-100",
        },
        {
          title: "Assignments",
          value: "0",
          icon: ClipboardCheck,
          color: "text-accent-600",
          bgColor: "bg-accent-100",
        },
        {
          title: "Success Rate",
          value: "N/A",
          icon: Star,
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
        },
      ];
    }
  };

  const statsConfig = getStatsConfig();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-slate-200 rounded mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsConfig.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="text-lg font-medium text-slate-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

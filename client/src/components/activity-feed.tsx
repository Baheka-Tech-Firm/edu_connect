import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, ClipboardCheck, MessageSquare, BookOpen } from "lucide-react";
import { Activity } from "@shared/schema";

const getActivityIcon = (type: string) => {
  switch (type) {
    case "enrollment":
      return UserPlus;
    case "submission":
      return ClipboardCheck;
    case "message":
      return MessageSquare;
    case "course_created":
      return BookOpen;
    default:
      return ClipboardCheck;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "enrollment":
      return "bg-primary-500";
    case "submission":
      return "bg-secondary-500";
    case "message":
      return "bg-accent-500";
    case "course_created":
      return "bg-blue-500";
    default:
      return "bg-slate-500";
  }
};

const formatTimeAgo = (date: string) => {
  const now = new Date();
  const activityDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
};

export default function ActivityFeed() {
  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ["/api/activities"],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <p className="text-sm text-slate-500">Latest updates from your courses</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex space-x-3 animate-pulse">
                <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <p className="text-sm text-slate-500">Latest updates from your courses</p>
      </CardHeader>
      <CardContent>
        {!activities || activities.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto h-12 w-12 bg-slate-100 rounded-full flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-slate-900">No recent activity</h3>
            <p className="mt-2 text-sm text-slate-500">
              When you start using the platform, your activities will appear here.
            </p>
          </div>
        ) : (
          <div className="flow-root">
            <ul className="-mb-8">
              {activities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                const isLast = index === activities.length - 1;
                
                return (
                  <li key={activity.id}>
                    <div className={`relative ${!isLast ? "pb-8" : ""}`}>
                      {!isLast && (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span
                            className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(
                              activity.type
                            )}`}
                          >
                            <Icon className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-slate-600">
                              {activity.description}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-slate-500">
                            {formatTimeAgo(activity.createdAt!)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        
        {activities && activities.length > 0 && (
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              View all activity
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

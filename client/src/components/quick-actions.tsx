import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CalendarPlus, CheckCircle, Send, BookOpen, ClipboardList, Users, MessageSquare } from "lucide-react";

interface QuickActionsProps {
  role: string;
}

export default function QuickActions({ role }: QuickActionsProps) {
  const getActionCards = () => {
    if (role === "teacher") {
      return [
        {
          title: "Create Assignment",
          description: "Build new assignments for your students",
          icon: Plus,
          color: "bg-primary-100 text-primary-600",
          action: () => console.log("Create assignment"),
        },
        {
          title: "Schedule Class",
          description: "Set up new class sessions",
          icon: CalendarPlus,
          color: "bg-secondary-100 text-secondary-600",
          action: () => console.log("Schedule class"),
        },
        {
          title: "Grade Assignments",
          description: "Review and grade student work",
          icon: CheckCircle,
          color: "bg-accent-100 text-accent-600",
          action: () => console.log("Grade assignments"),
        },
        {
          title: "Send Message",
          description: "Communicate with students or parents",
          icon: Send,
          color: "bg-purple-100 text-purple-600",
          action: () => console.log("Send message"),
        },
      ];
    } else if (role === "student") {
      return [
        {
          title: "Browse Courses",
          description: "Discover new courses to enroll in",
          icon: BookOpen,
          color: "bg-primary-100 text-primary-600",
          action: () => console.log("Browse courses"),
        },
        {
          title: "View Assignments",
          description: "Check your pending assignments",
          icon: ClipboardList,
          color: "bg-secondary-100 text-secondary-600",
          action: () => console.log("View assignments"),
        },
        {
          title: "Study Groups",
          description: "Join or create study groups",
          icon: Users,
          color: "bg-accent-100 text-accent-600",
          action: () => console.log("Study groups"),
        },
        {
          title: "Ask Questions",
          description: "Get help from teachers and peers",
          icon: MessageSquare,
          color: "bg-purple-100 text-purple-600",
          action: () => console.log("Ask questions"),
        },
      ];
    } else if (role === "parent") {
      return [
        {
          title: "View Progress",
          description: "Check your child's academic progress",
          icon: CheckCircle,
          color: "bg-primary-100 text-primary-600",
          action: () => console.log("View progress"),
        },
        {
          title: "Contact Teachers",
          description: "Communicate with your child's teachers",
          icon: MessageSquare,
          color: "bg-secondary-100 text-secondary-600",
          action: () => console.log("Contact teachers"),
        },
        {
          title: "Schedule Meeting",
          description: "Book parent-teacher conferences",
          icon: CalendarPlus,
          color: "bg-accent-100 text-accent-600",
          action: () => console.log("Schedule meeting"),
        },
        {
          title: "View Reports",
          description: "Access detailed academic reports",
          icon: ClipboardList,
          color: "bg-purple-100 text-purple-600",
          action: () => console.log("View reports"),
        },
      ];
    } else {
      return [
        {
          title: "Manage Users",
          description: "Add or edit user accounts",
          icon: Users,
          color: "bg-primary-100 text-primary-600",
          action: () => console.log("Manage users"),
        },
        {
          title: "System Reports",
          description: "Generate system usage reports",
          icon: ClipboardList,
          color: "bg-secondary-100 text-secondary-600",
          action: () => console.log("System reports"),
        },
        {
          title: "Send Announcements",
          description: "Broadcast messages to all users",
          icon: Send,
          color: "bg-accent-100 text-accent-600",
          action: () => console.log("Send announcements"),
        },
        {
          title: "Configure Settings",
          description: "Update system configurations",
          icon: CheckCircle,
          color: "bg-purple-100 text-purple-600",
          action: () => console.log("Configure settings"),
        },
      ];
    }
  };

  const actionCards = getActionCards();

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-slate-500">Common tasks to get started</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {actionCards.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="relative group bg-slate-50 p-6 h-auto focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 rounded-lg hover:bg-slate-100 transition-colors"
                  onClick={action.action}
                >
                  <div className="text-left w-full">
                    <div className="mb-4">
                      <span className={`rounded-lg inline-flex p-3 ${action.color}`}>
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 group-hover:text-slate-700 mb-2">
                        {action.title}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

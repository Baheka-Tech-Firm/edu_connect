import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import StatsCards from "@/components/stats-cards";
import ActivityFeed from "@/components/activity-feed";
import CoursePerformance from "@/components/course-performance";
import QuickActions from "@/components/quick-actions";
import CourseCreationModal from "@/components/course-creation-modal";
import { Button } from "@/components/ui/button";
import { Plus, Download } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [showCourseModal, setShowCourseModal] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

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
                    Welcome back, {user.firstName || 'User'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Here's what's happening with your {user.role === 'teacher' ? 'classes' : 'courses'} today.
                  </p>
                </div>
                
                {user.role === 'teacher' && (
                  <div className="mt-4 flex md:mt-0 md:ml-4">
                    <Button variant="outline" className="mr-3">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button onClick={() => setShowCourseModal(true)}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Course
                    </Button>
                  </div>
                )}
              </div>

              {/* Stats Cards */}
              <StatsCards role={user.role} />

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <ActivityFeed />
                <CoursePerformance role={user.role} />
              </div>

              {/* Quick Actions */}
              <QuickActions role={user.role} />
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

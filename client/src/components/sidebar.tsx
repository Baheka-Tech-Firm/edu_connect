import { Link, useLocation } from "wouter";
import {
  BarChart3,
  Calendar,
  Book,
  Users,
  ClipboardCheck,
  TrendingUp,
  Bot,
  MessageSquare,
  Settings,
  GraduationCap,
  BookOpen,
  User,
} from "lucide-react";

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const [location] = useLocation();

  const getNavigationItems = () => {
    const baseItems = [
      {
        section: "Overview",
        items: [
          { name: "Dashboard", href: "/", icon: BarChart3 },
          { name: "Calendar", href: "/calendar", icon: Calendar },
        ],
      },
    ];

    if (role === "teacher") {
      baseItems.push({
        section: "Teaching",
        items: [
          { name: "My Courses", href: "/courses", icon: Book },
          { name: "Students", href: "/students", icon: Users },
          { name: "Assignments", href: "/assignments", icon: ClipboardCheck },
          { name: "Analytics", href: "/analytics", icon: TrendingUp },
        ],
      });
    } else if (role === "student") {
      baseItems.push({
        section: "Learning",
        items: [
          { name: "My Courses", href: "/courses", icon: BookOpen },
          { name: "Assignments", href: "/assignments", icon: ClipboardCheck },
          { name: "Progress", href: "/progress", icon: TrendingUp },
          { name: "Grades", href: "/grades", icon: GraduationCap },
        ],
      });
    } else if (role === "parent") {
      baseItems.push({
        section: "Monitoring",
        items: [
          { name: "Children", href: "/children", icon: Users },
          { name: "Progress", href: "/progress", icon: TrendingUp },
          { name: "Teachers", href: "/teachers", icon: User },
        ],
      });
    } else if (role === "admin") {
      baseItems.push({
        section: "Administration",
        items: [
          { name: "Users", href: "/users", icon: Users },
          { name: "Courses", href: "/courses", icon: Book },
          { name: "Analytics", href: "/analytics", icon: TrendingUp },
          { name: "Reports", href: "/reports", icon: ClipboardCheck },
        ],
      });
    }

    baseItems.push({
      section: "Tools",
      items: [
        { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Settings", href: "/settings", icon: Settings },
      ],
    });

    return baseItems;
  };

  const navigationItems = getNavigationItems();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white shadow-sm border-r border-slate-200 h-screen sticky top-16">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex-1 px-3 space-y-1">
          {navigationItems.map((section) => (
            <div key={section.section} className="space-y-1">
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {section.section}
              </h3>
              {section.items.map((item) => {
                const isActive = location === item.href;
                const Icon = item.icon;
                
                return (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? "text-primary-600 bg-primary-50"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive ? "text-primary-500" : "text-slate-400"
                        }`}
                      />
                      {item.name}
                    </a>
                  </Link>
                );
              })}
              {section.section !== "Tools" && <div className="pt-5" />}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/navigation";
import Sidebar from "@/components/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Edit, Save, X } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  const userInitials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}`;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'teacher':
        return 'default';
      case 'student':
        return 'secondary';
      case 'parent':
        return 'outline';
      case 'admin':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation user={user} />
      
      <div className="flex">
        <Sidebar role={user.role} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Page Header */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:text-3xl">
                  Profile Settings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Manage your account information and preferences.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader className="text-center">
                      <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src={user.profileImageUrl || undefined} />
                          <AvatarFallback className="text-2xl">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <CardTitle className="text-xl">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <div className="flex justify-center mt-2">
                        <Badge variant={getRoleBadgeColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mt-2">
                        {user.email}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quick Stats */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {user.role === 'teacher' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Courses Created</span>
                            <span className="font-medium">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Total Students</span>
                            <span className="font-medium">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Average Rating</span>
                            <span className="font-medium">N/A</span>
                          </div>
                        </>
                      )}
                      {user.role === 'student' && (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Enrolled Courses</span>
                            <span className="font-medium">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Completed</span>
                            <span className="font-medium">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-500">Average Grade</span>
                            <span className="font-medium">N/A</span>
                          </div>
                        </>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Member Since</span>
                        <span className="font-medium">
                          {user.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Personal Information</CardTitle>
                      <Button
                        variant={isEditing ? "outline" : "default"}
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={user.firstName || ''}
                            disabled={!isEditing}
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={user.lastName || ''}
                            disabled={!isEditing}
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email || ''}
                          disabled
                          placeholder="Enter your email"
                        />
                        <p className="text-xs text-slate-500">
                          Email cannot be changed. Contact support if you need to update it.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          value={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          disabled
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself..."
                          disabled={!isEditing}
                          rows={4}
                        />
                      </div>

                      {isEditing && (
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Account Settings */}
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Email Notifications</h4>
                          <p className="text-sm text-slate-500">
                            Receive notifications about course updates and activities
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Privacy Settings</h4>
                          <p className="text-sm text-slate-500">
                            Control who can see your profile and activities
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium">Account Security</h4>
                          <p className="text-sm text-slate-500">
                            Update your password and security settings
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>

                      <div className="pt-4 border-t">
                        <Button variant="destructive" size="sm">
                          Delete Account
                        </Button>
                        <p className="text-xs text-slate-500 mt-2">
                          Permanently delete your account and all associated data.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, Brain } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-primary-600">EduConnect</h1>
            <Button onClick={handleLogin} className="bg-primary-600 hover:bg-primary-700">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 sm:text-6xl">
            Welcome to EduConnect
          </h2>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            A comprehensive educational platform that connects teachers, students, and parents. 
            Create courses, manage assignments, track progress, and foster collaborative learning.
          </p>
          <div className="mt-10">
            <Button 
              onClick={handleLogin}
              size="lg"
              className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-4"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary-600" />
              </div>
              <CardTitle className="text-lg">Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Create and manage courses with ease. Upload materials, set schedules, and track student progress.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary-600" />
              </div>
              <CardTitle className="text-lg">Student Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Foster collaboration and engagement with interactive assignments and real-time feedback.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-accent-600" />
              </div>
              <CardTitle className="text-lg">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Monitor student progress with detailed analytics and personalized learning paths.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">AI Assistant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Leverage AI tools for lesson planning, grading, and personalized student support.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-24 bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-slate-900">
              Ready to transform education?
            </h3>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Join thousands of educators who are already using EduConnect to create 
              engaging learning experiences and improve student outcomes.
            </p>
            <div className="mt-8">
              <Button 
                onClick={handleLogin}
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-lg px-8 py-4"
              >
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

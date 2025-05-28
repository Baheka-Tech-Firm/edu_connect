'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  Calendar,
  Bell,
  Search,
  Plus,
  ChevronRight,
  BarChart3,
  Clock,
  Star,
  PlayCircle
} from 'lucide-react'

// Interactive 3D Dashboard Component
function DashboardVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.05)')
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.05)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Floating data points representing student progress
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 9) * (i + 1)
        const baseY = canvas.height * 0.7
        const progress = Math.sin(time * 0.02 + i * 0.5) * 30 + 50
        const y = baseY - progress

        // Progress bars
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)'
        ctx.lineWidth = 8
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x, baseY)
        ctx.lineTo(x, y)
        ctx.stroke()

        // Data points
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(59, 130, 246, 0.8)'
        ctx.fill()
      }

      // Connecting lines for course progress
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.lineWidth = 2
      ctx.beginPath()
      for (let i = 0; i < 8; i++) {
        const x = (canvas.width / 9) * (i + 1)
        const baseY = canvas.height * 0.7
        const progress = Math.sin(time * 0.02 + i * 0.5) * 30 + 50
        const y = baseY - progress
        
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      time += 1
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef}
      className="w-full h-32"
      style={{ background: 'transparent' }}
    />
  )
}

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const stats = [
    {
      title: "Active Courses",
      value: "12",
      change: "+2",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Total Students",
      value: "248",
      change: "+15",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "+5%",
      icon: Award,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Avg. Progress",
      value: "87%",
      change: "+12%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600"
    }
  ]

  const recentActivities = [
    { 
      user: "Sarah Johnson", 
      action: "completed", 
      course: "Advanced Mathematics",
      time: "2 hours ago",
      avatar: "SJ"
    },
    { 
      user: "Mike Chen", 
      action: "started", 
      course: "Physics Fundamentals",
      time: "4 hours ago",
      avatar: "MC"
    },
    { 
      user: "Emily Davis", 
      action: "submitted", 
      course: "Chemistry Lab Report",
      time: "6 hours ago",
      avatar: "ED"
    },
    { 
      user: "Alex Rodriguez", 
      action: "achieved", 
      course: "Biology Milestone",
      time: "1 day ago",
      avatar: "AR"
    }
  ]

  const upcomingClasses = [
    {
      title: "Advanced Calculus",
      time: "10:00 AM",
      students: 24,
      type: "Live Session"
    },
    {
      title: "Physics Lab",
      time: "2:00 PM",
      students: 18,
      type: "Virtual Lab"
    },
    {
      title: "Chemistry Review",
      time: "4:00 PM",
      students: 32,
      type: "Q&A Session"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                EduConnect
              </h1>
              <div className="hidden md:flex items-center space-x-6">
                <nav className="flex space-x-4">
                  {['overview', 'courses', 'students', 'analytics'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedTab === tab
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search courses, students..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-600"
                />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Course
              </Button>
              <a href="/api/logout">
                <Button variant="outline">Sign Out</Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, Professor! 👋
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Here's what's happening with your courses today.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {stat.title}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">
                          {stat.value}
                        </p>
                        <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Student Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DashboardVisualization />
                <div className="mt-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>Course Completion Rates</span>
                  <span>Last 7 days</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Classes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingClasses.map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">
                        {class_.title}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {class_.time}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full">
                          {class_.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {class_.students}
                      </p>
                      <p className="text-xs text-slate-500">students</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Virtual Classroom
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-900 dark:text-white">
                        <span className="font-medium">{activity.user}</span>
                        {' '}{activity.action}{' '}
                        <span className="font-medium">{activity.course}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
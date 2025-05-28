import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from 'wouter'
import { 
  Target, 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react'

// Completion rate visualization
function CompletionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let progress = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Course completion data
      const courses = [
        { name: 'CS50', completion: 94.2, color: '#06b6d4' },
        { name: 'MIT Python', completion: 87.5, color: '#8b5cf6' },
        { name: 'Stanford Algorithms', completion: 91.8, color: '#ec4899' },
        { name: 'MIT Calculus', completion: 89.3, color: '#10b981' },
        { name: 'Yale Physics', completion: 85.7, color: '#f59e0b' },
        { name: 'JHU Data Science', completion: 96.1, color: '#ef4444' }
      ]

      const barHeight = 40
      const barSpacing = 15
      const startY = 20

      courses.forEach((course, index) => {
        const y = startY + (barHeight + barSpacing) * index
        const maxWidth = canvas.width - 120
        const animatedWidth = (maxWidth * course.completion / 100) * Math.min(progress / 100, 1)

        // Background bar
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'
        ctx.fillRect(100, y, maxWidth, barHeight)

        // Progress bar
        const gradient = ctx.createLinearGradient(100, y, 100 + animatedWidth, y)
        gradient.addColorStop(0, course.color)
        gradient.addColorStop(1, course.color + '80')
        ctx.fillStyle = gradient
        ctx.fillRect(100, y, animatedWidth, barHeight)

        // Course name
        ctx.fillStyle = '#ffffff'
        ctx.font = '14px Arial'
        ctx.textAlign = 'right'
        ctx.fillText(course.name, 90, y + 25)

        // Percentage
        ctx.textAlign = 'left'
        ctx.fillStyle = course.color
        ctx.fillText(`${course.completion}%`, 100 + maxWidth + 10, y + 25)
      })

      if (progress < 100) {
        progress += 1
      }
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
      className="w-full h-80"
      style={{ background: 'transparent' }}
    />
  )
}

export default function CompletionRatePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const completionStats = [
    {
      title: "Overall Completion",
      value: "94.2%",
      change: "+5.3%",
      icon: Target,
      color: "orange",
      description: "Average across all courses"
    },
    {
      title: "This Week",
      value: "87.1%",
      change: "+12.4%",
      icon: Calendar,
      color: "cyan",
      description: "Weekly completion rate"
    },
    {
      title: "Top Performers",
      value: "156",
      change: "+23",
      icon: Award,
      color: "purple",
      description: "Students with 100% completion"
    },
    {
      title: "Avg. Time",
      value: "4.2 weeks",
      change: "-0.8 weeks",
      icon: Clock,
      color: "pink",
      description: "Average course completion time"
    }
  ]

  const topCourses = [
    {
      name: "Johns Hopkins Data Science Specialization",
      completion: 96.1,
      students: 95,
      instructor: "Roger Peng",
      difficulty: "Intermediate",
      rating: 4.9
    },
    {
      name: "CS50: Introduction to Computer Science",
      completion: 94.2,
      students: 142,
      instructor: "David Malan",
      difficulty: "Beginner",
      rating: 4.8
    },
    {
      name: "Stanford Algorithms Specialization",
      completion: 91.8,
      students: 67,
      instructor: "Tim Roughgarden",
      difficulty: "Advanced",
      rating: 4.9
    },
    {
      name: "MIT Single Variable Calculus",
      completion: 89.3,
      students: 78,
      instructor: "Gilbert Strang",
      difficulty: "Intermediate",
      rating: 4.7
    }
  ]

  const recentCompletions = [
    { student: "Alex Chen", course: "MIT Python Programming", completedAt: "2 hours ago", grade: "A" },
    { student: "Maria Garcia", course: "Stanford Algorithms", completedAt: "4 hours ago", grade: "A-" },
    { student: "James Kim", course: "Yale Physics I", completedAt: "6 hours ago", grade: "B+" },
    { student: "Sarah Johnson", course: "JHU Data Science", completedAt: "8 hours ago", grade: "A" },
    { student: "Michael Brown", course: "CS50 Computer Science", completedAt: "12 hours ago", grade: "A-" }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20 border-green-400/30'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30'
      case 'Advanced': return 'text-red-400 bg-red-400/20 border-red-400/30'
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,165,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,165,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-50 bg-slate-900/60 backdrop-blur-lg border-b border-orange-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Matrix
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Completion Rate Analytics
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">94.2% AVG COMPLETION</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-40 max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              NEURAL COMPLETION METRICS
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Advanced analytics tracking student success and course completion rates
          </p>
        </motion.div>

        {/* Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex space-x-2 mb-8"
        >
          {['day', 'week', 'month', 'year'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period 
                ? "bg-orange-400/20 text-orange-400 border-orange-400/30" 
                : "border-orange-400/30 text-orange-400 hover:bg-orange-400/10"
              }
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </Button>
          ))}
        </motion.div>

        {/* Completion Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {completionStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`bg-slate-900/40 backdrop-blur-lg border border-${stat.color}-400/30 hover:border-${stat.color}-400/60 transition-all`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${stat.color}-400/20 to-${stat.color}-600/20 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                    </div>
                    <TrendingUp className={`w-4 h-4 text-${stat.color}-400`} />
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2">{stat.title}</h3>
                  <div className="flex items-end justify-between mb-3">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <span className={`text-sm text-${stat.color}-400`}>{stat.change}</span>
                  </div>
                  <p className="text-xs text-gray-400">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Completion Rate Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-orange-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Target className="h-6 w-6 mr-3 text-orange-400" />
                COURSE COMPLETION RATES BY PROGRAM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CompletionChart />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-lg border border-purple-400/30">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <BookOpen className="h-6 w-6 mr-3 text-purple-400" />
                  TOP PERFORMING COURSES
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topCourses.map((course, index) => (
                    <motion.div
                      key={course.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-slate-800/30 rounded-lg border border-gray-700/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-medium text-sm">{course.name}</h3>
                        <div className="text-right">
                          <div className="text-xl font-bold text-orange-400">{course.completion}%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-400">by {course.instructor}</span>
                          <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-400">{course.students}</span>
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-gray-400">{course.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Completions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CheckCircle className="h-6 w-6 mr-3 text-cyan-400" />
                  RECENT COMPLETIONS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCompletions.map((completion, index) => (
                    <motion.div
                      key={`${completion.student}-${completion.course}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-gray-700/50"
                    >
                      <div>
                        <h3 className="text-white font-medium">{completion.student}</h3>
                        <p className="text-sm text-gray-400">{completion.course}</p>
                        <p className="text-xs text-gray-500">{completion.completedAt}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          completion.grade.startsWith('A') ? 'text-green-400' :
                          completion.grade.startsWith('B') ? 'text-cyan-400' :
                          'text-yellow-400'
                        }`}>
                          {completion.grade}
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400 ml-auto mt-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
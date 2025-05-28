import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from 'wouter'
import { 
  BarChart3, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Clock, 
  Brain,
  Eye,
  Download,
  Filter,
  Calendar
} from 'lucide-react'

// Advanced analytics visualization
function AnalyticsChart() {
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
      
      // Advanced multi-layered analytics visualization
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(centerX, centerY) - 50

      // Background circles
      for (let i = 1; i <= 3; i++) {
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 * i})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * (i / 3), 0, Math.PI * 2)
        ctx.stroke()
      }

      // Data segments (representing different analytics)
      const segments = [
        { angle: 0, size: 0.3, color: '#06b6d4', label: 'Engagement' },
        { angle: 0.3, size: 0.25, color: '#8b5cf6', label: 'Completion' },
        { angle: 0.55, size: 0.2, color: '#ec4899', label: 'Performance' },
        { angle: 0.75, size: 0.15, color: '#10b981', label: 'Retention' },
        { angle: 0.9, size: 0.1, color: '#f59e0b', label: 'Satisfaction' }
      ]

      let currentAngle = 0
      segments.forEach((segment, index) => {
        const startAngle = currentAngle * Math.PI * 2
        const endAngle = (currentAngle + segment.size) * Math.PI * 2
        const animatedRadius = radius * (0.5 + 0.5 * Math.sin(time * 0.02 + index))

        // Outer arc
        ctx.strokeStyle = segment.color
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.arc(centerX, centerY, animatedRadius, startAngle, endAngle)
        ctx.stroke()

        // Data points
        const midAngle = (startAngle + endAngle) / 2
        const pointX = centerX + Math.cos(midAngle) * animatedRadius
        const pointY = centerY + Math.sin(midAngle) * animatedRadius
        
        ctx.beginPath()
        ctx.arc(pointX, pointY, 4, 0, Math.PI * 2)
        ctx.fillStyle = segment.color
        ctx.fill()

        currentAngle += segment.size
      })

      // Center neural indicator
      ctx.beginPath()
      ctx.arc(centerX, centerY, 15, 0, Math.PI * 2)
      ctx.fillStyle = '#06b6d4'
      ctx.fill()

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
      className="w-full h-80"
      style={{ background: 'transparent' }}
    />
  )
}

export default function AnalyticsPage() {
  const [selectedView, setSelectedView] = useState('overview')
  const [dateRange, setDateRange] = useState('7d')

  const analyticsMetrics = [
    {
      title: "Student Engagement",
      value: "87.3%",
      change: "+12.5%",
      icon: Users,
      color: "cyan",
      insight: "Peak engagement during morning hours"
    },
    {
      title: "Learning Velocity",
      value: "2.4x",
      change: "+0.7x",
      icon: TrendingUp,
      color: "purple",
      insight: "Accelerated learning with AI assistance"
    },
    {
      title: "Knowledge Retention",
      value: "92.1%",
      change: "+8.3%",
      icon: Brain,
      color: "pink",
      insight: "Improved with spaced repetition"
    },
    {
      title: "Course Efficiency",
      value: "94.7%",
      change: "+5.2%",
      icon: BookOpen,
      color: "emerald",
      insight: "Optimized learning paths"
    }
  ]

  const learningPatterns = [
    {
      pattern: "Peak Learning Hours",
      data: "9:00 AM - 11:00 AM",
      impact: "+23% better retention",
      students: 1247
    },
    {
      pattern: "Optimal Session Length",
      data: "45-60 minutes",
      impact: "+18% completion rate",
      students: 892
    },
    {
      pattern: "Best Day of Week",
      data: "Tuesday & Wednesday",
      impact: "+15% engagement",
      students: 1456
    },
    {
      pattern: "Preferred Content Type",
      data: "Interactive + Video",
      impact: "+31% satisfaction",
      students: 1123
    }
  ]

  const performanceInsights = [
    {
      category: "Top Performers",
      value: "156 students",
      description: "Consistently scoring 95%+ across all modules",
      trend: "up",
      percentage: "+23%"
    },
    {
      category: "At-Risk Students",
      value: "47 students",
      description: "Requiring additional support and intervention",
      trend: "down",
      percentage: "-12%"
    },
    {
      category: "Course Difficulty",
      value: "Algorithms",
      description: "Identified as most challenging course",
      trend: "neutral",
      percentage: "78% completion"
    },
    {
      category: "Success Predictors",
      value: "Early engagement",
      description: "First week activity correlates with 94% completion",
      trend: "up",
      percentage: "+31%"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-50 bg-slate-900/60 backdrop-blur-lg border-b border-pink-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Matrix
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Performance Analytics
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-pink-400/50 text-pink-400 hover:bg-pink-400/10">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">ANALYTICS ACTIVE</span>
              </div>
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
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI-POWERED LEARNING ANALYTICS
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Advanced intelligence insights powered by neural learning algorithms
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex space-x-2">
            {['overview', 'engagement', 'performance', 'predictions'].map((view) => (
              <Button
                key={view}
                variant={selectedView === view ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedView(view)}
                className={selectedView === view 
                  ? "bg-pink-400/20 text-pink-400 border-pink-400/30" 
                  : "border-pink-400/30 text-pink-400 hover:bg-pink-400/10"
                }
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-slate-800/50 border border-pink-400/30 rounded-lg text-white focus:outline-none focus:border-pink-400"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 3 Months</option>
          </select>
        </motion.div>

        {/* Analytics Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {analyticsMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className={`bg-slate-900/40 backdrop-blur-lg border border-${metric.color}-400/30 hover:border-${metric.color}-400/60 transition-all`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-${metric.color}-400/20 to-${metric.color}-600/20 rounded-lg flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                    </div>
                    <TrendingUp className={`w-4 h-4 text-${metric.color}-400`} />
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2">{metric.title}</h3>
                  <div className="flex items-end justify-between mb-3">
                    <div className="text-3xl font-bold text-white">{metric.value}</div>
                    <span className={`text-sm text-${metric.color}-400`}>{metric.change}</span>
                  </div>
                  <p className="text-xs text-gray-400">{metric.insight}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Advanced Analytics Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-pink-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Brain className="h-6 w-6 mr-3 text-pink-400" />
                NEURAL LEARNING INTELLIGENCE OVERVIEW
                <div className="ml-auto flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-pink-400" />
                  <span className="text-sm text-pink-400">REAL-TIME</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnalyticsChart />
              <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
                <div>
                  <div className="w-4 h-4 bg-cyan-400 rounded-full mx-auto mb-1" />
                  <span className="text-gray-300">Engagement (30%)</span>
                </div>
                <div>
                  <div className="w-4 h-4 bg-purple-400 rounded-full mx-auto mb-1" />
                  <span className="text-gray-300">Completion (25%)</span>
                </div>
                <div>
                  <div className="w-4 h-4 bg-pink-400 rounded-full mx-auto mb-1" />
                  <span className="text-gray-300">Performance (20%)</span>
                </div>
                <div>
                  <div className="w-4 h-4 bg-emerald-400 rounded-full mx-auto mb-1" />
                  <span className="text-gray-300">Retention (15%)</span>
                </div>
                <div>
                  <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mb-1" />
                  <span className="text-gray-300">Satisfaction (10%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Learning Patterns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Clock className="h-6 w-6 mr-3 text-cyan-400" />
                  LEARNING PATTERN ANALYSIS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningPatterns.map((pattern, index) => (
                    <motion.div
                      key={pattern.pattern}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-slate-800/30 rounded-lg border border-gray-700/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-medium">{pattern.pattern}</h3>
                        <span className="text-cyan-400 font-bold">{pattern.data}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400">{pattern.impact}</span>
                        <span className="text-gray-400">{pattern.students} students</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-slate-900/40 backdrop-blur-lg border border-purple-400/30">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Brain className="h-6 w-6 mr-3 text-purple-400" />
                  AI PERFORMANCE INSIGHTS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceInsights.map((insight, index) => (
                    <motion.div
                      key={insight.category}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="p-4 bg-slate-800/30 rounded-lg border border-gray-700/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-medium">{insight.category}</h3>
                          <p className="text-sm text-gray-400">{insight.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-purple-400 font-bold">{insight.value}</div>
                          <div className={`text-sm ${
                            insight.trend === 'up' ? 'text-green-400' :
                            insight.trend === 'down' ? 'text-red-400' :
                            'text-gray-400'
                          }`}>
                            {insight.percentage}
                          </div>
                        </div>
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
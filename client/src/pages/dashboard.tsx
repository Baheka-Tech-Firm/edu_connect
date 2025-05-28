import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from 'wouter'
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
  PlayCircle,
  Activity,
  Cpu,
  Globe,
  Zap,
  Target,
  Database,
  MonitorSpeaker,
  Brain,
  Shield
} from 'lucide-react'

// Interactive dashboard visualization
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
  const [selectedTab, setSelectedTab] = useState('lms')

  // Interactive LMS Widgets with real-time data
  const lmsWidgets = [
    {
      title: "Active Students",
      value: "1,247",
      change: "+23 today",
      icon: Users,
      color: "from-cyan-400 to-cyan-600",
      route: "/students",
      status: "ONLINE",
      description: "Currently active learners"
    },
    {
      title: "Live Courses",
      value: "18",
      change: "3 starting soon",
      icon: PlayCircle,
      color: "from-purple-400 to-purple-600",
      route: "/courses",
      status: "ACTIVE",
      description: "Real-time course sessions"
    },
    {
      title: "System Performance",
      value: "99.7%",
      change: "Optimal",
      icon: Cpu,
      color: "from-emerald-400 to-emerald-600",
      route: "/system-performance",
      status: "OPTIMAL",
      description: "Neural network uptime"
    },
    {
      title: "Completion Rate",
      value: "94.2%",
      change: "+5.3% this week",
      icon: Target,
      color: "from-orange-400 to-orange-600",
      route: "/completion-rate",
      status: "HIGH",
      description: "Course completion metrics"
    },
    {
      title: "Performance Analytics",
      value: "A+ Grade",
      change: "Trending up",
      icon: BarChart3,
      color: "from-pink-400 to-pink-600",
      route: "/analytics",
      status: "EXCELLENT",
      description: "AI-powered insights"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Neural Network Header */}
      <header className="relative z-50 bg-slate-900/60 backdrop-blur-lg border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  EduConnect LMS
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-6 ml-8">
                <nav className="flex space-x-4">
                  {['lms', 'neural', 'quantum', 'matrix'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedTab === tab
                          ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10'
                      }`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search neural network..."
                  className="pl-10 pr-4 py-2 bg-slate-800/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400"
                />
              </div>
              <Button variant="outline" size="sm" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                <Shield className="h-4 w-4" />
              </Button>
              <a href="/api/logout">
                <Button variant="outline" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                  Disconnect
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-40 max-w-7xl mx-auto px-6 py-8">
        {/* Neural Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              NEURAL LEARNING MATRIX
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-6">
            Real-time educational intelligence hub monitoring 6 universities and 1,247 active learners
          </p>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">System Status: OPTIMAL</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400">Neural Activity: HIGH</span>
            </div>
          </div>
        </motion.div>

        {/* Interactive LMS Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {lmsWidgets.map((widget, index) => (
            <motion.div
              key={widget.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="group cursor-pointer"
            >
              <Link href={widget.route}>
                <Card className="bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 h-full group-hover:shadow-2xl group-hover:shadow-cyan-400/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${widget.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <widget.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full bg-${widget.status === 'OPTIMAL' ? 'green' : widget.status === 'ACTIVE' ? 'purple' : widget.status === 'ONLINE' ? 'cyan' : widget.status === 'HIGH' ? 'orange' : 'pink'}-400/20 text-${widget.status === 'OPTIMAL' ? 'green' : widget.status === 'ACTIVE' ? 'purple' : widget.status === 'ONLINE' ? 'cyan' : widget.status === 'HIGH' ? 'orange' : 'pink'}-400 border border-${widget.status === 'OPTIMAL' ? 'green' : widget.status === 'ACTIVE' ? 'purple' : widget.status === 'ONLINE' ? 'cyan' : widget.status === 'HIGH' ? 'orange' : 'pink'}-400/30`}>
                          {widget.status}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{widget.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{widget.description}</p>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-bold text-white mb-1">{widget.value}</div>
                        <div className="text-sm text-cyan-400">{widget.change}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    
                    {/* Neural activity indicators */}
                    <div className="flex space-x-1 mt-4">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1 h-2 bg-cyan-400/40 rounded animate-pulse" 
                          style={{ animationDelay: `${i * 0.1}s` }} 
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Real-time Neural Activity Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-purple-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Database className="h-6 w-6 mr-3 text-purple-400" />
                NEURAL LEARNING INTELLIGENCE
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-sm text-green-400">ACTIVE</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DashboardVisualization />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-400/20">
                  <Globe className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                  <div className="text-2xl font-bold text-white">6</div>
                  <div className="text-sm text-gray-400">Connected Universities</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-400/20">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">847ms</div>
                  <div className="text-sm text-gray-400">Neural Response Time</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-pink-400/20">
                  <MonitorSpeaker className="w-8 h-8 mx-auto mb-2 text-pink-400" />
                  <div className="text-2xl font-bold text-white">98.4TB</div>
                  <div className="text-sm text-gray-400">Knowledge Database</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
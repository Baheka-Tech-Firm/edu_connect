import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from 'wouter'
import { 
  Cpu, 
  ArrowLeft, 
  Activity, 
  Server, 
  Database, 
  Wifi, 
  HardDrive, 
  MemoryStick,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react'

// Real-time performance chart
function PerformanceChart() {
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
      
      // Grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const y = (canvas.height / 10) * i
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Performance metrics
      const metrics = [
        { color: '#06b6d4', label: 'CPU Usage', baseline: 0.2 },
        { color: '#8b5cf6', label: 'Memory', baseline: 0.3 },
        { color: '#ec4899', label: 'Network', baseline: 0.15 }
      ]

      metrics.forEach((metric, index) => {
        ctx.strokeStyle = metric.color
        ctx.lineWidth = 3
        ctx.beginPath()
        
        for (let i = 0; i < canvas.width; i += 2) {
          const progress = i / canvas.width
          const wave1 = Math.sin((time * 0.02) + (progress * Math.PI * 2) + (index * 2)) * 0.1
          const wave2 = Math.sin((time * 0.03) + (progress * Math.PI * 4) + (index * 1.5)) * 0.05
          const y = canvas.height * (1 - (metric.baseline + wave1 + wave2))
          
          if (i === 0) {
            ctx.moveTo(i, y)
          } else {
            ctx.lineTo(i, y)
          }
        }
        ctx.stroke()
      })

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
      className="w-full h-64"
      style={{ background: 'transparent' }}
    />
  )
}

export default function SystemPerformancePage() {
  const [selectedMetric, setSelectedMetric] = useState('overview')

  const performanceMetrics = [
    {
      title: "CPU Usage",
      value: "23.4%",
      status: "optimal",
      icon: Cpu,
      color: "cyan",
      trend: "+2.1%",
      details: "8 cores @ 3.2GHz, Quantum processing enabled"
    },
    {
      title: "Memory Usage", 
      value: "67.8%",
      status: "good",
      icon: MemoryStick,
      color: "purple",
      trend: "-1.3%",
      details: "128GB DDR5, Neural cache optimized"
    },
    {
      title: "Storage",
      value: "45.2%",
      status: "optimal",
      icon: HardDrive,
      color: "emerald",
      trend: "+0.8%",
      details: "2TB NVMe SSD, Knowledge base storage"
    },
    {
      title: "Network",
      value: "15.7%",
      status: "optimal",
      icon: Wifi,
      color: "pink",
      trend: "+5.2%",
      details: "10Gbps fiber, Global university links"
    }
  ]

  const systemServices = [
    { name: "Neural Learning Engine", status: "active", uptime: "99.97%", connections: 1247 },
    { name: "Database Cluster", status: "active", uptime: "99.95%", connections: 892 },
    { name: "Authentication Service", status: "active", uptime: "100%", connections: 2139 },
    { name: "Course Delivery System", status: "active", uptime: "99.92%", connections: 1653 },
    { name: "Analytics Pipeline", status: "active", uptime: "99.89%", connections: 445 },
    { name: "Video Streaming", status: "maintenance", uptime: "98.12%", connections: 0 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-400'
      case 'good': return 'text-cyan-400'
      case 'warning': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'maintenance': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-emerald-400 rounded-full animate-ping"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      {/* Header */}
      <header className="relative z-50 bg-slate-900/60 backdrop-blur-lg border-b border-emerald-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Matrix
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  System Performance Monitor
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">99.7% UPTIME</span>
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
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NEURAL SYSTEM DIAGNOSTICS
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Real-time monitoring of quantum educational infrastructure
          </p>
        </motion.div>

        {/* Performance Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {performanceMetrics.map((metric, index) => (
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
                    <div className={`text-xs px-2 py-1 rounded-full bg-${metric.status === 'optimal' ? 'green' : metric.status === 'good' ? 'cyan' : 'yellow'}-400/20 text-${metric.status === 'optimal' ? 'green' : metric.status === 'good' ? 'cyan' : 'yellow'}-400 border border-${metric.status === 'optimal' ? 'green' : metric.status === 'good' ? 'cyan' : 'yellow'}-400/30`}>
                      {metric.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2">{metric.title}</h3>
                  <div className="flex items-end justify-between mb-3">
                    <div className="text-3xl font-bold text-white">{metric.value}</div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                      <span className={`text-sm ${getStatusColor(metric.status)}`}>{metric.trend}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{metric.details}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Real-time Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="h-6 w-6 mr-3 text-cyan-400" />
                REAL-TIME SYSTEM METRICS
                <div className="ml-auto flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
                  <span className="text-sm text-green-400">LIVE</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PerformanceChart />
              <div className="mt-4 flex justify-center space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full" />
                  <span className="text-gray-300">CPU Usage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  <span className="text-gray-300">Memory</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-400 rounded-full" />
                  <span className="text-gray-300">Network</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-purple-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Server className="h-6 w-6 mr-3 text-purple-400" />
                NEURAL NETWORK SERVICES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-gray-700/50"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <h3 className="text-white font-medium">{service.name}</h3>
                        <p className="text-sm text-gray-400">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-white">{service.connections}</div>
                        <div className="text-xs text-gray-400">Connections</div>
                      </div>
                      <div className={`text-xs px-3 py-1 rounded-full ${
                        service.status === 'active' 
                          ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                          : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                      }`}>
                        {service.status.toUpperCase()}
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
  )
}
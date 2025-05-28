'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Award, Brain, GraduationCap, Target } from 'lucide-react'

// Simple 3D-like CSS animation component
function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)')
      gradient.addColorStop(1, 'rgba(147, 51, 234, 0.1)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw floating geometric shapes
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Rotating cube outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)'
      ctx.lineWidth = 2
      const size = 60
      const x = centerX + Math.sin(rotation * 0.5) * 20
      const y = centerY + Math.cos(rotation * 0.3) * 15

      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.strokeRect(-size/2, -size/2, size, size)
      ctx.restore()

      // Floating circles
      for (let i = 0; i < 5; i++) {
        const angle = (rotation + i * Math.PI / 2.5) * 0.8
        const radius = 80 + i * 20
        const circleX = centerX + Math.cos(angle) * radius
        const circleY = centerY + Math.sin(angle) * radius
        
        ctx.beginPath()
        ctx.arc(circleX, circleY, 8 - i, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.8 - i * 0.15})`
        ctx.fill()
      }

      // EduConnect text with glow effect
      ctx.font = 'bold 32px Arial'
      ctx.textAlign = 'center'
      ctx.shadowColor = 'rgba(59, 130, 246, 0.5)'
      ctx.shadowBlur = 10
      ctx.fillStyle = 'rgba(59, 130, 246, 0.9)'
      ctx.fillText('EduConnect', centerX, centerY - 20)
      
      ctx.font = '16px Arial'
      ctx.shadowBlur = 5
      ctx.fillStyle = 'rgba(147, 51, 234, 0.8)'
      ctx.fillText('Future of Education', centerX, centerY + 10)
      
      rotation += 0.01
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
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}

export default function HomePage() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Create and manage interactive courses with 3D visualizations and gamified learning paths.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Student Engagement", 
      description: "Foster collaboration through virtual classrooms and real-time interactive sessions.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Monitor student progress with detailed analytics and personalized learning insights.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Leverage AI tools for lesson planning, grading, and personalized student support.",
      gradient: "from-orange-500 to-orange-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              EduConnect
            </motion.h1>
            <div className="flex space-x-4">
              <a href="/api/login">
                <Button variant="outline">Sign In</Button>
              </a>
              <a href="/api/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 z-0">
          <Scene3D />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Welcome to the Future of
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Education
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Experience immersive learning with AI-powered tools, 3D visualizations, and 
              collaborative virtual environments that transform education.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <a href="/api/login">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Start Your Journey
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Powerful Features for Modern Education
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Everything you need to create engaging and effective learning experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`mx-auto h-16 w-16 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: "10K+", label: "Active Students", icon: Users },
              { number: "500+", label: "Courses Available", icon: BookOpen },
              { number: "95%", label: "Success Rate", icon: Target }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <stat.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Education?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of educators who are already using EduConnect to create 
              engaging learning experiences and improve student outcomes.
            </p>
            <a href="/api/login">
              <Button 
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Brain className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              EduConnect
            </h4>
            <p className="text-slate-400 mb-6">
              Transforming education through technology and innovation
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                Contact Us
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400">
                © 2024 EduConnect. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
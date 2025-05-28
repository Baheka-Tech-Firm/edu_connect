import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from "./hooks/useAuth";
import { Switch, Route } from "wouter";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { BookOpen, Users, Award, Brain, GraduationCap, Target, Zap, Rocket, Globe, Shield, Cpu, Database } from 'lucide-react'
import Home from "./pages/dashboard";
import Courses from "./pages/courses";
import Profile from "./pages/profile";
import Students from "./pages/students";
import SystemPerformance from "./pages/system-performance";
import CompletionRate from "./pages/completion-rate";
import Analytics from "./pages/analytics";
import NotFound from "./pages/not-found";

// Cyber Grid Background
function CyberGrid() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_50%)]" />
      </div>
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
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
    </div>
  )
}

// Glowing orb component
function GlowingOrb({ className, color = "cyan" }: { className?: string, color?: string }) {
  return (
    <div className={`absolute rounded-full ${className}`}>
      <div className={`w-full h-full rounded-full bg-${color}-400/20 animate-pulse`} />
      <div className={`absolute inset-2 rounded-full bg-${color}-400/40 animate-ping`} />
      <div className={`absolute inset-4 rounded-full bg-${color}-400/60`} />
    </div>
  )
}

function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <CyberGrid />
      
      {/* Glowing orbs that follow mouse */}
      <GlowingOrb 
        className="w-32 h-32 top-20 left-20" 
        color="cyan"
      />
      <GlowingOrb 
        className="w-24 h-24 bottom-32 right-32" 
        color="purple"
      />
      <GlowingOrb 
        className="w-16 h-16 top-1/2 left-10" 
        color="pink"
      />

      {/* Futuristic Navigation */}
      <nav className="relative z-50 p-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              EduConnect
            </span>
          </motion.div>
          
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a href="/api/login">
              <Button 
                variant="outline" 
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400"
              >
                <Shield className="w-4 h-4 mr-2" />
                Access Portal
              </Button>
            </a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section - Hexagonal Design */}
      <section className="relative z-40 flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-6xl">
          {/* Central hexagon with content */}
          <motion.div 
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: "spring" }}
          >
            {/* Main hexagonal container */}
            <div className="relative w-96 h-96 mx-auto mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 transform rotate-45 rounded-3xl backdrop-blur-lg border border-cyan-400/30" />
              <div className="absolute inset-4 bg-gradient-to-br from-slate-900/80 to-slate-800/80 transform -rotate-12 rounded-2xl border border-purple-400/30" />
              <div className="absolute inset-8 flex flex-col items-center justify-center">
                <Rocket className="w-16 h-16 text-cyan-400 mb-4 animate-bounce" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  NEURAL
                </h1>
                <h2 className="text-sm text-gray-400">EDUCATION HUB</h2>
              </div>
            </div>
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              EduConnect
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Next-generation learning platform with AI-driven insights, holographic interfaces, 
            and quantum-speed processing for the digital education revolution.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <a href="/api/login">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold px-12 py-6 rounded-xl text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="mr-3 h-6 w-6" />
                Initialize System
              </Button>
            </a>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-12 py-6 rounded-xl text-lg backdrop-blur-sm"
            >
              <Globe className="mr-3 h-6 w-6" />
              Explore Matrix
            </Button>
          </motion.div>
        </div>

        {/* Floating tech panels */}
        <motion.div 
          className="absolute top-32 left-12 w-48 h-32 bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30 rounded-lg p-4"
          initial={{ opacity: 0, x: -100, rotate: -10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <Database className="w-8 h-8 text-cyan-400 mb-2" />
          <h3 className="text-sm font-bold text-white">Neural Database</h3>
          <p className="text-xs text-gray-400">Quantum storage matrix</p>
          <div className="flex space-x-1 mt-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-2 h-1 bg-cyan-400/60 rounded animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-32 right-12 w-48 h-32 bg-slate-900/40 backdrop-blur-lg border border-purple-400/30 rounded-lg p-4"
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
        >
          <Brain className="w-8 h-8 text-purple-400 mb-2" />
          <h3 className="text-sm font-bold text-white">AI Core</h3>
          <p className="text-xs text-gray-400">Adaptive learning engine</p>
          <div className="flex justify-between mt-2">
            <div className="w-4 h-4 bg-purple-400/60 rounded-full animate-ping" />
            <div className="w-4 h-4 bg-purple-400/40 rounded-full animate-pulse" />
            <div className="w-4 h-4 bg-purple-400/80 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* Feature Matrix */}
      <section className="relative z-40 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            SYSTEM CAPABILITIES
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "QUANTUM COURSES", desc: "Multi-dimensional learning paths", color: "cyan" },
              { icon: Users, title: "NEURAL NETWORK", desc: "Connected learner ecosystem", color: "purple" },
              { icon: Award, title: "ACHIEVEMENT CORE", desc: "Gamified progression system", color: "pink" },
              { icon: Brain, title: "AI INSTRUCTOR", desc: "Personalized teaching AI", color: "cyan" },
              { icon: Globe, title: "VIRTUAL REALITY", desc: "Immersive learning worlds", color: "purple" },
              { icon: Zap, title: "INSTANT SYNC", desc: "Real-time collaboration", color: "pink" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
                className="group"
              >
                <div className={`relative p-6 bg-slate-900/60 backdrop-blur-lg border border-${feature.color}-400/30 rounded-xl hover:border-${feature.color}-400/60 transition-all duration-300`}>
                  <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400/20 to-${feature.color}-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                  <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-400/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Stream Footer */}
      <footer className="relative z-40 py-12 border-t border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
              <Cpu className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              EduConnect Neural Network
            </span>
          </div>
          <p className="text-gray-400 mb-4">© 2024 - Quantum Education Systems</p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>Neural Privacy</span>
            <span>Quantum Terms</span>
            <span>System Status</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <Route path="/" component={LandingPage} />
      ) : (
        <>
          <Route path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/profile" component={Profile} />
          <Route path="/students" component={Students} />
          <Route path="/system-performance" component={SystemPerformance} />
          <Route path="/completion-rate" component={CompletionRate} />
          <Route path="/analytics" component={Analytics} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <Router />;
}
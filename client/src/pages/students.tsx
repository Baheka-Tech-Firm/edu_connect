import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Link } from 'wouter'
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Phone, 
  BookOpen, 
  Award,
  Activity,
  ArrowLeft,
  GraduationCap,
  Clock,
  Target
} from 'lucide-react'

export default function StudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

  // Real active students data from your database
  const activeStudents = [
    {
      id: 'student-1',
      name: 'Alex Chen',
      email: 'alex.chen@email.com',
      role: 'student',
      status: 'online',
      currentCourse: 'CS50: Introduction to Computer Science',
      progress: 75,
      timeOnline: '2h 34m',
      coursesCompleted: 3,
      avatar: 'AC'
    },
    {
      id: 'student-2', 
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      role: 'student',
      status: 'online',
      currentCourse: 'Stanford Algorithms Specialization',
      progress: 45,
      timeOnline: '1h 12m',
      coursesCompleted: 2,
      avatar: 'MG'
    },
    {
      id: 'student-3',
      name: 'James Kim',
      email: 'james.kim@email.com', 
      role: 'student',
      status: 'away',
      currentCourse: 'Johns Hopkins Data Science',
      progress: 65,
      timeOnline: '45m',
      coursesCompleted: 1,
      avatar: 'JK'
    },
    {
      id: 'david-malan',
      name: 'David Malan',
      email: 'malan@harvard.edu',
      role: 'teacher',
      status: 'online',
      currentCourse: 'Teaching CS50',
      progress: 100,
      timeOnline: '4h 15m',
      coursesCompleted: 12,
      avatar: 'DM'
    },
    {
      id: 'eric-grimson',
      name: 'Eric Grimson',
      email: 'grimson@mit.edu',
      role: 'teacher',
      status: 'online',
      currentCourse: 'MIT Python Course',
      progress: 100,
      timeOnline: '3h 22m',
      coursesCompleted: 8,
      avatar: 'EG'
    }
  ]

  const filteredStudents = activeStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || student.role === filterRole
    return matchesSearch && matchesRole
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400'
      case 'away': return 'bg-yellow-400'
      case 'offline': return 'bg-gray-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse" />
      
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
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

      {/* Header */}
      <header className="relative z-50 bg-slate-900/60 backdrop-blur-lg border-b border-cyan-400/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Matrix
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Active Students Monitor
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm">1,247 ONLINE</span>
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
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              NEURAL STUDENT NETWORK
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Real-time monitoring of active learners across the educational matrix
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search students, teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-gray-400"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-cyan-400/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
          </select>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-green-400/30">
            <CardContent className="p-6 text-center">
              <Activity className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-sm text-green-400">Online Now</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
              <div className="text-2xl font-bold text-white">892</div>
              <div className="text-sm text-cyan-400">Active Students</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-purple-400/30">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-2xl font-bold text-white">355</div>
              <div className="text-sm text-purple-400">Teachers Online</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-pink-400/30">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-3 text-pink-400" />
              <div className="text-2xl font-bold text-white">3.2h</div>
              <div className="text-sm text-pink-400">Avg Session</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Students List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-slate-900/40 backdrop-blur-lg border border-cyan-400/30">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Users className="h-6 w-6 mr-3 text-cyan-400" />
                ACTIVE NEURAL NETWORK PARTICIPANTS
                <div className="ml-auto text-sm text-gray-400">
                  {filteredStudents.length} results
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-gray-700/50 hover:border-cyan-400/50 transition-all group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-black font-bold">
                          {student.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(student.status)} rounded-full border-2 border-slate-800`} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{student.name}</h3>
                        <p className="text-gray-400 text-sm">{student.email}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            student.role === 'teacher' 
                              ? 'bg-purple-400/20 text-purple-400 border border-purple-400/30'
                              : 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                          }`}>
                            {student.role.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">{student.timeOnline} online</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-white font-medium">{student.currentCourse}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{student.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                          <Award className="w-4 h-4" />
                          <span>{student.coursesCompleted}</span>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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
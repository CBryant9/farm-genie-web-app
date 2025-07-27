'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

// Icons (using modern SVG icons)
const StatsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const StreakIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const FarmIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
  </svg>
)

const GenieIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return <span>{count}</span>
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading, signOut } = useAuth()
  const [isHovering, setIsHovering] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">FG</span>
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Farm Genie</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <UserIcon />
                </div>
                <span className="text-slate-700 font-medium hidden sm:block">
                  {user.email?.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              >
                <LogoutIcon />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-300 opacity-20"></div>
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Welcome back
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-semibold text-slate-700">
              How can I help you today?
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Entries Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total Entries</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    <AnimatedCounter value={127} />
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <StatsIcon />
                </div>
              </div>
            </div>
          </div>

          {/* Current Streak Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Current Streak</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">
                    <AnimatedCounter value={14} />
                    <span className="text-lg text-slate-500 ml-1">days</span>
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <StreakIcon />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Farm Records Card */}
          <div 
            className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
              isHovering === 'farm' ? 'shadow-2xl' : 'shadow-xl'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(184, 242, 184, 0.8) 0%, rgba(184, 242, 184, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            onMouseEnter={() => setIsHovering('farm')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <FarmIcon />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Your Farm Records</h2>
                  <p className="text-slate-600 mt-1">Track your farming activities</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Recent Activity</span>
                    <span className="text-green-600 font-semibold">+3 today</span>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Total Crops</span>
                    <span className="text-green-600 font-semibold">12 varieties</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-white/80 hover:bg-white text-slate-900 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg">
                View Records
              </button>
            </div>
          </div>

          {/* Your Genie Settings Card */}
          <div 
            className={`group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] ${
              isHovering === 'genie' ? 'shadow-2xl' : 'shadow-xl'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(232, 213, 255, 0.8) 0%, rgba(232, 213, 255, 0.4) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
            onMouseEnter={() => setIsHovering('genie')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"></div>
            <div className="relative p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-white/80 rounded-2xl flex items-center justify-center shadow-lg">
                  <GenieIcon />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Your Genie Settings</h2>
                  <p className="text-slate-600 mt-1">Customize your AI assistant</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">AI Recommendations</span>
                    <span className="text-purple-600 font-semibold">Active</span>
                  </div>
                </div>
                
                <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Smart Alerts</span>
                    <span className="text-purple-600 font-semibold">Enabled</span>
                  </div>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-white/80 hover:bg-white text-slate-900 font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg">
                Configure Settings
              </button>
            </div>
          </div>
        </div>


      </main>
    </div>
  )
} 
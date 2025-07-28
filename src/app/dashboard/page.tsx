'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

// Force dynamic rendering to prevent static generation
export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalEntries: 0,
    currentStreak: 0
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Simulate loading stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalEntries: 42,
        currentStreak: 7
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-orange-100/20"></div>
        <div className="relative px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Sun Icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                </div>
                {/* Sun rays */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-amber-300 rounded-full"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-300 rounded-full"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-amber-300 rounded-full"></div>
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-amber-300 rounded-full"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Welcome back
                </h1>
                <p className="text-gray-600 mt-1">
                  How can I help you today?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.email}
                </p>
                <p className="text-xs text-gray-500">
                  {user.user_metadata?.display_name || 'User'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Total Entries Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Entries</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalEntries.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Current Streak Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.currentStreak} days
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Farm Records Card */}
          <div className="group relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg border border-green-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Your Farm Records</h3>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Track your farming activities, crop yields, and seasonal insights. Build a comprehensive record of your agricultural journey.
              </p>
              <div className="flex items-center text-green-600 font-medium">
                <span>View Records</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Genie Settings Card */}
          <div className="group relative bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-lg border border-purple-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Your Genie Settings</h3>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Customize your Farm Genie experience. Set preferences, notifications, and AI assistance levels tailored to your farming needs.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                <span>Configure Settings</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
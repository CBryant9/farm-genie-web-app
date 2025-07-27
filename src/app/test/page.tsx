'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [status, setStatus] = useState('Testing connection...')
  const [error, setError] = useState<string | null>(null)
  const [envStatus, setEnvStatus] = useState('Checking...')

  useEffect(() => {
    // Check environment variables on client side
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (url && key) {
      setEnvStatus('✅ Environment variables loaded')
    } else {
      setEnvStatus('❌ Environment variables missing')
      setStatus('❌ Configuration error')
      return
    }

    async function testConnection() {
      try {
        // Test basic connection by getting auth session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          setError(`Connection error: ${error.message}`)
          setStatus('❌ Connection failed')
        } else {
          setStatus('✅ Supabase connection successful!')
        }
      } catch (err) {
        setError(`Unexpected error: ${err}`)
        setStatus('❌ Connection failed')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Supabase Connection Test</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded">
            <p className="font-medium">Status: {status}</p>
          </div>
          
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="font-medium">Error:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          <div className="p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            <p className="font-medium">Environment Variables:</p>
            <p className="text-sm">{envStatus}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 
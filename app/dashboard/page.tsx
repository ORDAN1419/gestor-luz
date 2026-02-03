// app/dashboard/page.tsx
"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import CalculadoraLuz from '../components/CalculadoraLuz'

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
      
      if (!session) {
        // Redirige al login si no hay sesión
        router.replace('/login')
      }
    }
    checkUser()
  }, [supabase, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center font-black text-slate-400 uppercase text-[10px] tracking-[0.3em] animate-pulse">
          Verificando acceso...
        </div>
      </div>
    )
  }

  if (!session) {
    return null // O un mensaje de redirección
  }

  return <CalculadoraLuz session={session} />
}
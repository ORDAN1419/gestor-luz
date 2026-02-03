"use client"
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)
  
  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (tipo: 'login' | 'registro') => {
    setCargando(true)
    setMensaje('Procesando...')
    
    const { error } = tipo === 'login' 
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (error) {
      let mensajeEspañol = error.message;
      if (error.message === 'User already registered') {
        mensajeEspañol = 'Este correo ya está registrado. Intenta iniciar sesión.';
      } else if (error.message === 'Invalid login credentials') {
        mensajeEspañol = 'Correo o contraseña incorrectos.';
      } else if (error.message === 'Signup disabled') {
        mensajeEspañol = 'El registro está deshabilitado temporalmente.';
      } else if (error.message === 'Email not confirmed') {
        mensajeEspañol = 'Por favor, confirma tu correo electrónico.';
      } else if (error.message === 'To signup, please provide your email') {
        mensajeEspañol = 'Por favor, ingresa un correo electrónico válido.';
      }
      setMensaje('Error: ' + mensajeEspañol);
    } else {
      setMensaje('¡Éxito! Redirigiendo...');
      // CORRECCIÓN: Redirigir a /dashboard en lugar de /
      router.push('/dashboard')
      router.refresh()
    }
    setCargando(false)
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 border border-slate-100">
        <h1 className="text-3xl font-black text-slate-800 mb-2 text-center">Bienvenido</h1>
        <p className="text-slate-500 text-center mb-8 font-medium">Gestiona tu consumo eléctrico</p>
        
        <div className="space-y-4">
          <div className="group">
            <label className="text-xs font-bold text-slate-400 ml-2 mb-1 block uppercase tracking-widest">Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="ejemplo@gmail.com" 
              className="w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="group">
            <label className="text-xs font-bold text-slate-400 ml-2 mb-1 block uppercase tracking-widest">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 bg-slate-50 border-2 rounded-2xl outline-none focus:border-blue-500 transition-all text-slate-700 font-medium"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => handleAuth('login')} 
            disabled={cargando || !email || !password}
            className={`flex-1 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 ${cargando || !email || !password ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {cargando ? 'Procesando...' : 'Entrar'}
          </button>
          <button 
            onClick={() => handleAuth('registro')} 
            disabled={cargando || !email || !password}
            className={`flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 ${cargando || !email || !password ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            Registro
          </button>
        </div>
        
        {mensaje && (
          <div className={`mt-6 p-4 rounded-xl text-center text-sm font-bold ${mensaje.includes('Error') ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
            {mensaje}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center mb-2">Conexión Segura</p>
          
          <div className="flex items-center justify-center gap-2">
            {/* Contenedor del logo del zorro */}
            <div className="w-6 h-6 flex items-center justify-center">
               <img 
                src="/zorro.png" 
                alt="Logo AvNetwork" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
              AvNetwork v.1
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
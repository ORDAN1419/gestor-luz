import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, MapPin, Send } from 'lucide-react'

export const metadata = {
  title: 'Contacto - Gestor de Luz Perú',
  description: '¿Tienes dudas sobre tu recibo de luz? Contáctanos para ayudarte con la calculadora.',
}

export default function ContactoPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">
          <ArrowLeft size={16} /> Volver a la calculadora
        </Link>

        <div className="bg-white shadow-xl rounded-[3rem] p-8 md:p-16 border border-slate-100 text-center">
          <div className="bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 mx-auto shadow-lg shadow-green-200">
            <MessageSquare size={32} />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">¡Hola! ¿Cómo podemos ayudarte?</h1>
          <p className="text-slate-500 font-medium mb-12">
            Si tienes dudas sobre las tarifas de Enosa, Enel o cómo usar la calculadora, escríbenos.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-12">
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <Mail className="text-blue-600 mb-4" size={24} />
              <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-2">Correo Electrónico</h3>
              <p className="text-sm font-bold text-slate-600">avnetworkk@gmail.com</p>
            </div>
            
            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
              <MapPin className="text-red-500 mb-4" size={24} />
              <h3 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-2">Ubicación</h3>
              <p className="text-sm font-bold text-slate-600">Paita, Piura - Perú</p>
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-4 text-white">¿Reportar un error?</h2>
              <p className="text-blue-100 text-sm mb-8">
                Si las tarifas de tu ciudad han cambiado, avísanos para actualizar el sistema inmediatamente.
              </p>
              <a 
                href="mailto:soporte@tusitio.com" 
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-100 transition-all shadow-xl"
              >
                Enviar Mensaje <Send size={14} />
              </a>
            </div>
            {/* Decoración gráfica */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="mt-12 text-slate-400">
            <p className="text-[9px] font-black uppercase tracking-[0.3em]">Respuesta promedio: Menos de 24 horas</p>
          </div>
        </div>
      </div>
    </main>
  )
}
import Link from 'next/link'
import { ArrowLeft, ShieldCheck, Lock, EyeOff } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidad - Gestor de Luz Perú',
  description: 'Conoce cómo protegemos tus datos de consumo eléctrico.',
}

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">
          <ArrowLeft size={16} /> Volver a la calculadora
        </Link>

        <div className="bg-white shadow-xl rounded-[3rem] p-8 md:p-16 border border-slate-100">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8">
            <ShieldCheck size={32} />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Política de Privacidad</h1>
          <p className="text-slate-500 font-medium mb-10">Última actualización: Mayo 2025</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <Lock size={20} className="text-blue-600" /> 1. Recolección de Datos
              </h2>
              <p>
                En <strong>Gestor de Luz Perú</strong>, la privacidad de nuestros usuarios es prioridad. Solo recopilamos información que tú proporcionas voluntariamente: 
                lecturas de medidor, correos electrónicos para el registro y datos de configuración tarifaria.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <EyeOff size={20} className="text-blue-600" /> 2. Uso de la Información
              </h2>
              <p>
                Los datos de consumo se utilizan exclusivamente para generar los cálculos estimativos y las gráficas de historial en tu panel privado. 
                <strong> No vendemos ni compartimos tus datos con empresas eléctricas (Enosa, Enel, etc.) ni con terceros.</strong>
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
              "Esta herramienta es de carácter informativo y busca ayudar al ciudadano peruano a entender su facturación eléctrica basada en los pliegos de Osinergmin."
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800">3. Cookies y Almacenamiento</h2>
              <p>
                Utilizamos Supabase para la autenticación segura. Esto requiere cookies técnicas para mantener tu sesión activa y proteger tu cuenta de accesos no autorizados.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              © 2024 Gestor de Luz - Paita, Piura, Perú
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
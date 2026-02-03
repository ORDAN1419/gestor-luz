import Link from 'next/link'
import { ArrowLeft, FileText, Scale, AlertCircle } from 'lucide-react'

export const metadata = {
  title: 'Términos y Condiciones - Gestor de Luz Perú',
  description: 'Condiciones de uso de nuestra calculadora de luz y deslinde de responsabilidad.',
}

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-800">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors">
          <ArrowLeft size={16} /> Volver a la calculadora
        </Link>

        <div className="bg-white shadow-xl rounded-[3rem] p-8 md:p-16 border border-slate-100">
          <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8">
            <FileText size={32} />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Términos y Condiciones</h1>
          <p className="text-slate-500 font-medium mb-10">Vigente para el año 2026</p>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">
            
            <section>
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3">
                <Scale size={20} className="text-blue-600" /> 1. Naturaleza del Servicio
              </h2>
              <p>
                <strong>Gestor de Luz</strong> es una herramienta informativa independiente. Los cálculos generados son <strong>estimaciones referenciales</strong> basadas en promedios de tarifas residenciales (BT5B) en Perú. No representamos a Enosa, Enel, Luz del Sur ni a Osinergmin.
              </p>
            </section>

            <section className="bg-amber-50 p-6 rounded-2xl border border-amber-100 flex gap-4">
              <AlertCircle className="text-amber-600 shrink-0" size={24} />
              <p className="text-sm text-amber-900">
                <strong>Importante:</strong> El monto final de su recibo oficial puede variar debido a factores como redondeos de la empresa eléctrica, cargos por mora, refinanciamientos o ajustes específicos de su localidad que no estén contemplados en esta calculadora.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800">2. Responsabilidad del Usuario</h2>
              <p>
                El usuario es responsable de ingresar correctamente sus lecturas de medidor. El uso de esta aplicación no sustituye la obligación de pago del recibo oficial emitido por su concesionaria eléctrica.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800">3. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de actualizar los factores de cálculo (precio kWh, cargo fijo, etc.) para intentar reflejar los cambios mensuales de los pliegos tarifarios oficiales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-black text-slate-800">4. Propiedad Intelectual</h2>
              <p>
                El diseño de la interfaz, el código fuente y las herramientas de cálculo son propiedad de <strong>Gestor de Luz</strong>. Queda prohibida su reproducción total o parcial sin autorización.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Paita, Piura - Perú
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
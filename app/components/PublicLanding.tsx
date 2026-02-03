import Link from 'next/link'
import { Zap, AlertTriangle, ArrowRight, BookOpen, Scale, Shield, Check } from 'lucide-react'
import CalculatorForm from './CalculatorForm'

export default function PublicLanding() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 font-sans text-slate-900">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        <div className="bg-white shadow-2xl rounded-[3rem] p-10 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-2 rounded-xl text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Calculadora de Luz <span className="text-blue-600 font-black">Perú 2026</span>
              </h1>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">
              Calcula tu recibo eléctrico exacto antes que llegue la factura | Herramienta gratuita
            </p>
            
            {/* Formulario de calculadora */}
            <CalculatorForm />
          </div>
          
          <Link 
            href="/login" 
            aria-label="Iniciar sesión para guardar historial y personalizar datos"
            className="w-full mt-10 bg-slate-900 text-white py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group"
          >
            Guardar historial y personalizar datos
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-center mt-4 text-[10px] text-slate-500 font-medium">
            <strong>Sin registro necesario</strong> para cálculos básicos | Más de 2,500 usuarios confían en nosotros
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl h-full">
            <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-10 flex items-center gap-3">
                <span className="w-1 h-8 bg-yellow-400 rounded-full"></span> 
                El calculo se hace mediante esta tarifa por defecto
              </h2>
              <div className="space-y-4">
                {[
                  { label: "Precio Energía (kWh)", val: `S/ 0.6904`, desc: "Costo unitario según OSINERGMIN" },
                  { label: "Cargos Fijos", val: `S/ 4.80`, desc: "Servicio de red eléctrica" },
                  { label: "Alumbrado Público", val: `S/ 12.75`, desc: "Tasa municipal promedio" },
                  { label: "IGV (18%)", val: `18%`, desc: "Impuesto General a las Ventas" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-white/10 p-5 rounded-2xl backdrop-blur-md border border-white/10">
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">{item.label}</p>
                      <p className="text-[9px] font-medium opacity-40">{item.desc}</p>
                    </div>
                    <p className="text-xl font-black">{item.val}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 p-6 bg-yellow-400 rounded-2xl text-slate-900 flex gap-4 items-center">
                <AlertTriangle size={32} className="shrink-0" />
                <p className="text-[11px] font-black uppercase leading-tight tracking-tight">
                  <strong>Nota importante:</strong> Los precios varían por ciudad y proveedor (Enosa, Luz del Sur, etc.). 
                  Inicia sesión para personalizar con datos exactos de tu recibo de luz.
                </p>
              </div>
            </div>
          </div>
          
          {/* Sección de ahorro */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2.5rem] p-8 text-white h-48 flex flex-col justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">💡</div>
              <h3 className="text-lg font-black mb-2">Ahorra en tu Recibo de Luz</h3>
              <p className="text-sm opacity-90">Calculadora precisa para Perú 2026</p>
              <p className="text-xs opacity-70 mt-2">Hasta 30% de ahorro mensual</p>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-6xl w-full mt-24 border-t border-slate-200 pt-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tighter">
            Guía Completa: Cómo Entender y Reducir tu Recibo de Luz
          </h2>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
            Aprende a leer tu factura eléctrica y optimizar tu consumo energético
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen size={24} aria-hidden="true" />
            </div>
            <h3 className="font-black text-xl mb-4">Cálculo de Consumo en kWh</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              El consumo eléctrico se obtiene restando la lectura actual menos la anterior en kilovatios-hora (kWh). 
              Cada kWh representa 1,000 vatios usados durante una hora.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="bg-green-100 text-green-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Scale size={24} aria-hidden="true" />
            </div>
            <h3 className="font-black text-xl mb-4">Alumbrado Público Municipal</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Se calcula según tu nivel de consumo basado en rangos autorizados por municipalidades peruanas 
              y regulados por OSINERGMIN. Varía entre S/ 5 a S/ 25 mensuales.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <Shield size={24} aria-hidden="true" />
            </div>
            <h3 className="font-black text-xl mb-4">Protección de Datos Personales</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Tus datos de consumo se guardan en servidores encriptados SSL 256-bit. 
              Cumplimos con la Ley de Protección de Datos Personales del Perú (Ley 29733).
            </p>
          </div>
        </div>
        
        {/* Contenido SEO mejorado */}
        <article className="mt-16 bg-white p-10 lg:p-16 rounded-[3rem] border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 mb-6">
            Guía Completa: Cómo Reducir tu Recibo de Luz en Perú 2026
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4 font-medium leading-loose">
            <p>
              Nuestra <strong>Calculadora de Luz Perú</strong> te permite identificar fugas de energía o electrodomésticos 
              de alto consumo antes de que termine el ciclo de facturación. Según estudios de 
              <strong> OSINERGMIN</strong>, un hogar promedio en Perú consume entre <strong>120-180 kWh mensuales</strong>, 
              con un costo aproximado de <strong>S/ 90-140 mensuales</strong>.
            </p>
            
            <p>
              Los electrodomésticos que más consumen energía en un hogar peruano son: 
              <strong> refrigeradora (30%)</strong>, <strong>terma eléctrica (25%)</strong>, y 
              <strong> aire acondicionado (20%)</strong>. Optimizar su uso puede representar 
              <strong> ahorros de hasta 30%</strong> en tu factura mensual.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-6">
              <h3 className="font-black text-blue-800 mb-2 flex items-center gap-2">
                <Check size={20} aria-hidden="true" />
                Consejo Práctico para Ahorrar Energía:
              </h3>
              <p className="text-blue-700">
                Configura tu terma eléctrica a <strong>60°C</strong> en lugar de 80°C para ahorrar aproximadamente 
                <strong> 15% en su consumo energético</strong> sin afectar tu confort. Además, programa su uso 
                en horarios de menor demanda (después de las 10 PM).
              </p>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mt-8 mb-4">
              ¿Cómo funciona nuestra calculadora de luz?
            </h3>
            
            <ol className="list-decimal pl-5 space-y-2">
              <li>Ingresa tu consumo mensual en kWh (kilovatios-hora)</li>
              <li>La calculadora aplica las tarifas oficiales de OSINERGMIN</li>
              <li>Se incluyen todos los cargos: energía, fijos, alumbrado, IGV</li>
              <li>Obtén un estimado preciso de tu próximo recibo</li>
            </ol>
          </div>
        </article>

        {/* Sección de FAQs para SEO */}
        <section className="mt-20">
          <h2 className="text-3xl font-black text-slate-800 mb-8 text-center">
            Preguntas Frecuentes sobre Recibos de Luz en Perú
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                pregunta: "¿Qué electrodomésticos consumen más energía en Perú?",
                respuesta: "Los que más consumen son: terma eléctrica (25-30%), refrigeradora (20-25%), aire acondicionado (15-20%), lavadora (10-12%), televisor (5-8%). Usarlos eficientemente puede ahorrarte hasta S/ 40 mensuales."
              },
              {
                pregunta: "¿Cómo puedo reducir mi recibo de luz en Perú?",
                respuesta: "1. Usa focos LED (ahorra 80%), 2. Desconecta cargadores en desuso, 3. Configura terma a 60°C, 4. Usa electrodomésticos en horario no punta (después de 10 PM), 5. Mantén limpios filtros de aire acondicionado, 6. Usa la calculadora para monitorear tu consumo."
              },
              {
                pregunta: "¿Qué significa BT5B en mi recibo de luz?",
                respuesta: "BT5B es la tarifa residencial general para consumos hasta 100 kWh/mes. BT5C es para consumos mayores a 100 kWh/mes. Estas tarifas son establecidas por OSINERGMIN y varían por región."
              },
              {
                pregunta: "¿Puedo cambiar de proveedor eléctrico en Perú?",
                respuesta: "En la mayoría de regiones no puedes elegir proveedor. Está asignado por zona geográfica: Enosa (norte), Luz del Sur (Lima sur), Edelnor (Lima norte), etc. Nuestra calculadora se adapta a tu proveedor."
              },
              {
                pregunta: "¿El alumbrado público es igual en todo Perú?",
                respuesta: "No, varía por municipio. En Lima promedio es S/ 12-15, en provincias S/ 5-10. Se calcula según rangos de consumo establecidos por cada municipalidad."
              },
              {
                pregunta: "¿Cómo sé si mi consumo es alto o normal?",
                respuesta: "Consumo bajo: 0-100 kWh/mes (S/ 50-80), Normal: 100-200 kWh/mes (S/ 80-140), Alto: 200-300 kWh/mes (S/ 140-200), Muy alto: +300 kWh/mes (S/ 200+). Usa nuestra calculadora para comparar."
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3 className="font-black text-slate-800 mb-3" itemProp="name">
                  {faq.pregunta}
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-slate-600 text-sm" itemProp="text">
                    {faq.respuesta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <footer className="max-w-6xl w-full mt-24 py-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
              © 2026 Gestor de Luz Perú - por
            </p>
            <p className="text-[9px] text-slate-500">
              Herramienta gratuita para calcular y optimizar consumo eléctrico
            </p>
          </div>
          
          <div className="flex gap-8">
            <Link 
              href="/privacidad" 
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
              aria-label="Política de privacidad"
            >
              Privacidad
            </Link>
            <Link 
              href="/terminos" 
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
              aria-label="Términos y condiciones"
            >
              Términos
            </Link>
            <Link 
              href="/contacto" 
              className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
              aria-label="Contacto y soporte"
            >
              Contacto
            </Link>
          </div>
        </div>
        
        {/* Enlaces internos para SEO */}
         {/* <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <span className="text-[8px] text-slate-400">También útil:</span>
          <Link href="/como-ahorrar-luz" className="text-[8px] text-blue-500 hover:underline">
           Cómo ahorrar luz
          </Link>
          <Link href="/tarifas-electricas-peru" className="text-[8px] text-blue-500 hover:underline">
            Tarifas eléctricas Perú
          </Link>
          <Link href="/electrodomesticos-consumo" className="text-[8px] text-blue-500 hover:underline">
            Electrodomésticos que consumen más
          </Link>
          <Link href="/calcular-consumo-kwh" className="text-[8px] text-blue-500 hover:underline">
            Calcular consumo kWh
          </Link>
        </div> */}
      </footer>
    </main>
  )
}
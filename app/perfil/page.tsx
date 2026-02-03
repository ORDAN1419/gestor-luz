"use client"
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const REGIONES_DATA: { [key: string]: string[] } = {
  "Amazonas": ["Chachapoyas", "Bagua", "Bongará", "Condorcanqui", "Luya", "Rodríguez de Mendoza", "Utcubamba"],
  "Áncash": ["Huaraz", "Aija", "Antonio Raymondi", "Asunción", "Bolognesi", "Carhuaz", "Casma", "Chimbote", "Huari", "Huarmey"],
  "Apurímac": ["Abancay", "Andahuaylas", "Antabamba", "Aymaraes", "Cotabambas", "Chincheros", "Grau"],
  "Arequipa": ["Arequipa", "Camaná", "Caravelí", "Castilla", "Caylloma", "Condesuyos", "Islay", "La Unión"],
  "Ayacucho": ["Huamanga", "Cangallo", "Huanca Sancos", "Huanta", "La Mar", "Lucanas", "Parinacochas", "Paucar del Sara Sara", "Sucre", "Víctor Fajardo", "Vilcas Huamán"],
  "Cajamarca": ["Cajamarca", "Cajabamba", "Celendín", "Chota", "Contumazá", "Cutervo", "Hualgayoc", "Jaén", "San Ignacio", "San Marcos", "San Miguel", "San Pablo", "Santa Cruz"],
  "Callao": ["Callao", "Bellavista", "Carmen de la Legua", "La Perla", "La Punta", "Ventanilla", "Mi Perú"],
  "Cusco": ["Cusco", "Acomayo", "Anta", "Calca", "Canas", "Canchis", "Chumbivilcas", "Espinar", "La Convención", "Paruro", "Paucartambo", "Quispicanchi", "Urubamba"],
  "Huancavelica": ["Huancavelica", "Acobamba", "Angaraes", "Castrovirreyna", "Churcampa", "Huaytará", "Tayacaja"],
  "Huánuco": ["Huánuco", "Ambo", "Dos de Mayo", "Huacaybamba", "Huamalíes", "Leoncio Prado", "Marañón", "Pachitea", "Puerto Inca", "Lauricocha", "Yarowilca"],
  "Ica": ["Ica", "Chincha", "Nasca", "Palpa", "Pisco"],
  "Junín": ["Huancayo", "Concepción", "Chanchamayo", "Jauja", "Junín", "Satipo", "Tarma", "Yauli", "Chupaca"],
  "La Libertad": ["Trujillo", "Ascope", "Bolívar", "Chepén", "Julcán", "Otuzco", "Pacasmayo", "Pataz", "Sánchez Carrión", "Santiago de Chuco", "Gran Chimú", "Virú"],
  "Lambayeque": ["Chiclayo", "Ferreñafe", "Lambayeque"],
  "Lima": ["Lima", "Barranca", "Cajatambo", "Canta", "Cañete", "Huaral", "Huarochirí", "Huaura", "Oyón", "Yauyos"],
  "Loreto": ["Iquitos", "Alto Amazonas", "Loreto", "Mariscal Ramón Castilla", "Requena", "Ucayali", "Datem del Marañón", "Putumayo"],
  "Madre de Dios": ["Tambopata", "Manu", "Tahuamanu"],
  "Moquegua": ["Mariscal Nieto", "General Sánchez Cerro", "Ilo"],
  "Pasco": ["Pasco", "Daniel Alcides Carrión", "Oxapampa"],
  "Piura": ["Piura", "Ayabaca", "Huancabamba", "Morropón", "Paita", "Sullana", "Talara", "Sechura"],
  "Puno": ["Puno", "Azángaro", "Carabaya", "Chucuito", "El Collao", "Huancané", "Lampa", "Melgar", "Moho", "San Antonio de Putina", "San Román", "Sandia", "Yunguyo"],
  "San Martín": ["Moyobamba", "Bellavista", "El Dorado", "Huallaga", "Lamas", "Mariscal Cáceres", "Picota", "Rioja", "San Martín", "Tocache"],
  "Tacna": ["Tacna", "Candarave", "Jorge Basadre", "Tarata"],
  "Tumbes": ["Tumbes", "Contralmirante Villar", "Zarumilla"],
  "Ucayali": ["Pucallpa", "Atalaya", "Padre Abad", "Purús"]
};

export default function PerfilPage() {
  const [loading, setLoading] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const [notificacion, setNotificacion] = useState<{ msj: string, tipo: 'success' | 'error' | null }>({ msj: '', tipo: null })

  const [perfil, setPerfil] = useState({
    nombres: '',
    apellidos: '',
    departamento: '',
    distrito: '',
    precio_kwh: 0.6904,
    cargo_fijo: 3.46,
    mantenimiento: 1.34,
    alumbrado_ultimo_recibo: 12.75,
    kwh_ultimo_recibo: 164,
    otros_aportes: 4.71
  })

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function cargarPerfil() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')
      const { data } = await supabase.from('perfiles').select('*').eq('id', user.id).single()
      if (data) setPerfil(prev => ({ ...prev, ...data }))
      setLoading(false)
    }
    cargarPerfil()
  }, [])

  const mostrarBanner = (mensaje: string, tipo: 'success' | 'error') => {
    setNotificacion({ msj: mensaje, tipo })
    setTimeout(() => setNotificacion({ msj: '', tipo: null }), 4000)
  }

  const guardarCambios = async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('perfiles').upsert({
      id: user?.id,
      ...perfil
    })

    if (error) {
      // Mantenemos el banner solo para errores, ya que es importante saber si falló
      mostrarBanner("Error: " + error.message, 'error')
      setLoading(false)
    } else {
      // ELIMINADO: mostrarBanner de éxito
      // Redirección inmediata al Dashboard
      router.push('/dashboard')
    }
  }

  const handleRegionChange = (region: string) => {
    setPerfil({ ...perfil, departamento: region, distrito: '' });
  }

  if (loading && !notificacion.tipo) return <div className="text-center py-20 font-black text-slate-400 uppercase text-xs tracking-widest leading-loose">Sincronizando con el servidor...</div>

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4 font-sans text-slate-900 relative overflow-hidden">

      {/* BANNER DE NOTIFICACIÓN TIPO TOAST */}
      {notificacion.tipo && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border animate-in fade-in zoom-in slide-in-from-top-4 duration-300 ${notificacion.tipo === 'success' ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-red-600 border-red-500 text-white'
          }`}>
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">
            {notificacion.tipo === 'success' ? '✓' : '!'}
          </div>
          <p className="font-black uppercase text-[10px] tracking-widest">{notificacion.msj}</p>
        </div>
      )}

      {/* MODAL DE AYUDA VISUAL */}
      {showHelp && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] max-w-5xl w-full max-h-[95vh] overflow-y-auto p-8 md:p-12 shadow-2xl relative border border-slate-100 text-xs">
            <button onClick={() => setShowHelp(false)} className="absolute top-8 right-8 text-slate-300 hover:text-red-500 font-black text-xs transition-colors">CERRAR X</button>
            <h2 className="text-2xl font-black mb-4 flex items-center gap-3 text-slate-800">
              <span className="bg-blue-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">?</span>
              Guía de Calibración Visual
            </h2>
            <p className="text-xs text-slate-500 mb-8 font-bold uppercase tracking-widest">Ubica los números en tu recibo y pásalos a los casilleros correspondientes:</p>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              <div className="lg:col-span-3 space-y-4">
                <div className="bg-slate-100 rounded-[2rem] p-4 border-2 border-dashed border-slate-200 relative overflow-hidden group">
                  <img src="/imagenRecibo.png" alt="Guía" className="w-full h-auto rounded-xl shadow-sm" />
                  <div className="mt-4 text-center">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">Referencia: Recibo Enosa / Paita (ST2)</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 flex flex-col h-full space-y-4 text-[9px]">
                <div className="space-y-3 flex-grow">
                  {[
                    { n: "1", t: "Precio kWh", d: "Dato 'Ene.Activa' S/ por kWh" },
                    { n: "2", t: "Cargo Fijo", d: "Monto base mensual" },
                    { n: "3", t: "Mant. / Rep.", d: "Costo de medidor y red" },
                    { n: "4", t: "Alumbrado", d: "Monto de Alumbrado Público" },
                    { n: "5", t: "Consumo kWh", d: "Diferencia de Lecturas (kWh)" },
                    { n: "6", t: "Otros Aportes", d: "Aporte Ley 28749 + FOSE" }
                  ].map((item) => (
                    <div key={item.n} className="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <span className="bg-blue-600 text-white min-w-[28px] h-7 rounded-lg flex items-center justify-center font-black">{item.n}</span>
                      <div>
                        <p className="font-black text-slate-800 uppercase leading-none mb-1">{item.t}</p>
                        <p className="text-slate-400 font-medium leading-tight">{item.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 text-center min-h-[150px] flex flex-col items-center justify-center">
                  <span className="bg-slate-200 text-slate-500 px-3 py-1 rounded-full text-[8px] font-black uppercase mb-3 inline-block tracking-widest">Anuncio 1</span>
                  <p className="text-[10px] text-slate-300 font-bold uppercase italic leading-relaxed text-center">Espacio AdSense Modal</p>
                </div>
                <button onClick={() => setShowHelp(false)} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase shadow-xl">ENTENDIDO</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DISEÑO PRINCIPAL DEL PERFIL */}
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-[3rem] p-10 border border-slate-100">
        <div className="flex justify-between items-start mb-10">
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <span className="w-2.5 h-10 bg-blue-600 rounded-full inline-block"></span>
            Calibración por Región
          </h1>
          <button onClick={() => setShowHelp(true)} className="bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-lg animate-pulse">
            ¿DÓNDE ESTÁN LOS DATOS?
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6 text-xs">
            <div className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-widest border-b pb-2">Tu Identidad y Ubicación</h3>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nombres"
                  value={perfil.nombres || ''}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold outline-none focus:border-blue-500"
                  onChange={(e) => setPerfil({ ...perfil, nombres: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  value={perfil.apellidos || ''}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold outline-none focus:border-blue-500"
                  onChange={(e) => setPerfil({ ...perfil, apellidos: e.target.value })}
                />
              </div>

              <select
                value={perfil.departamento || ''}
                className="w-full p-4 bg-slate-50 border-2 border-slate-50 rounded-2xl font-bold outline-none focus:border-blue-500 appearance-none cursor-pointer"
                onChange={(e) => handleRegionChange(e.target.value)}
              >
                <option value="">Selecciona Departamento</option>
                {Object.keys(REGIONES_DATA).sort().map(reg => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
              </select>

              <select
                disabled={!perfil.departamento}
                value={perfil.distrito || ''}
                className={`w-full p-4 border-2 rounded-2xl font-bold outline-none transition-all appearance-none cursor-pointer ${perfil.departamento ? 'bg-slate-50 border-slate-50 focus:border-blue-500' : 'bg-slate-200 border-slate-200 opacity-50 cursor-not-allowed'}`}
                onChange={(e) => setPerfil({ ...perfil, distrito: e.target.value })}
              >
                <option value="">Selecciona Provincia/Distrito</option>
                {perfil.departamento && REGIONES_DATA[perfil.departamento].sort().map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>

            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 text-center min-h-[250px] flex flex-col items-center justify-center">
              <span className="bg-slate-200 text-slate-500 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.3em] mb-4">Publicidad</span>
              <div className="opacity-30 text-center">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-relaxed">
                  Banner AdSense Página<br />(Bloque adaptable)
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-blue-50/30 p-8 rounded-[2.5rem] border border-blue-50 relative overflow-hidden text-[9px]">
            <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest border-b border-blue-100 pb-2">Datos de tu Recibo</h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="col-span-2 relative">
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-black z-10 shadow-lg">1</span>
                <label className="font-bold text-blue-600 uppercase ml-1 block mb-1">Precio kWh (S/)</label>
                <input type="number" step="0.0001" value={perfil.precio_kwh || ''} className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl font-black text-blue-700 outline-none" onChange={(e) => setPerfil({ ...perfil, precio_kwh: Number(e.target.value) })} />
              </div>
              <div className="relative">
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-black z-10 shadow-lg">2</span>
                <label className="font-bold text-blue-600 uppercase ml-1 block mb-1">Cargo Fijo</label>
                <input type="number" step="0.01" value={perfil.cargo_fijo || ''} className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl font-black text-blue-700 outline-none" onChange={(e) => setPerfil({ ...perfil, cargo_fijo: Number(e.target.value) })} />
              </div>
              <div className="relative">
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-black z-10 shadow-lg">3</span>
                <label className="font-bold text-blue-600 uppercase ml-1 block mb-1">Mant. / Rep.</label>
                <input type="number" step="0.01" value={perfil.mantenimiento || ''} className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl font-black text-blue-700 outline-none" onChange={(e) => setPerfil({ ...perfil, mantenimiento: Number(e.target.value) })} />
              </div>
              <div className="relative">
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-black z-10 shadow-lg">4</span>
                <label className="font-bold text-blue-600 uppercase ml-1 block mb-1">Alumbrado</label>
                <input type="number" step="0.01" value={perfil.alumbrado_ultimo_recibo || ''} className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl font-black text-blue-700 outline-none" onChange={(e) => setPerfil({ ...perfil, alumbrado_ultimo_recibo: Number(e.target.value) })} />
              </div>
              <div className="relative">
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-black z-10 shadow-lg">5</span>
                <label className="font-bold text-blue-600 uppercase ml-1 block mb-1">Consumo kWh</label>
                <input type="number" value={perfil.kwh_ultimo_recibo || ''} className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl font-black text-blue-700 outline-none" onChange={(e) => setPerfil({ ...perfil, kwh_ultimo_recibo: Number(e.target.value) })} />
              </div>
              <div className="col-span-2 relative mt-2">
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-blue-600 text-white rounded-md flex items-center justify-center font-black z-10 shadow-lg">6</span>
                <label className="font-bold text-blue-600 uppercase ml-1 block mb-1">Otros Aportes (S/)</label>
                <input type="number" step="0.01" value={perfil.otros_aportes || ''} className="w-full p-3 bg-white border-2 border-blue-100 rounded-xl font-black text-blue-700 outline-none" onChange={(e) => setPerfil({ ...perfil, otros_aportes: Number(e.target.value) })} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <button onClick={() => router.push('/dashboard')} className="flex-1 py-5 font-black text-slate-400 uppercase text-[10px] tracking-widest hover:bg-slate-50 rounded-2xl transition-all">Cancelar</button>
          <button
            disabled={loading}
            onClick={guardarCambios}
            className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar Calibración'}
          </button>
        </div>
      </div>
    </main>
  )
}
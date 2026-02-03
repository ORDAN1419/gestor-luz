"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Moon, Sun, Megaphone, AlertTriangle, Zap, ArrowRight, BookOpen, Scale, Shield, AlertCircle, Check } from 'lucide-react'

// --- SUBCOMPONENTE: MODAL DE CONFIRMACIÓN PERSONALIZADO ---
function ModalConfirmacion({ isOpen, onClose, onConfirm, dark }: { isOpen: boolean, onClose: () => void, onConfirm: () => void, dark: boolean }) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <div className={`w-full max-w-sm p-8 rounded-[3rem] shadow-2xl border animate-in fade-in zoom-in duration-200 ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                <div className="flex flex-col items-center text-center">
                    <div className="bg-red-500/10 p-5 rounded-3xl text-red-500 mb-6">
                        <AlertCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">¿Eliminar registro?</h3>
                    <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
                        Esta acción no se puede deshacer. El historial de consumo se actualizará permanentemente.
                    </p>
                    <div className="flex gap-3 w-full">
                        <button
                            onClick={onClose}
                            className={`flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all ${dark ? 'border-slate-700 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-50 text-slate-500'}`}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest bg-red-500 text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/30"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CalculadoraLuz({ session }: { session: any }) {
    const [dark, setDark] = useState(false)
    const [anterior, setAnterior] = useState<number>(0)
    const [actual, setActual] = useState<number>(0)
    const [cargando, setCargando] = useState(true)
    const [mensajePerfil, setMensajePerfil] = useState(false)
    const [guardando, setGuardando] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [perfil, setPerfil] = useState<any>(null)
    const [historial, setHistorial] = useState<any[]>([])
    const [cargaExitosa, setCargaExitosa] = useState(false)
    const validacionEjecutada = useRef(false);

    const [config, setConfig] = useState({
        precio_kwh: 0.6904,
        cargo_fijo: 3.46,
        mantenimiento: 1.34,
        alumbrado_ultimo_recibo: 12.75,
        kwh_ultimo_recibo: 164,
        others_aportes: 4.71
    })

    const [editandoId, setEditandoId] = useState<string | null>(null)
    const [nuevaLecturaAnterior, setNuevaLecturaAnterior] = useState(0)
    const [nuevaLecturaActual, setNuevaLecturaActual] = useState(0)
    const [borrandoId, setBorrandoId] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    const lecturaInvalida = actual > 0 && actual < anterior;
    const consumo = actual - anterior > 0 ? actual - anterior : 0;
    const factorAlumbrado = config.alumbrado_ultimo_recibo / (config.kwh_ultimo_recibo || 1);
    const alumbradoDinamico = consumo * factorAlumbrado;
    const baseImponible = (consumo * config.precio_kwh) + config.cargo_fijo + config.mantenimiento + alumbradoDinamico;
    const igv = baseImponible * 0.18;
    const totalEstimado = baseImponible + igv + config.others_aportes;

    const promedioConsumo = historial.length > 0
        ? (historial.reduce((acc, item) => acc + item.kwh_consumidos, 0) / historial.length).toFixed(0)
        : "0";

    const tendencia = historial.length >= 2
        ? (((historial[0].kwh_consumidos - historial[1].kwh_consumidos) / historial[1].kwh_consumidos) * 100).toFixed(1)
        : null;

    const dataGrafico = [...historial].reverse().map(item => ({
        fecha: new Date(item.created_at).toLocaleDateString('es-PE', { month: 'short', day: 'numeric' }),
        consumo: item.kwh_consumidos
    }));

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                router.replace('/login')
                return
            }

            setUser(user)

            const { data: p } = await supabase
                .from('perfiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (!p || !p.nombres || !p.departamento || !p.distrito) {
                setMensajePerfil(true)
                setTimeout(() => {
                    router.replace('/perfil')
                }, 6000)
                return
            }

            setPerfil(p);
            setMensajePerfil(false);
            setCargaExitosa(true);

            setTimeout(() => {
                setCargando(false);
            }, 6000);

            setPerfil(p)
            setConfig({
                precio_kwh: p.precio_kwh || 0.6904,
                cargo_fijo: p.cargo_fijo || 3.46,
                mantenimiento: p.mantenimiento || 1.34,
                alumbrado_ultimo_recibo: p.alumbrado_ultimo_recibo || 12.75,
                kwh_ultimo_recibo: p.kwh_ultimo_recibo || 164,
                others_aportes: p.others_aportes || 4.71
            })

            await cargarHistorial()
            setCargando(false)
        }
        init()
    }, [supabase, router])

    const cargarHistorial = async () => {
        const { data } = await supabase.from('consumos').select('*').order('created_at', { ascending: false }).limit(6)
        if (data) {
            setHistorial(data)
            if (data.length > 0) setAnterior(data[0].lectura_actual)
        }
    }

    const guardarEnHistorial = async () => {
        if (!user) return router.push('/login')
        setGuardando(true)
        const { error } = await supabase.from('consumos').insert([{
            user_id: user.id, lectura_anterior: anterior, lectura_actual: actual,
            kwh_consumidos: consumo, costo_total: totalEstimado
        }])
        if (!error) {
            setAnterior(actual); setActual(0);
            await cargarHistorial();
        }
        setGuardando(false)
    }

    const borrarRegistro = async (id: string) => {
        setGuardando(true)
        const { error } = await supabase.from('consumos').delete().eq('id', id)
        if (!error) {
            setHistorial(prev => prev.filter(item => item.id !== id));
            setBorrandoId(null);
            await cargarHistorial();
        }
        setGuardando(false)
    }

    const actualizarRegistro = async (id: string) => {
        const nConsumo = nuevaLecturaActual - nuevaLecturaAnterior;
        const nAlumbrado = (nConsumo > 0 ? nConsumo : 0) * factorAlumbrado;
        const nBase = ((nConsumo > 0 ? nConsumo : 0) * config.precio_kwh) + config.cargo_fijo + config.mantenimiento + nAlumbrado;
        const nTotal = (nBase * 1.18) + config.others_aportes;
        const { error } = await supabase.from('consumos').update({
            lectura_anterior: nuevaLecturaAnterior, lectura_actual: nuevaLecturaActual,
            kwh_consumidos: nConsumo > 0 ? nConsumo : 0, costo_total: nTotal
        }).eq('id', id)
        if (!error) {
            setHistorial(prev => prev.map(item => item.id === id ? { ...item, lectura_anterior: nuevaLecturaAnterior, lectura_actual: nuevaLecturaActual, kwh_consumidos: nConsumo, costo_total: nTotal } : item));
            setEditandoId(null); cargarHistorial();
        }
    }

    if (cargando) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-6 ${dark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
                {mensajePerfil && (
                    <div className="max-w-xs text-center space-y-6 animate-in fade-in zoom-in duration-500">
                        <div className="bg-orange-500/10 p-6 rounded-[2.5rem] w-fit mx-auto border border-orange-500/20">
                            <AlertTriangle size={40} className="text-orange-500 animate-bounce" />
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter">Perfil Incompleto</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-4">Necesitas completar tus datos para continuar.</p>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ animation: 'progress-slow 6s linear forwards' }} />
                        </div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Preparando ajustes...</p>
                    </div>
                )}

                {cargaExitosa && (
                    <div className="max-w-xs text-center space-y-6 animate-in fade-in zoom-in duration-500">
                        <div className="bg-emerald-500/10 p-6 rounded-[2.5rem] w-fit mx-auto border border-emerald-500/20">
                            <Check size={40} className="text-emerald-500 animate-[bounce_6s_infinite]" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">Acceso Autorizado</h2>
                            <p className="text-[10px] text-emerald-600/70 font-black uppercase tracking-[0.2em]">Sincronización exitosa con la red</p>
                        </div>
                        <div className="h-1.5 w-64 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-emerald-500" style={{ animation: 'progress-slow 6s linear forwards' }} />
                        </div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest animate-pulse">Preparando Dashboard...</p>
                    </div>
                )}

                {!mensajePerfil && !cargaExitosa && (
                    <div className="text-center py-20 font-black text-slate-400 uppercase text-[10px] tracking-[0.3em] animate-pulse">
                        Estableciendo conexión segura...
                    </div>
                )}

                <style jsx>{`
          @keyframes progress-slow {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>
            </div>
        )
    }

    // AQUÍ COMIENZA EL RETURN DEL DASHBOARD (lo copiaste de tu código original)
    return (
        <main className={`min-h-screen transition-colors duration-500 flex flex-col items-center py-6 px-4 font-sans ${dark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
            <div className="w-full max-w-5xl">
                {user && (
                    <div className={`w-full flex justify-between items-center mb-6 p-4 rounded-2xl shadow-sm border transition-colors ${dark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100'}`}>
                        <div className="flex flex-col">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Panel</span>
                            <h2 className="text-sm font-bold">Hola, <span className="text-blue-500">{perfil?.nombres || user.email.split('@')[0]}</span></h2>
                        </div>
                        <div className="flex gap-4 items-center">
                            <button onClick={() => setDark(!dark)} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-slate-500" />}
                            </button>
                            <button onClick={() => router.push('/perfil')} className="text-[9px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Ajustes</button>
                            <button onClick={handleSignOut} className="text-[9px] font-black text-red-400 uppercase tracking-widest transition-colors">Salir</button>
                        </div>
                    </div>
                )}

                <section className={`mb-6 p-6 rounded-[2.5rem] border shadow-sm transition-colors ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50'}`}>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Tendencia de Consumo</h3>
                    <div className="h-32 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dataGrafico}>
                                <defs>
                                    <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={dark ? '#1e293b' : '#f1f5f9'} />
                                <XAxis dataKey="fecha" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#94a3b8' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: dark ? '#1e293b' : '#ffffff', color: dark ? '#ffffff' : '#000000', fontSize: '10px' }}
                                />
                                <Area type="monotone" dataKey="consumo" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorConsumo)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <div className={`w-full mb-6 p-3 border-2 border-dashed rounded-3xl text-center transition-all ${dark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white/40'}`}>
                    <span className="bg-slate-500/10 px-2 py-0.5 rounded-full text-[7px] font-black text-slate-400 uppercase tracking-[0.2em]">Publicidad Premium</span>
                </div>

                <div className="w-full grid grid-cols-3 gap-3 mb-6">
                    <div className={`p-4 rounded-2xl shadow-sm border transition-colors ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50'}`}>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">Promedio</p>
                        <p className="text-xl font-black">{promedioConsumo} <span className="text-[10px] text-slate-400 font-bold uppercase">kWh</span></p>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm border transition-all duration-500 ${!tendencia ? (dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50') : Number(tendencia) <= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mb-1">Tendencia</p>
                        <p className={`text-xl font-black flex items-center gap-1 ${!tendencia ? (dark ? 'text-white' : 'text-slate-800') : Number(tendencia) <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {tendencia ? (Number(tendencia) <= 0 ? '▼' : '▲') : ''} {tendencia ? `${Math.abs(Number(tendencia))}%` : '--'}
                        </p>
                    </div>
                    <div className="bg-blue-600 p-4 rounded-2xl shadow-sm border border-blue-700">
                        <p className="text-[8px] font-black text-blue-200 uppercase tracking-tighter mb-1">Tarifa Actual</p>
                        <p className="text-xl font-black text-white">S/ {config.precio_kwh.toFixed(2)}</p>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                    <div className="space-y-6">
                        <section className={`shadow-xl rounded-[2.5rem] p-8 border relative overflow-hidden transition-colors ${dark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                            <h1 className="text-xl font-black mb-6 flex items-center gap-2">
                                <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>
                                Nueva Lectura
                            </h1>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative flex items-center">
                                        <input type="number" value={anterior || ''} className={`p-4 pr-12 border-2 rounded-xl outline-none font-bold w-full text-md transition-all ${dark ? 'bg-slate-800 border-slate-700 focus:border-blue-500' : 'bg-slate-50 border-slate-50 focus:border-blue-500'}`} onChange={(e) => setAnterior(Number(e.target.value))} placeholder="Anterior" />
                                        <span className="absolute right-4 text-[9px] font-black text-slate-400 uppercase pointer-events-none">kWh</span>
                                    </div>
                                    <div className="relative flex items-center">
                                        <input type="number" value={actual || ''} placeholder="Actual" className={`p-4 pr-12 border-2 rounded-xl outline-none font-bold w-full text-md transition-all ${lecturaInvalida ? 'border-red-300 focus:border-red-500' : dark ? 'bg-slate-800 border-slate-700 focus:border-blue-500' : 'bg-slate-50 border-slate-50 focus:border-blue-500'}`} onChange={(e) => setActual(Number(e.target.value))} />
                                        <span className={`absolute right-4 text-[9px] font-black uppercase pointer-events-none ${lecturaInvalida ? 'text-red-300' : 'text-slate-400'}`}>kWh</span>
                                    </div>
                                </div>
                                <div className={`rounded-3xl p-8 text-white shadow-lg text-center transition-all duration-500 ${lecturaInvalida ? 'bg-red-500' : 'bg-blue-600'}`}>
                                    <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest mb-1">{lecturaInvalida ? 'Error en Lectura' : 'Total Proyectado'}</p>
                                    <span className="text-5xl font-black tabular-nums tracking-tighter">S/ {totalEstimado.toFixed(2)}</span>
                                </div>
                                <button onClick={guardarEnHistorial} disabled={guardando || lecturaInvalida || actual === 0} className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md transition-all active:scale-95 ${(guardando || lecturaInvalida || actual === 0) ? (dark ? 'bg-slate-800 text-slate-500' : 'bg-slate-200 text-slate-400') + ' cursor-not-allowed' : 'bg-[#00FF87] hover:bg-[#00E076] text-slate-900 shadow-[#00FF87]/20'}`}>
                                    {guardando ? 'Guardando...' : 'Registrar Lectura'}
                                </button>
                            </div>
                        </section>

                        <div className={`p-8 border-2 border-dashed rounded-[2.5rem] text-center flex flex-col items-center justify-center min-h-[180px] transition-all hover:scale-[1.01] ${dark ? 'border-slate-800 bg-slate-900/40' : 'border-slate-200 bg-white/40'}`}>
                            <div className="mb-3 p-3 bg-blue-500/10 rounded-full">
                                <Megaphone size={20} className="text-blue-500" />
                            </div>
                            <span className="bg-slate-500/10 px-3 py-1 rounded-full text-[7px] font-black text-slate-400 uppercase tracking-widest mb-2">Sugerido para ti</span>
                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest max-w-[150px]">Espacio para anuncio vertical o cuadrado</p>
                        </div>
                    </div>

                    <section className={`backdrop-blur-md shadow-lg rounded-[2.5rem] p-8 border transition-colors ${dark ? 'bg-slate-900/60 border-slate-800' : 'bg-white/60 border-white'}`}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Historial de Consumo</h2>
                            <span className="bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-full text-[8px] font-bold">{historial.length} REGISTROS</span>
                        </div>

                        <div className="space-y-3">
                            {historial.map((item, index) => (
                                <div key={item.id}>
                                    {index === 2 && (
                                        <div className={`mb-3 p-4 border border-dashed rounded-2xl text-center transition-all ${dark ? 'border-slate-700 bg-slate-800/30' : 'border-slate-200 bg-slate-50/50'}`}>
                                            <span className="text-[6px] font-black text-slate-400 uppercase tracking-widest">Publicidad de Historial</span>
                                        </div>
                                    )}

                                    <div className={`p-4 rounded-2xl border shadow-sm transition-all hover:translate-x-1 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-50'}`}>
                                        {borrandoId === item.id ? (
                                            <div className="py-2 text-center space-y-3 animate-in fade-in zoom-in duration-300">
                                                <div className="flex justify-center text-red-500 mb-1">
                                                    <AlertTriangle size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter">¿Estás completamente seguro?</p>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase">Se borrará para siempre</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => borrarRegistro(item.id)} disabled={guardando} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-[9px] font-black uppercase transition-all active:scale-95">
                                                        {guardando ? 'Borrando...' : 'SÍ, BORRAR'}
                                                    </button>
                                                    <button onClick={() => setBorrandoId(null)} className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase transition-all active:scale-95 ${dark ? 'bg-slate-700 text-white hover:bg-slate-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                                                        NO, CANCELAR
                                                    </button>
                                                </div>
                                            </div>
                                        ) : editandoId === item.id ? (
                                            <div className="space-y-3 text-center">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input type="number" className={`w-full p-2 border rounded-lg font-bold text-xs ${dark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50'}`} defaultValue={item.lectura_anterior} onChange={(e) => setNuevaLecturaAnterior(Number(e.target.value))} />
                                                    <input type="number" className={`w-full p-2 border rounded-lg font-bold text-xs ${dark ? 'bg-slate-900 border-slate-700' : 'bg-slate-50'}`} defaultValue={item.lectura_actual} onChange={(e) => setNuevaLecturaActual(Number(e.target.value))} />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => actualizarRegistro(item.id)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-[9px] font-bold uppercase">Actualizar</button>
                                                    <button onClick={() => setEditandoId(null)} className="flex-1 bg-slate-500 py-2 rounded-lg text-[9px] font-bold text-white uppercase">X</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">{new Date(item.created_at).toLocaleDateString()}</p>
                                                    <p className="text-md font-black">{item.kwh_consumidos} <span className="text-[10px] text-slate-400 font-bold">kWh</span></p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-black text-blue-500 tabular-nums">S/ {item.costo_total.toFixed(2)}</p>
                                                    <div className="flex gap-3 mt-1 justify-end">
                                                        <button onClick={() => setBorrandoId(item.id)} className="text-[8px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-tighter transition-colors">Borrar</button>
                                                        <button onClick={() => { setEditandoId(item.id); setNuevaLecturaAnterior(item.lectura_anterior); setNuevaLecturaActual(item.lectura_actual); }} className="text-[8px] font-bold text-slate-400 hover:text-blue-500 uppercase tracking-tighter transition-colors">Editar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
    // AQUÍ TERMINA EL RETURN
}
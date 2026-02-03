"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CalculatorForm() {
  const router = useRouter()
  const [consumoInput, setConsumoInput] = useState<number>(100)

  const datosDefault = {
    precio_kwh: 0.6904,
    cargo_fijo: 3.46,
    mantenimiento: 1.34,
    alumbrado: 12.75,
    otros: 4.71
  }

  const subtotal = (consumoInput * datosDefault.precio_kwh) + datosDefault.cargo_fijo + datosDefault.mantenimiento + datosDefault.alumbrado + datosDefault.otros
  const totalEstimado = subtotal * 1.18

  return (
    <div className="space-y-8">
      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
        <label className="block text-[10px] font-black text-blue-600 uppercase mb-4 ml-2">¿Cuántos kWh consumiste?</label>
        <div className="relative flex items-center">
          <input
            type="number"
            value={consumoInput || ''}
            onChange={(e) => setConsumoInput(Number(e.target.value))}
            className="w-full bg-white p-6 rounded-2xl text-4xl font-black text-slate-800 outline-none border-2 border-transparent focus:border-blue-500 transition-all"
            placeholder="Ej: 150"
          />
          <span className="absolute right-6 font-black text-slate-300 text-xl">kWh</span>
        </div>
      </div>
      <div className="text-center py-6">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Total Estimado a pagar</p>
        <h2 className="text-7xl font-black text-slate-900 tracking-tighter">S/ {totalEstimado.toFixed(2)}</h2>
      </div>
    </div>
  )
}
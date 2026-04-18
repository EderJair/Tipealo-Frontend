const fiados = [
  { name: 'Rosa Mamani',   initials: 'RM', amount: 145.50, items: 'Arroz, Aceite x2',    date: '17 abr',  vence: 'hoy',     urgente: true  },
  { name: 'Juan Quispe',   initials: 'JQ', amount: 78.00,  items: 'Azúcar, Fideos',      date: '15 abr',  vence: 'pasado',  urgente: true  },
  { name: 'Carmen López',  initials: 'CL', amount: 220.00, items: 'Arroz 50kg x2',       date: '14 abr',  vence: 'mañana',  urgente: false },
  { name: 'Pedro Flores',  initials: 'PF', amount: 55.00,  items: 'Sal, Harina, Avena',  date: '18 abr',  vence: '25 abr',  urgente: false },
  { name: 'Luisa Vargas',  initials: 'LV', amount: 310.00, items: 'Aceite x6, Manteca',  date: '12 abr',  vence: 'pasado',  urgente: true  },
  { name: 'Marco Ríos',    initials: 'MR', amount: 42.50,  items: 'Leche x4, Atún x5',  date: '18 abr',  vence: '20 abr',  urgente: false },
]

const notas = [
  { text: 'Llega mercadería de granos el martes 22', hora: '08:15', tag: 'proveedor' },
  { text: 'Subida de precio Aceite Primor — revisar con distribuidor', hora: '09:30', tag: 'precio' },
  { text: 'Bolsas extra para el fin de semana', hora: '11:00', tag: 'compra' },
]

const tagColors: Record<string, string> = {
  proveedor: '#0c61f3',
  precio: '#d97706',
  compra: '#059669',
}

export default function NotasView() {
  const totalFiado = fiados.reduce((a, f) => a + f.amount, 0)
  const urgentes = fiados.filter(f => f.urgente).length
  const pagado = 380.00

  return (
    <div className="p-6 space-y-4" style={{ fontFamily: 'Lora, serif' }}>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Total fiado</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">
            S/ {totalFiado.toFixed(0)}
          </p>
          <p className="mt-2 text-[1rem] text-white/60">{fiados.length} personas deben</p>
          <div className="mt-3 flex items-center gap-1 text-[13px] font-semibold text-amber-400">
            cobrar esta semana
          </div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Urgentes</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">{urgentes}</p>
          <p className="mt-2 text-[1rem] text-white/60">vencidos o vence hoy</p>
          <div className="mt-3 flex items-center gap-1 text-[13px] font-semibold text-red-400">cobrar hoy</div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Cobrado este mes</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">S/ {pagado.toFixed(0)}</p>
          <p className="mt-2 text-[1rem] text-white/60">fiados saldados</p>
          <div className="mt-3 flex items-center gap-1 text-[13px] font-semibold text-emerald-400">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
            buen ritmo de cobro
          </div>
        </div>

        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Por cobrar hoy</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">
            S/ {fiados.filter(f => f.urgente).reduce((a, f) => a + f.amount, 0).toFixed(0)}
          </p>
          <p className="mt-2 text-[1rem] text-white/60">Rosa, Juan y Luisa</p>
          <div className="mt-3 flex items-center gap-1 text-[13px] font-semibold text-red-400">cobrar hoy</div>
        </div>
      </div>

      {/* Fiados list + Notas */}
      <div className="grid grid-cols-3 gap-4">

        {/* Fiados */}
        <div className="col-span-2 bg-white">
          <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">Cuaderno de fiados</h2>
            <button className="text-[11px] font-semibold bg-black text-white px-4 py-2 hover:bg-black/80 transition-colors">
              + Agregar fiado
            </button>
          </div>
          <div className="divide-y divide-black/4">
            {fiados.map(f => (
              <div key={f.name} className="px-5 py-3.5 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="w-9 h-9 bg-black flex items-center justify-center shrink-0">
                  <span className="text-white text-[11px] font-bold">{f.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[12px] font-semibold text-black">{f.name}</p>
                    {f.urgente && (
                      <span className="text-[9px] font-bold bg-red-50 text-red-600 px-1.5 py-0.5 tracking-wide">
                        URGENTE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-0.5">{f.items}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[1.1rem] font-bold text-black">S/ {f.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-gray-400">
                    {f.date} · vence <span className={f.urgente ? 'text-red-500 font-semibold' : ''}>{f.vence}</span>
                  </p>
                </div>
                <button className="shrink-0 text-[11px] font-semibold text-[#0c61f3] hover:text-black transition-colors ml-2">
                  Cobrar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notas rápidas */}
        <div className="bg-white flex flex-col">
          <div className="px-5 py-4 border-b border-black/5 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-black">Notas del día</h2>
            <button className="text-[11px] font-semibold text-[#0c61f3] hover:text-black transition-colors">
              + Nota
            </button>
          </div>
          <div className="flex-1 p-4 space-y-3">
            {notas.map((n, i) => (
              <div key={i} className="p-3 bg-gray-50 border-l-2" style={{ borderColor: tagColors[n.tag] }}>
                <p className="text-[12px] font-medium text-black leading-snug">{n.text}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5"
                    style={{ background: tagColors[n.tag] + '14', color: tagColors[n.tag] }}>
                    {n.tag}
                  </span>
                  <span className="text-[10px] text-gray-400">{n.hora}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-4 mb-4 bg-black/90 px-4 py-3">
            <p className="text-[13px] font-semibold text-white leading-snug">
              Tus fiados,<br />bajo control.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const fiados = [
  { name: 'Rosa Mamani',   initials: 'RM', amount: 145.50, items: 'Arroz, Aceite x2',    date: '17 abr', vence: 'hoy',    urgente: true  },
  { name: 'Juan Quispe',   initials: 'JQ', amount: 78.00,  items: 'Azúcar, Fideos',      date: '15 abr', vence: 'pasado', urgente: true  },
  { name: 'Carmen López',  initials: 'CL', amount: 220.00, items: 'Arroz 50kg x2',       date: '14 abr', vence: 'mañana', urgente: false },
  { name: 'Pedro Flores',  initials: 'PF', amount: 55.00,  items: 'Sal, Harina, Avena',  date: '18 abr', vence: '25 abr', urgente: false },
  { name: 'Luisa Vargas',  initials: 'LV', amount: 310.00, items: 'Aceite x6, Manteca',  date: '12 abr', vence: 'pasado', urgente: true  },
  { name: 'Marco Ríos',    initials: 'MR', amount: 42.50,  items: 'Leche x4, Atún x5',  date: '18 abr', vence: '20 abr', urgente: false },
]

const notas = [
  { text: 'Llega mercadería de granos el martes 22', hora: '08:15', tag: 'proveedor' },
  { text: 'Subida de precio Aceite Primor — revisar con distribuidor', hora: '09:30', tag: 'precio' },
  { text: 'Bolsas extra para el fin de semana', hora: '11:00', tag: 'compra' },
]

const tagColors: Record<string, string> = {
  proveedor: '#0c61f3',
  precio:    '#d97706',
  compra:    '#059669',
}

export default function NotasView() {
  const totalFiado    = fiados.reduce((a, f) => a + f.amount, 0)
  const urgentes      = fiados.filter(f => f.urgente).length
  const totalUrgente  = fiados.filter(f => f.urgente).reduce((a, f) => a + f.amount, 0)

  return (
    <div className="p-3 md:p-6 space-y-3 md:space-y-4" style={{ fontFamily: 'Lora, serif' }}>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Total fiado</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">S/ {totalFiado.toFixed(0)}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">{fiados.length} personas deben</p>
          <div className="mt-2 text-[12px] font-semibold text-amber-400">cobrar esta semana</div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Urgentes</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">{urgentes}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">vencidos o vence hoy</p>
          <div className="mt-2 text-[12px] font-semibold text-red-400">cobrar hoy</div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Cobrado este mes</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">S/ 380</p>
          <p className="mt-2 text-[0.9rem] text-white/60">fiados saldados</p>
          <div className="mt-2 text-[12px] font-semibold text-emerald-400">buen ritmo</div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Por cobrar hoy</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">S/ {totalUrgente.toFixed(0)}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">Rosa, Juan y Luisa</p>
          <div className="mt-2 text-[12px] font-semibold text-red-400">cobrar hoy</div>
        </div>
      </div>

      {/* Fiados + Notas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">

        {/* Fiados list */}
        <div className="md:col-span-2" style={{ background: 'rgba(0,0,0,0.93)' }}>
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Cuaderno de fiados</h2>
            <button className="text-[11px] font-semibold bg-white text-black px-3 py-1.5 hover:bg-white/90 transition-colors">
              + Agregar
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {fiados.map(f => (
              <div key={f.name} className="px-4 md:px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <span className="text-white text-[10px] font-bold">{f.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-[12px] font-semibold text-white">{f.name}</p>
                    {f.urgente && (
                      <span className="text-[9px] font-bold text-red-400 px-1.5 py-0.5 tracking-wide" style={{ background: 'rgba(239,68,68,0.15)' }}>
                        URGENTE
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-white/40 mt-0.5 truncate">{f.items}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[1rem] font-bold text-white">S/ {f.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-white/40">
                    vence <span className={f.urgente ? 'text-red-400 font-semibold' : ''}>{f.vence}</span>
                  </p>
                </div>
                <button className="shrink-0 text-[11px] font-semibold text-[#5b9fff] hover:text-white transition-colors ml-1">
                  Cobrar
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notas rápidas */}
        <div className="flex flex-col" style={{ background: 'rgba(0,0,0,0.93)' }}>
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-white/8 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Notas del día</h2>
            <button className="text-[11px] font-semibold text-[#5b9fff] hover:text-white transition-colors">+ Nota</button>
          </div>
          <div className="flex-1 p-3 md:p-4 space-y-2.5">
            {notas.map((n, i) => (
              <div key={i} className="p-3 border-l-2" style={{ borderColor: tagColors[n.tag], background: 'rgba(255,255,255,0.04)' }}>
                <p className="text-[12px] font-medium text-white leading-snug">{n.text}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5"
                    style={{ background: tagColors[n.tag] + '22', color: tagColors[n.tag] }}>
                    {n.tag}
                  </span>
                  <span className="text-[10px] text-white/40">{n.hora}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-3 md:mx-4 mb-3 md:mb-4 px-4 py-3" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <p className="text-[13px] font-semibold text-white leading-snug">Tus fiados,<br />bajo control.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

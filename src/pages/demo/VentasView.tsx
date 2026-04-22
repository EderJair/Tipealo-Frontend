const hourlyData = [
  { h: '6am', v: 120 }, { h: '7am', v: 340 }, { h: '8am', v: 580 },
  { h: '9am', v: 420 }, { h: '10am', v: 310 }, { h: '11am', v: 490 },
  { h: '12pm', v: 670 }, { h: '1pm', v: 390 }, { h: '2pm', v: 260 },
  { h: '3pm', v: 180 }, { h: '4pm', v: 0 }, { h: '5pm', v: 0 },
]

const recentSales = [
  { id: 'V-048', product: 'Aceite Primor 1L',      qty: 6,  total: 72.00,  time: '11:30', paid: false },
  { id: 'V-047', product: 'Harina sin prep. 1kg',  qty: 20, total: 100.00, time: '10:52', paid: true  },
  { id: 'V-046', product: 'Arroz extra 50kg',       qty: 3,  total: 300.00, time: '10:14', paid: true  },
  { id: 'V-045', product: 'Sal yodada 1kg',         qty: 10, total: 35.00,  time: '09:31', paid: false },
  { id: 'V-044', product: 'Fideo Molitalia 500g',  qty: 24, total: 120.00, time: '09:05', paid: true  },
  { id: 'V-043', product: 'Azúcar rubia 50kg',      qty: 1,  total: 60.00,  time: '08:20', paid: true  },
]

function HourlyChart() {
  const W = 640, H = 160
  const pad = { t: 16, r: 16, b: 36, l: 44 }
  const cw = W - pad.l - pad.r
  const ch = H - pad.t - pad.b
  const max = Math.max(...hourlyData.map(d => d.v)) * 1.2
  const barW = cw / hourlyData.length - 8

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5b9fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5b9fff" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[200, 400, 600].map(tick => {
        const y = pad.t + (1 - tick / max) * ch
        return (
          <g key={tick}>
            <line x1={pad.l} y1={y} x2={pad.l + cw} y2={y}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3" />
            <text x={pad.l - 6} y={y + 4} textAnchor="end" fontSize="10"
              fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">S/{tick}</text>
          </g>
        )
      })}
      {hourlyData.map((d, i) => {
        const x = pad.l + (i / hourlyData.length) * cw + cw / hourlyData.length / 2
        const bh = d.v > 0 ? (d.v / max) * ch : 0
        const y = pad.t + ch - bh
        return (
          <g key={d.h}>
            {d.v > 0 && (
              <rect x={x - barW / 2} y={y} width={barW} height={bh}
                fill={i === 6 ? "url(#barGrad)" : "rgba(91,159,255,0.28)"} rx="2" />
            )}
            <text x={x} y={H - 4} textAnchor="middle" fontSize="10" fontFamily="sans-serif"
              fill={i <= 8 && d.v > 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}>
              {d.h}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function VentasView() {
  const pagadas   = recentSales.filter(s => s.paid).length
  const pendientes = recentSales.filter(s => !s.paid).length
  const totalPendiente = recentSales.filter(s => !s.paid).reduce((a, s) => a + s.total, 0)

  return (
    <div className="p-3 md:p-6 space-y-3 md:space-y-4" style={{ fontFamily: 'Lora, serif' }}>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Ventas hoy</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">S/ 2,090</p>
          <p className="mt-2 text-[0.9rem] text-white/60">48 transacciones</p>
          <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-emerald-400">
            +8.4% vs ayer
          </div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Hora pico</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">12pm</p>
          <p className="mt-2 text-[0.9rem] text-white/60">S/ 670 en esa hora</p>
          <div className="mt-2 text-[12px] font-semibold text-[#5b9fff]">mayor flujo del día</div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Pendientes</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">{pendientes}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">S/ {totalPendiente.toFixed(0)} por cobrar</p>
          <div className="mt-2 text-[12px] font-semibold text-amber-400">revisar hoy</div>
        </div>
        <div className="metric-card flex flex-col justify-end">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Acción rápida</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">Nueva<br />venta</p>
          <button className="mt-3 self-start bg-white/10 border border-white/15 text-white text-[11px] font-semibold px-3 py-1.5 hover:bg-white/20 transition-colors">
            + Registrar
          </button>
        </div>
      </div>

      {/* Hourly chart */}
      <div className="p-4 md:p-5" style={{ background: 'rgba(0,0,0,0.93)' }}>
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Ventas por hora — hoy</h2>
            <p className="text-[11px] text-white/35 mt-0.5">Domingo 18 de Abril · Puesto N°14</p>
          </div>
          <span className="text-[11px] font-bold text-[#5b9fff] bg-[#5b9fff]/10 px-2 py-0.5 shrink-0 ml-2">
            S/ 687 registrado
          </span>
        </div>
        <div style={{ height: 140 }}>
          <HourlyChart />
        </div>
      </div>

      {/* Recent sales table */}
      <div style={{ background: 'rgba(0,0,0,0.93)' }}>
        <div className="px-4 md:px-5 py-3 md:py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Ventas recientes</h2>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{pagadas} cobradas
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-400">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />{pendientes} pendientes
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-140">
            <thead>
              <tr className="border-b border-white/8">
                {['#', 'Producto', 'Hora', 'Cant.', 'Total', 'Estado'].map(col => (
                  <th key={col} className="text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 px-4 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentSales.map((s, i) => (
                <tr key={s.id} className={`transition-colors hover:bg-white/5 ${i < recentSales.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <td className="px-4 py-2.5 text-[11px] font-mono text-white/40 whitespace-nowrap">{s.id}</td>
                  <td className="px-4 py-2.5 text-[12px] font-semibold text-white whitespace-nowrap">{s.product}</td>
                  <td className="px-4 py-2.5 text-[11px] text-white/50">{s.time}</td>
                  <td className="px-4 py-2.5 text-[12px] font-bold text-white">{s.qty}</td>
                  <td className="px-4 py-2.5 text-[12px] font-semibold text-white whitespace-nowrap">S/ {s.total.toFixed(2)}</td>
                  <td className="px-4 py-2.5">
                    <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${s.paid ? 'text-emerald-400' : 'text-amber-400'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${s.paid ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      {s.paid ? 'Cobrado' : 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

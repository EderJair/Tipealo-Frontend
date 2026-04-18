const monthlyData = [
  { m: 'Oct', g: 12400 }, { m: 'Nov', g: 14800 }, { m: 'Dic', g: 19200 },
  { m: 'Ene', g: 13600 }, { m: 'Feb', g: 15300 }, { m: 'Mar', g: 17100 },
  { m: 'Abr', g: 18420 },
]

const categories = [
  { name: 'Granos y cereales', income: 8400, cost: 5600, margin: 33 },
  { name: 'Aceites y grasas',  income: 4200, cost: 3100, margin: 26 },
  { name: 'Lácteos',           income: 3800, cost: 2600, margin: 32 },
  { name: 'Conservas',         income: 3100, cost: 1900, margin: 39 },
  { name: 'Condimentos',       income: 1900, cost: 1200, margin: 37 },
]

function MonthChart() {
  const W = 640, H = 180
  const pad = { t: 20, r: 20, b: 36, l: 52 }
  const cw = W - pad.l - pad.r
  const ch = H - pad.t - pad.b
  const max = Math.max(...monthlyData.map(d => d.g)) * 1.2

  const pts = monthlyData.map((d, i) => ({
    x: pad.l + (i / (monthlyData.length - 1)) * cw,
    y: pad.t + (1 - d.g / max) * ch,
    ...d,
  }))

  const linePath = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const mx = (prev.x + p.x) / 2
    return `${acc} C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`
  }, '')

  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${pad.t + ch} L ${pts[0].x} ${pad.t + ch} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[8000, 12000, 16000, 20000].map(tick => {
        const y = pad.t + (1 - tick / max) * ch
        return (
          <g key={tick}>
            <line x1={pad.l} y1={y} x2={pad.l + cw} y2={y}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 3" />
            <text x={pad.l - 6} y={y + 4} textAnchor="end" fontSize="10"
              fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">
              S/{tick / 1000}k
            </text>
          </g>
        )
      })}
      <path d={areaPath} fill="url(#profitFill)" />
      <path d={linePath} fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => {
        const isLast = i === pts.length - 1
        return (
          <g key={i}>
            {isLast && <circle cx={p.x} cy={p.y} r="12" fill="#34d399" fillOpacity="0.12" />}
            <circle cx={p.x} cy={p.y} r={isLast ? 5 : 3}
              fill={isLast ? '#34d399' : '#1a1a1a'} stroke="#34d399" strokeWidth="2" />
            {isLast && (
              <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize="11"
                fill="white" fontWeight="700" fontFamily="sans-serif">
                S/ 18,420
              </text>
            )}
          </g>
        )
      })}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H - 4} textAnchor="middle" fontSize="11" fontFamily="sans-serif"
          fill={i === pts.length - 1 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)"}
          fontWeight={i === pts.length - 1 ? "700" : "400"}>
          {p.m}
        </text>
      ))}
    </svg>
  )
}

export default function GananciasView() {
  const totalGanancia = 18420
  const meta = 25000
  const pct = Math.round((totalGanancia / meta) * 100)
  const falta = meta - totalGanancia

  return (
    <div className="p-6 space-y-4" style={{ fontFamily: 'Lora, serif' }}>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Ganancia del mes</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">S/ 18,420</p>
          <p className="mt-2 text-[1rem] text-white/60">Abril 2025</p>
          <div className="mt-3 flex items-center gap-1 text-[13px] font-semibold text-emerald-400">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
            +7.7% vs Marzo
          </div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Margen promedio</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">33%</p>
          <p className="mt-2 text-[1rem] text-white/60">sobre el costo</p>
          <div className="mt-3 text-[13px] font-semibold text-[#5b9fff]">saludable para abarrotes</div>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Costo del mes</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">S/ 37,200</p>
          <p className="mt-2 text-[1rem] text-white/60">en mercadería</p>
          <div className="mt-3 text-[13px] font-semibold text-white/40">ingresos S/ 55,620</div>
        </div>

        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Meta del mes</p>
          <p className="mt-2.5 text-[2.65rem] font-semibold text-white leading-none">{pct}%</p>
          <div className="mt-2 h-1 bg-white/15 w-full">
            <div className="h-1 bg-white/70" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-[1rem] text-white/60">S/ {falta.toLocaleString()} para la meta</p>
        </div>
      </div>

      {/* Monthly chart */}
      <div className="flex flex-col overflow-hidden p-5" style={{ background: 'rgba(0,0,0,0.93)' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-white">Ganancia mensual</h2>
            <p className="text-[11px] text-white/35 mt-0.5">Octubre 2024 — Abril 2025</p>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5">
            ↑ Mejor mes del año
          </span>
        </div>
        <div style={{ height: 180 }}>
          <MonthChart />
        </div>
      </div>

      {/* Category margins */}
      <div className="bg-white">
        <div className="px-5 py-4 border-b border-black/5">
          <h2 className="text-sm font-semibold text-black">Margen por categoría</h2>
          <p className="text-[11px] text-gray-400 mt-0.5">ingreso vs costo — Abril 2025</p>
        </div>
        <div className="divide-y divide-black/4">
          {categories.map(c => {
            const marginColor = c.margin >= 35 ? '#059669' : c.margin >= 28 ? '#0c61f3' : '#d97706'
            return (
              <div key={c.name} className="px-5 py-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors">
                <div className="w-32 shrink-0">
                  <p className="text-[12px] font-semibold text-black">{c.name}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-1.5 bg-gray-100">
                      <div className="h-1.5" style={{ width: `${(c.income / 8400) * 100}%`, background: `${marginColor}80` }} />
                    </div>
                    <span className="text-[11px] text-gray-400 w-20 text-right shrink-0">S/ {c.income.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100">
                      <div className="h-1.5 bg-gray-300" style={{ width: `${(c.cost / 8400) * 100}%` }} />
                    </div>
                    <span className="text-[11px] text-gray-400 w-20 text-right shrink-0">S/ {c.cost.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-16 text-right shrink-0">
                  <span className="text-[1.1rem] font-bold" style={{ color: marginColor }}>{c.margin}%</span>
                  <p className="text-[10px] text-gray-400">margen</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

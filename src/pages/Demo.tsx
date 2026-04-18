import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Grainient from '../components/Grainient'
import StockView from './demo/StockView'
import VentasView from './demo/VentasView'
import GananciasView from './demo/GananciasView'
import NotasView from './demo/NotasView'

// --- Icons ---
const icons = {
  home: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  box: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
  chart: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
  money: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  settings: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  bell: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  arrowLeft: 'M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18',
  arrowUp: 'M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18',
  arrowDown: 'M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3',
}

const iconPencil = 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'

function Icon({ path, size = 16 }: { path: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  )
}

// --- Data ---
const salesData = [
  { day: 'Lun', amount: 890 },
  { day: 'Mar', amount: 1240 },
  { day: 'Mié', amount: 980 },
  { day: 'Jue', amount: 1450 },
  { day: 'Vie', amount: 1890 },
  { day: 'Sáb', amount: 2840 },
  { day: 'Dom', amount: 2090 },
]

const topProducts = [
  { name: 'Arroz extra 50kg', units: 23, revenue: 'S/ 2,300' },
  { name: 'Aceite Primor 1L', units: 68, revenue: 'S/ 816' },
  { name: 'Azúcar rubia 50kg', units: 12, revenue: 'S/ 720' },
  { name: 'Fideo Molitalia 500g', units: 94, revenue: 'S/ 470' },
  { name: 'Harina sin prep. 1kg', units: 45, revenue: 'S/ 225' },
]

const transactions = [
  { id: 'V-041', product: 'Arroz extra 50kg', qty: 2, total: 'S/ 200.00', time: '07:15', paid: true },
  { id: 'V-042', product: 'Aceite Primor 1L', qty: 12, total: 'S/ 144.00', time: '07:48', paid: true },
  { id: 'V-043', product: 'Azúcar rubia 50kg', qty: 1, total: 'S/ 60.00', time: '08:20', paid: true },
  { id: 'V-044', product: 'Fideo Molitalia 500g', qty: 24, total: 'S/ 120.00', time: '09:05', paid: true },
  { id: 'V-045', product: 'Sal yodada 1kg', qty: 10, total: 'S/ 35.00', time: '09:31', paid: false },
  { id: 'V-046', product: 'Arroz extra 50kg', qty: 3, total: 'S/ 300.00', time: '10:14', paid: true },
  { id: 'V-047', product: 'Harina sin prep. 1kg', qty: 20, total: 'S/ 100.00', time: '10:52', paid: true },
  { id: 'V-048', product: 'Aceite Primor 1L', qty: 6, total: 'S/ 72.00', time: '11:30', paid: false },
]

const kpis = [
  { label: 'Vendido hoy',        value: 'S/ 2,090', sub: '48 clientes · dom 18 abr',       trend: '+8.4% vs ayer',        up: true  },
  { label: 'Ganancia del mes',   value: 'S/ 18,420', sub: 'meta S/ 25,000 · 73% logrado',  trend: 'S/ 6,580 para la meta', up: null  },
  { label: 'Productos en stock', value: '344',        sub: 'artículos registrados',           trend: 'actualizado hace 2 min', up: null },
]

const navItems = [
  { label: 'Inicio',        icon: icons.home     },
  { label: 'Stock',         icon: icons.box      },
  { label: 'Ventas',        icon: icons.chart    },
  { label: 'Ganancias',     icon: icons.money    },
  { label: 'Notas',         icon: iconPencil     },
  { label: 'Config',        icon: icons.settings },
]

// --- Area Chart ---
function AreaChart({ dark = false }: { dark?: boolean }) {
  const W = 700, H = 200
  const pad = { t: 28, r: 20, b: 36, l: 48 }
  const cw = W - pad.l - pad.r
  const ch = H - pad.t - pad.b
  const max = Math.max(...salesData.map(d => d.amount)) * 1.15

  const pts = salesData.map((d, i) => ({
    x: pad.l + (i / (salesData.length - 1)) * cw,
    y: pad.t + (1 - d.amount / max) * ch,
    ...d,
  }))

  const linePath = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = pts[i - 1]
    const mx = (prev.x + p.x) / 2
    return `${acc} C ${mx} ${prev.y}, ${mx} ${p.y}, ${p.x} ${p.y}`
  }, '')

  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${pad.t + ch} L ${pts[0].x} ${pad.t + ch} Z`
  const yTicks = [1000, 2000, 3000]
  const lineColor = dark ? '#5b9fff' : '#0c61f3'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity={dark ? 0.35 : 0.22} />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.01" />
        </linearGradient>
      </defs>
      {yTicks.map(tick => {
        const y = pad.t + (1 - tick / max) * ch
        return (
          <g key={tick}>
            <line x1={pad.l} y1={y} x2={pad.l + cw} y2={y}
              stroke={dark ? 'rgba(255,255,255,0.07)' : '#ebebeb'}
              strokeWidth="1" strokeDasharray="4 3" />
            <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="10"
              fill={dark ? 'rgba(255,255,255,0.25)' : '#c8c8c8'} fontFamily="sans-serif">
              S/{tick / 1000}k
            </text>
          </g>
        )
      })}
      <path d={areaPath} fill="url(#chartFill)" />
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => {
        const isToday = i === pts.length - 1
        return (
          <g key={i}>
            {isToday && <circle cx={p.x} cy={p.y} r="12" fill={lineColor} fillOpacity="0.12" />}
            <circle cx={p.x} cy={p.y} r={isToday ? 5 : 3}
              fill={isToday ? lineColor : (dark ? '#1a1a1a' : 'white')}
              stroke={lineColor} strokeWidth="2" />
            {isToday && (
              <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize="11"
                fill={dark ? 'white' : lineColor} fontWeight="700" fontFamily="sans-serif">
                S/ 2,090
              </text>
            )}
          </g>
        )
      })}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H - 5} textAnchor="middle" fontSize="11" fontFamily="sans-serif"
          fill={i === pts.length - 1 ? (dark ? 'rgba(255,255,255,0.9)' : '#0c61f3') : (dark ? 'rgba(255,255,255,0.3)' : '#b0b0b0')}
          fontWeight={i === pts.length - 1 ? '700' : '400'}>
          {p.day}
        </text>
      ))}
    </svg>
  )
}

// --- Main ---
export default function Demo() {
  const [activeNav, setActiveNav] = useState('Inicio')
  const isModule = ['Stock', 'Ventas', 'Ganancias', 'Notas'].includes(activeNav)

  return (
    <motion.div
      className="flex flex-col md:flex-row h-[100dvh] overflow-hidden bg-[#f0f3f9]"
      style={{ fontFamily: 'Lora, serif' }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >

      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex w-52 shrink-0 flex-col bg-white border-r border-black/7" style={{ background: 'linear-gradient(180deg, #fff 0%, #f8faff 100%)' }}>
        <div className="px-5 py-5 border-b border-black/5">
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-[0.18em] text-black">TIPEALO</span>
            <span className="text-[9px] font-bold tracking-widest bg-[#0c61f3] text-white px-1.5 py-0.5">DEMO</span>
          </div>
          <p className="mt-0.5 text-[11px] text-gray-400">Puesto N°14 · Mercado Central</p>
        </div>
        <nav className="flex-1 py-3 px-2">
          {navItems.map(item => (
            <button key={item.label} onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all mb-0.5 text-left cursor-pointer ${
                activeNav === item.label ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-black'
              }`}>
              <Icon path={item.icon} size={15} />
              {item.label === 'Config' ? 'Configuración' : item.label}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-black/5">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 bg-black flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-semibold">C</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-black leading-tight">Carlos Quispe</p>
              <p className="text-[10px] text-gray-400">Propietario · Abarrotes</p>
            </div>
          </div>
          <Link to="/" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-black transition-colors">
            <Icon path={icons.arrowLeft} size={12} />
            Volver al inicio
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <header className="h-14 bg-white border-b border-black/7 flex items-center justify-between px-4 md:px-6 shrink-0">
          {/* Mobile: brand */}
          <div className="flex md:hidden items-center gap-2">
            <span className="text-base font-extrabold tracking-[0.18em] text-black">TIPEALO</span>
            <span className="text-[9px] font-bold bg-[#0c61f3] text-white px-1.5 py-0.5">DEMO</span>
          </div>
          {/* Desktop: greeting */}
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-black">Buenos días, Don Carlos</h1>
            <p className="text-[11px] text-gray-400 mt-0.5">Domingo, 18 de Abril · Puesto N°14 · Abarrotes</p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <span className="hidden md:inline text-[10px] font-semibold tracking-widest text-gray-400 border border-gray-200 px-2.5 py-1">
              DATOS DE DEMO
            </span>
            {/* Mobile: active section label */}
            <span className="md:hidden text-[11px] font-semibold text-gray-500">{activeNav}</span>
            <button className="relative text-gray-400 hover:text-black transition-colors">
              <Icon path={icons.bell} size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#0c61f3] rounded-full" />
            </button>
          </div>
        </header>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">

          {activeNav === 'Stock'     && <StockView />}
          {activeNav === 'Ventas'    && <VentasView />}
          {activeNav === 'Ganancias' && <GananciasView />}
          {activeNav === 'Notas'     && <NotasView />}

          {!isModule && (
            <div className="p-3 md:p-6 space-y-3 md:space-y-4">

              {/* KPI Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {kpis.map((kpi, i) => (
                  <div key={kpi.label} className={`metric-card${i === 2 ? ' col-span-2 md:col-span-1' : ''}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">{kpi.label}</p>
                    <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">{kpi.value}</p>
                    <p className="mt-2 text-[0.85rem] md:text-[1rem] text-white/60 leading-snug">{kpi.sub}</p>
                    <div className={`mt-2 flex items-center gap-1 text-[12px] font-semibold ${
                      kpi.up === true ? 'text-emerald-400' : 'text-[#5b9fff]'
                    }`}>
                      {kpi.up !== null && <Icon path={icons.arrowUp} size={11} />}
                      {kpi.trend}
                    </div>
                  </div>
                ))}

                {/* Aurora card */}
                <div className="col-span-2 md:col-span-1 relative overflow-hidden metric-card p-0" style={{ background: 'none' }}>
                  <div className="absolute inset-0">
                    <Grainient color1="#f2b058" color2="#ff5500" color3="#f2b058"
                      timeSpeed={2.4} colorBalance={0.15} warpStrength={2.1} warpFrequency={2}
                      warpSpeed={1.5} warpAmplitude={100} blendAngle={20} blendSoftness={0.25}
                      rotationAmount={400} noiseScale={1.8} grainAmount={0.03} grainScale={1}
                      grainAnimated={false} contrast={1.3} gamma={0.85} saturation={1.8}
                      centerX={0.1} centerY={0} zoom={0.85} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-end h-full p-4 md:p-5">
                    <h2 className="text-[2rem] md:text-[2.5rem] font-semibold leading-[0.9] text-white" style={{ fontFamily: 'Lora, serif' }}>
                      Moderniza,<br />crece.
                    </h2>
                    <p className="mt-2 text-[0.85rem] text-white/90 leading-snug">Sin papeles,<br />sin pérdidas.</p>
                  </div>
                </div>
              </div>

              {/* Chart + Top Products */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="col-span-1 md:col-span-2 p-4 md:p-5 overflow-hidden flex flex-col" style={{ background: 'rgba(0,0,0,0.93)' }}>
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div>
                      <h2 className="text-sm font-semibold text-white">Ventas de la semana</h2>
                      <p className="text-[11px] text-white/35 mt-0.5">Total: S/ 11,380 · Lun 13 — Dom 18 Abr</p>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 shrink-0 ml-2">↑ +22.4%</span>
                  </div>
                  <div style={{ minHeight: 140 }} className="flex-1">
                    <AreaChart dark />
                  </div>
                </div>

                <div className="bg-white p-4 md:p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-semibold text-black">Lo más vendido</h2>
                    <span className="text-[10px] text-gray-400 font-medium">hoy</span>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {(() => {
                      const colors = ['#0c61f3', '#7c3aed', '#059669', '#d97706', '#dc2626']
                      const maxUnits = Math.max(...topProducts.map(x => x.units))
                      return topProducts.map((p, i) => {
                        const pct = (p.units / maxUnits) * 100
                        return (
                          <div key={p.name} className="flex items-center gap-2 md:gap-3">
                            <div className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center text-[11px] font-bold shrink-0"
                              style={{ background: colors[i] + '14', color: colors[i] }}>
                              {i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[11px] md:text-[12px] font-semibold text-black truncate">{p.name}</span>
                                <span className="text-[11px] font-bold shrink-0 ml-2" style={{ color: colors[i] }}>{p.revenue}</span>
                              </div>
                              <div className="h-0.75 bg-gray-100 w-full">
                                <div className="h-0.75" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${colors[i]}66, ${colors[i]})` }} />
                              </div>
                            </div>
                          </div>
                        )
                      })
                    })()}
                  </div>
                </div>
              </div>

              {/* Transactions */}
              <div className="bg-white">
                <div className="px-4 md:px-5 py-3 md:py-4 border-b border-black/5 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-black">Últimas transacciones</h2>
                  <span className="text-[11px] text-gray-400">{transactions.length} ventas hoy</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black/5">
                  {transactions.map(tx => (
                    <div key={tx.id} className="bg-white p-3 md:p-4 hover:bg-[#f9fafb] transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-[11px] md:text-[12px] font-semibold text-black leading-snug pr-1">{tx.product}</p>
                        <div className={`flex items-center gap-1 shrink-0 text-[10px] font-semibold ${tx.paid ? 'text-emerald-600' : 'text-amber-600'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${tx.paid ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          {tx.paid ? 'Ok' : '...'}
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-400 font-mono mb-2">{tx.id} · {tx.time}</p>
                      <div className="flex items-end justify-between">
                        <span className="text-[10px] text-gray-400">{tx.qty} uds.</span>
                        <span className="text-[1rem] font-semibold text-black leading-none">{tx.total}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-black/7 flex">
        {navItems.map(item => (
          <button key={item.label} onClick={() => setActiveNav(item.label)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
              activeNav === item.label ? 'text-black' : 'text-gray-400'
            }`}>
            <Icon path={item.icon} size={19} />
            <span className="text-[9px] font-semibold">{item.label}</span>
            {activeNav === item.label && <span className="w-1 h-1 bg-black rounded-full" />}
          </button>
        ))}
      </nav>

    </motion.div>
  )
}

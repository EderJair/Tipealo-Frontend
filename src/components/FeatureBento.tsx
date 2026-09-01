import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import CountUp from './CountUp'
import VentaDemo from './VentaDemo'

const FONT = { fontFamily: 'Lora, serif' } as const
const PANEL = 'rgba(0,0,0,0.93)'
const BLUE = '#0c61f3'

/* ── Tile shell: línea azul que crece arriba al pasar el mouse ── */
function Tile({
  label,
  title,
  desc,
  children,
  className = '',
  delay = 0,
}: {
  label: string
  title: ReactNode
  desc: string
  children?: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.article
      className={`group relative flex flex-col overflow-hidden p-5 md:p-6 ${className}`}
      style={{ background: PANEL }}
      initial={{ opacity: 0, y: 34, scale: 0.985, clipPath: 'inset(14% 0% 0% 0%)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
        clipPath: { duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* acento superior */}
      <span
        className="absolute left-0 top-0 h-[2px] w-0 transition-[width] duration-500 ease-out group-hover:w-full"
        style={{ background: BLUE }}
      />

      <p className="text-[13px] font-bold uppercase tracking-[0.35em] text-white/65" style={FONT}>
        {label}
      </p>
      <h3 className="mt-3 text-[1.35rem] font-semibold leading-[1.15] text-white md:text-[1.6rem]" style={FONT}>
        {title}
      </h3>
      <p className="mt-2.5 max-w-sm text-[1.02rem] leading-relaxed text-white/75" style={FONT}>
        {desc}
      </p>

      {children && (
        <div className="mt-5 flex-1 transition-transform duration-500 ease-out group-hover:-translate-y-1">
          {children}
        </div>
      )}
    </motion.article>
  )
}

/* ── Mockup: quiénes te deben ── */
const deudores = [
  { ini: 'RM', name: 'Rosa Mamani', monto: 145.5, estado: 'vence hoy', urgente: true },
  { ini: 'LV', name: 'Luisa Vargas', monto: 310.0, estado: 'atrasado', urgente: true },
  { ini: 'CL', name: 'Carmen López', monto: 220.0, estado: 'vence mañana', urgente: false },
  { ini: 'PF', name: 'Pedro Flores', monto: 55.0, estado: '25 abr', urgente: false },
  { ini: 'MR', name: 'Marco Ríos', monto: 42.5, estado: '27 abr', urgente: false },
  { ini: 'JQ', name: 'Juan Quispe', monto: 78.0, estado: '30 abr', urgente: false },
]

const pagos = [
  { name: 'Rosa Mamani', monto: 50, cuando: 'hoy' },
  { name: 'Carmen López', monto: 120, cuando: 'ayer' },
  { name: 'Marco Ríos', monto: 42.5, cuando: '26 abr' },
]

function FiadosMock() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-end justify-between border-b border-white/20 pb-3">
        <div>
          <p className="text-[13px] uppercase tracking-[0.28em] text-white/65" style={FONT}>
            Te deben
          </p>
          <p className="mt-1 text-[2.2rem] font-semibold leading-none text-white md:text-[2.6rem]" style={FONT}>
            <CountUp to={851} decimals={2} prefix="S/ " duration={2.2} />
          </p>
        </div>
        <span className="mb-1 px-2 py-0.5 text-[14px] font-bold text-amber-400" style={{ ...FONT, background: 'rgba(251,191,36,0.12)' }}>
          2 por cobrar hoy
        </span>
      </div>

      <ul className="space-y-3">
        {deudores.map((d, i) => (
          <motion.li
            key={d.name}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center text-[12px] font-bold text-white"
              style={{ ...FONT, background: d.urgente ? BLUE : 'rgba(255,255,255,0.1)' }}
            >
              {d.ini}
            </span>
            <span className="flex-1 truncate text-[17px] font-medium text-white/85" style={FONT}>
              {d.name}
            </span>
            <span className={`text-[14px] ${d.urgente ? 'text-amber-400' : 'text-white/65'}`} style={FONT}>
              {d.estado}
            </span>
            <span className="w-21.5 shrink-0 whitespace-nowrap text-right text-[17px] font-semibold text-white" style={FONT}>
              S/ {d.monto.toFixed(2)}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* Pagos parciales: lo que el cuaderno nunca registra bien */}
      <div className="mt-6 border-t border-white/20 pt-4">
        <p className="mb-3 text-[13px] uppercase tracking-[0.24em] text-white/65" style={FONT}>
          Últimos abonos
        </p>
        <ul className="space-y-2.5">
          {pagos.map((p, i) => (
            <motion.li
              key={p.name + p.cuando}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <span className="flex-1 truncate text-[14px] text-white/75" style={FONT}>
                {p.name} abonó
              </span>
              <span className="whitespace-nowrap text-[14px] text-white/65" style={FONT}>
                {p.cuando}
              </span>
              <span className="w-21.5 shrink-0 whitespace-nowrap text-right text-[15px] font-semibold text-emerald-400" style={FONT}>
                S/ {p.monto.toFixed(2)}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-3.5">
        <span className="text-[17px] text-white/68" style={FONT}>
          Cobrado este mes
        </span>
        <span className="text-[17px] font-semibold text-emerald-400" style={FONT}>
          <CountUp to={1240} prefix="S/ " duration={2.4} />
        </span>
      </div>
    </div>
  )
}

/* ── Mockup: stock con alertas ── */
const stock = [
  { name: 'Arroz extra', pct: 90, tone: '#34d399', tag: 'ok' },
  { name: 'Aceite Primor', pct: 26, tone: '#fbbf24', tag: 'bajo' },
  { name: 'Fideo Molitalia', pct: 8, tone: '#f87171', tag: 'crítico' },
]

function StockMock() {
  return (
    <ul className="space-y-3.5">
      {stock.map((s, i) => (
        <li key={s.name}>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-[14px] text-white/70" style={FONT}>
              {s.name}
            </span>
            <span className="text-[14px] font-bold uppercase" style={{ ...FONT, color: s.tone }}>
              {s.tag}
            </span>
          </div>
          <div className="h-[3px] w-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-[3px]"
              style={{ background: s.tone }}
              initial={{ width: 0 }}
              whileInView={{ width: `${s.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/* ── Mockup: proveedores ── */
const proveedores = [
  { name: 'Distribuidora Sur', item: 'Arroz 50kg', precio: 'S/ 92' },
  { name: 'Mayorista Caquetá', item: 'Aceite 1L', precio: 'S/ 9.20' },
  { name: 'Abastos La Unión', item: 'Azúcar 50kg', precio: 'S/ 54' },
]

function ProveedoresMock() {
  return (
    <ul className="divide-y divide-white/18 border-t border-white/18">
      {proveedores.map((p) => (
        <li key={p.name} className="flex items-center justify-between py-2.5">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium text-white/80" style={FONT}>
              {p.name}
            </p>
            <p className="text-[14px] text-white/65" style={FONT}>
              {p.item}
            </p>
          </div>
          <span className="shrink-0 text-[17px] font-semibold" style={{ ...FONT, color: BLUE }}>
            {p.precio}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ── Mockup: clientes / caseros ── */
const clientes = [
  { ini: 'RM', name: 'Rosa Mamani', tel: '987 654 321', debe: 145.5 },
  { ini: 'CL', name: 'Carmen López', tel: '956 220 118', debe: 220 },
  { ini: 'PF', name: 'Pedro Flores', tel: '941 883 507', debe: 0 },
]

function ClientesMock() {
  return (
    <ul className="divide-y divide-white/20 border-t border-white/20">
      {clientes.map((c) => (
        <li key={c.name} className="flex items-center gap-3 py-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center text-[12px] font-bold text-white"
            style={{ ...FONT, background: 'rgba(255,255,255,0.12)' }}
          >
            {c.ini}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-medium text-white/85" style={FONT}>
              {c.name}
            </p>
            <p className="text-[13px] text-white/65" style={FONT}>
              {c.tel}
            </p>
          </div>
          <span
            className={`shrink-0 whitespace-nowrap text-[14px] font-semibold ${c.debe ? 'text-amber-400' : 'text-emerald-400'}`}
            style={FONT}
          >
            {c.debe ? `debe S/ ${c.debe.toFixed(2)}` : 'al día'}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ── Mockup: cierre del día ── */
function CierreMock() {
  const cifras = [
    { label: 'Vendido', to: 2090, prefix: 'S/ ' },
    { label: 'Ganancia', to: 612, prefix: 'S/ ' },
    { label: 'Por cobrar', to: 851, prefix: 'S/ ' },
    { label: 'Ventas', to: 48, prefix: '' },
  ]
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-5">
      {cifras.map((c) => (
        <div key={c.label}>
          <p className="text-[13px] uppercase tracking-[0.24em] text-white/65" style={FONT}>
            {c.label}
          </p>
          <p className="mt-1.5 whitespace-nowrap text-[1.5rem] font-semibold leading-none text-white" style={FONT}>
            <CountUp to={c.to} prefix={c.prefix} duration={2} />
          </p>
        </div>
      ))}
    </div>
  )
}

function Encabezado({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <motion.div
      className="mb-6 md:mb-8"
      initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.35em] text-black/65" style={FONT}>
        {eyebrow}
      </p>
      <h2
        className="max-w-2xl text-[2rem] font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-[2.6rem] lg:text-[2.9rem]"
        style={FONT}
      >
        {children}
      </h2>
    </motion.div>
  )
}

/* ── Secciones ── */
export default function FeatureBento() {
  return (
    <>
      {/* Pantalla 1: fiados, ventas, stock */}
      <section
        id="funciones"
        className="flex min-h-svh flex-col justify-center bg-white px-5 py-10 sm:px-8 lg:px-12"
      >
        <div className="mx-auto w-full max-w-6xl">
          <Encabezado eyebrow="Todo en un solo lugar">
            El cuaderno,
            <br />
            pero que saca cuentas solo.
          </Encabezado>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <Tile
              label="Fiados"
              title={<>Sabes quién te debe,<br />cuánto y desde cuándo.</>}
              desc="Anota el fiado al vender. Tipealo te avisa cuándo cobrar y guarda cada pago parcial."
              className="md:col-span-2 md:row-span-2"
            >
              <FiadosMock />
            </Tile>

            <Tile
              label="Ventas"
              title="Tipea la venta y sigue atendiendo."
              desc="Producto, cantidad, listo. Descuenta el stock solo."
              delay={0.08}
            >
              <VentaDemo />
            </Tile>

            <Tile
              label="Stock"
              title="Te avisa antes de que se acabe."
              desc="Cada producto con su mínimo. Ves qué falta pedir sin contar."
              delay={0.16}
            >
              <StockMock />
            </Tile>
          </div>
        </div>
      </section>

      {/* Pantalla 2: proveedores, clientes, cierre */}
      <section className="flex min-h-svh flex-col justify-center bg-white px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl">
          <Encabezado eyebrow="Y además">
            Tus proveedores,
            <br />
            tus clientes, tu caja.
          </Encabezado>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4">
            <Tile
              label="Proveedores"
              title="A quién pedirle y a qué precio."
              desc="Guarda tus proveedores con su último precio para que no te suban la mano."
            >
              <ProveedoresMock />
            </Tile>

            <Tile
              label="Clientes"
              title="Tus caseros, siempre a la mano."
              desc="Nombre, teléfono y qué te debe cada uno. Sin buscar en papelitos."
              delay={0.1}
            >
              <ClientesMock />
            </Tile>

            <Tile
              label="Cierre del día"
              title="Cierras en un minuto."
              desc="Al terminar la jornada ya está todo sumado."
              delay={0.2}
            >
              <CierreMock />
            </Tile>
          </div>
        </div>
      </section>
    </>
  )
}

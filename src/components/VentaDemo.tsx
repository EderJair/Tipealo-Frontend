import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { CheckIcon } from './icons'

const FONT = { fontFamily: 'Lora, serif' } as const
const BLUE = '#0c61f3'

type Item = { id: string; nombre: string; precio: number; cant: number }

const catalogo: Item[] = [
  { id: 'arroz', nombre: 'Arroz extra 50kg', precio: 100, cant: 2 },
  { id: 'aceite', nombre: 'Aceite Primor 1L', precio: 12, cant: 3 },
]

/** Puntero simulado: se ve sobre el panel oscuro y marca el clic. */
function Cursor({ x, y, clicking }: { x: number; y: number; clicking: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute z-30"
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 110, damping: 20, mass: 0.9 }}
      style={{ top: 0, left: 0 }}
    >
      {/* onda del clic */}
      <AnimatePresence>
        {clicking && (
          <motion.span
            className="absolute rounded-full"
            style={{ left: -13, top: -13, width: 26, height: 26, border: `2px solid ${BLUE}` }}
            initial={{ opacity: 0.9, scale: 0.3 }}
            animate={{ opacity: 0, scale: 1.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        animate={{ scale: clicking ? 0.82 : 1 }}
        transition={{ duration: 0.14 }}
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))' }}
      >
        <path
          d="M5 2.5l13.4 8.2-5.9 1.1 3 6-2.6 1.2-3-6L5 17V2.5z"
          fill="#fff"
          stroke="#0a0a0a"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  )
}

export default function VentaDemo() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const addRefs = useRef<Array<HTMLDivElement | null>>([])
  const payRef = useRef<HTMLDivElement>(null)

  const inView = useInView(wrapRef, { margin: '-10% 0px' })
  const reduced = useReducedMotion()

  const [cart, setCart] = useState<Item[]>([])
  const [pos, setPos] = useState({ x: 250, y: 210 })
  const [clicking, setClicking] = useState(false)
  const [saved, setSaved] = useState(false)

  const total = cart.reduce((a, i) => a + i.precio * i.cant, 0)

  /** Centro de un elemento, en coordenadas del contenedor. */
  const centro = (el: HTMLElement | null) => {
    const wrap = wrapRef.current
    if (!el || !wrap) return null
    const a = el.getBoundingClientRect()
    const b = wrap.getBoundingClientRect()
    return { x: a.left - b.left + a.width - 22, y: a.top - b.top + a.height / 2 }
  }

  useEffect(() => {
    // Sin animación: se muestra el resultado final, ya armado.
    if (reduced) {
      setCart(catalogo)
      setSaved(true)
      return
    }
    if (!inView) return

    let vivo = true
    const timers: ReturnType<typeof setTimeout>[] = []
    const espera = (ms: number) => new Promise<void>((r) => timers.push(setTimeout(r, ms)))

    const clic = async () => {
      setClicking(true)
      await espera(180)
      setClicking(false)
    }

    const correr = async () => {
      while (vivo) {
        setCart([])
        setSaved(false)
        await espera(900)
        if (!vivo) return

        // agrega cada producto del catálogo
        for (let i = 0; i < catalogo.length; i++) {
          const p = centro(addRefs.current[i])
          if (p) setPos(p)
          await espera(820)
          if (!vivo) return
          await clic()
          setCart((c) => [...c, catalogo[i]])
          await espera(620)
          if (!vivo) return
        }

        // cobra al contado
        const p = centro(payRef.current)
        if (p) setPos(p)
        await espera(820)
        if (!vivo) return
        await clic()
        setSaved(true)
        await espera(2400)
      }
    }

    correr()
    return () => {
      vivo = false
      timers.forEach(clearTimeout)
    }
  }, [inView, reduced])

  return (
    <div ref={wrapRef} className="relative">
      {/* Catálogo */}
      <p className="mb-2 text-[13px] uppercase tracking-[0.24em] text-white/65" style={FONT}>
        Tus productos
      </p>
      <div className="space-y-1.5">
        {catalogo.map((p, i) => {
          const enCarrito = cart.some((c) => c.id === p.id)
          return (
            <div
              key={p.id}
              ref={(el) => { addRefs.current[i] = el }}
              className="flex items-center gap-2 border px-3 py-2 transition-colors duration-300"
              style={{
                borderColor: enCarrito ? BLUE : 'rgba(255,255,255,0.2)',
                background: enCarrito ? 'rgba(12,97,243,0.12)' : 'transparent',
              }}
            >
              <span className="flex-1 truncate text-[14px] text-white/85" style={FONT}>
                {p.nombre}
              </span>
              <span className="whitespace-nowrap text-[14px] text-white/65" style={FONT}>
                S/ {p.precio}
              </span>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center text-[15px] font-bold leading-none text-white transition-colors duration-300"
                style={{ background: enCarrito ? BLUE : 'rgba(255,255,255,0.16)' }}
              >
                {enCarrito ? <CheckIcon size={13} strokeWidth={2.6} /> : '+'}
              </span>
            </div>
          )
        })}
      </div>

      {/* Boleta */}
      <div className="mt-3 border border-white/20 p-3">
        <div className="min-h-[52px] space-y-1.5">
          <AnimatePresence initial={false}>
            {cart.length === 0 && (
              <motion.p
                key="vacio"
                className="py-3 text-center text-[14px] text-white/60"
                style={FONT}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Toca un producto para agregarlo
              </motion.p>
            )}
            {cart.map((it) => (
              <motion.div
                key={it.id}
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: -14, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="truncate text-[14px] text-white/85" style={FONT}>
                  {it.nombre}
                </span>
                <span className="whitespace-nowrap pl-2 text-[14px] text-white/65" style={FONT}>
                  {it.cant} × S/ {it.precio}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-2 flex items-baseline justify-between border-t border-white/20 pt-2.5">
          <span className="text-[13px] uppercase tracking-[0.25em] text-white/65" style={FONT}>
            Total
          </span>
          <motion.span
            key={total}
            className="text-[1.6rem] font-semibold leading-none text-white"
            style={FONT}
            initial={{ opacity: 0.4, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            S/ {total.toLocaleString('es-PE')}
          </motion.span>
        </div>
      </div>

      {/* Cobro */}
      <div className="mt-2.5 flex items-center gap-2">
        <div
          ref={payRef}
          className="flex-1 py-2 text-center text-[15px] font-bold text-white transition-colors duration-300"
          style={{ ...FONT, background: saved ? '#0f9d58' : BLUE }}
        >
          {saved ? 'Guardada' : 'Contado'}
        </div>
        <div
          className="flex-1 border border-white/20 py-2 text-center text-[15px] font-medium text-white/72"
          style={FONT}
        >
          Fiado
        </div>
      </div>

      {/* Confirmación */}
      <div className="mt-2.5 h-6">
        <AnimatePresence>
          {saved && (
            <motion.p
              className="flex items-center gap-2 text-[14px] font-semibold text-emerald-400"
              style={FONT}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CheckIcon size={15} strokeWidth={2.6} />
              Venta anotada. Stock descontado solo.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {!reduced && <Cursor x={pos.x} y={pos.y} clicking={clicking} />}
    </div>
  )
}

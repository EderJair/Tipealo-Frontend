import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'

const C = {
  cream:  '#f2e4b0',
  shadow: '#c9a85c',
  brown:  '#5c3a1e',
  pink:   '#f5c5c5',
  eye:    '#2d1800',
}

function LlamaSVG({ frame, confused = false, chuyo = false }: { frame: number; confused?: boolean; chuyo?: boolean }) {
  const upLegs = frame === 0 ? [0, 3] : [1, 2]
  const legXs = [4, 9, 14, 18]

  return (
    <svg width="80" height="92" viewBox="0 0 22 26"
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated', display: 'block' }}>

      {/* Ears (only when no chuyo) */}
      {!chuyo && (
        <>
          <rect x="1" y="0" width="2" height="3" fill={C.shadow} />
          <rect x="1" y="0" width="1" height="2" fill={C.pink} />
          <rect x="5" y="0" width="2" height="3" fill={C.shadow} />
          <rect x="5" y="0" width="1" height="2" fill={C.pink} />
          {/* Head tuft */}
          <rect x="3" y="1" width="2" height="3" fill={C.cream} />
        </>
      )}

      {/* Head */}
      <rect x="0" y="3" width="9" height="6" fill={C.cream} />

      {/* Chuyo hat */}
      {chuyo && (
        <>
          {/* Hat body */}
          <rect x="0" y="0" width="9" height="5" fill="#b91c1c" />
          {/* Yellow stripes */}
          <rect x="0" y="1" width="9" height="1" fill="#fbbf24" />
          <rect x="0" y="3" width="9" height="1" fill="#fbbf24" />
          {/* Green accent stripe */}
          <rect x="0" y="2" width="9" height="1" fill="#166534" />
          {/* Pompom on top */}
          <rect x="3" y="0" width="3" height="1" fill="#ffffff" />
          {/* Ear flaps hanging down */}
          <rect x="0" y="4" width="1" height="5" fill="#b91c1c" />
          <rect x="8" y="4" width="1" height="5" fill="#b91c1c" />
          {/* Ear flap tips */}
          <rect x="0" y="8" width="1" height="1" fill="#fbbf24" />
          <rect x="8" y="8" width="1" height="1" fill="#fbbf24" />
        </>
      )}

      {confused ? (
        <>
          <rect x="0" y="3" width="4" height="1" fill={C.eye} />
          <rect x="0" y="2" width="1" height="1" fill={C.eye} />
          <rect x="1" y="4" width="2" height="3" fill="white" />
          <rect x="1" y="4" width="1" height="1" fill={C.eye} />
          <rect x="1" y="8" width="1" height="1" fill={C.brown} />
          <rect x="2" y="7" width="3" height="1" fill={C.brown} />
          <rect x="9" y="3" width="1" height="2" fill="#93c5fd" />
          <rect x="8" y="4" width="1" height="1" fill="#93c5fd" />
        </>
      ) : (
        <>
          {/* Normal eye */}
          <rect x="1" y="4" width="2" height="2" fill="white" />
          <rect x="2" y="5" width="1" height="1" fill={C.eye} />
          {/* Nostril */}
          <rect x="0" y="7" width="1" height="1" fill={C.brown} />
        </>
      )}

      {/* Neck */}
      <rect x="5" y="5" width="4" height="9" fill={C.cream} />
      <rect x="5" y="5" width="1" height="9" fill={C.shadow} />
      {/* Body */}
      <rect x="3" y="12" width="18" height="8" fill={C.cream} />
      <rect x="3" y="12" width="18" height="1" fill={C.shadow} />
      <rect x="3" y="19" width="18" height="1" fill={C.shadow} />
      {/* Tail */}
      <rect x="20" y="9" width="2" height="6" fill={C.shadow} />
      <rect x="20" y="9" width="2" height="2" fill={C.cream} />
      {/* Legs + hooves */}
      {legXs.map((x, i) => {
        const yo = upLegs.includes(i) ? -1 : 0
        return (
          <g key={i}>
            <rect x={x} y={20 + yo} width="3" height="5" fill={C.shadow} />
            <rect x={x} y={24 + yo} width="3" height="2" fill={C.brown} />
          </g>
        )
      })}
    </svg>
  )
}

function delay(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

export default function Mascot({ chuyo = false }: { chuyo?: boolean }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 200); return () => clearTimeout(t) }, [])
  if (!mounted) return null
  return <MascotInner chuyo={chuyo} />
}

function MascotInner({ chuyo = false }: { chuyo?: boolean }) {
  const controls = useAnimation()
  const [showBubble, setShowBubble] = useState(false)
  const [walking, setWalking]       = useState(false)
  const [frame, setFrame]           = useState(0)

  useEffect(() => {
    if (!walking) return
    const id = setInterval(() => setFrame(f => 1 - f), 260)
    return () => clearInterval(id)
  }, [walking])

  useEffect(() => {
    let alive = true

    const run = async () => {
      await delay(2500)

      while (alive) {
        controls.set({ x: 0, scaleX: 1 })
        setShowBubble(false)

        // Walk in
        setWalking(true)
        await controls.start({ x: -260, transition: { duration: 2.7, ease: 'linear' } })
        setWalking(false)
        setFrame(0)
        if (!alive) break

        if (chuyo) {
          // Con chuyo: pausa orgullosa y se va
          await delay(1800)
        } else {
          // Sin chuyo: muestra "?" de duda
          await delay(500)
          setShowBubble(true)
          await delay(3200)
          setShowBubble(false)
          await delay(300)
        }
        if (!alive) break

        // Turn around and run back
        controls.set({ scaleX: -1 })
        setWalking(true)
        await controls.start({ x: 200, transition: { duration: 1.0, ease: 'easeIn' } })
        setWalking(false)
        if (!alive) break

        await delay(9000)
      }
    }

    run()
    return () => { alive = false }
  }, [controls, chuyo])

  return (
    <div className="pointer-events-none fixed bottom-0 z-20" style={{ right: -100 }}>
      <motion.div animate={controls} style={{ position: 'relative' }}>

        {/* Thought bubble (solo sin chuyo) */}
        {!chuyo && (
          <div style={{
            position: 'absolute',
            bottom: 'calc(100% + 6px)',
            left: 0, right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.85 }}
              animate={showBubble ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.85 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                fontSize: 28,
                fontFamily: 'Lora, serif',
                fontWeight: 700,
                color: 'black',
                lineHeight: 1,
              }}
            >
              ?
            </motion.div>
          </div>
        )}

        <LlamaSVG frame={frame} confused={showBubble} chuyo={chuyo} />
      </motion.div>
    </div>
  )
}

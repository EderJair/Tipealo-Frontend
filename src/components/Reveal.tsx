import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  blur?: number
  duration?: number
  /** Añade un barrido desde abajo, para tarjetas y bloques con fondo. */
  wipe?: boolean
  className?: string
  style?: React.CSSProperties
}

/** Aparece al entrar en pantalla: sube, se enfoca y se revela. Una sola vez. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = 8,
  duration = 0.85,
  wipe = false,
  className,
  style,
}: Props) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{
        opacity: 0,
        y,
        filter: `blur(${blur}px)`,
        ...(wipe ? { clipPath: 'inset(14% 0% 0% 0%)', scale: 0.985 } : null),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        ...(wipe ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : null),
      }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        ...(wipe ? { clipPath: { duration: duration + 0.2, delay, ease: [0.16, 1, 0.3, 1] } } : null),
      }}
    >
      {children}
    </motion.div>
  )
}

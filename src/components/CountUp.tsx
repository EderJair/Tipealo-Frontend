import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

type Props = {
  to: number
  from?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  style?: React.CSSProperties
}

/**
 * Cuenta desde `from` hasta `to` cuando el elemento entra en pantalla.
 * Escribe directo en el DOM: no re-renderiza React en cada frame.
 */
export default function CountUp({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
  style,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px' })

  const format = (v: number) =>
    prefix +
    v.toLocaleString('es-PE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix

  useEffect(() => {
    if (ref.current) ref.current.textContent = format(from)
  }, [])

  useEffect(() => {
    if (!inView) return
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, to, from, duration])

  return <span ref={ref} className={className} style={style} />
}

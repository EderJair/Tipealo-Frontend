import { useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

type SVGOptions = {
  duration?: number
}

type BackgroundLinesProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  svgOptions?: SVGOptions
}

const RADIAL_PATHS = [
  'M50 50 Q42 14 30 -8',
  'M50 50 Q54 15 50 -10',
  'M50 50 Q64 16 76 -8',
  'M50 50 Q82 24 110 14',
  'M50 50 Q84 40 114 38',
  'M50 50 Q86 56 114 66',
  'M50 50 Q78 76 96 102',
  'M50 50 Q60 82 64 112',
  'M50 50 Q44 82 36 112',
  'M50 50 Q24 78 8 102',
  'M50 50 Q16 60 -10 70',
  'M50 50 Q14 46 -12 42',
  'M50 50 Q16 30 -10 20',
  'M50 50 Q30 78 18 104',
  'M50 50 Q72 74 86 104',
  'M50 50 Q28 20 10 -4',
]

export function BackgroundLines({
  children,
  className = '',
  svgOptions,
  ...props
}: BackgroundLinesProps) {
  const idPrefix = useId().replace(/:/g, '')
  const duration = svgOptions?.duration ?? 10

  return (
    <div className={`relative w-full overflow-hidden ${className}`} {...props}>
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${idPrefix}-bg-fade`} cx="50%" cy="50%" r="62%">
              <stop offset="0%" stopColor="rgba(15,23,42,0.14)" />
              <stop offset="65%" stopColor="rgba(15,23,42,0.06)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0)" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="100" height="100" fill={`url(#${idPrefix}-bg-fade)`} opacity="0.22" />

          {RADIAL_PATHS.map((d, index) => (
            <g key={`${idPrefix}-line-${index}`}>
              <path
                id={`${idPrefix}-line-${index}`}
                d={d}
                fill="none"
                stroke="rgba(71,85,105,0.28)"
                strokeWidth="0.15"
                vectorEffect="non-scaling-stroke"
              />

              <circle r="0.42" fill="rgba(37,99,235,0.62)">
                <animateMotion
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.38}s`}
                  rotate="auto"
                >
                  <mpath href={`#${idPrefix}-line-${index}`} />
                </animateMotion>
              </circle>
            </g>
          ))}

          <circle cx="50" cy="50" r="1.3" fill="rgba(37,99,235,0.20)" />
          <circle cx="50" cy="50" r="0.62" fill="rgba(37,99,235,0.52)" />
        </svg>

        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/85 via-white/60 to-transparent" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}
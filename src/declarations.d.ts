declare module 'gsap'
declare module 'gsap/ScrollTrigger'

declare module 'lenis' {
  class Lenis {
    scroll: number
    constructor(options?: Record<string, unknown>)
    scrollTo(target: HTMLElement | string | number, options?: Record<string, unknown>): void
    on(event: string, cb: () => void): void
    raf(time: number): void
    destroy(): void
  }
  export default Lenis
}

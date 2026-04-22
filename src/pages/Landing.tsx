import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Grainient from '../components/Grainient'
import Mascot from '../components/Mascot'

gsap.registerPlugin(ScrollTrigger)

/* ── verified stock photos ── */
const IMGS = {
  vendorWoman:  'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=900&q=85',
  marketFruits: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1400&q=80',
  marketScene:  'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=1400&q=80',
  groceryStore: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85',
  marketStall:  'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=900',
}

const metrics = [
  { label: 'Ventas de hoy',    value: 'S/ 2,090',  detail: 'registradas sin tocar un cuaderno' },
  { label: 'Stock al instante', value: '344',       detail: 'productos — sabes qué tienes y qué falta' },
  { label: 'Ganancia del mes',  value: 'S/ 18,420', detail: 'sin contarlo a mano ni un sol' },
]

const steps = [
  {
    n: '01',
    title: 'Registra cada venta',
    desc: 'Al terminar cada venta, tipéala en segundos. Producto, cantidad, precio. Listo.',
    img: IMGS.groceryStore,
  },
  {
    n: '02',
    title: 'Ve tu stock en vivo',
    desc: 'Tipealo actualiza tu inventario solo. Sabe qué se acaba antes de quedarte sin nada.',
    img: IMGS.marketStall,
  },
  {
    n: '03',
    title: 'Cierra el día tranquilo',
    desc: 'Al final de la jornada, un resumen claro. Cuánto vendiste, cuánto ganaste, qué cobrar.',
    img: IMGS.marketFruits,
  },
]

const statCounters = [
  { val: 142, suffix: '+', label: 'Bodegas registradas' },
  { val: 8500, suffix: '+', label: 'Ventas tipadas hasta hoy' },
  { val: 94,  suffix: '%', label: 'Prefieren al cuaderno' },
]

const testimonials = [
  {
    initials: 'RM', name: 'Rosa Mamani', place: 'Mercado Central · Lima',
    quote: 'Antes perdía media hora sumando en mi cuaderno. Ahora cierro el día en un minuto y ya sé exactamente cuánto entró.',
  },
  {
    initials: 'CQ', name: 'Carlos Quispe', place: 'Abarrotes El Carmen · Ventanilla',
    quote: 'En 3 días ya sabía qué productos me daban más ganancia. Nunca lo había visto tan claro en 12 años de negocio.',
  },
  {
    initials: 'ML', name: 'María López', place: 'La Parada · La Victoria',
    quote: 'Mis fiados ya no se me olvidan. Ahora sé cuánto me deben y cuándo cobrar. Recuperé S/ 420 que tenía olvidados.',
  },
]

const pricing = [
  {
    name: 'Demo',
    price: 'Gratis',
    priceSub: 'para siempre',
    features: ['Panel completo con datos de ejemplo', 'Ventas, stock, fiados y ganancias', 'Sin registro ni tarjeta', 'En celular o computadora'],
    cta: 'Ver demo ahora',
    ctaTo: '/demo',
    accent: false,
  },
  {
    name: 'Pro',
    price: 'S/ 19.90',
    priceSub: 'al mes · cancela cuando quieras',
    features: ['Ventas ilimitadas', 'Control de stock completo', 'Cuaderno de fiados digital', 'Cierre de caja automático', 'Soporte por WhatsApp'],
    cta: 'Empezar gratis 14 días',
    ctaTo: '/login',
    accent: true,
  },
]

const footerLinks = [
  { heading: 'Producto', links: ['Funciones', 'Demo gratis', 'Precios', 'Novedades'] },
  { heading: 'Negocio', links: ['Abarrotes', 'Bodegas', 'Mercados'] },
  { heading: 'Soporte', links: ['WhatsApp', 'Contacto', 'Ayuda'] },
  { heading: 'Empresa', links: ['Sobre Tipealo', 'Blog', 'Privacidad'] },
]

export default function Landing() {
  const scrollRef  = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lenisRef   = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    const scroller = scrollRef.current!

    /* ── 1. Lenis — must be first so scrollerProxy exists before GSAP registers triggers ── */
    const lenis = new Lenis({
      wrapper:     scroller,
      content:     contentRef.current!,
      lerp:        0.065,
      smoothWheel: true,
      syncTouch:   false,
      autoRaf:     false,
    })
    lenisRef.current = lenis

    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) lenis.scrollTo(value, { immediate: true })
        return lenis.scroll
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: scroller.clientWidth, height: scroller.clientHeight }
      },
    })

    lenis.on('scroll', () => ScrollTrigger.update())

    const lenisTick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(lenisTick)
    gsap.ticker.lagSmoothing(0)

    /* ── 2. GSAP animations ── */
    const ctx = gsap.context(() => {

      /* ── HERO: clip-path wipe reveal ── */
      gsap.fromTo('.hero-h1',
        { clipPath: 'inset(0 0 100% 0)', y: 20 },
        { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'expo.out', delay: 0.1 }
      )
      gsap.from('.hero-sub', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.55 })
      gsap.fromTo('.hero-btns > *',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', delay: 0.75, stagger: 0.1 }
      )
      gsap.from('.hero-metric', { opacity: 0, y: 28, duration: 0.55, ease: 'power3.out', delay: 0.95, stagger: 0.09 })
      gsap.from('.hero-markets', { opacity: 0, duration: 0.5, delay: 1.25 })

      /* ── VENDOR SECTION ── */
      // photo wipe from left
      gsap.fromTo('.vendor-img-clip',
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.3, ease: 'expo.out',
          scrollTrigger: { trigger: '.vendor-section', start: 'top 70%', scroller },
        }
      )
      // parallax on photo
      gsap.to('.vendor-img', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: '.vendor-section', start: 'top bottom', end: 'bottom top', scrub: true, scroller },
      })
      // copy slides from right
      gsap.from('.vendor-copy > *', {
        opacity: 0, x: 50, duration: 0.85, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.vendor-section', start: 'top 65%', scroller },
      })

      /* ── STEPS ── */
      gsap.from('.steps-heading > *', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.steps-section', start: 'top 78%', scroller },
      })
      gsap.from('.step-card', {
        opacity: 0, y: 70, scale: 0.97, transformOrigin: 'bottom center',
        duration: 0.9, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: '.steps-section', start: 'top 65%', scroller },
      })

      /* ── COUNTERS ── */
      gsap.utils.toArray<HTMLElement>('.counter-val').forEach((el) => {
        const end = parseInt(el.dataset.val || '0')
        const obj = { val: 0 }
        gsap.to(obj, {
          val: end,
          duration: 2.5,
          ease: 'power2.out',
          snap: { val: 1 },
          scrollTrigger: { trigger: el, start: 'top 80%', scroller },
          onUpdate: () => { el.textContent = obj.val.toLocaleString('es-PE') },
        })
      })
      gsap.from('.counter-item', {
        opacity: 0, y: 50, duration: 0.8, ease: 'power3.out', stagger: 0.18,
        scrollTrigger: { trigger: '.counters-section', start: 'top 70%', scroller },
      })

      /* ── BIG TESTIMONIAL ── */
      gsap.fromTo('.testi-photo',
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '.big-testi-section', start: 'top 70%', scroller },
        }
      )
      gsap.from('.testi-quote > *', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.14,
        scrollTrigger: { trigger: '.big-testi-section', start: 'top 65%', scroller },
      })
      // smaller testimonial cards
      gsap.from('.testi-card', {
        opacity: 0, y: 50, duration: 0.75, ease: 'power3.out', stagger: 0.14,
        scrollTrigger: { trigger: '.mini-testis', start: 'top 70%', scroller },
      })

      /* ── PRICING ── */
      gsap.from('.price-heading > *', {
        opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing-section', start: 'top 78%', scroller },
      })
      gsap.from('.price-card', {
        opacity: 0, y: 70, scale: 0.95, transformOrigin: 'bottom center',
        duration: 0.9, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.pricing-section', start: 'top 65%', scroller },
      })

      /* ── SUPPORT ── */
      gsap.from('.support-content > *', {
        opacity: 0, y: 40, duration: 0.7, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.support-section', start: 'top 72%', scroller },
      })

      /* ── FOOTER ── */
      gsap.from('.footer-top', {
        opacity: 0, y: 30, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.footer-section', start: 'top 85%', scroller },
      })
      gsap.fromTo('.footer-brand',
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.footer-brand', start: 'top 90%', scroller },
        }
      )
    })

    return () => {
      ctx.revert()
      gsap.ticker.remove(lenisTick)
      lenis.destroy()
      ScrollTrigger.clearScrollMemory()
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = scrollRef.current?.querySelector(id) as HTMLElement | null
    if (el && lenisRef.current) lenisRef.current.scrollTo(el, { offset: -16 })
  }

  return (
    <motion.main
      className="h-svh overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div ref={scrollRef} className="h-full overflow-hidden no-scrollbar">
        <div ref={contentRef} className="overflow-x-hidden no-scrollbar">

        {/* ══════════════════════════════════════
            HERO — Grainient, full screen
        ══════════════════════════════════════ */}
        <section className="relative min-h-svh bg-white text-slate-950 flex flex-col px-4 py-3 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 z-0">
            <Grainient
              color1="#ffffff" color2="#0c61f3" color3="#ffffff"
              timeSpeed={0.25} colorBalance={0} warpStrength={1}
              warpFrequency={5} warpSpeed={2} warpAmplitude={50}
              blendAngle={0} blendSoftness={0.05} rotationAmount={500}
              noiseScale={2} grainAmount={0.2} grainScale={2}
              grainAnimated={false} contrast={1.5} gamma={1} saturation={1}
              centerX={0} centerY={0} zoom={0.9}
            />
          </div>

          <header className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center px-2 py-2 sm:px-4 sm:py-3">
            <p className="col-start-1 justify-self-start text-2xl font-extrabold tracking-[0.18em] text-black"
              style={{ fontFamily: 'Lora, serif' }}>TIPEALO</p>

            <nav className="col-start-2 hidden items-center gap-3 text-sm text-black md:flex md:justify-self-center">
              <button onClick={() => scrollTo('#vendor')} className="bg-black px-4 py-1.5 text-xs font-medium text-white cursor-pointer">Abarrotes</button>
              <button onClick={() => scrollTo('#vendor')} className="hover:text-black/60 transition-colors cursor-pointer">Bodegas</button>
              <button onClick={() => scrollTo('#vendor')} className="hover:text-black/60 transition-colors cursor-pointer">Mercados</button>
              <button onClick={() => scrollTo('#pricing')} className="hover:text-black/60 transition-colors cursor-pointer">Precios</button>
              <button onClick={() => scrollTo('#support')} className="hover:text-black/60 transition-colors cursor-pointer">Soporte</button>
            </nav>

            <div className="col-start-3 flex items-center gap-2 justify-self-end">
              <Link to="/login" className="hidden sm:inline-block px-4 py-2 text-sm font-medium text-black border border-black/20 bg-white transition hover:-translate-y-0.5 hover:shadow-sm">
                Iniciar sesión
              </Link>
              <Link to="/login" className="bg-black px-5 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-md">
                Regístrate
              </Link>
            </div>
          </header>

          <div className="relative z-10 flex flex-1 items-start md:items-center justify-center py-6 md:py-4">
            <div className="mx-auto w-full max-w-4xl text-center">
              <h1 className="hero-h1 mx-auto max-w-3xl text-[2.2rem] font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.2rem] pb-3"
                style={{ fontFamily: 'Lora, serif' }}>
                Sabe qué tienes, cuánto vendiste y cuánto ganaste — sin un papel.
              </h1>
              <p className="hero-sub mx-auto mt-4 max-w-xl text-sm leading-7 text-black/70 sm:text-base">
                Para el comerciante de abarrotes que no puede perder tiempo entre cuadernos.
              </p>
              <div className="hero-btns mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                <Link to="/login" className="text-center bg-black px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black/90 sm:px-7">
                  Empezar gratis
                </Link>
                <Link to="/demo" className="text-center border border-black/15 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md sm:px-7">
                  Ver cómo funciona →
                </Link>
              </div>
              <div className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
                {metrics.map((m) => (
                  <article key={m.label} className="hero-metric metric-card text-left">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white">{m.label}</p>
                    <p className="mt-2 text-[2.35rem] font-semibold leading-none text-white sm:text-[2.8rem]"
                      style={{ fontFamily: 'Lora, serif' }}>{m.value}</p>
                    <p className="mt-2 text-[1rem] leading-6 text-white">{m.detail}</p>
                  </article>
                ))}
              </div>
              <div className="hero-markets mt-8">
                <p className="text-xs text-black">Comerciantes que ya tipearon hoy</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-black">
                  {['Mercado Central · Lima', 'La Parada · La Victoria', 'Santa Anita', 'Caquetá · San Martín', 'Ventanilla'].map(m => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a href="https://www.linkedin.com/in/jair-quispe/" target="_blank" rel="noopener noreferrer"
            className="relative z-10 mt-4 self-start text-sm font-semibold text-black sm:absolute sm:bottom-3 sm:left-4 sm:mt-0">
            Powered by JQ
          </a>
        </section>

        {/* ══════════════════════════════════════
            VENDOR — split photo / copy
        ══════════════════════════════════════ */}
        <section id="vendor" className="vendor-section min-h-svh flex flex-col md:flex-row"
          style={{ background: '#000', fontFamily: 'Lora, serif' }}>

          {/* Photo side */}
          <div className="vendor-img-clip relative overflow-hidden h-64 md:h-auto md:w-[55%] flex-shrink-0">
            <img
              src={IMGS.vendorWoman}
              alt="Vendedora en mercado"
              className="vendor-img absolute inset-0 w-full h-full object-cover object-center scale-[1.25]"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Copy side */}
          <div className="vendor-copy flex flex-1 flex-col justify-center px-5 py-8 md:px-10 md:py-12 lg:px-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/30 mb-6"
              style={{ fontFamily: 'system-ui, sans-serif' }}>Para ti</p>
            <h2 className="text-[2.2rem] sm:text-[3.4rem] lg:text-[4.2rem] font-semibold text-white leading-[0.9] tracking-tight mb-6">
              Cada día<br />das lo mejor.
            </h2>
            <p className="text-[1rem] text-white/50 leading-relaxed max-w-sm mb-4"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              Trabajas desde las 6 de la mañana hasta la noche. Pero al cerrar…
              ¿sabes cuánto ganaste realmente? ¿Qué se vendió? ¿Qué falta pedir?
            </p>
            <p className="text-[1.05rem] text-white leading-relaxed max-w-sm mb-9 font-medium"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              Tipealo te da esas respuestas en segundos.
            </p>
            <Link to="/demo"
              className="self-start bg-white px-7 py-3.5 text-sm font-bold text-black hover:bg-white/90 transition-colors"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              Ver cómo funciona →
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════
            STEPS — cómo funciona
        ══════════════════════════════════════ */}
        <section className="steps-section min-h-svh flex flex-col justify-center bg-white px-5 py-16 sm:px-8 lg:px-12">

          <div className="steps-heading mb-10 md:mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-black/30 mb-3"
              style={{ fontFamily: 'system-ui, sans-serif' }}>Así de simple</p>
            <h2 className="text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold leading-[0.93] tracking-tight text-slate-950"
              style={{ fontFamily: 'Lora, serif' }}>
              Tres pasos.<br />Todo bajo control.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {steps.map((s) => (
              <div key={s.n} className="step-card flex flex-col overflow-hidden"
                style={{ background: 'rgba(0,0,0,0.93)' }}>
                <div className="relative h-44 overflow-hidden">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50" />
                  <p className="absolute bottom-3 left-4 text-[10px] font-bold tracking-[0.45em] text-white/40"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>{s.n}</p>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-[1.2rem] font-semibold text-white leading-snug mb-3"
                    style={{ fontFamily: 'Lora, serif' }}>{s.title}</h3>
                  <p className="text-[0.9rem] leading-relaxed text-white/45"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            COUNTERS — animated stats with bg photo
        ══════════════════════════════════════ */}
        <section className="counters-section min-h-svh relative flex items-center justify-center px-5 py-16 sm:px-8 lg:px-12 overflow-hidden">
          {/* Background photo with dark overlay */}
          <div className="absolute inset-0">
            <img src={IMGS.marketScene} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/88" />
          </div>

          <div className="relative z-10 w-full max-w-5xl">
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-white/30 mb-14"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              En números
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
              {statCounters.map((s) => (
                <div key={s.label} className="counter-item">
                  <p className="text-[3.5rem] sm:text-[4.5rem] lg:text-[6rem] font-semibold text-white leading-none"
                    style={{ fontFamily: 'Lora, serif' }}>
                    <span className="counter-val" data-val={String(s.val)}>0</span>
                    {s.suffix && <span className="text-white/50">{s.suffix}</span>}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/30"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            BIG TESTIMONIAL
        ══════════════════════════════════════ */}
        <section className="big-testi-section min-h-svh bg-white flex items-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="w-full max-w-6xl mx-auto">

            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
              {/* Photo */}
              <div className="testi-photo relative w-full max-w-xs lg:max-w-none lg:w-80 h-80 lg:h-[480px] flex-shrink-0 overflow-hidden">
                <img
                  src={IMGS.marketFruits}
                  alt="María López"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Quote */}
              <div className="testi-quote flex-1">
                <p className="text-[10px] font-bold tracking-[0.4em] text-black/25 mb-7"
                  style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Caso de éxito
                </p>
                <p className="text-[1.6rem] sm:text-[2.6rem] lg:text-[3rem] font-semibold text-slate-950 leading-[1.08] tracking-tight mb-8"
                  style={{ fontFamily: 'Lora, serif' }}>
                  "Recuperé S/ 420 que tenía olvidados en fiados. Nunca los habría recordado sin Tipealo."
                </p>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-9 h-9 bg-[#0c61f3] flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-bold text-white"
                      style={{ fontFamily: 'system-ui, sans-serif' }}>ML</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black"
                      style={{ fontFamily: 'system-ui, sans-serif' }}>María López</p>
                    <p className="text-[11px] text-black/40"
                      style={{ fontFamily: 'system-ui, sans-serif' }}>La Parada · La Victoria, Lima</p>
                  </div>
                </div>
                <Link to="/demo"
                  className="inline-block border border-black/15 px-7 py-3 text-sm font-medium text-black hover:-translate-y-0.5 hover:shadow-md transition-all"
                  style={{ fontFamily: 'system-ui, sans-serif' }}>
                  Ver el demo →
                </Link>
              </div>
            </div>

            {/* Small testimonial cards */}
            <div className="mini-testis grid grid-cols-1 md:grid-cols-3 gap-4 mt-14">
              {testimonials.map((t) => (
                <div key={t.name} className="testi-card p-6 flex flex-col"
                  style={{ background: 'rgba(0,0,0,0.93)' }}>
                  <p className="text-[0.9rem] font-medium text-white leading-relaxed flex-1"
                    style={{ fontFamily: 'Lora, serif' }}>"{t.quote}"</p>
                  <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0c61f3] flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-white"
                        style={{ fontFamily: 'system-ui, sans-serif' }}>{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-[12px] font-semibold text-white"
                        style={{ fontFamily: 'system-ui, sans-serif' }}>{t.name}</p>
                      <p className="text-[10px] text-white/35"
                        style={{ fontFamily: 'system-ui, sans-serif' }}>{t.place}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            PRICING
        ══════════════════════════════════════ */}
        <section id="pricing" className="pricing-section min-h-svh flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12"
          style={{ background: '#0a0a0a' }}>

          <div className="price-heading mb-10 md:mb-14 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/30 mb-3"
              style={{ fontFamily: 'system-ui, sans-serif' }}>Precios</p>
            <h2 className="text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold leading-[0.93] tracking-tight text-white"
              style={{ fontFamily: 'Lora, serif' }}>Sin sorpresas.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
            {pricing.map((p) => (
              <div key={p.name} className="price-card flex flex-col"
                style={{ background: p.accent ? '#0c61f3' : 'rgba(255,255,255,0.05)' }}>
                <div className="p-7 md:p-9 flex-1" style={{ fontFamily: 'Lora, serif' }}>
                  <div className="flex items-baseline justify-between mb-6">
                    <p className="text-[11px] font-bold tracking-[0.35em] text-white/60"
                      style={{ fontFamily: 'system-ui, sans-serif' }}>{p.name.toUpperCase()}</p>
                    {p.accent && (
                      <span className="text-[10px] font-bold tracking-wide bg-white/20 text-white px-2 py-0.5"
                        style={{ fontFamily: 'system-ui, sans-serif' }}>POPULAR</span>
                    )}
                  </div>
                  <p className="text-[3rem] font-semibold text-white leading-none">{p.price}</p>
                  <p className="text-[11px] text-white/50 mt-1.5 mb-7"
                    style={{ fontFamily: 'system-ui, sans-serif' }}>{p.priceSub}</p>
                  <ul className="space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <svg className="shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke={p.accent ? 'white' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-[0.85rem] text-white/70"
                          style={{ fontFamily: 'system-ui, sans-serif' }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 pb-7 md:px-9 md:pb-9">
                  <Link to={p.ctaTo}
                    className="block w-full py-3.5 text-center text-sm font-bold transition-all"
                    style={{
                      fontFamily: 'system-ui, sans-serif',
                      background: p.accent ? 'white' : 'rgba(255,255,255,0.1)',
                      color: p.accent ? '#0c61f3' : 'white',
                    }}>
                    {p.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SOPORTE
        ══════════════════════════════════════ */}
        <section id="support" className="support-section min-h-svh relative flex items-center overflow-hidden px-5 sm:px-8 lg:px-12">
          <div className="pointer-events-none absolute inset-0">
            <Grainient
              color1="#000000" color2="#0c61f3" color3="#000000"
              timeSpeed={0.18} colorBalance={0} warpStrength={0.7}
              warpFrequency={4} warpSpeed={1.2} warpAmplitude={35}
              blendAngle={0} blendSoftness={0.05} rotationAmount={280}
              noiseScale={2} grainAmount={0.12} grainScale={2}
              grainAnimated={false} contrast={2.2} gamma={1} saturation={0.7}
              centerX={0} centerY={0} zoom={0.9}
            />
          </div>
          <div className="relative z-10 support-content max-w-2xl py-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/30 mb-5"
              style={{ fontFamily: 'system-ui, sans-serif' }}>Soporte</p>
            <h2 className="text-[2.2rem] sm:text-[3.8rem] lg:text-[5rem] font-semibold leading-[0.92] tracking-tight text-white mb-6"
              style={{ fontFamily: 'Lora, serif' }}>
              ¿Tienes<br />alguna duda?
            </h2>
            <p className="text-[1rem] text-white/40 mb-9 max-w-md leading-relaxed"
              style={{ fontFamily: 'system-ui, sans-serif' }}>
              Somos un equipo pequeño que responde rápido. Si algo no funciona o tienes una pregunta, escríbenos y te ayudamos hoy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="https://wa.me/51987654321" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#20bc5a] transition-colors"
                style={{ fontFamily: 'system-ui, sans-serif' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribir por WhatsApp
              </a>
              <a href="mailto:hola@tipealo.pe"
                className="border border-white/20 px-7 py-3.5 text-sm font-medium text-white/60 hover:text-white hover:border-white/40 transition-all"
                style={{ fontFamily: 'system-ui, sans-serif' }}>
                hola@tipealo.pe
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="footer-section bg-black px-5 pt-14 sm:px-8 lg:px-12"
          style={{ fontFamily: 'system-ui, sans-serif' }}>

          <div className="footer-top grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 pb-12 border-b border-white/8">
            <div className="col-span-2 md:col-span-1">
              <p className="text-lg font-extrabold tracking-[0.18em] text-white mb-3"
                style={{ fontFamily: 'Lora, serif' }}>TIPEALO</p>
              <p className="text-[12px] text-white/35 leading-relaxed max-w-[160px] mb-5">
                Para el comerciante que no puede perder tiempo.
              </p>
              <a href="https://www.linkedin.com/in/jair-quispe/" target="_blank" rel="noopener noreferrer"
                className="inline-flex w-8 h-8 items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/30 transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            {footerLinks.map((group) => (
              <div key={group.heading}>
                <p className="text-[10px] font-bold tracking-[0.35em] text-white/30 mb-4 uppercase">{group.heading}</p>
                <ul className="space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[13px] text-white/45 hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[11px] text-white/25">© 2025 Tipealo. Todos los derechos reservados.</p>
            <p className="text-[11px] text-white/20">Hecho para los mercados del Perú 🇵🇪</p>
          </div>

          {/* Big brand name */}
          <div className="footer-brand overflow-hidden -mx-5 sm:-mx-8 lg:-mx-12">
            <p className="text-[22vw] font-extrabold leading-[0.78] tracking-tight text-white/[0.035] select-none text-center pb-0"
              style={{ fontFamily: 'Lora, serif' }}>
              TIPEALO
            </p>
          </div>
        </footer>

        </div>{/* contentRef — Lenis translates this */}
      </div>{/* scrollRef wrapper */}
      <Mascot />
    </motion.main>
  )
}

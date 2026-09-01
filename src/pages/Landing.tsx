import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import Grainient from '../components/Grainient'
import Mascot from '../components/Mascot'
import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'
import FeatureBento from '../components/FeatureBento'
import {
  QuoteIcon, WhatsAppIcon, PhoneIcon, MailIcon, ClockIcon,
  ChatIcon, PeruMarkIcon, LinkedInIcon, CheckIcon,
} from '../components/icons'

/* ── Fotos de mercados peruanos, servidas desde /public/img — sin CDN externo.
      Licencia Pexels: uso comercial libre, sin atribución obligatoria. ── */
const IMGS = {
  vendorWoman:  '/img/senora-puesto.jpg',      // señora en su puesto de frutas
  marketFruits: '/img/pasadizo-mercado.jpg',   // pasadizo de mercado andino
  marketScene:  '/img/calle-mercado.jpg',      // calle de mercado, Huaraz
  groceryStore: '/img/mercado-pescado.jpg',    // mercado de pescado con balanzas
  marketStall:  '/img/puesto-abarrotes.jpg',   // puesto con cajas y carteles de precio a mano
  testimonial:  '/img/puesto-frutas.jpg',      // puesto de frutas, Lima
}

const metrics = [
  { label: 'Ventas de hoy',     to: 2090,  prefix: 'S/ ', detail: 'registradas sin tocar un cuaderno' },
  { label: 'Stock al instante', to: 344,   prefix: '',    detail: 'productos — sabes qué tienes y qué falta' },
  { label: 'Ganancia del mes',  to: 18420, prefix: 'S/ ', detail: 'sin contarlo a mano ni un sol' },
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
    const lenis = new Lenis({
      wrapper:     scroller,
      content:     contentRef.current!,
      lerp:        0.065,
      smoothWheel: true,
      syncTouch:   false,
      autoRaf:     true,
    })
    lenisRef.current = lenis

    return () => {
      lenis.destroy()
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
              <button onClick={() => scrollTo('#funciones')} className="hover:text-black/60 transition-colors cursor-pointer">Funciones</button>
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
              <motion.p
                className="mb-4 inline-flex items-center gap-2 border border-black/12 bg-white/70 px-3.5 py-2 text-[14px] font-semibold text-black backdrop-blur-sm"
               
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0c61f3]" />
                Hecho para los mercados del Perú · desde S/ 19.90 al mes
              </motion.p>

              <motion.h1
                className="hero-h1 mx-auto max-w-3xl text-[2.2rem] font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.2rem] pb-3"
                style={{ fontFamily: 'Lora, serif' }}
                initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                Lo que vendiste, lo que te deben y lo que te falta. Todo en el celular.
              </motion.h1>

              <motion.p
                className="hero-sub mx-auto mt-4 max-w-xl text-sm leading-7 text-black/80 sm:text-base"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                Ventas, fiados, stock y proveedores. Sin computadora, sin contador y sin dejar de atender.
              </motion.p>

              <motion.div
                className="hero-btns mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to="/login" className="text-center bg-black px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black/90 sm:px-7">
                  Empezar gratis
                </Link>
                <Link to="/demo" className="text-center border border-black/15 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md sm:px-7">
                  Ver cómo funciona →
                </Link>
              </motion.div>

              <div className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
                {metrics.map((m, i) => (
                  <motion.article
                    key={m.label} className="hero-metric metric-card text-left"
                    initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.7, delay: 0.42 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-[13px] font-semibold uppercase tracking-[0.26em] text-white">{m.label}</p>
                    <p className="mt-2 text-[2.35rem] font-semibold leading-none text-white sm:text-[2.8rem]"
                      style={{ fontFamily: 'Lora, serif' }}>
                      <CountUp to={m.to} prefix={m.prefix} duration={2.2} />
                    </p>
                    <p className="mt-2 text-[1rem] leading-6 text-white">{m.detail}</p>
                  </motion.article>
                ))}
              </div>

              <div className="hero-markets mt-8">
                <p className="text-xs text-black">Comerciantes que ya tipearon hoy</p>
                <div className="marquee-mask mt-2.5">
                  <div className="marquee-track text-sm text-black/80">
                    {[0, 1].map(dup => (
                      <div key={dup} className="marquee-group" aria-hidden={dup === 1}>
                        {['Mercado Central · Lima', 'La Parada · La Victoria', 'Santa Anita', 'Caquetá · San Martín', 'Ventanilla', 'Mercado de Surquillo', 'Unicachi · Comas'].map(m => (
                          <span key={m} className="marquee-item">
                            <span className="mr-6 inline-block h-1 w-1 rounded-full bg-[#0c61f3] align-middle" />
                            {m}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
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
          <div className="vendor-img-clip relative overflow-hidden h-64 md:h-auto md:w-[55%] shrink-0">
            <img
              src={IMGS.vendorWoman}
              alt="Señora vendiendo frutas en su puesto de mercado"
              className="vendor-img absolute inset-0 w-full h-full object-cover object-center scale-[1.25]"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>

          {/* Copy side */}
          <div className="vendor-copy flex flex-1 flex-col justify-center px-5 py-8 md:px-10 md:py-12 lg:px-16">
            <Reveal>
              <p className="text-[13px] font-semibold uppercase tracking-[0.4em] text-white/65 mb-6"
               >Para ti</p>
              <h2 className="text-[2.2rem] sm:text-[3.4rem] lg:text-[4.2rem] font-semibold text-white leading-[0.9] tracking-tight mb-6">
                Cada día<br />das lo mejor.
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-[1rem] text-white/78 leading-relaxed max-w-sm mb-4"
               >
                Trabajas desde las 6 de la mañana hasta la noche. Pero al cerrar…
                ¿sabes cuánto ganaste realmente? ¿Qué se vendió? ¿Quién te quedó debiendo?
              </p>
              <p className="text-[1.05rem] text-white leading-relaxed max-w-sm mb-9 font-medium"
               >
                Tipealo te da esas respuestas en segundos.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <Link to="/demo"
                className="inline-block bg-white px-7 py-3.5 text-sm font-bold text-black hover:bg-white/90 transition-colors"
               >
                Ver cómo funciona →
              </Link>
            </Reveal>
          </div>
        </section>

        {/* ══════════════════════════════════════
            FUNCIONES — bento: fiados, ventas, stock, proveedores
        ══════════════════════════════════════ */}
        <FeatureBento />

        {/* ══════════════════════════════════════
            STEPS — cómo funciona
        ══════════════════════════════════════ */}
        <section className="steps-section min-h-svh flex flex-col justify-center bg-white px-5 py-16 sm:px-8 lg:px-12">

          <Reveal className="steps-heading mb-10 md:mb-14">
            <p className="text-[13px] font-semibold uppercase tracking-[0.35em] text-black/65 mb-3"
             >Así de simple</p>
            <h2 className="text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold leading-[0.93] tracking-tight text-slate-950"
              style={{ fontFamily: 'Lora, serif' }}>
              Tres pasos.<br />Todo bajo control.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.14} wipe className="h-full">
                <div className="step-card group flex h-full flex-col overflow-hidden"
                  style={{ background: 'rgba(0,0,0,0.93)' }}>
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.img} alt={s.title} loading="lazy" decoding="async"
                      className="w-full h-full object-cover transition-transform duration-900 ease-out group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/50" />
                    <p className="absolute bottom-3 left-4 text-[12px] font-bold tracking-[0.45em] text-white/72"
                     >{s.n}</p>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-[1.2rem] font-semibold text-white leading-snug mb-3"
                      style={{ fontFamily: 'Lora, serif' }}>{s.title}</h3>
                    <p className="text-[1.05rem] leading-relaxed text-white/75"
                     >{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            COUNTERS — animated stats with bg photo
        ══════════════════════════════════════ */}
        <section className="counters-section min-h-svh relative flex items-center justify-center px-5 py-16 sm:px-8 lg:px-12 overflow-hidden">
          {/* Background photo with dark overlay */}
          <div className="absolute inset-0">
            <img src={IMGS.marketScene} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/88" />
          </div>

          <div className="relative z-10 w-full max-w-5xl">
            <p className="text-center text-[13px] font-semibold uppercase tracking-[0.35em] text-white/65 mb-14"
             >
              En números
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-center">
              {statCounters.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.12} className="counter-item">
                  <p className="text-[3.5rem] sm:text-[4.5rem] lg:text-[6rem] font-semibold text-white leading-none"
                    style={{ fontFamily: 'Lora, serif' }}>
                    <CountUp to={s.val} duration={2.6} />
                    {s.suffix && <span className="text-white/78">{s.suffix}</span>}
                  </p>
                  <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.3em] text-white/65"
                   >{s.label}</p>
                </Reveal>
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
              <Reveal wipe className="testi-photo relative w-full max-w-xs lg:max-w-none lg:w-80 h-80 lg:h-120 shrink-0 overflow-hidden">
                <img
                  src={IMGS.testimonial}
                  alt="Puesto de frutas en un mercado de Lima"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
              </Reveal>

              {/* Quote */}
              <Reveal delay={0.15} className="testi-quote flex-1">
                <p className="text-[13px] font-bold tracking-[0.4em] text-black/62 mb-7"
                 >
                  Caso de éxito
                </p>
                <p className="text-[1.6rem] sm:text-[2.6rem] lg:text-[3rem] font-semibold text-slate-950 leading-[1.08] tracking-tight mb-8"
                  style={{ fontFamily: 'Lora, serif' }}>
                  "Recuperé S/ 420 que tenía olvidados en fiados. Nunca los habría recordado sin Tipealo."
                </p>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-9 h-9 bg-[#0c61f3] flex items-center justify-center shrink-0">
                    <span className="text-[13px] font-bold text-white"
                     >ML</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black"
                     >María López</p>
                    <p className="text-[17px] text-black/80"
                     >La Parada · La Victoria, Lima</p>
                  </div>
                </div>
                <Link to="/demo"
                  className="inline-block border border-black/15 px-7 py-3 text-sm font-medium text-black hover:-translate-y-0.5 hover:shadow-md transition-all"
                 >
                  Ver el demo →
                </Link>
              </Reveal>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            TESTIMONIOS — tres voces
        ══════════════════════════════════════ */}
        <section className="testis-section min-h-svh bg-white flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12">
          <div className="w-full max-w-6xl mx-auto">

            <Reveal className="mb-10 md:mb-14">
              <p className="text-[13px] font-bold uppercase tracking-[0.35em] text-black/65 mb-3">
                Lo que dicen
              </p>
              <h2 className="text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold leading-[0.95] tracking-tight text-slate-950"
                style={{ fontFamily: 'Lora, serif' }}>
                Comerciantes<br />como tú.
              </h2>
            </Reveal>

            <div className="mini-testis grid grid-cols-1 md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.14} wipe className="testi-card p-7 flex flex-col h-full"
                  style={{ background: 'rgba(0,0,0,0.93)' }}>
                  <QuoteIcon />
                  <p className="mt-4 text-[1.15rem] font-medium text-white leading-relaxed flex-1"
                    style={{ fontFamily: 'Lora, serif' }}>{t.quote}</p>
                  <div className="mt-6 pt-5 border-t border-white/15 flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0c61f3] flex items-center justify-center shrink-0">
                      <span className="text-[13px] font-bold text-white">{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-white">{t.name}</p>
                      <p className="text-[14px] text-white/68">{t.place}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            PRICING
        ══════════════════════════════════════ */}
        <section id="pricing" className="pricing-section min-h-svh flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-12"
          style={{ background: '#0a0a0a' }}>

          <Reveal className="price-heading mb-10 md:mb-14 text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.35em] text-white/65 mb-3"
             >Precios</p>
            <h2 className="text-[2rem] sm:text-[3.2rem] lg:text-[3.8rem] font-semibold leading-[0.93] tracking-tight text-white"
              style={{ fontFamily: 'Lora, serif' }}>Sin sorpresas.</h2>
            <p className="mt-4 text-[0.95rem] text-white/72">
              Menos de lo que cuesta un menú a la semana.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full">
            {pricing.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.14} wipe className="price-card flex flex-col h-full"
                style={{ background: p.accent ? '#0c61f3' : 'rgba(255,255,255,0.05)' }}>
                <div className="p-7 md:p-9 flex-1" style={{ fontFamily: 'Lora, serif' }}>
                  <div className="flex items-baseline justify-between mb-6">
                    <p className="text-[13px] font-bold tracking-[0.35em] text-white/80"
                     >{p.name.toUpperCase()}</p>
                    {p.accent && (
                      <span className="text-[12px] font-bold tracking-wide bg-white/20 text-white px-2 py-0.5"
                       >POPULAR</span>
                    )}
                  </div>
                  <p className="text-[3rem] font-semibold text-white leading-none">{p.price}</p>
                  <p className="text-[17px] text-white/78 mt-1.5 mb-7"
                   >{p.priceSub}</p>
                  <ul className="space-y-2.5">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckIcon size={17} className={`shrink-0 mt-1 ${p.accent ? 'text-white' : 'text-[#5b9fff]'}`} />
                        <span className="text-[1.08rem] leading-snug text-white/85">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-7 pb-7 md:px-9 md:pb-9">
                  <Link to={p.ctaTo}
                    className="block w-full py-3.5 text-center text-sm font-bold transition-all"
                    style={{
                      background: p.accent ? 'white' : 'rgba(255,255,255,0.1)',
                      color: p.accent ? '#0c61f3' : 'white',
                    }}>
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            SOPORTE
        ══════════════════════════════════════ */}
        <section id="support" className="support-section min-h-svh relative flex items-center overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
          {/* fondo cálido: crema y ámbar en vez del azul frío */}
          <div className="pointer-events-none absolute inset-0" style={{ background: '#f7efe2' }}>
            <Grainient
              color1="#f9f3e8" color2="#f0b45c" color3="#f9f3e8"
              timeSpeed={0.16} colorBalance={0.1} warpStrength={0.9}
              warpFrequency={3} warpSpeed={1} warpAmplitude={45}
              blendAngle={15} blendSoftness={0.2} rotationAmount={260}
              noiseScale={1.8} grainAmount={0.1} grainScale={2}
              grainAnimated={false} contrast={1.15} gamma={1} saturation={1.1}
              centerX={0.25} centerY={-0.1} zoom={0.85}
            />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

            {/* Mensaje */}
            <Reveal>
              <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.35em] text-[#8a5a1c]">
                Estamos para ayudarte
              </p>
              <h2 className="mb-7 text-[2.4rem] font-semibold leading-[0.95] tracking-tight text-[#231708] sm:text-[3.6rem] lg:text-[4.4rem]"
                style={{ fontFamily: 'Lora, serif' }}>
                ¿Necesitas ayuda?<br />Te contesta<br />una persona.
              </h2>
              <p className="max-w-lg text-[1.25rem] leading-[1.7] text-[#3d2c16]">
                Nada de robots ni menús de opciones. Escríbenos por WhatsApp y
                te respondemos el mismo día, en palabras simples. Si prefieres,
                te llamamos nosotros.
              </p>
            </Reveal>

            {/* Tarjeta de contacto */}
            <Reveal delay={0.15}>
              <div className="border-2 border-[#231708]/12 bg-white/85 p-7 backdrop-blur-sm sm:p-9">

                <a
                  href="https://wa.me/51907425900"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 bg-[#1faa53] px-6 py-5 text-[1.2rem] font-bold text-white transition-colors hover:bg-[#178a43]"
                >
                  <WhatsAppIcon size={26} />
                  Escríbenos por WhatsApp
                </a>

                <a
                  href="tel:+51907425900"
                  className="mt-3 flex w-full items-center justify-center gap-3 border-2 border-[#231708] px-6 py-5 text-[1.2rem] font-bold text-[#231708] transition-colors hover:bg-[#231708] hover:text-white"
                >
                  <PhoneIcon size={24} strokeWidth={1.9} />
                  907 425 900
                </a>

                <ul className="mt-8 space-y-5 border-t-2 border-[#231708]/10 pt-7">
                  <li className="flex items-start gap-4">
                    <ClockIcon size={26} className="mt-0.5 shrink-0 text-[#8a5a1c]" />
                    <span className="text-[1.08rem] leading-snug text-[#3d2c16]">
                      Lunes a sábado, de <strong className="font-semibold text-[#231708]">6 a.m. a 8 p.m.</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <ChatIcon size={26} className="mt-0.5 shrink-0 text-[#8a5a1c]" />
                    <span className="text-[1.08rem] leading-snug text-[#3d2c16]">
                      Te explicamos paso a paso, <strong className="font-semibold text-[#231708]">sin términos raros</strong>
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <MailIcon size={26} className="mt-0.5 shrink-0 text-[#8a5a1c]" />
                    <a href="mailto:hola@tipealo.pe"
                      className="text-[1.08rem] leading-snug text-[#3d2c16] underline underline-offset-4 hover:text-[#231708]">
                      hola@tipealo.pe
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>

          </div>
        </section>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer className="footer-section min-h-svh flex flex-col justify-center bg-black px-5 pt-14 sm:px-8 lg:px-12">

          <div className="footer-top grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 pb-12 border-b border-white/15">
            <div className="col-span-2 md:col-span-1">
              <p className="text-lg font-extrabold tracking-[0.18em] text-white mb-3"
                style={{ fontFamily: 'Lora, serif' }}>TIPEALO</p>
              <p className="text-[14px] text-white/68 leading-relaxed max-w-40 mb-5">
                Para el comerciante que no puede perder tiempo.
              </p>
              <a href="https://www.linkedin.com/in/jair-quispe/" target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn de Jair Quispe"
                className="inline-flex w-10 h-10 items-center justify-center border border-white/25 text-white/72 hover:text-white hover:border-white/50 transition-all">
                <LinkedInIcon size={16} />
              </a>
            </div>

            {footerLinks.map((group) => (
              <div key={group.heading}>
                <p className="text-[13px] font-bold tracking-[0.35em] text-white/65 mb-4 uppercase">{group.heading}</p>
                <ul className="space-y-2.5">
                  {group.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-[17px] text-white/75 hover:text-white transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <p className="text-[17px] text-white/62">© 2025 Tipealo. Todos los derechos reservados.</p>
            <p className="flex items-center gap-2.5 text-[17px] text-white/80">
              <PeruMarkIcon size={14} className="shrink-0 text-white/60" />
              Hecho para los mercados del Perú
            </p>
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

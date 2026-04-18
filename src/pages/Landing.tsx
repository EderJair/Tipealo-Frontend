import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Grainient from '../components/Grainient'
import Mascot from '../components/Mascot'

const metrics = [
  {
    label: 'Ventas de hoy',
    value: 'S/ 2,090',
    detail: 'registradas sin tocar un cuaderno',
  },
  {
    label: 'Stock al instante',
    value: '344',
    detail: 'productos — sabes qué tienes y qué falta',
  },
  {
    label: 'Ganancia del mes',
    value: 'S/ 18,420',
    detail: 'sin contarlo a mano ni un sol',
  },
]

export default function Landing() {
  return (
    <motion.main
      className="relative min-h-svh bg-white text-slate-950 md:h-svh md:overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(6px)' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 opacity-100">
        <Grainient
          color1="#ffffff"
          color2="#0c61f3"
          color3="#ffffff"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.2}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <div className="relative z-10 flex min-h-svh w-full flex-col px-4 py-3 sm:px-6 lg:px-8 md:h-svh">
        <header className="grid grid-cols-[1fr_auto_1fr] items-center bg-transparent px-2 py-2 sm:px-4 sm:py-3">
          <p className="col-start-1 justify-self-start text-2xl font-extrabold tracking-[0.18em] text-black">TIPEALO</p>

          <nav className="col-start-2 hidden items-center gap-3 text-sm text-black md:flex md:justify-self-center">
            <a href="#" className="border-black/30 bg-black px-4 py-1.5 text-xs font-medium text-white">
              Abarrotes
            </a>
            <a href="#" className="text-sm text-black">Bodegas</a>
            <a href="#" className="text-sm text-black">Mercados</a>
            <a href="#" className="text-sm text-black">Precios</a>
            <a href="#" className="text-sm text-black">Blog</a>
            <a href="#" className="text-sm text-black">Soporte</a>
          </nav>

          <a
            href="#contacto"
            className="col-start-3 justify-self-end border-black/30 bg-black px-5 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Sign up
          </a>
        </header>

        <section className="relative flex flex-1 items-start justify-center py-4 md:items-center md:py-3">
          <div className="relative mx-auto w-full max-w-4xl pt-4 text-center sm:pt-6 md:pt-0">

            <h1 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight text-slate-950 sm:text-5xl lg:text-[4.2rem]">
              Sabe qué tienes, cuánto vendiste y cuánto ganaste — sin un papel.
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-black sm:text-base">
              Para el comerciante de abarrotes que no puede perder tiempo entre cuadernos.
              Registra cada venta en segundos, ve qué se está acabando y cierra el día
              sabiendo exactamente cuánto entraste.
            </p>

            <div className="mt-4 flex flex-row items-center justify-center gap-3">
              <a
                href="#contacto"
                className="bg-black px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black/90 sm:px-7"
              >
                Empezar gratis
              </a>
              <Link
                to="/demo"
                className="border border-black/15 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md sm:px-7"
              >
                Ver cómo funciona →
              </Link>
            </div>

            <div className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="metric-card text-left"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white">{metric.label}</p>
                  <p className="font-display mt-2 text-[2.35rem] font-semibold leading-none text-white sm:text-[2.8rem]">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-[1rem] leading-6 text-white">{metric.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 md:mt-12">
              <p className="text-xs text-black">Comerciantes que ya tipearon hoy</p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-black">
                <span>Mercado Central · Lima</span>
                <span>La Parada · La Victoria</span>
                <span>Santa Anita</span>
                <span>Caquetá · San Martín</span>
                <span>Ventanilla</span>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="sr-only">
          Próximamente
        </section>

        <a
          href="https://www.linkedin.com/in/jair-quispe/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 self-start text-sm font-semibold text-black transition hover:text-black sm:absolute sm:bottom-3 sm:left-4 sm:mt-0"
        >
          Powered by JQ
        </a>
      </div>
      <Mascot />
    </motion.main>
  )
}

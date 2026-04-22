import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Grainient from '../components/Grainient'
import Mascot from '../components/Mascot'

export default function Login() {
  return (
    <motion.main
      className="flex min-h-svh md:h-svh"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* LEFT: dark panel with big phrase — desktop only */}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-between p-10 lg:p-14" style={{ fontFamily: 'Lora, serif' }}>
        <Link to="/" className="text-2xl font-extrabold tracking-[0.18em] text-white">
          TIPEALO
        </Link>

        <div>
          <h1 className="text-[3.6rem] lg:text-[4.4rem] font-semibold text-white leading-[0.92] tracking-tight">
            Tu negocio,<br />claro<br />como nunca.
          </h1>
          <p className="mt-5 text-[1rem] text-white/40 leading-relaxed max-w-xs">
            Para el comerciante que quiere saber exactamente cuánto vendió hoy.
          </p>
          <div className="mt-8 flex gap-6">
            <div>
              <p className="text-[1.6rem] font-semibold text-white leading-none">S/ 2,090</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mt-1">ventas hoy</p>
            </div>
            <div>
              <p className="text-[1.6rem] font-semibold text-white leading-none">344</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mt-1">productos</p>
            </div>
            <div>
              <p className="text-[1.6rem] font-semibold text-white leading-none">S/ 18,420</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mt-1">este mes</p>
            </div>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/jair-quispe/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-white/30 hover:text-white/60 transition-colors"
        >
          Powered by JQ
        </a>
      </div>

      {/* RIGHT: gradient + form */}
      <div className="relative flex flex-1 flex-col min-h-svh md:min-h-0">

        {/* Grainient background */}
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

        {/* Mobile header */}
        <header className="relative z-10 flex items-center justify-between px-5 py-4 md:hidden">
          <Link to="/" className="text-2xl font-extrabold tracking-[0.18em] text-black">
            TIPEALO
          </Link>
          <Link to="/" className="bg-white border border-black/15 px-4 py-2 text-sm font-medium text-black hover:-translate-y-0.5 transition-transform">
            ← Volver
          </Link>
        </header>

        {/* Desktop back button */}
        <div className="relative z-10 hidden md:flex justify-end px-8 pt-6">
          <Link to="/" className="bg-white border border-black/15 px-4 py-2 text-sm font-medium text-black hover:-translate-y-0.5 hover:shadow-sm transition-all">
            ← Volver al inicio
          </Link>
        </div>

        {/* Form */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-6 md:px-6 md:py-10">
          <div className="w-full max-w-[340px]">

            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-black mb-2 md:mb-3">
              Bienvenido de vuelta
            </p>
            <h1 className="text-[2rem] md:text-[2.6rem] font-semibold leading-none tracking-tight text-slate-950 mb-6 md:mb-8"
              style={{ fontFamily: 'Lora, serif' }}>
              Inicia sesión
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-black mb-1.5">
                  Teléfono o correo
                </label>
                <input
                  type="text"
                  placeholder="987 654 321"
                  className="w-full bg-white border border-black/15 px-4 py-3 text-sm text-black placeholder:text-black/30 outline-none focus:border-black/40 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-black mb-1.5">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white border border-black/15 px-4 py-3 text-sm text-black placeholder:text-black/30 outline-none focus:border-black/40 transition-colors"
                />
              </div>

              <div className="flex justify-end">
                <a href="#" className="text-[11px] font-semibold text-[#0c61f3] hover:text-black transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            <button className="mt-5 md:mt-6 w-full bg-black py-3.5 md:py-4 text-[15px] font-bold text-white tracking-wide hover:bg-black/85 active:scale-[0.99] transition-all">
              Iniciar sesión
            </button>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-black/12" />
              <span className="text-[11px] text-black/40 font-semibold">o</span>
              <div className="flex-1 h-px bg-black/12" />
            </div>

            <p className="mt-5 text-[12px] text-black font-medium">
              ¿No tienes cuenta?{' '}
              <a href="#" className="font-semibold text-black underline underline-offset-2 hover:text-[#0c61f3] transition-colors">
                Crear cuenta gratis →
              </a>
            </p>

            <p className="mt-3 text-[11px] text-black font-medium">
              ¿Solo quieres ver cómo funciona?{' '}
              <Link to="/demo" className="font-semibold text-black underline underline-offset-2 hover:text-[#0c61f3] transition-colors">
                Ver demo →
              </Link>
            </p>
          </div>
        </div>

        {/* Mobile footer */}
        <a
          href="https://www.linkedin.com/in/jair-quispe/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 md:hidden pb-5 pl-5 text-sm font-semibold text-black/50"
        >
          Powered by JQ
        </a>
      </div>

      <Mascot chuyo />
    </motion.main>
  )
}

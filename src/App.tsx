import Grainient from './components/Grainient'

const metrics = [
  {
    label: 'Stock actual',
    value: '1,248',
    detail: 'productos listos para vender',
  },
  {
    label: 'Ganancias del mes',
    value: 'S/ 18,420',
    detail: 'ganancias acumuladas',
  },
  {
    label: 'Ventas de hoy',
    value: 'S/ 2,090',
    detail: 'ventas registradas',
  },
]

function App() {
  return (
     <main className="relative min-h-svh bg-white text-slate-950 md:h-svh md:overflow-hidden">
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
            <a
              href="#"
              className=" border-black/30 bg-black px-4 py-1.5 text-xs font-medium text-white"
            >
              Individual
            </a>
            <a href="#" className="text-sm text-black">
              Company
            </a>
            <a href="#" className="text-sm text-black">
              Solutions
            </a>
            <a href="#" className="text-sm text-black">
              Services
            </a>
            <a href="#" className="text-sm text-black">
              About us
            </a>
            <a href="#" className="text-sm text-black">
              Blog
            </a>
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
                Controla tu mercado sin cuadernos ni hojas sueltas.
              </h1>

                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black sm:text-base">
                Tipealo es una app pensada para mercados peruanos que necesitan orden real: stock
                actual, ganancias del mes y cuanto vendiste hoy, todo en una sola vista, sin hojas
                que se pierden, se queman o se rompen.
              </p>

              <div className="mt-4 flex flex-row items-center justify-center gap-3">
                <a
                  href="#contacto"
                  className="bg-black px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-black/90 sm:px-7"
                >
                  Explorar producto
                </a>
                <a
                  href="#contacto"
                  className="border-black/15 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:shadow-md sm:px-7"
                >
                  Book a demo
                </a>
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
                <p className="text-xs text-black">Confiado por negocios que venden cada dia</p>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-black">
                  <span>Mercado Central</span>
                  <span>Parada Lima</span>
                  <span>Santa Anita</span>
                  <span>Caqueta</span>
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
      </main>
  )
}

export default App
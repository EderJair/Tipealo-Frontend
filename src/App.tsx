const highlights = [
  'Vite + React 19 + TypeScript',
  'Tailwind CSS v4 con plugin oficial',
  'Base lista para iterar sin configuración extra',
]

function App() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937,#020617_60%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Proyecto inicial creado con pnpm
            </div>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300/80">
                Tipealo Frontend
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                React con Vite y Tailwind, listo para construir la interfaz.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Dejé configurada una base actualizada con el plugin oficial de Tailwind en Vite,
                TypeScript y una primera pantalla simple para confirmar que el stack funciona.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-sky-950/30 backdrop-blur-xl sm:p-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Stack</span>
                <span>Actualizado</span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-200/70">Vite</p>
                  <p className="mt-2 text-lg font-medium text-white">@tailwindcss/vite</p>
                  <p className="mt-1 text-sm text-slate-300">Integración directa con el plugin oficial.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">Tailwind</p>
                  <p className="mt-2 text-lg font-medium text-white">@import &quot;tailwindcss&quot;;</p>
                  <p className="mt-1 text-sm text-slate-300">Sin configuración extra de CSS tradicional.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">Próximo paso</p>
                  <p className="mt-2 text-lg font-medium text-white">pnpm dev</p>
                  <p className="mt-1 text-sm text-slate-300">Levanta el proyecto y empieza a construir.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default App
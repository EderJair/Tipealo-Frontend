import Silk from '../../components/Silk'

const sections = [
  {
    title: 'Mi negocio',
    fields: [
      { label: 'Nombre del negocio', value: 'Abarrotes Mamani', type: 'text' },
      { label: 'Ubicación', value: 'Puesto N°14 · Mercado Central, Lima', type: 'text' },
      { label: 'Teléfono', value: '+51 987 654 321', type: 'text' },
      { label: 'RUC / DNI', value: '10456789012', type: 'text' },
    ],
  },
  {
    title: 'Moneda y formato',
    fields: [
      { label: 'Moneda', value: 'Soles (S/)', type: 'select' },
      { label: 'Zona horaria', value: 'America/Lima (UTC-5)', type: 'select' },
      { label: 'Formato de fecha', value: 'DD/MM/AAAA', type: 'select' },
    ],
  },
  {
    title: 'Notificaciones',
    toggles: [
      { label: 'Alertas de stock bajo', sub: 'Aviso cuando un producto baje del mínimo', on: true },
      { label: 'Recordatorio de fiados', sub: 'Notificación diaria de cobros pendientes', on: true },
      { label: 'Resumen semanal', sub: 'Reporte de ventas cada lunes', on: false },
    ],
  },
]

function Toggle({ on }: { on: boolean }) {
  return (
    <div className={`w-9 h-5 rounded-full relative transition-colors shrink-0 ${on ? 'bg-black' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </div>
  )
}

export default function ConfigView() {
  return (
    <div className="p-3 md:p-6 space-y-3 md:space-y-4" style={{ fontFamily: 'Lora, serif' }}>

      {/* Top row: Silk card + Mi negocio side by side */}
      <div className="flex gap-3 md:gap-4 items-stretch">

        {/* Silk brand card */}
        <div className="relative overflow-hidden p-4 md:p-5 flex flex-col justify-between shrink-0" style={{ width: 200 }}>
          <div className="absolute inset-0">
            <Silk speed={4} scale={1.2} color="#0ea5e9" noiseIntensity={1.8} rotation={0.3} />
          </div>
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Powered by</p>
              <p className="mt-1.5 text-[2.2rem] font-semibold text-white leading-none tracking-tight">JQ</p>
            </div>
          </div>
        </div>

        {/* Mi negocio inline */}
        <div className="flex-1 bg-white min-w-0">
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-black/5">
            <h2 className="text-sm font-semibold text-black">Mi negocio</h2>
          </div>
          <div className="divide-y divide-black/4">
            {sections[0].fields!.map(f => (
              <div key={f.label} className="px-4 md:px-5 py-2.5 flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold text-black shrink-0 w-28 md:w-36">{f.label}</p>
                <p className="text-[11px] text-gray-500 text-right truncate">{f.value}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Settings sections (skip Mi negocio, already shown) */}
      {sections.slice(1).map(section => (
        <div key={section.title} className="bg-white">
          <div className="px-4 md:px-5 py-3 md:py-4 border-b border-black/5">
            <h2 className="text-sm font-semibold text-black">{section.title}</h2>
          </div>

          {section.fields && (
            <div className="divide-y divide-black/4">
              {section.fields.map(f => (
                <div key={f.label} className="px-4 md:px-5 py-3 flex items-center justify-between gap-4">
                  <p className="text-[12px] font-semibold text-black shrink-0 w-32 md:w-44">{f.label}</p>
                  {f.type === 'select' ? (
                    <div className="flex-1 flex justify-end">
                      <div className="flex items-center gap-2 border border-black/10 px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="text-[12px] text-gray-700">{f.value}</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1l4 4 4-4" stroke="#999" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex justify-end">
                      <div className="border-b border-black/15 pb-0.5 min-w-0">
                        <p className="text-[12px] text-gray-600 text-right truncate max-w-[180px] md:max-w-xs">{f.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.toggles && (
            <div className="divide-y divide-black/4">
              {section.toggles.map(t => (
                <div key={t.label} className="px-4 md:px-5 py-3.5 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-black">{t.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{t.sub}</p>
                  </div>
                  <Toggle on={t.on} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Danger zone */}
      <div className="bg-white">
        <div className="px-4 md:px-5 py-3 md:py-4 border-b border-black/5">
          <h2 className="text-sm font-semibold text-black">Cuenta</h2>
        </div>
        <div className="px-4 md:px-5 py-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <button className="text-[12px] font-semibold text-black border border-black/15 px-4 py-2 hover:bg-gray-50 transition-colors">
            Cambiar contraseña
          </button>
          <button className="text-[12px] font-semibold text-red-600 border border-red-100 px-4 py-2 hover:bg-red-50 transition-colors">
            Cerrar sesión
          </button>
        </div>
      </div>

    </div>
  )
}

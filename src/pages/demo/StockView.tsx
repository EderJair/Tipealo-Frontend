const products = [
  { name: 'Arroz extra 50kg',    cat: 'Granos',      stock: 45, unit: 'Saco',    price: 100, status: 'normal'  as const },
  { name: 'Aceite Primor 1L',    cat: 'Aceites',     stock: 8,  unit: 'Botella', price: 12,  status: 'bajo'    as const },
  { name: 'Azúcar rubia 50kg',   cat: 'Azúcares',    stock: 22, unit: 'Saco',    price: 60,  status: 'normal'  as const },
  { name: 'Fideo Molitalia 500g',cat: 'Fideos',      stock: 3,  unit: 'Paquete', price: 5,   status: 'crítico' as const },
  { name: 'Harina sin prep. 1kg',cat: 'Harinas',     stock: 18, unit: 'Bolsa',   price: 5,   status: 'normal'  as const },
  { name: 'Sal yodada 1kg',      cat: 'Condimentos', stock: 5,  unit: 'Bolsa',   price: 3.5, status: 'bajo'    as const },
  { name: 'Leche Gloria 400g',   cat: 'Lácteos',     stock: 24, unit: 'Tarro',   price: 9,   status: 'normal'  as const },
  { name: 'Atún Florida 170g',   cat: 'Conservas',   stock: 0,  unit: 'Lata',    price: 6,   status: 'crítico' as const },
  { name: 'Manteca Famosa 1kg',  cat: 'Grasas',      stock: 12, unit: 'Bloque',  price: 12,  status: 'normal'  as const },
  { name: 'Avena Quaker 400g',   cat: 'Cereales',    stock: 7,  unit: 'Bolsa',   price: 8,   status: 'bajo'    as const },
]

const s = {
  normal:  { label: 'Normal',  dot: 'bg-emerald-400', text: 'text-emerald-400' },
  bajo:    { label: 'Bajo',    dot: 'bg-amber-400',   text: 'text-amber-400'   },
  crítico: { label: 'Crítico', dot: 'bg-red-400',     text: 'text-red-400'     },
}

const D = { background: 'rgba(0,0,0,0.93)' }

export default function StockView() {
  const totalValue = products.reduce((acc, p) => acc + p.stock * p.price, 0)
  const bajo    = products.filter(p => p.status === 'bajo').length
  const critico = products.filter(p => p.status === 'crítico').length

  return (
    <div className="p-3 md:p-6 space-y-3 md:space-y-4" style={{ fontFamily: 'Lora, serif' }}>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Productos</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">{products.length}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">artículos en catálogo</p>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Valor inventario</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">S/ {totalValue.toLocaleString()}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">en stock hoy</p>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Stock bajo</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">{bajo}</p>
          <p className="mt-2 text-[0.9rem] text-amber-400 font-semibold">reponer pronto</p>
        </div>
        <div className="metric-card">
          <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/60">Sin stock</p>
          <p className="mt-2.5 text-[2rem] md:text-[2.65rem] font-semibold text-white leading-none">{critico}</p>
          <p className="mt-2 text-[0.9rem] text-white/60">reposición urgente</p>
          <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-red-400">revisar ahora</div>
        </div>
      </div>

      {/* Alert */}
      {critico > 0 && (
        <div className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full shrink-0" />
          <p className="text-[11px] font-medium text-red-400">
            {products.filter(p => p.status === 'crítico').map(p => p.name).join(' · ')} — sin unidades
          </p>
        </div>
      )}

      {/* Table */}
      <div style={D}>
        <div className="px-4 md:px-5 py-3 md:py-4 border-b border-white/8 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Inventario completo</h2>
          <button className="text-[11px] font-semibold bg-white text-black px-3 py-1.5 hover:bg-white/90 transition-colors">
            + Agregar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-white/8">
                {['Producto', 'Cat.', 'Unidad', 'Stock', 'Precio', 'Valor', 'Estado'].map(col => (
                  <th key={col} className="text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-white/40 px-4 py-3">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.name} className={`transition-colors hover:bg-white/5 ${i < products.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <td className="px-4 py-2.5 text-[12px] font-semibold text-white whitespace-nowrap">{p.name}</td>
                  <td className="px-4 py-2.5 text-[11px] text-white/50">{p.cat}</td>
                  <td className="px-4 py-2.5 text-[11px] text-white/50">{p.unit}</td>
                  <td className="px-4 py-2.5 text-[14px] font-bold text-white">{p.stock}</td>
                  <td className="px-4 py-2.5 text-[12px] text-white/70">S/ {p.price.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-[12px] font-semibold text-white">S/ {(p.stock * p.price).toLocaleString()}</td>
                  <td className="px-4 py-2.5">
                    <span className={`flex items-center gap-1.5 text-[11px] font-semibold ${s[p.status].text}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${s[p.status].dot}`} />
                      {s[p.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

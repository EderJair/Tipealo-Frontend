import { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'

// La landing va en el bundle inicial. Demo y Login se cargan al entrar:
// el demo arrastra three + @react-three/fiber (~600 kB) por el shader Silk.
const Demo = lazy(() => import('./pages/Demo'))
const Login = lazy(() => import('./pages/Login'))

function Splash() {
  return (
    <div className="flex h-svh items-center justify-center bg-white">
      <p
        className="text-2xl font-extrabold tracking-[0.18em] text-black/15"
        style={{ fontFamily: 'Lora, serif' }}
      >
        TIPEALO
      </p>
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<Splash />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Tecnicos from './pages/Tecnicos'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tecnicos" element={<Tecnicos />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
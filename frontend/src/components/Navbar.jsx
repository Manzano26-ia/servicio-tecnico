import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const linkStyle = (path) => ({
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontWeight: '500',
    color: location.pathname === path ? '#fff' : '#cbd5e1',
    backgroundColor: location.pathname === path ? '#3b82f6' : 'transparent',
    transition: 'all 0.2s'
  })

  return (
    <nav style={{
      backgroundColor: '#1e293b',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    }}>
      <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
        🔧 Servicio Técnico
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link to="/" style={linkStyle('/')}>Dashboard</Link>
        <Link to="/tickets" style={linkStyle('/tickets')}>Tickets</Link>
        <Link to="/tecnicos" style={linkStyle('/tecnicos')}>Técnicos</Link>
      </div>
    </nav>
  )
}

export default Navbar
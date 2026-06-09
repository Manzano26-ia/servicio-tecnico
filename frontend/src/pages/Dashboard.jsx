import { useApp } from '../context/AppContext'
import KPICard from '../components/KPICard'
import Card from '../components/Card'
import Badge from '../components/Badge'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts'

function Dashboard() {
  const { tickets, ordenes, tecnicos } = useApp()

  // --- Cálculo de KPIs ---
  const totalTickets = tickets.length
  const ticketsCompletados = tickets.filter(t => t.estado === 'Completado').length
  const ticketsPendientes = tickets.filter(t => t.estado === 'Pendiente' || t.estado === 'Asignado').length
  const ticketsEnProgreso = tickets.filter(t => t.estado === 'En Progreso').length
  const tecnicosDisponibles = tecnicos.filter(t => t.disponibilidad === 'Disponible').length

  const ordenesCompletadas = ordenes.filter(o => o.estado === 'Completada')
  const tiempoPromedio = ordenesCompletadas.length > 0
    ? Math.round(ordenesCompletadas.reduce((sum, o) => sum + (o.tiempoAtencion || 0), 0) / ordenesCompletadas.length)
    : 0

  // --- Datos para gráfica de barras (tickets por tipo de falla) ---
  const tiposFalla = ['Eléctrica', 'Mecánica', 'Software', 'Red', 'Otro']
  const datosBarras = tiposFalla.map(tipo => ({
    name: tipo,
    tickets: tickets.filter(t => t.tipoFalla === tipo).length
  })).filter(d => d.tickets > 0)

  // --- Datos para gráfica de pastel (estado de tickets) ---
  const datosPastel = [
    { name: 'Completados', value: ticketsCompletados, color: '#22c55e' },
    { name: 'En Progreso', value: ticketsEnProgreso, color: '#8b5cf6' },
    { name: 'Pendientes', value: ticketsPendientes, color: '#f59e0b' },
  ].filter(d => d.value > 0)

  // --- Datos para gráfica de técnicos ---
  const datosTecnicos = tecnicos.map(t => ({
    name: t.nombre.split(' ')[0],
    completadas: t.totalOrdenes,
    activas: t.ordenesActivas
  }))

  // --- Últimos 5 tickets ---
  const ultimosTickets = tickets.slice().reverse().slice(0, 5)

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>📊 Dashboard</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Métricas en tiempo real del sistema</p>
      </div>

      {/* KPIs principales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <KPICard
          titulo="Total de Tickets"
          valor={totalTickets}
          subtitulo="Desde el inicio"
          color="#3b82f6"
          icono="🎫"
        />
        <KPICard
          titulo="Completados"
          valor={ticketsCompletados}
          subtitulo={totalTickets > 0 ? `${Math.round(ticketsCompletados / totalTickets * 100)}% del total` : '0%'}
          color="#22c55e"
          icono="✅"
        />
        <KPICard
          titulo="En Proceso"
          valor={ticketsPendientes + ticketsEnProgreso}
          subtitulo="Pendientes + En progreso"
          color="#f59e0b"
          icono="⏳"
        />
        <KPICard
          titulo="Tiempo Promedio"
          valor={tiempoPromedio > 0 ? `${tiempoPromedio} min` : 'N/A'}
          subtitulo="Por orden completada"
          color="#8b5cf6"
          icono="⏱"
        />
        <KPICard
          titulo="Técnicos Disponibles"
          valor={`${tecnicosDisponibles}/${tecnicos.length}`}
          subtitulo="Listos para asignación"
          color="#06b6d4"
          icono="👷"
        />
      </div>

      {/* Gráficas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>

        {/* Gráfica de barras — Tickets por tipo */}
        <Card>
          <p style={{ fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>🔧 Tickets por Tipo de Falla</p>
          {datosBarras.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px 0', fontSize: '13px' }}>
              Aún no hay datos suficientes
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={datosBarras}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Gráfica de pastel — Estado de tickets */}
        <Card>
          <p style={{ fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>📈 Estado de Tickets</p>
          {datosPastel.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px 0', fontSize: '13px' }}>
              Aún no hay datos suficientes
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={datosPastel}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {datosPastel.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>

      {/* Gráfica de técnicos */}
      <Card style={{ marginBottom: '24px' }}>
        <p style={{ fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>👷 Productividad por Técnico</p>
        {datosTecnicos.every(d => d.completadas === 0 && d.activas === 0) ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px 0', fontSize: '13px' }}>
            Aún no hay datos suficientes
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={datosTecnicos}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="completadas" name="Completadas" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="activas" name="Activas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Últimos tickets */}
      <Card>
        <p style={{ fontWeight: '700', fontSize: '15px', marginBottom: '16px' }}>🕐 Últimos Tickets Registrados</p>
        {ultimosTickets.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center', padding: '32px 0', fontSize: '13px' }}>
            No hay tickets registrados aún
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Cliente</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Tipo</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Urgencia</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Estado</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#475569' }}>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {ultimosTickets.map(ticket => (
                <tr key={ticket.ticketId} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '8px', fontWeight: '600' }}>{ticket.nombre}</td>
                  <td style={{ padding: '8px', color: '#64748b' }}>{ticket.tipoFalla}</td>
                  <td style={{ padding: '8px' }}><Badge texto={ticket.urgencia} /></td>
                  <td style={{ padding: '8px' }}><Badge texto={ticket.estado} /></td>
                  <td style={{ padding: '8px', color: '#94a3b8' }}>
                    {new Date(ticket.fechaCreacion).toLocaleDateString('es-MX')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  )
}

export default Dashboard
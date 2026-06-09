import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'

const camposVacios = {
  nombre: '',
  telefono: '',
  email: '',
  direccion: '',
  tipoFalla: '',
  descripcion: '',
  urgencia: ''
}

function Tickets() {
  const { crearTicket, tickets, ordenes, tecnicos } = useApp()
  const [form, setForm] = useState(camposVacios)
  const [errores, setErrores] = useState({})
  const [ticketCreado, setTicketCreado] = useState(null)
  const [vista, setVista] = useState('lista') // 'lista' o 'nuevo'

  function validar() {
    const nuevosErrores = {}
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio'
    if (!form.telefono.trim()) nuevosErrores.telefono = 'El teléfono es obligatorio'
    if (!form.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria'
    if (!form.tipoFalla) nuevosErrores.tipoFalla = 'Selecciona el tipo de falla'
    if (!form.descripcion.trim()) nuevosErrores.descripcion = 'La descripción es obligatoria'
    if (!form.urgencia) nuevosErrores.urgencia = 'Selecciona la urgencia'
    return nuevosErrores
  }

  function handleSubmit() {
    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }
    const ticket = crearTicket(form)
    setTicketCreado(ticket)
    setForm(camposVacios)
    setErrores({})
  }

  function getOrdenDeTicket(ticketId) {
    return ordenes.find(o => o.ticketId === ticketId)
  }

  function getTecnicoNombre(tecnicoId) {
    const tecnico = tecnicos.find(t => t.tecnicoId === tecnicoId)
    return tecnico ? tecnico.nombre : 'Sin asignar'
  }

  const colorUrgencia = {
    'Baja': '#22c55e',
    'Media': '#f59e0b',
    'Alta': '#ef4444',
    'Crítica': '#7c3aed'
  }

  const colorEstado = {
    'Pendiente': '#f59e0b',
    'Asignado': '#3b82f6',
    'En Progreso': '#8b5cf6',
    'Completado': '#22c55e'
  }

  const inputStyle = (campo) => ({
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    border: errores[campo] ? '2px solid #ef4444' : '1.5px solid #e2e8f0',
    fontSize: '14px',
    outline: 'none',
    marginTop: '4px',
    boxSizing: 'border-box'
  })

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#475569'
  }

  return (
    <div>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>🎫 Tickets</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>{tickets.length} ticket(s) registrado(s)</p>
        </div>
        <button
          onClick={() => { setVista(vista === 'nuevo' ? 'lista' : 'nuevo'); setTicketCreado(null) }}
          style={{
            backgroundColor: vista === 'nuevo' ? '#64748b' : '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {vista === 'nuevo' ? '← Ver Lista' : '+ Nuevo Ticket'}
        </button>
      </div>

      {/* Confirmación de ticket creado */}
      {ticketCreado && (
        <Card style={{ backgroundColor: '#f0fdf4', border: '1.5px solid #86efac', marginBottom: '24px' }}>
          <p style={{ fontWeight: '700', color: '#16a34a', fontSize: '16px' }}>✅ Ticket registrado exitosamente</p>
          <p style={{ color: '#374151', marginTop: '8px' }}>
            <strong>ID:</strong> {ticketCreado.ticketId.slice(0, 8).toUpperCase()}
          </p>
          <p style={{ color: '#374151' }}>
            <strong>Estado:</strong> {ticketCreado.estado}
          </p>
          {getOrdenDeTicket(ticketCreado.ticketId) && (
            <p style={{ color: '#374151' }}>
              <strong>Técnico asignado:</strong> {getTecnicoNombre(getOrdenDeTicket(ticketCreado.ticketId).tecnicoId)}
            </p>
          )}
        </Card>
      )}

      {/* Formulario */}
      {vista === 'nuevo' && (
        <Card>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#1e293b' }}>Registrar nuevo ticket</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            <div>
              <label style={labelStyle}>Nombre completo *</label>
              <input
                style={inputStyle('nombre')}
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                placeholder="Ej. Juan García"
              />
              {errores.nombre && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errores.nombre}</p>}
            </div>

            <div>
              <label style={labelStyle}>Teléfono *</label>
              <input
                style={inputStyle('telefono')}
                value={form.telefono}
                onChange={e => setForm({ ...form, telefono: e.target.value })}
                placeholder="Ej. 555-1234"
              />
              {errores.telefono && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errores.telefono}</p>}
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                style={inputStyle('email')}
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label style={labelStyle}>Dirección *</label>
              <input
                style={inputStyle('direccion')}
                value={form.direccion}
                onChange={e => setForm({ ...form, direccion: e.target.value })}
                placeholder="Calle, número, colonia"
              />
              {errores.direccion && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errores.direccion}</p>}
            </div>

            <div>
              <label style={labelStyle}>Tipo de falla *</label>
              <select
                style={inputStyle('tipoFalla')}
                value={form.tipoFalla}
                onChange={e => setForm({ ...form, tipoFalla: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                <option>Eléctrica</option>
                <option>Mecánica</option>
                <option>Software</option>
                <option>Red</option>
                <option>Otro</option>
              </select>
              {errores.tipoFalla && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errores.tipoFalla}</p>}
            </div>

            <div>
              <label style={labelStyle}>Urgencia *</label>
              <select
                style={inputStyle('urgencia')}
                value={form.urgencia}
                onChange={e => setForm({ ...form, urgencia: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                <option>Baja</option>
                <option>Media</option>
                <option>Alta</option>
                <option>Crítica</option>
              </select>
              {errores.urgencia && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errores.urgencia}</p>}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Descripción del problema *</label>
              <textarea
                style={{ ...inputStyle('descripcion'), minHeight: '80px', resize: 'vertical' }}
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                placeholder="Describe detalladamente el problema..."
              />
              {errores.descripcion && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errores.descripcion}</p>}
            </div>

          </div>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: '20px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 32px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '15px',
              width: '100%'
            }}
          >
            Registrar Ticket
          </button>
        </Card>
      )}

      {/* Lista de tickets */}
      {vista === 'lista' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tickets.length === 0 ? (
            <Card>
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '32px 0' }}>
                No hay tickets registrados aún. ¡Crea el primero!
              </p>
            </Card>
          ) : (
            tickets.slice().reverse().map(ticket => {
              const orden = getOrdenDeTicket(ticket.ticketId)
              return (
                <Card key={ticket.ticketId}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontWeight: '700', fontSize: '15px' }}>{ticket.nombre}</p>
                      <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>{ticket.direccion}</p>
                      <p style={{ color: '#64748b', fontSize: '13px' }}>{ticket.tipoFalla} — {ticket.descripcion}</p>
                      {orden && (
                        <p style={{ color: '#3b82f6', fontSize: '13px', marginTop: '4px' }}>
                          👷 {getTecnicoNombre(orden.tecnicoId)}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{
                        backgroundColor: colorEstado[ticket.estado] + '20',
                        color: colorEstado[ticket.estado],
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>{ticket.estado}</span>
                      <span style={{
                        backgroundColor: colorUrgencia[ticket.urgencia] + '20',
                        color: colorUrgencia[ticket.urgencia],
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>{ticket.urgencia}</span>
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default Tickets
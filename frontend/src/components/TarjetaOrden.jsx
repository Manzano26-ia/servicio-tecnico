import { useState } from 'react'
import Card from './Card'
import Badge from './Badge'
import { useApp } from '../context/AppContext'

function TarjetaOrden({ orden, ticket }) {
  const { iniciarOrden, cerrarOrden } = useApp()
  const [mostrarCierre, setMostrarCierre] = useState(false)
  const [solucion, setSolucion] = useState('')
  const [errorSolucion, setErrorSolucion] = useState('')

  function handleIniciar() {
    iniciarOrden(orden.ordenId)
  }

  function handleCerrar() {
    if (!solucion.trim()) {
      setErrorSolucion('Describe la solución aplicada')
      return
    }
    cerrarOrden(orden.ordenId, solucion)
    setMostrarCierre(false)
    setSolucion('')
  }

  if (!ticket) return null

  return (
    <Card style={{ borderLeft: '4px solid #3b82f6' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <p style={{ fontWeight: '700', fontSize: '15px' }}>{ticket.nombre}</p>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>📍 {ticket.direccion}</p>
          <p style={{ color: '#64748b', fontSize: '13px' }}>📞 {ticket.telefono}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          <Badge texto={orden.estado} />
          <Badge texto={ticket.urgencia} />
        </div>
      </div>

      <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
          🔧 {ticket.tipoFalla}
        </p>
        <p style={{ fontSize: '13px', color: '#334155' }}>{ticket.descripcion}</p>
      </div>

      <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
        📅 Asignada: {new Date(orden.fechaAsignacion).toLocaleString('es-MX')}
      </p>

      {/* Botones de acción */}
      {orden.estado === 'Asignada' && (
        <button
          onClick={handleIniciar}
          style={{
            backgroundColor: '#8b5cf6',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}
        >
          ▶ Iniciar Orden
        </button>
      )}

      {orden.estado === 'En Progreso' && !mostrarCierre && (
        <button
          onClick={() => setMostrarCierre(true)}
          style={{
            backgroundColor: '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}
        >
          ✅ Cerrar Orden
        </button>
      )}

      {mostrarCierre && (
        <div style={{ marginTop: '8px' }}>
          <textarea
            placeholder="Describe la solución aplicada..."
            value={solucion}
            onChange={e => { setSolucion(e.target.value); setErrorSolucion('') }}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: errorSolucion ? '2px solid #ef4444' : '1.5px solid #e2e8f0',
              fontSize: '13px',
              minHeight: '80px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
          {errorSolucion && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{errorSolucion}</p>}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              onClick={handleCerrar}
              style={{
                backgroundColor: '#22c55e',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px',
                flex: 1
              }}
            >
              Confirmar Cierre
            </button>
            <button
              onClick={() => { setMostrarCierre(false); setSolucion('') }}
              style={{
                backgroundColor: '#f1f5f9',
                color: '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {orden.estado === 'Completada' && (
        <div style={{ backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '12px' }}>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#16a34a' }}>✅ Orden completada</p>
          <p style={{ fontSize: '13px', color: '#374151', marginTop: '4px' }}>{orden.descripcionSolucion}</p>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
            ⏱ Tiempo de atención: {orden.tiempoAtencion} min
          </p>
        </div>
      )}
    </Card>
  )
}

export default TarjetaOrden
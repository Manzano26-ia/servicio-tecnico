import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/Card'
import Badge from '../components/Badge'
import TarjetaOrden from '../components/TarjetaOrden'

function Tecnicos() {
  const { tecnicos, ordenes, tickets } = useApp()
  const [tecnicoSeleccionado, setTecnicoSeleccionado] = useState(null)

  function getOrdenesDeTecnico(tecnicoId) {
    return ordenes.filter(o => o.tecnicoId === tecnicoId)
  }

  function getTicketDeOrden(ticketId) {
    return tickets.find(t => t.ticketId === ticketId)
  }

  const tecnico = tecnicos.find(t => t.tecnicoId === tecnicoSeleccionado)
  const ordenesTecnico = tecnicoSeleccionado ? getOrdenesDeTecnico(tecnicoSeleccionado) : []

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>👷 Técnicos</h1>
        <p style={{ color: '#666', fontSize: '14px' }}>Selecciona un técnico para ver sus órdenes</p>
      </div>

      {/* Lista de técnicos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {tecnicos.map(t => (
          <Card
            key={t.tecnicoId}
            style={{
              cursor: 'pointer',
              border: tecnicoSeleccionado === t.tecnicoId ? '2px solid #3b82f6' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
            onClick={() => setTecnicoSeleccionado(
              tecnicoSeleccionado === t.tecnicoId ? null : t.tecnicoId
            )}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontWeight: '700', fontSize: '15px' }}>{t.nombre}</p>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>🔧 {t.especialidad}</p>
                <p style={{ color: '#64748b', fontSize: '13px' }}>📞 {t.telefono}</p>
              </div>
              <Badge texto={t.disponibilidad} />
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#3b82f6' }}>{t.ordenesActivas}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>Activas</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: '700', color: '#22c55e' }}>{t.totalOrdenes}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>Completadas</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Órdenes del técnico seleccionado */}
      {tecnico && (
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#1e293b' }}>
            📋 Órdenes de {tecnico.nombre}
          </h2>
          {ordenesTecnico.length === 0 ? (
            <Card>
              <p style={{ textAlign: 'center', color: '#94a3b8', padding: '32px 0' }}>
                Este técnico no tiene órdenes asignadas aún.
              </p>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ordenesTecnico.map(orden => (
                <TarjetaOrden
                  key={orden.ordenId}
                  orden={orden}
                  ticket={getTicketDeOrden(orden.ticketId)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Tecnicos
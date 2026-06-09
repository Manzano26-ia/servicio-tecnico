const colores = {
  'Pendiente':   { bg: '#fef3c7', text: '#d97706' },
  'Asignada':    { bg: '#dbeafe', text: '#2563eb' },
  'En Progreso': { bg: '#ede9fe', text: '#7c3aed' },
  'Completada':  { bg: '#dcfce7', text: '#16a34a' },
  'Asignado':    { bg: '#dbeafe', text: '#2563eb' },
  'Completado':  { bg: '#dcfce7', text: '#16a34a' },
  'Disponible':  { bg: '#dcfce7', text: '#16a34a' },
  'Ocupado':     { bg: '#fee2e2', text: '#dc2626' },
  'Baja':        { bg: '#dcfce7', text: '#16a34a' },
  'Media':       { bg: '#fef3c7', text: '#d97706' },
  'Alta':        { bg: '#fee2e2', text: '#dc2626' },
  'Crítica':     { bg: '#f3e8ff', text: '#7c3aed' },
}

function Badge({ texto }) {
  const color = colores[texto] || { bg: '#f1f5f9', text: '#475569' }
  return (
    <span style={{
      backgroundColor: color.bg,
      color: color.text,
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      whiteSpace: 'nowrap'
    }}>
      {texto}
    </span>
  )
}

export default Badge
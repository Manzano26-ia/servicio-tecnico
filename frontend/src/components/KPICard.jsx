function KPICard({ titulo, valor, subtitulo, color, icono }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px 24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      borderLeft: `4px solid ${color}`,
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{
        backgroundColor: color + '20',
        borderRadius: '12px',
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '22px',
        flexShrink: 0
      }}>
        {icono}
      </div>
      <div>
        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>{titulo}</p>
        <p style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', lineHeight: 1.2 }}>{valor}</p>
        {subtitulo && <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{subtitulo}</p>}
      </div>
    </div>
  )
}

export default KPICard
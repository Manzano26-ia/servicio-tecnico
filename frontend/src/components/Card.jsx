function Card({ children, style, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default Card
import { createContext, useContext, useState, useEffect } from 'react'
import { tecnicosIniciales, ticketsIniciales, ordenesIniciales } from '../data/mockData'
import { asignarTecnico } from '../utils/asignacion'
import { v4 as uuidv4 } from 'uuid'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const guardados = localStorage.getItem('tickets')
    return guardados ? JSON.parse(guardados) : ticketsIniciales
  })

  const [tecnicos, setTecnicos] = useState(() => {
    const guardados = localStorage.getItem('tecnicos')
    return guardados ? JSON.parse(guardados) : tecnicosIniciales
  })

  const [ordenes, setOrdenes] = useState(() => {
    const guardados = localStorage.getItem('ordenes')
    return guardados ? JSON.parse(guardados) : ordenesIniciales
  })

  // Guardar en localStorage cada vez que cambian los datos
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets))
  }, [tickets])

  useEffect(() => {
    localStorage.setItem('tecnicos', JSON.stringify(tecnicos))
  }, [tecnicos])

  useEffect(() => {
    localStorage.setItem('ordenes', JSON.stringify(ordenes))
  }, [ordenes])

  // Crear un nuevo ticket y asignarlo automáticamente
  function crearTicket(datos) {
    const nuevoTicket = {
      ticketId: uuidv4(),
      ...datos,
      estado: 'Pendiente',
      fechaCreacion: new Date().toISOString(),
      fechaCierre: null
    }

    const resultado = asignarTecnico(nuevoTicket, tecnicos)

    if (resultado) {
      const { nuevaOrden, tecnicoOptimo } = resultado

      nuevoTicket.estado = 'Asignado'

      // Actualizar órdenes activas del técnico
      setTecnicos(prev => prev.map(t =>
        t.tecnicoId === tecnicoOptimo.tecnicoId
          ? { ...t, ordenesActivas: t.ordenesActivas + 1 }
          : t
      ))

      setOrdenes(prev => [...prev, nuevaOrden])
    }

    setTickets(prev => [...prev, nuevoTicket])
    return nuevoTicket
  }

  // Técnico inicia una orden
  function iniciarOrden(ordenId) {
    setOrdenes(prev => prev.map(o =>
      o.ordenId === ordenId
        ? { ...o, estado: 'En Progreso', fechaInicio: new Date().toISOString() }
        : o
    ))
    setTickets(prev => prev.map(t => {
      const orden = ordenes.find(o => o.ordenId === ordenId)
      return t.ticketId === orden?.ticketId
        ? { ...t, estado: 'En Progreso' }
        : t
    }))
  }

  // Técnico cierra una orden
  function cerrarOrden(ordenId, descripcionSolucion) {
    const orden = ordenes.find(o => o.ordenId === ordenId)
    const ahora = new Date().toISOString()
    const inicio = new Date(orden.fechaAsignacion)
    const fin = new Date(ahora)
    const tiempoAtencion = Math.round((fin - inicio) / 60000)

    setOrdenes(prev => prev.map(o =>
      o.ordenId === ordenId
        ? { ...o, estado: 'Completada', fechaCierre: ahora, descripcionSolucion, tiempoAtencion }
        : o
    ))

    setTickets(prev => prev.map(t =>
      t.ticketId === orden.ticketId
        ? { ...t, estado: 'Completado', fechaCierre: ahora }
        : t
    ))

    setTecnicos(prev => prev.map(t =>
      t.tecnicoId === orden.tecnicoId
        ? { ...t, ordenesActivas: Math.max(0, t.ordenesActivas - 1), totalOrdenes: t.totalOrdenes + 1 }
        : t
    ))
  }

  return (
    <AppContext.Provider value={{
      tickets, tecnicos, ordenes,
      crearTicket, iniciarOrden, cerrarOrden
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
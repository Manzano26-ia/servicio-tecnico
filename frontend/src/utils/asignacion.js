import { v4 as uuidv4 } from 'uuid'

export function asignarTecnico(ticket, tecnicos) {
  // Busca técnicos disponibles
  const disponibles = tecnicos.filter(t => t.disponibilidad === 'Disponible')

  if (disponibles.length === 0) return null

  // Escoge al técnico con menos órdenes activas
  const tecnicoOptimo = disponibles.reduce((menor, actual) =>
    actual.ordenesActivas < menor.ordenesActivas ? actual : menor
  )

  // Crea la orden de trabajo
  const nuevaOrden = {
    ordenId: uuidv4(),
    ticketId: ticket.ticketId,
    tecnicoId: tecnicoOptimo.tecnicoId,
    tecnicoNombre: tecnicoOptimo.nombre,
    estado: 'Asignada',
    fechaAsignacion: new Date().toISOString(),
    fechaInicio: null,
    fechaCierre: null,
    descripcionSolucion: null,
    tiempoAtencion: null
  }

  return { nuevaOrden, tecnicoOptimo }
}
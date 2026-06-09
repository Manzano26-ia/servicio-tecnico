import { v4 as uuidv4 } from 'uuid'

export const tecnicosIniciales = [
  {
    tecnicoId: uuidv4(),
    nombre: 'Carlos Méndez',
    especialidad: 'Eléctrica',
    disponibilidad: 'Disponible',
    ordenesActivas: 0,
    totalOrdenes: 12,
    telefono: '555-0101'
  },
  {
    tecnicoId: uuidv4(),
    nombre: 'Ana Torres',
    especialidad: 'Redes',
    disponibilidad: 'Disponible',
    ordenesActivas: 0,
    totalOrdenes: 8,
    telefono: '555-0102'
  },
  {
    tecnicoId: uuidv4(),
    nombre: 'Luis Ramírez',
    especialidad: 'Software',
    disponibilidad: 'Disponible',
    ordenesActivas: 0,
    totalOrdenes: 15,
    telefono: '555-0103'
  }
]

export const ticketsIniciales = []
export const ordenesIniciales = []
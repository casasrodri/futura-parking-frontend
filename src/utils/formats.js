import { DateTime } from 'luxon'
export const fechaHoraISO = (datetime) => DateTime.fromISO(datetime).toFormat('yyyy-MM-dd HH:mm')
export const fecha = (datetime) => DateTime.fromISO(datetime).toFormat('dd/MM/yyyy')
export const hora = (datetime) => DateTime.fromISO(datetime).toFormat('HH:mm')
export const capitalizar = (nombre) =>
  nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()

import { DateTime } from 'luxon'
export const fechaHora = (datetime) => DateTime.fromISO(datetime).toFormat('yyyy-MM-dd HH:mm')

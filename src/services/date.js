import { DateTime, Duration } from 'luxon'

const daysInWeek = 7

const locale = localStorage.getItem('lang')

export function getDate() {
  return DateTime.now().setLocale(locale)
}

export function getFormattedDate({ timestamp, format }) {
  return DateTime.fromMillis(timestamp).toFormat(format)
}

export function getLocalFormattedDate(timestamp) {
  return DateTime.fromMillis(timestamp).toLocal().toLocaleString()
}

export function getDateFromTimestamp(timestamp) {
  return DateTime.fromMillis(timestamp)
}

export function getWeek(date) {
  if (!date) date = getDate()
  const result = []
  const dateOnWeekStart = date.startOf('week')

  for (let i = 0; i < daysInWeek; i++) {
    const day = dateOnWeekStart
      .plus(Duration.fromObject({ days: i }))
      .setLocale(locale)
    result.push(day)
  }
  return result
}

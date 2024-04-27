export function formatDate(dateString: string) {
  const date = new Date(dateString)
  // Then specify how you want your dates to be formatted
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(date)
}

export async function calculateDates(date: Date) {
  const startDate = new Date(date)

  const endDate = new Date()

  let secondsBetweenDates = endDate.getTime() - startDate.getTime()
  secondsBetweenDates = secondsBetweenDates / 1000 //FIXME

  const seconds = secondsBetweenDates % 60
  const minutes = Math.floor(secondsBetweenDates / 60) % 60
  const hours = Math.floor(secondsBetweenDates / 3600) % 24
  const days = Math.floor(secondsBetweenDates / 86400) % 30.5
  const months = Math.floor(secondsBetweenDates / 2629746) % 12
  const years = Math.floor(secondsBetweenDates / 31556952)

  const timeUnits = [
    formatTime(years, 'a'),
    formatTime(months, 'm'),
    formatTime(days, 'j'),
    formatTime(hours, 'h'),
    formatTime(minutes, 'min'),
    formatTime(seconds, 's')
  ]

  let tempsDepuisCreation = timeUnits
    .filter((unit) => unit !== '')
    .slice(0, 2)
    .join('')
  tempsDepuisCreation = tempsDepuisCreation.endsWith('')
    ? tempsDepuisCreation.slice(0, -2)
    : tempsDepuisCreation

  return tempsDepuisCreation
}

function formatTime(value, unit) {
  return value > 0 ? `${parseFloat(value).toFixed(0)}${unit}  ` : ''
}
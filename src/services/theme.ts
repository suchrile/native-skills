let isThemeListenerExists = false

type Theme = {
  id: number
  title: string
  value: string
  color?: string
}

const defaultTheme: Theme = {
  id: 1,
  title: 'appearanceDevice',
  value: 'device'
}

export const themeList: Theme[] = [
  defaultTheme,
  { id: 2, title: 'appearanceLight', value: 'light', color: '#F5F5F7' },
  { id: 3, title: 'appearanceDark', value: 'dark', color: '#000000' }
]

function findThemeByName(value: string): Theme {
  const theme = themeList.find((el) => el.value === value)
  if (theme) return theme
  else return defaultTheme
}

export function getTheme(): Theme {
  const theme = localStorage.getItem('theme')
  if (theme) return findThemeByName(theme)
  else return defaultTheme
}

export function setTheme(newTheme?: Theme) {
  const theme = newTheme ?? getTheme()
  localStorage.setItem('theme', theme.value)
  setColorScheme()
}

export function getColorScheme(): Theme {
  const theme = getTheme()
  let deviceColorScheme
  if (theme.value === 'device') {
    deviceColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? findThemeByName('dark')
      : findThemeByName('light')
    if (!isThemeListenerExists) setThemeListener()
  } else {
    if (isThemeListenerExists) removeThemeListener()
  }
  return deviceColorScheme ?? theme
}

export function setColorScheme() {
  const colorScheme = getColorScheme()
  document.body.setAttribute('theme', colorScheme.value)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta && colorScheme.color) {
    meta.setAttribute('content', colorScheme.color)
  }
}

export function setThemeListener() {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', setColorScheme)
  isThemeListenerExists = true
}

export function removeThemeListener() {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .removeEventListener('change', setColorScheme)
  isThemeListenerExists = false
}

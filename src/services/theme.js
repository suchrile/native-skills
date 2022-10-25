let isThemeListenerExists = false

export const themeList = [
  { id: 1, title: 'appearanceDevice', value: 'device' },
  { id: 2, title: 'appearanceLight', value: 'light', color: '#F5F5F7' },
  { id: 3, title: 'appearanceDark', value: 'dark', color: '#000000' }
]

function findThemeByName(theme) {
  return themeList.find((el) => el.value === theme)
}

export function getTheme() {
  return findThemeByName(localStorage.getItem('theme'))
}

export function setTheme(newTheme) {
  const theme = newTheme ?? getTheme()
  if (!theme) localStorage.setItem('theme', 'device')
  if (newTheme) localStorage.setItem('theme', theme.value)
  setColorScheme()
}

export function getColorScheme() {
  let theme = getTheme()
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
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', colorScheme.color)
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

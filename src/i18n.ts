import { createI18n } from 'vue-i18n'
import * as ru from '@/languages/ru-RU.json'
import * as en from '@/languages/en-US.json'

const locales = {
  en,
  ru
}

type Locale = keyof typeof locales

type Language = {
  title: string
  value: Locale
}

const fallback: Language = { title: 'en', value: 'en' }

export const i18n = createI18n({
  fallbackLocale: fallback.value,
  messages: locales
})

export const languageList = i18n.global.availableLocales.map((el): Language => {
  return { title: el, value: el }
})

setLanguage()

function findLanguageByName(language: string): Language {
  const lang = languageList.find((el) => el.value === language)
  if (lang) return lang
  else return fallback
}

export function getLanguage(): Language {
  let language = localStorage.getItem('lang')
  if (language) return findLanguageByName(language)
  language = navigator.language.slice(0, 2).toLowerCase()
  return findLanguageByName(language)
}

export function setLanguage(newLanguage?: Language) {
  const language = newLanguage ?? getLanguage()
  localStorage.setItem('lang', language.value)
  i18n.global.locale = language.value
}

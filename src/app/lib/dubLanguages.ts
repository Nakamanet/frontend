export const DUB_LANGUAGES: Record<string, { flag: string; label: string }> = {
  Japanese: { flag: 'jp', label: 'Japonais' },
  English: { flag: 'us', label: 'Anglais' },
  French: { flag: 'fr', label: 'Français' },
  German: { flag: 'de', label: 'Allemand' },
  Italian: { flag: 'it', label: 'Italien' },
  Spanish: { flag: 'es', label: 'Espagnol' },
  Brazilian: { flag: 'br', label: 'Portugais (Brésil)' },
  Korean: { flag: 'kr', label: 'Coréen' },
  Hungarian: { flag: 'hu', label: 'Hongrois' },
  Hebrew: { flag: 'il', label: 'Hébreu' },
}

export function dubLanguageLabel(language: string | null | undefined): string {
  if (!language) return 'Autre'
  return DUB_LANGUAGES[language]?.label ?? language
}

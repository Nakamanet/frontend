import Image from 'next/image'
import { DUB_LANGUAGES, dubLanguageLabel } from '@/app/lib/dubLanguages'

export default function DubFlag({ language, className = '' }: { language: string | null | undefined; className?: string }) {
  const flag = language ? DUB_LANGUAGES[language]?.flag : undefined
  if (!flag) return null
  const label = dubLanguageLabel(language)

  return (
    <Image
      src={`/flags/${flag}.svg`}
      alt={label}
      title={label}
      width={28}
      height={21}
      className={`rounded-[3px] shadow-sm shrink-0 ${className}`}
    />
  )
}

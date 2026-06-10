import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="hidden md:flex items-center justify-between border-t border-border bg-accent px-10 py-2 shrink-0 mt-auto">
      <Link href="/">
        <Image src="/logo.png" alt="NakamaNet" width={38} height={50} />
      </Link>
      <div className="flex items-center gap-6 text-sm text-white/50">
        <Link href="/mentions-legales" className="hover:text-white transition-colors">
          Mentions légales
        </Link>
        <span className="text-white/20">|</span>
        <Link href="/politique-cookies" className="hover:text-white transition-colors">
          Politique des cookies
        </Link>
      </div>
      <p className="text-sm text-white/30">© {new Date().getFullYear()} NakamaNet</p>
    </footer>
  )
}

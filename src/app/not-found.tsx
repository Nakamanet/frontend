import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-clip py-16 pb-40 md:pb-32">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(225,16,72,0.28) 0%, rgba(225,16,72,0.08) 45%, transparent 70%), #0e1520',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-conic-gradient(from 0deg at 50% 50%, rgba(225,16,72,0.12) 0deg, transparent 1.5deg, transparent 9deg)',
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-4 flex flex-col items-center">
        <h1 className="text-[9rem] md:text-[14rem] font-extrabold leading-none tracking-tight text-primary mb-8">404</h1>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="px-8 py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-bold text-base text-center whitespace-nowrap transition-colors"
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/bibliotheque"
            className="px-8 py-3 rounded-xl bg-muted border border-border hover:border-primary text-white font-bold text-base text-center whitespace-nowrap transition-colors"
          >
            Explorer la bibliothèque
          </Link>
        </div>
      </div>

      <div
        aria-hidden
        className="tbc-enter absolute z-10 right-6 md:right-12 bottom-24 md:bottom-10"
        style={{ filter: 'drop-shadow(4px 4px 0 var(--primary))' }}
      >
        <p
          className="pl-10 pr-7 md:pl-14 md:pr-10 py-2.5 md:py-4 bg-text text-bg text-base md:text-2xl font-black italic uppercase tracking-[0.12em] whitespace-nowrap"
          style={{ clipPath: 'polygon(1.4em 0, 100% 0, 100% 100%, 1.4em 100%, 0 50%)' }}
        >
          To be continued
        </p>
      </div>
    </section>
  )
}

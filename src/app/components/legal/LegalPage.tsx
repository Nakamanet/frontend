import Link from 'next/link'

export const CONTACT_EMAIL = 'contact@nakamanet.fr'

export type LegalSection = { id: string; title: string; content: React.ReactNode }

export function ContactLink() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary font-semibold hover:underline">
      {CONTACT_EMAIL}
    </a>
  )
}

export default function LegalPage({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: React.ReactNode
  updatedAt: string
  intro: React.ReactNode
  sections: LegalSection[]
}) {
  return (
    <main className="max-w-3xl mx-auto px-6 py-14 md:py-20">
      <Link href="/" className="text-sm text-text/50 hover:text-primary transition-colors">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="mt-8 text-4xl md:text-5xl font-extrabold leading-[1.1] text-balance">{title}</h1>
      <p className="mt-3 text-sm text-text/40">Dernière mise à jour : {updatedAt}</p>
      <div className="mt-6 text-text/70 leading-relaxed flex flex-col gap-3">{intro}</div>

      {sections.map((section, i) => (
        <section key={section.id} id={section.id} className="pt-12 scroll-mt-24 flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold flex gap-3">
            <span className="text-primary">{i + 1}.</span>
            {section.title}
          </h2>
          <div className="flex flex-col gap-4 text-text/70 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_li]:marker:text-primary [&_strong]:text-text [&_strong]:font-semibold">
            {section.content}
          </div>
        </section>
      ))}
    </main>
  )
}

/** Bloc d'informations clé / valeur (éditeur, hébergeur, etc.) */
export function InfoCard({ rows }: { rows: [string, React.ReactNode][] }) {
  return (
    <dl className="grid sm:grid-cols-[auto_1fr] gap-x-6 gap-y-1 sm:gap-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-text/45 mt-2 sm:mt-0">{label}</dt>
          <dd className="text-text/85">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Tableau simple, défilable horizontalement sur mobile */
export function LegalTable({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="pr-6 pb-2 text-xs uppercase tracking-[0.2em] text-text/40 font-semibold whitespace-nowrap"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="align-top">
              {row.map((cell, j) => (
                <td key={j} className={`pr-6 py-2 ${j === 0 ? 'text-text font-semibold' : 'text-text/70'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

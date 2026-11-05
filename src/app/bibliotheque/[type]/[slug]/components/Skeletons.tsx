function Block({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-card bg-muted/60 ${className}`} />
}

export function CardGridSkeleton({
  count,
  aspect,
  className,
}: {
  count: number
  aspect: 'portrait' | 'video'
  className: string
}) {
  return (
    <div aria-hidden className={className}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Block className={`w-full ${aspect === 'portrait' ? 'aspect-2/3' : 'aspect-video rounded-[10px]'}`} />
          {aspect === 'video' && <Block className="h-3 w-3/4 rounded-full" />}
        </div>
      ))}
    </div>
  )
}

export default function DetailSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Chargement de l'œuvre"
      className="lg:grid lg:grid-cols-5 max-w-[1500px] mx-auto px-4 md:px-8 lg:px-15 py-5 md:py-10 pb-20 md:pb-10"
    >
      <section className="lg:col-span-4 lg:pr-6">
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-between gap-3 mb-1">
            <Block className="h-4 w-64 rounded-full" />
            <Block className="h-8 w-24 rounded-full" />
          </div>
          <Block className="w-full h-64" />
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 w-full px-0 md:px-5 gap-5 mb-6" style={{ marginTop: '-80px' }}>
          <div className="w-32 md:w-auto md:col-span-1">
            <div className="w-full aspect-2/3 rounded-card bg-bg">
              <Block className="w-full h-full" />
            </div>
          </div>
          <div className="md:col-span-3 flex flex-col gap-10">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-3 w-2/3">
                <Block className="h-8 w-full rounded-full" />
                <Block className="h-5 w-1/2 rounded-full" />
              </div>
              <Block className="h-10 w-40 rounded-full" />
            </div>
            <div className="bg-accent rounded-card p-5 flex flex-col gap-3">
              <Block className="h-6 w-28 rounded-full mb-2" />
              {['w-full', 'w-full', 'w-11/12', 'w-full', 'w-3/4'].map((width, i) => (
                <Block key={i} className={`h-3.5 ${width} rounded-full`} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Block className="h-11 w-full rounded-full" />
          <div className="border border-border bg-accent rounded-card p-5">
            <CardGridSkeleton count={10} aspect="portrait" className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3" />
          </div>
        </div>
      </section>

      <section className="hidden lg:flex flex-col gap-5 py-6">
        <Block className="h-[400px] w-full" />
        <div className="bg-accent rounded-card p-5 flex flex-col gap-4">
          <Block className="h-6 w-32 rounded-full" />
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="flex justify-between gap-4">
              <Block className="h-3.5 w-20 rounded-full" />
              <Block className="h-3.5 w-24 rounded-full" />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

export default function StationLoading() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--st-bg, #f5f0e8)' }}>
      {/* Header skeleton */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="h-9 w-20 animate-pulse rounded-full bg-black/10" />
        <div className="h-5 w-32 animate-pulse rounded-full bg-black/10" />
        <div className="h-9 w-28 animate-pulse rounded-full bg-black/10" />
      </div>

      {/* Hero skeleton */}
      <div className="flex min-h-screen items-center px-6 sm:px-10">
        <div className="flex w-full max-w-xl flex-col gap-5 pt-12">
          <div className="h-3 w-28 animate-pulse rounded-full bg-black/10" />
          <div className="h-14 w-3/4 animate-pulse rounded-xl bg-black/10" />
          <div className="h-5 w-full animate-pulse rounded-full bg-black/10" />
          <div className="h-5 w-5/6 animate-pulse rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  )
}

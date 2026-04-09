import { useState, useEffect, useRef } from 'react'

const INVARIANTS = [
  {
    english: 'Every owner in the list is reachable from the sentinel.',
    formal: '\u2200 key, next(key) \u2260 0 \u2192 reachable(SENTINEL, key)',
    link: 'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean#L63-L65',
    label: 'inListReachable'
  },
  {
    english:
      'Being in the list is equivalent to being reachable from the sentinel.',
    formal:
      '\u2200 key \u2260 0, next(key) \u2260 0 \u2194 reachable(SENTINEL, key)',
    link: 'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean#L87-L90',
    label: 'ownerListInvariant'
  },
  {
    english: 'The owner list has no internal cycles.',
    formal:
      '\u2200 key \u2260 SENTINEL, \u2200 chain, isChain(chain) \u2227 noDups(chain) \u2192 SENTINEL \u2209 chain',
    link: 'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean#L118-L124',
    label: 'acyclic'
  }
]

export default function SafeGuarantee() {
  const [showEnglish, setShowEnglish] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setTimeout(() => setShowEnglish(false), 5000)
    return () => clearTimeout(timerRef.current)
  }, [])

  const handleToggle = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setShowEnglish((prev) => !prev)
  }

  return (
    <div className="py-6">
      <button
        onClick={handleToggle}
        className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-muted hover:text-heading transition-colors cursor-pointer mb-4"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-[13px] h-[13px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </svg>
        {showEnglish ? 'Switch to formal' : 'Switch to English'}
      </button>

      <div className="space-y-4">
        {INVARIANTS.map((inv) => (
          <div key={inv.label} className="grid [&>*]:col-start-1 [&>*]:row-start-1">
            <div
              className="transition-opacity duration-200"
              style={{
                opacity: showEnglish ? 0 : 1,
                pointerEvents: showEnglish ? 'none' : 'auto'
              }}
              aria-hidden={showEnglish}
            >
              <div className="flex items-baseline gap-3">
                <a
                  href={inv.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-mono text-accent hover:text-heading transition-colors shrink-0"
                >
                  {inv.label}
                </a>
                <code className="text-sm font-mono text-primary leading-relaxed">
                  {inv.formal}
                </code>
              </div>
            </div>
            <div
              className="transition-opacity duration-200"
              style={{
                opacity: showEnglish ? 1 : 0,
                pointerEvents: showEnglish ? 'auto' : 'none'
              }}
              aria-hidden={!showEnglish}
            >
              <div className="flex items-baseline gap-3">
                <span className="text-[11px] font-mono text-muted/60 shrink-0">
                  {inv.label}
                </span>
                <p className="text-lg md:text-xl leading-snug font-serif">
                  {inv.english}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

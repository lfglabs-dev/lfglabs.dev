import { useState, useEffect, useRef } from 'react'
import { ExternalLinkIcon } from './ExternalLink'

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

      <div className="grid text-center [&>*]:col-start-1 [&>*]:row-start-1">
        <div
          className="flex items-center justify-center transition-opacity duration-200"
          style={{
            opacity: showEnglish ? 0 : 1,
            pointerEvents: showEnglish ? 'none' : 'auto'
          }}
          aria-hidden={showEnglish}
        >
          <pre className="text-sm md:text-base font-mono leading-relaxed text-left inline-block">
            <span className="text-muted">{'-- for every address in the list'}</span>
            {'\n'}
            <span className="text-primary">{'next(SENTINEL) \u2260 0  \u2227'}</span>
            {'\n'}
            <span className="text-primary">
              {'\u2200 key, next(key) \u2260 0 \u2192 reachable(SENTINEL, key)'}
            </span>
          </pre>
        </div>
        <div
          className="flex items-center justify-center transition-opacity duration-200"
          style={{
            opacity: showEnglish ? 1 : 0,
            pointerEvents: showEnglish ? 'auto' : 'none'
          }}
          aria-hidden={!showEnglish}
        >
          <p className="text-xl md:text-2xl leading-snug font-serif">
            Every owner in the Safe can be reached by walking the list from the sentinel node.
          </p>
        </div>
      </div>

      <div className="text-right mt-4">
        <a
          href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean#L49-L52"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent hover:text-heading transition-colors cursor-pointer"
        >
          View Lean
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  )
}

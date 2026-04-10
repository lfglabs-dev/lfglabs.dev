import { useState, useEffect, useRef } from 'react'

const FORMAL_INVARIANTS = [
  '\u2200 key, next(key) \u2260 0 \u2192 reachable(SENTINEL, key)',
  '\u2200 key \u2260 0, next(key) \u2260 0 \u2194 reachable(SENTINEL, key)',
  '\u2200 a b, reachable(a, b) \u2227 reachable(b, a) \u2192 a = b'
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

      <div className="grid text-center [&>*]:col-start-1 [&>*]:row-start-1">
        <div
          className="flex flex-col items-center justify-center gap-4 md:gap-5 transition-opacity duration-200 text-[0.945rem] md:text-[1.18125rem] font-mono text-primary leading-snug"
          style={{
            opacity: showEnglish ? 0 : 1,
            pointerEvents: showEnglish ? 'none' : 'auto'
          }}
          aria-hidden={showEnglish}
        >
          {FORMAL_INVARIANTS.map((formal, i) => (
            <code
              key={i}
              className="block w-full max-w-full overflow-x-auto px-1"
            >
              {formal}
            </code>
          ))}
        </div>
        <div
          className="flex items-center justify-center transition-opacity duration-200"
          style={{
            opacity: showEnglish ? 1 : 0,
            pointerEvents: showEnglish ? 'auto' : 'none'
          }}
          aria-hidden={!showEnglish}
        >
          <p className="text-xl md:text-2xl leading-snug font-serif max-w-prose mx-auto px-1">
            The owners mapping forms a proper loop-free linked list starting at
            a special node called{' '}
            <code className="font-mono text-[0.92em] text-primary">
              SENTINEL
            </code>
            , and the owners are exactly the addresses on that list.
          </p>
        </div>
      </div>
    </div>
  )
}

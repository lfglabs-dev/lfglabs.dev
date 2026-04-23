import { useEffect, useRef, useState } from 'react'
import { ExternalLinkIcon } from './ExternalLink'

const FORMAL_GUARANTEES = [
  '∀ oldFeed answer start apr now, safeInputsOk(answer, start, apr, now, oldFeed) → safeAccepted(answer, start, apr, now, oldFeed) ∧ writesSubmittedRound(answer, start, apr, now, oldFeed)',
  '∀ oldFeed answer start apr now, ¬safeInputsOk(answer, start, apr, now, oldFeed) → safeRejected(answer, start, apr, now, oldFeed)'
]

export default function MidasGuarantee({ specsHref }) {
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
          className="flex flex-col items-center justify-center gap-4 md:gap-5 transition-opacity duration-200 text-[0.84rem] md:text-[1rem] font-mono text-primary leading-snug"
          style={{
            opacity: showEnglish ? 0 : 1,
            pointerEvents: showEnglish ? 'none' : 'auto'
          }}
          aria-hidden={showEnglish}
        >
          {FORMAL_GUARANTEES.map((formal, i) => (
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
          <div className="flex flex-col items-center gap-3 md:gap-4 max-w-prose mx-auto px-1">
            <p className="text-xl md:text-2xl leading-snug font-serif">
              If a submitted round satisfies the safe path&apos;s guardrails,
              <code className="font-mono text-[0.8em]"> setRoundDataSafe </code>
              succeeds and writes that round exactly as submitted.
            </p>
            <p className="text-xl md:text-2xl leading-snug font-serif">
              If it does not satisfy those guardrails, the safe path rejects it
              before it can update the feed.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-muted">
        Names are simplified on purpose:{' '}
        <code className="font-mono text-[11px]">answer</code>,{' '}
        <code className="font-mono text-[11px]">start</code>,{' '}
        <code className="font-mono text-[11px]">apr</code>, and{' '}
        <code className="font-mono text-[11px]">now</code> are the call
        inputs.
        <br />
        <code className="font-mono text-[11px]">oldFeed</code> is the feed
        state before the call.
        <br />
        <code className="font-mono text-[11px]">safeInputsOk(...)</code>{' '}
        means the submission satisfies the safe path&apos;s guardrails.
        <br />
        <code className="font-mono text-[11px]">safeAccepted(...)</code>{' '}
        means <code className="font-mono text-[11px]">setRoundDataSafe</code>{' '}
        succeeds.
        <br />
        <code className="font-mono text-[11px]">writesSubmittedRound(...)</code>{' '}
        means the newly written round stores the submitted answer, timestamp,
        block time, and APR exactly.
      </p>

      <div className="text-right mt-4">
        <a
          href={specsHref}
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

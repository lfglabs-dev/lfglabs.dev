import { useState, useEffect, useRef } from 'react'
import { ExternalLinkIcon } from './ExternalLink'

const FORMAL_GUARANTEE =
  '∀ s amountIn, virtualXtReserve′ = virtualXtReserve − singleSegmentBuyXtTokenAmtOut(daysToMaturity, virtualXtReserve, amountIn, feeRatio, liqSquare, offset)'

export default function TermMaxGuarantee({ specsHref }) {
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
          <code className="block w-full max-w-full overflow-x-auto px-1">
            {FORMAL_GUARANTEE}
          </code>
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
            After a single-segment exact-input swap of debt tokens for XT, the
            on-chain virtual XT reserve decreases by exactly the amount the
            pricing curve computes.
          </p>
        </div>
      </div>

      <p className="mt-4 text-[12px] leading-relaxed text-muted">
        Names are simplified on purpose:{' '}
        <code className="font-mono text-[11px]">amountIn</code> is the exact
        debt-token input.
        <br />
        <code className="font-mono text-[11px]">virtualXtReserve</code> is the
        on-chain XT reserve before the swap.
        <br />
        <code className="font-mono text-[11px]">
          singleSegmentBuyXtTokenAmtOut(...)
        </code>{' '}
        is the curve-computed XT output, a pure function of the reserve, input,
        fee ratio, liquidity, and curve offset.
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

export default function ClaimFlowDiagram({ className = '' }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 520 420"
        className="w-full max-w-[520px] mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── User ── */}
        <rect x="20" y="60" width="90" height="40" rx="6" stroke="#9ca3af" strokeWidth="1.2" fill="#f9fafb" />
        <text x="65" y="84" textAnchor="middle" className="fill-[#374151]" fontSize="13" fontFamily="sans-serif">
          User
        </text>

        {/* ── Before state box ── */}
        <rect x="200" y="20" width="300" height="110" rx="6" stroke="#374151" strokeWidth="1.5" fill="#f3f4f6" />
        <text x="350" y="42" textAnchor="middle" className="fill-[#374151]" fontSize="12" fontWeight="600" fontFamily="sans-serif">
          Contract State (before)
        </text>
        <text x="220" y="62" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          roundUsdcTotal: 10000
        </text>
        <text x="220" y="78" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          roundUsdcClaimed: 2000
        </text>
        <text x="220" y="94" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          totalUsdcAllocated: 8000
        </text>
        <text x="220" y="110" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          hasClaimedUsdc[Alice]: 0
        </text>

        {/* Arrow: User → Before (call) */}
        <line x1="110" y1="80" x2="196" y2="80" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="196,77 204,80 196,83" fill="#9ca3af" />
        <text x="153" y="72" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="monospace">
          claimUsdc(shareWad, proof)
        </text>

        {/* ── Checks ── */}
        <rect x="200" y="160" width="300" height="100" rx="6" stroke="#d1d5db" strokeWidth="1" fill="#ffffff" />
        <text x="230" y="182" className="fill-[#059669]" fontSize="11" fontFamily="sans-serif">
          &#x2713; waiver signed
        </text>
        <text x="230" y="198" className="fill-[#059669]" fontSize="11" fontFamily="sans-serif">
          &#x2713; round active
        </text>
        <text x="230" y="214" className="fill-[#059669]" fontSize="11" fontFamily="sans-serif">
          &#x2713; not already claimed
        </text>
        <text x="230" y="230" className="fill-[#059669]" fontSize="11" fontFamily="sans-serif">
          &#x2713; proof accepted
        </text>
        <text x="230" y="246" className="fill-[#059669]" fontSize="11" fontFamily="sans-serif">
          &#x2713; 2000 + 1500 &le; 10000
        </text>

        {/* Arrow: Before → Checks */}
        <line x1="350" y1="130" x2="350" y2="156" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="347,156 350,164 353,156" fill="#9ca3af" />

        {/* ── After state box ── */}
        <rect x="200" y="290" width="300" height="110" rx="6" stroke="#374151" strokeWidth="1.5" fill="#f3f4f6" />
        <text x="350" y="312" textAnchor="middle" className="fill-[#374151]" fontSize="12" fontWeight="600" fontFamily="sans-serif">
          Contract State (after)
        </text>
        <text x="220" y="332" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          roundUsdcTotal: 10000
        </text>
        <text x="220" y="348" className="fill-[#374151]" fontSize="11" fontWeight="600" fontFamily="monospace">
          roundUsdcClaimed: 3500
        </text>
        <text x="220" y="364" className="fill-[#374151]" fontSize="11" fontWeight="600" fontFamily="monospace">
          totalUsdcAllocated: 6500
        </text>
        <text x="220" y="380" className="fill-[#374151]" fontSize="11" fontWeight="600" fontFamily="monospace">
          hasClaimedUsdc[Alice]: 1
        </text>

        {/* Arrow: Checks → After */}
        <line x1="350" y1="260" x2="350" y2="286" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="347,286 350,294 353,286" fill="#9ca3af" />

        {/* Arrow: After → User (payout) */}
        <line x1="200" y1="345" x2="65" y2="345" stroke="#9ca3af" strokeWidth="1.2" />
        <line x1="65" y1="345" x2="65" y2="104" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="62,104 65,96 68,104" fill="#9ca3af" />
        <text x="133" y="338" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="monospace">
          amount = 1500
        </text>

        {/* Conservation annotation */}
        <text x="350" y="415" textAnchor="middle" className="fill-[#9ca3af]" fontSize="10" fontFamily="sans-serif">
          claimed + allocated = 2000 + 8000 = 3500 + 6500 = 10000 (conserved)
        </text>
      </svg>
    </div>
  )
}

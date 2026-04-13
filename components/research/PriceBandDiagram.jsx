export default function PriceBandDiagram({ className = '' }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 600 260"
        className="w-full max-w-[600px] mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Members ── */}
        <rect x="20" y="20" width="120" height="50" rx="6" stroke="#9ca3af" strokeWidth="1.2" fill="#f9fafb" />
        <text x="80" y="50" textAnchor="middle" className="fill-[#374151]" fontSize="13" fontFamily="sans-serif">
          Members
        </text>

        {/* ── Capital Pool ── */}
        <rect x="220" y="20" width="160" height="50" rx="6" stroke="#374151" strokeWidth="1.5" fill="#f3f4f6" />
        <text x="300" y="42" textAnchor="middle" className="fill-[#374151]" fontSize="13" fontWeight="600" fontFamily="sans-serif">
          Capital Pool
        </text>
        <text x="300" y="58" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="sans-serif">
          shared ETH reserve
        </text>

        {/* ── NXM Token ── */}
        <rect x="220" y="120" width="160" height="50" rx="6" stroke="#9ca3af" strokeWidth="1.2" fill="#f9fafb" />
        <text x="300" y="142" textAnchor="middle" className="fill-[#374151]" fontSize="13" fontWeight="600" fontFamily="sans-serif">
          NXM Token
        </text>
        <text x="300" y="158" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="sans-serif">
          membership + pool share
        </text>

        {/* ── RAMM ── */}
        <rect x="460" y="120" width="120" height="50" rx="6" stroke="#374151" strokeWidth="1.5" fill="#f3f4f6" />
        <text x="520" y="142" textAnchor="middle" className="fill-[#374151]" fontSize="13" fontWeight="600" fontFamily="sans-serif">
          RAMM
        </text>
        <text x="520" y="158" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="sans-serif">
          ~5,000 ETH reserve
        </text>

        {/* ── Claims ── */}
        <rect x="460" y="20" width="120" height="50" rx="6" stroke="#9ca3af" strokeWidth="1.2" fill="#f9fafb" />
        <text x="520" y="50" textAnchor="middle" className="fill-[#374151]" fontSize="13" fontFamily="sans-serif">
          Claims
        </text>

        {/* Arrow: Members → Capital Pool (pool ETH) */}
        <line x1="140" y1="45" x2="216" y2="45" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="216,42 224,45 216,48" fill="#9ca3af" />
        <text x="178" y="38" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="sans-serif">
          pool ETH
        </text>

        {/* Arrow: Capital Pool → Claims (pays out) */}
        <line x1="380" y1="45" x2="456" y2="45" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="456,42 464,45 456,48" fill="#9ca3af" />
        <text x="418" y="38" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="sans-serif">
          pays out
        </text>

        {/* Arrow: Members ↔ NXM (hold) */}
        <line x1="80" y1="70" x2="80" y2="140" stroke="#9ca3af" strokeWidth="1.2" strokeDasharray="4 3" />
        <line x1="80" y1="140" x2="216" y2="140" stroke="#9ca3af" strokeWidth="1.2" strokeDasharray="4 3" />
        <polygon points="216,137 224,140 216,143" fill="#9ca3af" />
        <text x="148" y="134" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="sans-serif">
          hold
        </text>

        {/* Arrow: RAMM → NXM (trades) */}
        <line x1="460" y1="145" x2="384" y2="145" stroke="#9ca3af" strokeWidth="1.2" />
        <polygon points="384,142 376,145 384,148" fill="#9ca3af" />
        <text x="422" y="138" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="sans-serif">
          trades
        </text>

        {/* Arrow: Capital Pool → RAMM (refills via adjustEth) */}
        <line x1="380" y1="65" x2="520" y2="116" stroke="#9ca3af" strokeWidth="1.2" strokeDasharray="4 3" />
        <polygon points="517,113 524,118 515,119" fill="#9ca3af" />
        <text x="468" y="82" textAnchor="middle" className="fill-[#9ca3af]" fontSize="9" fontFamily="sans-serif">
          refills
        </text>

        {/* Book value annotation */}
        <text x="300" y="200" textAnchor="middle" className="fill-[#6b7280]" fontSize="11" fontFamily="sans-serif">
          book value =
        </text>
        <text x="300" y="220" textAnchor="middle" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          capital pool / NXM supply
        </text>
        <text x="300" y="245" textAnchor="middle" className="fill-[#9ca3af]" fontSize="10" fontFamily="sans-serif">
          RAMM prices trades against book value
        </text>

        {/* Connecting line from annotation to both pools */}
        <line x1="300" y1="175" x2="300" y2="190" stroke="#d1d5db" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    </div>
  )
}

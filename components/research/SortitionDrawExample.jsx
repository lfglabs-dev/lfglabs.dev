export default function SortitionDrawExample({ className = '' }) {
  const active = '#059669'
  const activeBg = '#ecfdf5'
  const inactive = '#d1d5db'
  const inactiveBg = '#f9fafb'
  const inactiveText = '#c4c8cd'

  return (
    <div className={className}>
      <svg
        viewBox="0 0 560 370"
        className="w-full max-w-[560px] mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Level 0: Root (active) ── */}
        <rect x="230" y="10" width="100" height="36" rx="6" stroke={active} strokeWidth="1.5" fill={activeBg} />
        <text x="280" y="33" textAnchor="middle" fill={active} fontSize="12" fontWeight="600" fontFamily="monospace">
          root = 800
        </text>
        {/* ticket label at root */}
        <text x="340" y="22" fill={active} fontSize="9" fontWeight="600" fontFamily="sans-serif">
          ticket = 200
        </text>

        {/* ── Level 1 ── */}
        {/* node1 (active, go left) */}
        <rect x="100" y="90" width="100" height="36" rx="6" stroke={active} strokeWidth="1.5" fill={activeBg} />
        <text x="150" y="113" textAnchor="middle" fill={active} fontSize="11" fontWeight="600" fontFamily="monospace">
          node1 = 350
        </text>

        {/* node2 (inactive) */}
        <rect x="360" y="90" width="100" height="36" rx="6" stroke={inactive} strokeWidth="1" fill={inactiveBg} />
        <text x="410" y="113" textAnchor="middle" fill={inactiveText} fontSize="11" fontFamily="monospace">
          node2 = 450
        </text>

        {/* Lines: root to level 1 */}
        <line x1="255" y1="46" x2="175" y2="90" stroke={active} strokeWidth="2" />
        <line x1="305" y1="46" x2="385" y2="90" stroke={inactive} strokeWidth="1" />

        {/* Decision label: 200 < 350, go left */}
        <text x="196" y="64" textAnchor="middle" fill={active} fontSize="9" fontFamily="sans-serif" fontWeight="600">
          200 {'<'} 350
        </text>
        <text x="196" y="74" textAnchor="middle" fill={active} fontSize="8" fontFamily="sans-serif">
          go left
        </text>

        {/* ── Level 2 ── */}
        {/* node3 (inactive) */}
        <rect x="30" y="170" width="90" height="36" rx="6" stroke={inactive} strokeWidth="1" fill={inactiveBg} />
        <text x="75" y="193" textAnchor="middle" fill={inactiveText} fontSize="10" fontFamily="monospace">
          node3 = 150
        </text>

        {/* node4 (active, go right) */}
        <rect x="160" y="170" width="90" height="36" rx="6" stroke={active} strokeWidth="1.5" fill={activeBg} />
        <text x="205" y="193" textAnchor="middle" fill={active} fontSize="10" fontWeight="600" fontFamily="monospace">
          node4 = 200
        </text>

        {/* node5 (inactive) */}
        <rect x="310" y="170" width="90" height="36" rx="6" stroke={inactive} strokeWidth="1" fill={inactiveBg} />
        <text x="355" y="193" textAnchor="middle" fill={inactiveText} fontSize="10" fontFamily="monospace">
          node5 = 250
        </text>

        {/* node6 (inactive) */}
        <rect x="440" y="170" width="90" height="36" rx="6" stroke={inactive} strokeWidth="1" fill={inactiveBg} />
        <text x="485" y="193" textAnchor="middle" fill={inactiveText} fontSize="10" fontFamily="monospace">
          node6 = 200
        </text>

        {/* Lines: level 1 to level 2 */}
        <line x1="125" y1="126" x2="90" y2="170" stroke={inactive} strokeWidth="1" />
        <line x1="175" y1="126" x2="195" y2="170" stroke={active} strokeWidth="2" />
        <line x1="385" y1="126" x2="345" y2="170" stroke={inactive} strokeWidth="1" />
        <line x1="435" y1="126" x2="475" y2="170" stroke={inactive} strokeWidth="1" />

        {/* Decision label: 200 >= 150, go right, ticket = 50 */}
        <text x="198" y="144" textAnchor="middle" fill={active} fontSize="9" fontFamily="sans-serif" fontWeight="600">
          200 {'≥'} 150
        </text>
        <text x="198" y="154" textAnchor="middle" fill={active} fontSize="8" fontFamily="sans-serif">
          go right, ticket = 50
        </text>

        {/* ── Level 3: Leaves ── */}
        {[
          { x: 10, label: 'L0', val: '80', on: false },
          { x: 75, label: 'L1', val: '70', on: false },
          { x: 140, label: 'L2', val: '100', on: true },
          { x: 205, label: 'L3', val: '100', on: false },
          { x: 290, label: 'L4', val: '120', on: false },
          { x: 355, label: 'L5', val: '130', on: false },
          { x: 420, label: 'L6', val: '90', on: false },
          { x: 485, label: 'L7', val: '110', on: false }
        ].map((leaf, i) => (
          <g key={i}>
            <rect
              x={leaf.x} y={260} width="60" height="36" rx="6"
              stroke={leaf.on ? active : inactive}
              strokeWidth={leaf.on ? 2 : 1}
              fill={leaf.on ? activeBg : inactiveBg}
            />
            <text
              x={leaf.x + 30} y={275} textAnchor="middle"
              fill={leaf.on ? active : inactiveText}
              fontSize="10" fontWeight="600" fontFamily="sans-serif"
            >
              {leaf.label}
            </text>
            <text
              x={leaf.x + 30} y={289} textAnchor="middle"
              fill={leaf.on ? active : inactiveText}
              fontSize="9" fontFamily="monospace"
            >
              {leaf.val}
            </text>
          </g>
        ))}

        {/* Lines: level 2 to leaves */}
        <line x1="52" y1="206" x2="40" y2="260" stroke={inactive} strokeWidth="1" />
        <line x1="98" y1="206" x2="105" y2="260" stroke={inactive} strokeWidth="1" />
        <line x1="185" y1="206" x2="170" y2="260" stroke={active} strokeWidth="2" />
        <line x1="225" y1="206" x2="235" y2="260" stroke={inactive} strokeWidth="1" />
        <line x1="335" y1="206" x2="320" y2="260" stroke={inactive} strokeWidth="1" />
        <line x1="375" y1="206" x2="385" y2="260" stroke={inactive} strokeWidth="1" />
        <line x1="465" y1="206" x2="450" y2="260" stroke={inactive} strokeWidth="1" />
        <line x1="505" y1="206" x2="515" y2="260" stroke={inactive} strokeWidth="1" />

        {/* Decision label: 50 < 100, go left */}
        <text x="160" y="234" textAnchor="middle" fill={active} fontSize="9" fontFamily="sans-serif" fontWeight="600">
          50 {'<'} 100
        </text>
        <text x="160" y="244" textAnchor="middle" fill={active} fontSize="8" fontFamily="sans-serif">
          go left
        </text>

        {/* Selected juror callout */}
        <text x="170" y="312" textAnchor="middle" fill={active} fontSize="10" fontWeight="700" fontFamily="sans-serif">
          Selected
        </text>

        {/* Result annotation */}
        <text x="280" y="350" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">
          L2 owns tickets 150 to 249 (100 out of 800 = 12.5% chance)
        </text>
      </svg>
    </div>
  )
}

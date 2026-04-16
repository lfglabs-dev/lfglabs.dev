export default function SortitionTreeDiagram({ className = '' }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 560 400"
        className="w-full max-w-[560px] mx-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Level 0: Root ── */}
        <rect x="230" y="10" width="100" height="36" rx="6" stroke="#374151" strokeWidth="1.5" fill="#f3f4f6" />
        <text x="280" y="33" textAnchor="middle" className="fill-[#374151]" fontSize="12" fontWeight="600" fontFamily="monospace">
          root = 800
        </text>

        {/* ── Level 1: Two subtree roots ── */}
        <rect x="100" y="90" width="100" height="36" rx="6" stroke="#374151" strokeWidth="1.2" fill="#f9fafb" />
        <text x="150" y="113" textAnchor="middle" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          node1 = 350
        </text>

        <rect x="360" y="90" width="100" height="36" rx="6" stroke="#374151" strokeWidth="1.2" fill="#f9fafb" />
        <text x="410" y="113" textAnchor="middle" className="fill-[#6b7280]" fontSize="11" fontFamily="monospace">
          node2 = 450
        </text>

        {/* Lines: root → level 1 */}
        <line x1="255" y1="46" x2="175" y2="90" stroke="#9ca3af" strokeWidth="1.2" />
        <line x1="305" y1="46" x2="385" y2="90" stroke="#9ca3af" strokeWidth="1.2" />

        {/* ── Level 2: Four nodes ── */}
        <rect x="30" y="170" width="90" height="36" rx="6" stroke="#374151" strokeWidth="1" fill="#f9fafb" />
        <text x="75" y="193" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="monospace">
          node3 = 150
        </text>

        <rect x="160" y="170" width="90" height="36" rx="6" stroke="#374151" strokeWidth="1" fill="#f9fafb" />
        <text x="205" y="193" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="monospace">
          node4 = 200
        </text>

        <rect x="310" y="170" width="90" height="36" rx="6" stroke="#374151" strokeWidth="1" fill="#f9fafb" />
        <text x="355" y="193" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="monospace">
          node5 = 250
        </text>

        <rect x="440" y="170" width="90" height="36" rx="6" stroke="#374151" strokeWidth="1" fill="#f9fafb" />
        <text x="485" y="193" textAnchor="middle" className="fill-[#6b7280]" fontSize="10" fontFamily="monospace">
          node6 = 200
        </text>

        {/* Lines: level 1 → level 2 */}
        <line x1="125" y1="126" x2="90" y2="170" stroke="#9ca3af" strokeWidth="1" />
        <line x1="175" y1="126" x2="195" y2="170" stroke="#9ca3af" strokeWidth="1" />
        <line x1="385" y1="126" x2="345" y2="170" stroke="#9ca3af" strokeWidth="1" />
        <line x1="435" y1="126" x2="475" y2="170" stroke="#9ca3af" strokeWidth="1" />

        {/* ── Level 3: Eight leaves ── */}
        {[
          { x: 10, label: 'L0', val: '80' },
          { x: 75, label: 'L1', val: '70' },
          { x: 140, label: 'L2', val: '100' },
          { x: 205, label: 'L3', val: '100' },
          { x: 290, label: 'L4', val: '120' },
          { x: 355, label: 'L5', val: '130' },
          { x: 420, label: 'L6', val: '90' },
          { x: 485, label: 'L7', val: '110' }
        ].map((leaf, i) => (
          <g key={i}>
            <rect x={leaf.x} y={260} width="60" height="36" rx="6" stroke="#059669" strokeWidth="1.2" fill="#ecfdf5" />
            <text x={leaf.x + 30} y={275} textAnchor="middle" className="fill-[#059669]" fontSize="10" fontWeight="600" fontFamily="sans-serif">
              {leaf.label}
            </text>
            <text x={leaf.x + 30} y={289} textAnchor="middle" className="fill-[#6b7280]" fontSize="9" fontFamily="monospace">
              {leaf.val}
            </text>
          </g>
        ))}

        {/* Lines: level 2 → leaves */}
        <line x1="52" y1="206" x2="40" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="98" y1="206" x2="105" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="185" y1="206" x2="170" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="225" y1="206" x2="235" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="335" y1="206" x2="320" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="375" y1="206" x2="385" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="465" y1="206" x2="450" y2="260" stroke="#9ca3af" strokeWidth="1" />
        <line x1="505" y1="206" x2="515" y2="260" stroke="#9ca3af" strokeWidth="1" />

        {/* ── Draw traversal annotation ── */}
        <text x="280" y="330" textAnchor="middle" className="fill-[#9ca3af]" fontSize="10" fontFamily="sans-serif" fontStyle="italic">
          draw(ticket): ticket {'<'} nodeSum {'→'} go left, else go right
        </text>

        {/* ── setLeaf annotation ── */}
        <text x="280" y="350" textAnchor="middle" className="fill-[#9ca3af]" fontSize="10" fontFamily="sans-serif" fontStyle="italic">
          setLeaf: update leaf, propagate sum upward through all 3 levels
        </text>

        {/* ── Conservation annotation ── */}
        <text x="280" y="385" textAnchor="middle" className="fill-[#9ca3af]" fontSize="10" fontFamily="sans-serif">
          root = 80 + 70 + 100 + 100 + 120 + 130 + 90 + 110 = 800 (conserved)
        </text>
      </svg>
    </div>
  )
}

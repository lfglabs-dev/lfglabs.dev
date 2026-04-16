export default function ConfidentialTransferDiagram({ className = '' }) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ERC-20 */}
        <div className="border border-gray-200 rounded-lg p-5">
          <p className="text-[12px] font-semibold text-muted uppercase tracking-wider mb-5">
            ERC-20 transfer
          </p>

          {/* Scenario: enough funds */}
          <div className="mb-5">
            <p className="text-[11px] font-medium text-emerald-600 mb-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Alice has 100, sends 50 to Bob
            </p>
            <div className="flex items-center gap-3 text-[13px]">
              <div className="flex-1 rounded bg-gray-50 border border-gray-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Alice</span>
                <span className="font-mono">100 → 50</span>
              </div>
              <span className="text-muted text-[16px]">→</span>
              <div className="flex-1 rounded bg-gray-50 border border-gray-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Bob</span>
                <span className="font-mono">0 → 50</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1.5 font-medium">
              ✓ Transfer succeeds
            </p>
          </div>

          {/* Scenario: not enough funds */}
          <div>
            <p className="text-[11px] font-medium text-red-500 mb-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400" />
              Alice has 30, sends 50 to Bob
            </p>
            <div className="flex items-center gap-3 text-[13px]">
              <div className="flex-1 rounded bg-red-50 border border-red-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Alice</span>
                <span className="font-mono line-through text-red-400">
                  30
                </span>
              </div>
              <span className="text-red-300 text-[16px]">✕</span>
              <div className="flex-1 rounded bg-red-50 border border-red-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Bob</span>
                <span className="font-mono line-through text-red-400">0</span>
              </div>
            </div>
            <p className="text-[11px] text-red-500 mt-1.5 font-medium">
              ✕ Transaction reverts. Everyone sees it failed.
            </p>
          </div>
        </div>

        {/* ERC-7984 */}
        <div className="border border-gray-200 rounded-lg p-5 bg-[#fafafa]">
          <p className="text-[12px] font-semibold text-muted uppercase tracking-wider mb-5">
            ERC-7984 transfer (encrypted)
          </p>

          {/* Scenario: enough funds */}
          <div className="mb-5">
            <p className="text-[11px] font-medium text-emerald-600 mb-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Alice has 100, sends 50 to Bob
            </p>
            <div className="flex items-center gap-3 text-[13px]">
              <div className="flex-1 rounded bg-gray-50 border border-gray-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Alice</span>
                <span className="font-mono">🔒 → 🔒</span>
              </div>
              <span className="text-muted text-[16px]">→</span>
              <div className="flex-1 rounded bg-gray-50 border border-gray-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Bob</span>
                <span className="font-mono">🔒 → 🔒</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1.5 font-medium">
              ✓ 50 moved, but amounts stay hidden
            </p>
          </div>

          {/* Scenario: not enough funds */}
          <div>
            <p className="text-[11px] font-medium text-amber-600 mb-2 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500" />
              Alice has 30, sends 50 to Bob
            </p>
            <div className="flex items-center gap-3 text-[13px]">
              <div className="flex-1 rounded bg-amber-50 border border-amber-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Alice</span>
                <span className="font-mono">🔒 → 🔒</span>
              </div>
              <span className="text-amber-400 text-[16px]">→</span>
              <div className="flex-1 rounded bg-amber-50 border border-amber-200 px-3 py-2 text-center">
                <span className="text-muted text-[11px] block">Bob</span>
                <span className="font-mono">🔒 → 🔒</span>
              </div>
            </div>
            <p className="text-[11px] text-amber-600 mt-1.5 font-medium">
              ✓ Tx succeeds, but 0 moved. No one can tell it failed.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted/70">
        ERC-7984 never reverts on insufficient balance. Reverting would reveal
        that the sender doesn&apos;t have enough funds.
      </p>
    </div>
  )
}

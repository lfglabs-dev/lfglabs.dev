import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import NexusMutualGuarantee from '../../components/research/NexusMutualGuarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import { research } from '../../data/research'

function Hypothesis({ name, constraint, source, children, border = true }) {
  return (
    <li
      className={`list-none ${border ? 'border-b border-gray-200/50' : ''}`}
    >
      <details className="group/hyp">
        <summary className="px-5 py-3 cursor-pointer select-none list-none flex items-center gap-3 [&::-webkit-details-marker]:hidden">
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-muted/50 transition-transform group-open/hyp:rotate-90 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
          <code className="font-mono text-[12px] font-medium">{name}</code>
          <span className="text-muted text-[13px]">{constraint}</span>
        </summary>
        <div className="px-5 pb-3 pl-12 text-[13px] text-muted leading-relaxed">
          <p className="mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted/60">
              {source}
            </span>
          </p>
          <p>{children}</p>
        </div>
      </details>
    </li>
  )
}

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.NexusMutual.RammPriceBand`

export default function NexusMutualBookValuePage() {
  const otherResearch = research.filter(
    (r) => r.slug !== 'nexus-mutual-book-value'
  )

  return (
    <>
      <Head>
        <title>
          Nexus Mutual Book Value Invariant | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="A formally verified price band property of Nexus Mutual's RAMM pricing mechanism, proven using Verity and Lean 4."
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.43/dist/katex.min.css"
        />
      </Head>
      <PageLayout>
        <div className="font-article max-w-[680px] mx-auto px-6 py-20 md:py-32">
          <nav className="mb-10">
            <Link
              href="/research"
              className="text-sm text-muted hover:text-primary transition-colors font-sans"
            >
              &larr; Back
            </Link>
          </nav>

          <header className="mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Nexus Mutual Book Value Invariant
            </h1>
          </header>

          {/* The Guarantee */}
          <section className="mb-16">
            <NexusMutualGuarantee />
            <p className="text-muted text-[15px] leading-relaxed">
              Nexus Mutual&apos;s RAMM (Risk-Adjusted Market Maker) prices NXM
              token trades against a book value anchor: the protocol&apos;s
              total capital divided by NXM supply. Buy and sell prices are
              derived from virtual reserves that converge toward book value
              ±1% via a time-based ratchet. During convergence the spread can
              be wider than 1%, but the invariant always holds: sell price
              never exceeds book value, and buy price never drops below it.
            </p>
            <p className="mt-2 text-muted text-[15px]">
              <ExternalLink href="https://github.com/NexusMutual/smart-contracts/blob/release-candidate/contracts/modules/capital/Ramm.sol">
                View source contract
              </ExternalLink>
            </p>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-4">
              If the sell price exceeded book value, anyone could buy NXM
              cheap and sell it back to the RAMM at a profit, draining the
              RAMM&apos;s ETH reserve.
            </p>
            <p className="leading-relaxed mb-6">
              The damage wouldn&apos;t stop there. When the RAMM&apos;s
              reserve drops below its 5,000 ETH target,{' '}
              <code className="font-mono text-[13px]">adjustEth</code>{' '}
              automatically refills it from the capital pool at up to 100 ETH
              per day. A sustained arbitrage would therefore drain not just the
              RAMM, but the capital pool that backs every insurance claim on
              the protocol.
            </p>
            <Disclosure title="What this invariant covers">
              <p className="mb-3 text-muted">
                The proof covers every code path through{' '}
                <code className="font-mono text-[12px]">calculateNxm</code>:
                both the BV branch (ratchet has converged, prices snap to book
                value ±1%) and the ratchet branch (still converging, prices
                move gradually). It holds for any value of the reserve and
                timing inputs, which means any sequence of swaps, ETH
                adjustments, or elapsed time is included.
              </p>
              <p className="text-muted">
                The guarantee depends on{' '}
                <code className="font-mono text-[12px]">capital</code> and{' '}
                <code className="font-mono text-[12px]">supply</code> being
                correct. These come from{' '}
                <code className="font-mono text-[12px]">
                  pool.getPoolValueInEth()
                </code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">
                  tokenController.totalSupply()
                </code>
                , which the proof takes as trusted inputs. If those values were
                wrong (e.g. a Chainlink oracle returning a stale price), the
                book value itself would be wrong, and the price band would
                anchor to the wrong number. Oracle correctness is a separate
                verification scope.
              </p>
            </Disclosure>
          </section>

          {/* How this was proven */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              The{' '}
              <code className="font-mono text-[13px]">calculateNxm</code>{' '}
              function uses branching logic with non-linear{' '}
              <code className="font-mono text-[13px]">uint256</code>{' '}
              arithmetic: scaling reserves, computing ratchet convergence
              terms, and comparing products to decide between book-value pricing
              and ratchet pricing. Standard testing cannot cover all input
              combinations.
            </p>
            <p className="leading-relaxed mb-4">
              The contract logic was modeled in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/NexusMutual/RammPriceBand/Contract.lean">
                Verity
              </ExternalLink>
              . The model captures both branches of{' '}
              <code className="font-mono text-[13px]">calculateNxm</code> for
              buy and sell sides, matching the Solidity&apos;s division ordering
              exactly. The theorem was given to AI agents as a benchmark task
              and solved.
            </p>
            <p className="leading-relaxed mb-4">
              The proof is checked by Lean 4&apos;s kernel, a small program
              that accepts or rejects proofs deterministically. If the proof
              were wrong, it would not compile.
            </p>
            <Disclosure title="Verify it yourself" className="mb-4">
              <CodeBlock>{VERIFY_COMMAND}</CodeBlock>
              <p className="mt-3 text-muted">
                If the build succeeds, the proof is correct.{' '}
                <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                  Source repository
                </ExternalLink>
              </p>
            </Disclosure>
            <p className="text-muted text-[14px] leading-relaxed">
              Note: the proof required discovering a tight threshold for the
              sell-side invariant. Integer division truncation means the
              property only holds when eth × supply / capital ≥ 99. Below that
              (at 98), a machine-checked counterexample exists.
            </p>
          </section>

          {/* Hypotheses */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Hypotheses
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              <strong>Trust assumption:</strong>{' '}
              <code className="font-mono text-[12px]">capital</code> and{' '}
              <code className="font-mono text-[12px]">supply</code> are correct.
              These come from onchain oracles and token accounting. The proof
              takes them as given inputs and does not verify oracle
              correctness.
            </p>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              Given that, the theorem requires these hypotheses:
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hEth"
                constraint="eth ≠ 0"
                source="RAMM design invariant"
              >
                The current ETH reserve passed to{' '}
                <code className="font-mono text-[12px]">calculateNxm</code>{' '}
                is positive. Both buy and sell spot prices are computed as{' '}
                <code className="font-mono text-[12px]">
                  1e18 × eth / nxmReserve
                </code>
                , so a zero ETH reserve would make pricing undefined. The RAMM
                targets ~5,000 ETH via{' '}
                <code className="font-mono text-[12px]">adjustEth</code>.
              </Hypothesis>
              <Hypothesis
                name="hOldEth"
                constraint="oldEth ≠ 0"
                source="RAMM design invariant"
              >
                The previous ETH reserve was positive. Both{' '}
                <code className="font-mono text-[12px]">
                  calculateBuyReserve
                </code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">
                  calculateSellReserve
                </code>{' '}
                begin by scaling the old NXM reserve to the current ETH level:{' '}
                <code className="font-mono text-[12px]">
                  scaledReserve = oldNxm × eth / oldEth
                </code>
                . Division by zero here would make the scaled reserve
                undefined.
              </Hypothesis>
              <Hypothesis
                name="hSupply"
                constraint="supply ≠ 0"
                source="NXM base assumption"
              >
                NXM total supply is positive. Book value is{' '}
                <code className="font-mono text-[12px]">
                  1e18 × capital / supply
                </code>
                , and the convergence check in both branches compares against{' '}
                <code className="font-mono text-[12px]">
                  eth × supply
                </code>
                . Always true after NXM&apos;s initial distribution.
              </Hypothesis>
              <Hypothesis
                name="hCapital"
                constraint="capital ≠ 0"
                source="Pool base assumption"
              >
                The protocol&apos;s capital pool has value. Used to compute the
                buffered capital targets:{' '}
                <code className="font-mono text-[12px]">
                  capital × 10100 / 10000
                </code>{' '}
                for buy (BV + 1%) and{' '}
                <code className="font-mono text-[12px]">
                  capital × 9900 / 10000
                </code>{' '}
                for sell (BV − 1%). A zero capital would collapse both price
                targets to zero.
              </Hypothesis>
              <Hypothesis
                name="hRealisticScale"
                constraint="capital ≥ 100 ∧ eth × supply / capital ≥ 99"
                source="Realistic operating range"
                border={false}
              >
                Only needed for the sell side. At very small values (wei
                scale), integer division loses enough precision that the
                sell price can exceed book value, for example with{' '}
                <code className="font-mono text-[12px]">
                  eth=20, capital=13, supply=4
                </code>
                . These thresholds are the tightest bounds where the invariant
                still holds: 100 wei is ~10<sup>−16</sup> ETH. With real
                values (capital ~200k ETH, supply ~7M NXM), these ratios are
                on the order of 10<sup>18</sup>.
              </Hypothesis>
            </ul>
            <p className="mt-2 text-muted text-[13px] leading-relaxed">
              The theorem also requires{' '}
              <code className="font-mono text-[12px]">hNoOverflow</code>{' '}
              hypotheses (not listed individually). Solidity&apos;s{' '}
              <code className="font-mono text-[12px]">uint256</code> wraps
              around at 2<sup>256</sup>. If an intermediate multiplication
              overflowed, the wrapped result would be meaningless and the
              invariant could break. These hypotheses assert that every
              intermediate product in{' '}
              <code className="font-mono text-[12px]">calculateNxm</code>{' '}
              stays below 2<sup>256</sup>. With Nexus Mutual&apos;s capital
              pool at ~200k ETH (~2<sup>88</sup> wei), the largest products
              reach ~2<sup>176</sup>, far below the limit.
            </p>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/NexusMutual/RammPriceBand/Specs.lean">
                View in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/NexusMutual/smart-contracts/blob/release-candidate/contracts/modules/capital/Ramm.sol">
                Nexus Mutual contracts
              </ExternalLink>
            </p>
          </section>

          {/* Learn more */}
          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
            <p className="leading-relaxed">
              <Link
                href="/research/what-is-a-formal-proof"
                className="underline underline-offset-3 hover:text-heading transition-colors"
              >
                What is a formal proof?
              </Link>{' '}
              A short explanation for non-specialists.
            </p>
          </section>

          {otherResearch.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200 font-sans">
              <h2 className="text-base font-bold text-heading mb-6">
                More research
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherResearch.map((r) => (
                  <ResearchCard key={r.slug} item={r} compact />
                ))}
              </div>
            </section>
          )}
        </div>
      </PageLayout>
    </>
  )
}

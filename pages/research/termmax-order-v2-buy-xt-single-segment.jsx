import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import CodeBlock from '../../components/research/CodeBlock'
import Disclosure from '../../components/research/Disclosure'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import TermMaxGuarantee from '../../components/research/TermMaxGuarantee'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.TermMax.OrderV2BuyXtSingleSegment.Compile`

const UPSTREAM_ORDER_V2 =
  'https://github.com/term-structure/termmax-contract-v2/blob/64bd47b98e064c7fb91ab4a59b70520e0ec285d5/contracts/v2/TermMaxOrderV2.sol'
const UPSTREAM_CURVE =
  'https://github.com/term-structure/termmax-contract-v2/blob/64bd47b98e064c7fb91ab4a59b70520e0ec285d5/contracts/v1/lib/TermMaxCurve.sol'
const UPSTREAM_MATH =
  'https://github.com/term-structure/termmax-contract-v2/blob/64bd47b98e064c7fb91ab4a59b70520e0ec285d5/contracts/v1/lib/MathLib.sol'

const BENCHMARK_REPO = 'https://github.com/lfglabs-dev/verity-benchmark'

const BENCHMARK_BLOB =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main'

const CASE_PATH = 'Benchmark/Cases/TermMax/OrderV2BuyXtSingleSegment'
const CONTRACT_LINK = `${BENCHMARK_BLOB}/${CASE_PATH}/Contract.lean`
const SPECS_LINK = `${BENCHMARK_BLOB}/${CASE_PATH}/Specs.lean`
const PROOFS_LINK = `${BENCHMARK_BLOB}/${CASE_PATH}/Proofs.lean`
const CASE_LINK = `${BENCHMARK_BLOB}/${CASE_PATH}`

export default function TermMaxOrderV2BuyXtSingleSegmentPage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'termmax-order-v2-buy-xt-single-segment'
  )

  return (
    <>
      <Head>
        <title>
          TermMax Single-Segment Buy-XT Reserve Integrity | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Formally verified reserve-update integrity of the single-segment debtToken-to-XT swap path in TermMax OrderV2, modeled in Verity and proved in Lean 4."
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
              TermMax Single-Segment Buy-XT Reserve Integrity
            </h1>
          </header>

          <section className="mb-16">
            <TermMaxGuarantee specsHref={SPECS_LINK} />
            <p className="text-muted text-[15px] leading-relaxed">
              TermMax (by{' '}
              <ExternalLink href="https://github.com/term-structure">
                Term Structure
              </ExternalLink>
              ) is a fixed-rate lending protocol. Users trade between debt
              tokens and XT (extended tokens) through on-chain order books,
              where pricing is governed by a bonding curve parameterized by
              liquidity, a time-dependent interest factor, and configurable fee
              ratios.
            </p>
            <p className="mt-4 text-muted text-[15px] leading-relaxed">
              The{' '}
              <ExternalLink href={UPSTREAM_ORDER_V2}>
                TermMaxOrderV2
              </ExternalLink>{' '}
              contract&apos;s{' '}
              <code className="font-mono text-[13px]">
                swapExactTokenToToken
              </code>{' '}
              function is the entry point for exact-input swaps. This case study
              isolates the{' '}
              <code className="font-mono text-[13px]">debtToken → XT</code> path
              on a single curve segment: the path a user takes when borrowing
              against one active curve cut. The proof tracks the modeled call
              stack from the swap entry point down through the curve library and
              confirms that the reserve update matches the curve computation
              exactly inside that model.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              The{' '}
              <code className="font-mono text-[13px]">virtualXtReserve</code> is
              the accounting variable that tracks how much XT liquidity remains
              in the order. Every subsequent swap prices off this value. If the
              reserve update diverges from the curve computation, even by one
              wei, all future swaps on that order will price off an incorrect
              base, and the order&apos;s implied interest rate will drift from
              its configured curve.
            </p>
            <Disclosure title="What this covers">
              <p className="mb-3 text-muted text-[15px]">
                The modeled call stack follows the{' '}
                <code className="font-mono text-[12px]">debtToken → XT</code>{' '}
                branch of{' '}
                <code className="font-mono text-[12px]">
                  swapExactTokenToToken
                </code>{' '}
                through every internal helper down to the curve computation:
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-2">
                <li>
                  <code className="font-mono text-[12px]">
                    swapExactTokenToToken
                  </code>{' '}
                  →{' '}
                  <code className="font-mono text-[12px]">
                    _swapAndUpdateReserves
                  </code>{' '}
                  → <code className="font-mono text-[12px]">_buyXt</code> →{' '}
                  <code className="font-mono text-[12px]">_buyToken</code> →{' '}
                  <code className="font-mono text-[12px]">_buyXtStep</code> →{' '}
                  <code className="font-mono text-[12px]">
                    TermMaxCurve.buyXt
                  </code>{' '}
                  →{' '}
                  <code className="font-mono text-[12px]">cutsReverseIter</code>{' '}
                  →{' '}
                  <code className="font-mono text-[12px]">
                    calcIntervalProps
                  </code>
                </li>
                <li>
                  <code className="font-mono text-[12px]">
                    MathLib.plusInt256
                  </code>{' '}
                  (signed-integer addition on uint256) is also modeled.
                </li>
                <li>
                  The{' '}
                  <code className="font-mono text-[12px]">nonReentrant</code>{' '}
                  modifier is included. The reentrancy lock is modeled as a
                  separate storage slot.
                </li>
              </ul>
              <p className="text-muted">
                Out of scope: other token-pair branches of{' '}
                <code className="font-mono text-[12px]">
                  swapExactTokenToToken
                </code>
                , access control (
                <code className="font-mono text-[12px]">
                  onlyBorrowingIsAllowed
                </code>
                ), token transfers, rebalancing, events, and multi-cut curve
                iteration.
              </p>
            </Disclosure>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was modeled
            </h2>
            <p className="leading-relaxed mb-4">
              The benchmark extracts eight Solidity functions across three
              source files (
              <ExternalLink href={UPSTREAM_ORDER_V2}>
                TermMaxOrderV2.sol
              </ExternalLink>
              ,{' '}
              <ExternalLink href={UPSTREAM_CURVE}>
                TermMaxCurve.sol
              </ExternalLink>
              , <ExternalLink href={UPSTREAM_MATH}>MathLib.sol</ExternalLink>)
              into a single Verity contract block. Each Solidity helper is kept
              as a separate Verity function to preserve the call structure of
              the original code.
            </p>
            <p className="leading-relaxed mb-4">
              TermMax&apos;s curve can have multiple cuts, each with its own
              liquidity parameters. This model covers the case where there is
              exactly one active cut at index 0 and that cut has
              <code className="font-mono text-[13px]"> xtReserve = 0</code>.
              That means the Solidity loop that iterates over cuts runs exactly
              once, and if the swap needs more liquidity than that single cut
              provides, the model reverts with{' '}
              <code className="font-mono text-[13px]">
                InsufficientLiquidity()
              </code>
              .
            </p>
            <Disclosure title="Simplifications" className="mb-4">
              <p className="mb-3 text-muted text-[15px]">
                The model preserves the reserve-update logic for this execution
                path, with deliberate simplifications. The full details are
                documented in{' '}
                <ExternalLink href={CONTRACT_LINK}>Contract.lean</ExternalLink>.
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-2 text-[14px]">
                <li>
                  <strong>Single active curve cut only.</strong> The Solidity
                  contract supports multiple curve cuts and iterates over them.
                  This model covers exactly one active cut at index 0, with{' '}
                  <code className="font-mono text-[12px]">
                    cuts[0].xtReserve = 0
                  </code>
                  . Multi-cut swaps are not covered.
                </li>
                <li>
                  <strong>One swap direction.</strong> Only the{' '}
                  <code className="font-mono text-[12px]">debtToken → XT</code>{' '}
                  path is modeled. The other token-pair branches of{' '}
                  <code className="font-mono text-[12px]">
                    swapExactTokenToToken
                  </code>{' '}
                  are not included.
                </li>
                <li>
                  <strong>Access control omitted.</strong> The{' '}
                  <code className="font-mono text-[12px]">
                    onlyBorrowingIsAllowed
                  </code>{' '}
                  modifier does not touch the reserve, so it is left out without
                  weakening the guarantee.
                </li>
                <li>
                  <strong>Post-swap side effects omitted.</strong> Token
                  transfers, rebalancing, and events all happen after the
                  reserve write and are guarded by{' '}
                  <code className="font-mono text-[12px]">nonReentrant</code>,
                  so they cannot affect the proven property.
                </li>
                <li>
                  <strong>Checked arithmetic abstracted.</strong> Solidity 0.8
                  checked arithmetic in{' '}
                  <code className="font-mono text-[12px]">plusInt256</code> is
                  modeled with Verity&apos;s unsigned arithmetic operations.
                  This proof verifies the reserve update inside that arithmetic
                  model, not Solidity&apos;s overflow-revert behavior.
                </li>
              </ul>
              <p className="text-muted text-[14px]">
                A few cosmetic differences also exist: struct fields are passed
                as individual parameters instead of structs, and library
                functions are inlined as helpers. These change the shape of the
                code but not its logic.
              </p>
            </Disclosure>
            <Disclosure title="Verify it yourself" className="mb-4">
              <CodeBlock>{VERIFY_COMMAND}</CodeBlock>
              <p className="mt-3 text-muted">
                If the build succeeds, the proofs are correct.{' '}
                <ExternalLink href={BENCHMARK_REPO}>
                  Source repository
                </ExternalLink>
              </p>
            </Disclosure>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Proof status
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              This case has one headline theorem in Lean 4. The corresponding
              proof file in the{' '}
              <ExternalLink href={BENCHMARK_REPO}>
                Verity benchmark repository
              </ExternalLink>{' '}
              is <code className="font-mono text-[12px]">sorry</code>-free, so
              the claim below is accepted by Lean&apos;s kernel rather than by
              informal review.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-medium text-muted">
                      Guarantee
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">
                      virtualXtReserve&prime; = virtualXtReserve &minus;
                      curveOutput
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href={SPECS_LINK}>View specs in Lean</ExternalLink>
              <ExternalLink href={PROOFS_LINK}>
                View proofs in Lean
              </ExternalLink>
            </p>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Assumptions
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proof uses zero axioms. The five hypotheses below are
              preconditions for successful execution. Each one mirrors an
              explicit check or implicit requirement in the Solidity source.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hNonZeroInput"
                constraint="debtTokenAmtIn ≠ 0"
                source="swapExactTokenToToken gates the body with if (tokenAmtIn != 0)"
              >
                The Solidity entry point skips the swap body when the input is
                zero. The model covers the non-trivial execution path.
              </Hypothesis>
              <Hypothesis
                name="hLockOpen"
                constraint="nonReentrancyLock = 0"
                source="OpenZeppelin ReentrancyGuard slot"
              >
                The function uses a{' '}
                <code className="font-mono text-[12px]">nonReentrant</code>{' '}
                modifier. The lock must be open (not already held by a prior
                call) for the swap to execute.
              </Hypothesis>
              <Hypothesis
                name="hVXtNonZero"
                constraint="plusInt256(virtualXtReserve, cutOffset) ≠ 0"
                source="calcIntervalProps divides by vXtReserve"
              >
                The curve formula divides the liquidity squared by the virtual
                XT reserve (after applying the curve offset). A zero virtual
                reserve would cause a division-by-zero revert.
              </Hypothesis>
              <Hypothesis
                name="hNoCross"
                constraint="curveOutput ≤ virtualXtReserve"
                source="cutsReverseIter single-cut liquidity check"
              >
                The computed XT output cannot exceed the available reserve. In
                the Solidity source, exceeding this triggers{' '}
                <code className="font-mono text-[12px]">
                  revert InsufficientLiquidity()
                </code>
                .
              </Hypothesis>
              <Hypothesis
                name="hMinOut"
                constraint="tokenAmtOut + debtTokenAmtIn ≥ minTokenOut"
                source="_buyToken slippage check"
                border={false}
              >
                The net output (XT received plus debt tokens returned) must meet
                the caller&apos;s minimum. In the Solidity source, failing this
                triggers{' '}
                <code className="font-mono text-[12px]">
                  revert UnexpectedAmount(minTokenOut, netOut)
                </code>
                .
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href={SPECS_LINK}>View specs in Lean</ExternalLink>
              <ExternalLink href={PROOFS_LINK}>
                View proofs in Lean
              </ExternalLink>
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
            <p className="leading-relaxed mb-2">
              Upstream Solidity contracts:{' '}
              <ExternalLink href={UPSTREAM_ORDER_V2}>
                TermMaxOrderV2.sol
              </ExternalLink>
              {', '}
              <ExternalLink href={UPSTREAM_CURVE}>
                TermMaxCurve.sol
              </ExternalLink>
              {', '}
              <ExternalLink href={UPSTREAM_MATH}>MathLib.sol</ExternalLink>.
            </p>
            <p className="leading-relaxed mb-2">
              <ExternalLink href={CASE_LINK}>Full case directory</ExternalLink>
              {' in the Verity benchmark repository.'}
            </p>
            <p className="leading-relaxed mb-2">
              <ExternalLink href={BENCHMARK_REPO}>
                Verity benchmark repository
              </ExternalLink>
              {
                ', which contains the formal specification, machine-checked proofs, and the broader benchmark suite this case belongs to.'
              }
            </p>
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

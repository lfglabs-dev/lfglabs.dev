import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import StreamRecoveryGuarantee from '../../components/research/StreamRecoveryGuarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import ClaimFlowDiagram from '../../components/research/ClaimFlowDiagram'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.PaladinVotes.StreamRecoveryClaimFull.Compile`

const UPSTREAM_CONTRACT =
  'https://github.com/Figu3/sonic-earn-recovery-system/blob/699cbbc79def374cab9739e451acbbf866293d12/src/StreamRecoveryClaim.sol'

const VERITY_CONTRACT =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/PaladinVotes/StreamRecoveryClaimFull/Contract.lean'

export default function StreamRecoveryClaimPage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'stream-recovery-claim'
  )

  return (
    <>
      <Head>
        <title>
          StreamRecoveryClaim Accounting Invariants | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Formally verified accounting properties of the Sonic Earn Recovery System's claim contract, covering payout correctness, solvency, and cross-token independence in Verity and Lean 4."
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
              StreamRecoveryClaim Accounting Invariants
            </h1>
          </header>

          {/* The Guarantee */}
          <section className="mb-16">
            <StreamRecoveryGuarantee />
            <p className="text-muted text-[15px] leading-relaxed">
              The{' '}
              <ExternalLink href={UPSTREAM_CONTRACT}>
                StreamRecoveryClaim
              </ExternalLink>{' '}
              contract is a Merkle-proof-based distribution system for recovering
              USDC and WETH to ~40 users affected by the Stream Trading incident
              on Trevee Earn&apos;s vaults on Sonic chain. An admin snapshots
              affected users&apos; vault balances, computes each user&apos;s
              pro-rata share, builds a Merkle tree with leaves{' '}
              <code className="font-mono text-[13px]">
                (address, shareWad)
              </code>
              , and stores only the root onchain.
            </p>
            <ClaimFlowDiagram className="my-8" />
            <p className="text-muted text-[15px] leading-relaxed">
              Users sign an EIP-712 liability waiver, then call{' '}
              <code className="font-mono text-[13px]">claimUsdc</code> or{' '}
              <code className="font-mono text-[13px]">claimWeth</code>. The
              contract verifies the Merkle proof against the stored root, computes{' '}
              <code className="font-mono text-[13px]">
                amount = shareWad &times; roundTotal / 1e18
              </code>
              , checks accounting bounds, and pays out.{' '}
              <code className="font-mono text-[13px]">claimBoth</code> calls
              both sequentially.
            </p>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              This contract distributes recovery funds to victims of an exploit.
              A bug in the claim logic could let someone extract more than their
              entitlement, claim twice, or drain the round pool, taking funds
              that belong to other victims. The stakes are not abstract: every
              dollar overclaimed is a dollar another affected user does not
              receive.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-3 text-muted text-[15px]">
                The proofs cover six property families across all three claim
                functions:
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <strong>Correct payout</strong>: claimed counter increases and
                  allocated counter decreases by exactly{' '}
                  <code className="font-mono text-[12px]">
                    shareWad &times; roundTotal / 1e18
                  </code>
                </li>
                <li>
                  <strong>Books balanced</strong>:{' '}
                  <code className="font-mono text-[12px]">
                    roundClaimed + totalAllocated
                  </code>{' '}
                  is conserved per token
                </li>
                <li>
                  <strong>Pool solvent</strong>:{' '}
                  <code className="font-mono text-[12px]">
                    roundClaimed &le; roundTotal
                  </code>{' '}
                  per token
                </li>
                <li>
                  <strong>No double-dip</strong>: if user already claimed,
                  function reverts, state unchanged
                </li>
                <li>
                  <strong>No overclaim</strong>: if payout would exceed round
                  budget, function reverts, state unchanged
                </li>
                <li>
                  <strong>Cross-token independence</strong>:{' '}
                  <code className="font-mono text-[12px]">claimBoth</code>{' '}
                  produces identical state to calling each claim separately
                </li>
              </ul>
              <p className="text-muted">
                The model covers a single-round protocol slice. Multi-round
                batching (
                <code className="font-mono text-[12px]">
                  claimMultipleUsdc
                </code>
                ) is out of scope. The per-round accounting properties hold
                identically for each round.
              </p>
            </Disclosure>
          </section>

          {/* How this was proven */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              The claim functions were modeled in{' '}
              <ExternalLink href={VERITY_CONTRACT}>Verity</ExternalLink> from
              the Solidity{' '}
              <ExternalLink href={UPSTREAM_CONTRACT}>
                StreamRecoveryClaim.sol
              </ExternalLink>{' '}
              implementation. Merkle verification is abstracted as a boolean
              witness and token transfers are elided; the proofs focus on
              accounting correctness.
            </p>
            <p className="leading-relaxed mb-4">
              The Lean model maps ten storage slots: round totals, claimed
              counters, allocated counters, round-active flag, per-user waiver
              and claim flags, split across USDC and WETH. Each function mutates
              this state differently:
            </p>
            <ul className="mb-6 text-[15px] leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>claimUsdc</strong>: verifies the Merkle proof, computes
                the payout, increments{' '}
                <code className="font-mono text-[13px]">roundUsdcClaimed</code>,
                decrements{' '}
                <code className="font-mono text-[13px]">
                  totalUsdcAllocated
                </code>
                , marks the user as claimed
              </li>
              <li>
                <strong>claimWeth</strong>: symmetric to{' '}
                <code className="font-mono text-[13px]">claimUsdc</code> on the
                WETH slots
              </li>
              <li>
                <strong>claimBoth</strong>: calls{' '}
                <code className="font-mono text-[13px]">claimUsdc</code> then{' '}
                <code className="font-mono text-[13px]">claimWeth</code>{' '}
                sequentially. The cross-token independence proof shows this
                composition is safe: USDC accounting does not interfere with WETH
                accounting
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              How do you prove the books stay balanced? You show that every
              successful claim increases{' '}
              <code className="font-mono text-[13px]">roundClaimed</code> and
              decreases{' '}
              <code className="font-mono text-[13px]">totalAllocated</code> by
              exactly the same amount, so their sum is conserved. Combined with
              the solvency bound (
              <code className="font-mono text-[13px]">
                roundClaimed &le; roundTotal
              </code>
              ), this guarantees no value is created or destroyed and the round
              pot is never overdrawn.
            </p>
            <p className="leading-relaxed mb-4">
              All proofs are verified by Lean 4&apos;s kernel and are provided
              in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/PaladinVotes/StreamRecoveryClaimFull/Proofs.lean">
                Proofs.lean
              </ExternalLink>
              . If any step were wrong, the code would not compile.
            </p>
            <Disclosure title="Verify it yourself" className="mb-4">
              <CodeBlock>{VERIFY_COMMAND}</CodeBlock>
              <p className="mt-3 text-muted">
                If the build succeeds, the proofs are correct.{' '}
                <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                  Source repository
                </ExternalLink>
              </p>
            </Disclosure>
          </section>

          {/* Proof status */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Proof status
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              All 18 theorems are proven.{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/PaladinVotes/StreamRecoveryClaimFull/Proofs.lean">
                Proofs.lean
              </ExternalLink>{' '}
              is <code className="font-mono text-[12px]">sorry</code>-free.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-medium text-muted">
                      Function
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Correct payout
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Books balanced
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Pool solvent
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      No double-dip
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      No overclaim
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Cross-token
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">claimUsdc</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">claimWeth</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">claimBoth</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Assumptions */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Assumptions
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proofs use zero axioms. The only trust assumption is the
              Merkle proof abstraction. All other conditions are consumed in
              exactly the form the contract enforces them.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="Merkle proof abstraction"
                constraint="proofAccepted: Bool"
                source="Cryptographic guarantee (OpenZeppelin MerkleProof)"
              >
                Merkle verification is modeled as a boolean witness{' '}
                <code className="font-mono text-[12px]">proofAccepted</code>.
                This is the one real trust assumption: we assume the Merkle tree
                correctly binds{' '}
                <code className="font-mono text-[12px]">
                  (msg.sender, shareWad)
                </code>{' '}
                to the stored root. This is a cryptographic guarantee from
                OpenZeppelin&apos;s MerkleProof library, not a contract-level
                concern.
              </Hypothesis>
              <Hypothesis
                name="Single-round specialization"
                constraint="model covers one round"
                source="Scope decision"
              >
                The model covers one round. Multi-round batching (
                <code className="font-mono text-[12px]">
                  claimMultipleUsdc
                </code>
                ) is out of scope. The per-round accounting properties hold
                identically for each round.
              </Hypothesis>
              <Hypothesis
                name="Token transfers elided"
                constraint="state accounting only"
                source="OpenZeppelin SafeERC20"
              >
                The model verifies state accounting, not ERC20 transfer
                execution. SafeERC20 correctness is trusted from OpenZeppelin.
              </Hypothesis>
              <Hypothesis
                name="msg.sender authenticity"
                constraint="caller identity"
                source="EVM guarantee"
                border={false}
              >
                <code className="font-mono text-[12px]">msg.sender</code> is
                authentic. This is an EVM-level guarantee, not a contract-level
                concern.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/PaladinVotes/StreamRecoveryClaimFull/Specs.lean">
                View specs in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/PaladinVotes/StreamRecoveryClaimFull/Proofs.lean">
                View proofs in Lean
              </ExternalLink>
            </p>
          </section>

          {/* Learn more */}
          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
            <p className="leading-relaxed mb-2">
              <ExternalLink href="https://github.com/Figu3/sonic-earn-recovery-system">
                Sonic Earn Recovery System
              </ExternalLink>
              {', the upstream contract repository.'}
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

import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import SafeGuarantee from '../../components/research/SafeGuarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.Safe.OwnerManagerReach.Compile`

export default function SafeOwnerReachabilityPage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'safe-owner-reachability'
  )

  return (
    <>
      <Head>
        <title>
          Safe Owner List Invariants | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Formally verified linked list invariants for the Safe smart account OwnerManager, covering all four ownership-mutating functions in Verity and Lean 4."
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
              Safe Owner List Invariants
            </h1>
          </header>

          {/* The Guarantee */}
          <section className="mb-16">
            <SafeGuarantee />
            <p className="text-muted text-[15px] leading-relaxed">
              The{' '}
              <ExternalLink href="https://github.com/safe-global/safe-smart-account">
                Safe smart account
              </ExternalLink>{' '}
              manages its owners using a singly-linked list stored in a
              mapping{' '}
              <code className="font-mono text-[13px]">
                owners: address &rarr; address
              </code>
              . A sentinel node at address{' '}
              <code className="font-mono text-[13px]">0x1</code> anchors
              the list. All four ownership-mutating functions are modeled:
            </p>
            <pre className="mt-4 bg-[#f8f8f8] border border-gray-200 rounded px-5 py-4 text-sm font-mono leading-relaxed overflow-x-auto text-muted">
              {'setupOwners  \u2192 build initial list\n'}
              {'addOwner     \u2192 insert at head\n'}
              {'removeOwner  \u2192 unlink node\n'}
              {'swapOwner    \u2192 atomic replacement'}
            </pre>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              The Safe is the most widely used multi-signature wallet on
              Ethereum, securing billions of dollars. Its{' '}
              <code className="font-mono text-[13px]">OwnerManager</code>{' '}
              contract maintains the set of signers as a linked list. If any
              ownership operation could leave a node unreachable from the
              sentinel, the owner would exist in storage but be invisible to
              the signing logic, breaking the integrity of the multisig.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-3 text-muted">
                Three families of invariants are specified across all four
                ownership-mutating functions:
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <code className="font-mono text-[12px]">inListReachable</code>{' '}
                  &mdash; every node with a non-zero successor is reachable from
                  SENTINEL
                </li>
                <li>
                  <code className="font-mono text-[12px]">ownerListInvariant</code>{' '}
                  &mdash; membership (non-zero successor) is equivalent to
                  reachability from SENTINEL (combines{' '}
                  <code className="font-mono text-[12px]">inListReachable</code> and{' '}
                  <code className="font-mono text-[12px]">reachableInList</code>)
                </li>
                <li>
                  <code className="font-mono text-[12px]">acyclic</code>{' '}
                  &mdash; the linked list has no internal cycles
                </li>
              </ul>
              <p className="text-muted">
                These correspond to invariants from Certora&apos;s{' '}
                <code className="font-mono text-[12px]">OwnerReach.spec</code>.
                Threshold management is elided as it does not affect the
                owners mapping.
              </p>
            </Disclosure>
          </section>

          {/* How this was proven */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              Each function mutates the linked list differently:{' '}
              <code className="font-mono text-[13px]">addOwner</code> performs
              a head insertion,{' '}
              <code className="font-mono text-[13px]">removeOwner</code> unlinks
              a node,{' '}
              <code className="font-mono text-[13px]">swapOwner</code> atomically
              replaces one node with another, and{' '}
              <code className="font-mono text-[13px]">setupOwners</code> constructs
              the initial list. For each, the proof must show that the
              invariants are preserved (or established, in the case of{' '}
              <code className="font-mono text-[13px]">setupOwners</code>).
            </p>
            <p className="leading-relaxed mb-4">
              Reachability is expressed using <em>witness chains</em>: a
              concrete list of addresses where each consecutive pair follows
              the{' '}
              <code className="font-mono text-[13px]">owners</code>{' '}
              mapping. This turns the transitive closure into induction on
              list indices, making the proof mechanically checkable.
            </p>
            <p className="leading-relaxed mb-4">
              All four functions were modeled in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Contract.lean">
                Verity
              </ExternalLink>
              . The{' '}
              <code className="font-mono text-[13px]">addOwner</code>{' '}
              <code className="font-mono text-[13px]">inListReachable</code>{' '}
              proof is complete. The remaining 11 theorems are scaffolded
              as benchmark tasks for AI agents. Reference proofs are in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
                Proofs.lean
              </ExternalLink>
              .
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

            <div className="mt-8">
              <h3 className="font-serif text-base font-semibold tracking-tight mb-3">
                Proof status
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] border border-gray-200 rounded overflow-hidden">
                  <thead>
                    <tr className="bg-[#f8f8f8] text-left">
                      <th className="px-4 py-2 font-medium text-muted">Function</th>
                      <th className="px-4 py-2 font-medium text-muted text-center">inListReachable</th>
                      <th className="px-4 py-2 font-medium text-muted text-center">ownerListInvariant</th>
                      <th className="px-4 py-2 font-medium text-muted text-center">acyclicity</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-t border-gray-200/50">
                      <td className="px-4 py-2">setupOwners</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                    </tr>
                    <tr className="border-t border-gray-200/50">
                      <td className="px-4 py-2">addOwner</td>
                      <td className="px-4 py-2 text-center text-green-700">proven</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                    </tr>
                    <tr className="border-t border-gray-200/50">
                      <td className="px-4 py-2">removeOwner</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                    </tr>
                    <tr className="border-t border-gray-200/50">
                      <td className="px-4 py-2">swapOwner</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                      <td className="px-4 py-2 text-center text-muted">open</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-muted text-[13px]">
                Open theorems are scaffolded with correct type signatures and
                available as{' '}
                <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/tree/main/Benchmark/Generated/Safe/OwnerManagerReach/Tasks">
                  benchmark tasks
                </ExternalLink>{' '}
                for AI proof agents.
              </p>
            </div>
          </section>

          {/* Hypotheses */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Hypotheses
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proofs use zero axioms. Each theorem requires hypotheses
              drawn from the function&apos;s preconditions and structural
              properties of the linked list. The hypotheses vary by function:
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hNotZero / hNotSentinel"
                constraint="owner != 0x0, owner != SENTINEL"
                source="Solidity require (GS203)"
              >
                The owner cannot be the zero address or the sentinel. These
                are enforced by{' '}
                <code className="font-mono text-[12px]">require</code> guards
                in every ownership-mutating function.
              </Hypothesis>
              <Hypothesis
                name="hFresh"
                constraint="owners[owner] == 0x0"
                source="Solidity require (GS204)"
              >
                The owner must not already be in the list. A zero mapping
                value means the address is not yet a node. Used by{' '}
                <code className="font-mono text-[12px]">addOwner</code> and{' '}
                <code className="font-mono text-[12px]">swapOwner</code>.
              </Hypothesis>
              <Hypothesis
                name="hPrevLink"
                constraint="owners[prevOwner] == owner"
                source="Solidity require (GS205)"
              >
                The predecessor must correctly point to the target owner.
                Used by{' '}
                <code className="font-mono text-[12px]">removeOwner</code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">swapOwner</code> to
                verify the caller supplied the right predecessor.
              </Hypothesis>
              <Hypothesis
                name="hPreInv"
                constraint="pre-state invariant holds"
                source="Inductive hypothesis"
              >
                The proof is inductive: it assumes the invariant holds before
                the function executes and shows it holds after.{' '}
                <code className="font-mono text-[12px]">setupOwners</code>{' '}
                is the base case and does not require this hypothesis.
              </Hypothesis>
              <Hypothesis
                name="hAcyclic"
                constraint="no internal cycles in the list"
                source="Provable structural property"
              >
                The linked list does not cycle back to SENTINEL before
                reaching its natural end. Defined as a theorem target
                (
                <code className="font-mono text-[12px]">acyclic</code>)
                in{' '}
                <code className="font-mono text-[12px]">Specs.lean</code>,
                paving the way to eliminate it as an assumption once the
                acyclicity proofs are complete.
              </Hypothesis>
              <Hypothesis
                name="hFreshInList"
                constraint="new address absent from all chains"
                source="Provable structural property"
                border={false}
              >
                Strengthens{' '}
                <code className="font-mono text-[12px]">hFresh</code>: the
                new address must not appear anywhere in existing chains.
                Defined as{' '}
                <code className="font-mono text-[12px]">freshInList</code>{' '}
                in{' '}
                <code className="font-mono text-[12px]">Specs.lean</code> and
                intended to be derived from{' '}
                <code className="font-mono text-[12px]">acyclic</code> plus
                the zero mapping value.
              </Hypothesis>
            </ul>
            <p className="mt-2 text-muted text-[13px] leading-relaxed">
              <code className="font-mono text-[12px]">setupOwners</code>{' '}
              additionally requires a{' '}
              <code className="font-mono text-[12px]">hClean</code>{' '}
              hypothesis (all storage slots are zero) to ensure no stale
              mappings from a prior state.
            </p>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean">
                View specs in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
                View proofs in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/OpenProofs.lean">
                View open theorems
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

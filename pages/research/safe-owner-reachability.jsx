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
                Four families of invariants are specified across all four
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
                  &mdash; the linked list has no SENTINEL cycles
                </li>
                <li>
                  <code className="font-mono text-[12px]">stronglyAcyclic</code>{' '}
                  &mdash; reachability is antisymmetric (no cycles at all)
                </li>
              </ul>
              <p className="text-muted">
                These correspond to invariants from Certora&apos;s{' '}
                <ExternalLink href="https://github.com/safe-fndn/safe-smart-account/blob/main/certora/specs/OwnerReach.spec">
                  OwnerReach.spec
                </ExternalLink>
                . Threshold management is elided as it does not affect the
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
              All four functions were modeled in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Contract.lean">
                Verity
              </ExternalLink>
              . Each function mutates the linked list differently:
            </p>
            <ul className="mb-6 text-[15px] leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>setupOwners</strong> &mdash; constructs the initial
                linked list from a list of addresses (base case)
              </li>
              <li>
                <strong>addOwner</strong> &mdash; head insertion: the new
                owner is placed between SENTINEL and the old head
              </li>
              <li>
                <strong>removeOwner</strong> &mdash; chain excision: the
                previous owner&apos;s pointer is redirected past the
                removed node
              </li>
              <li>
                <strong>swapOwner</strong> &mdash; atomic replacement: the
                old owner is unlinked and the new owner spliced into its
                position
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              Reachability is expressed using <em>witness chains</em>: a
              concrete list of addresses where each consecutive pair follows
              the{' '}
              <code className="font-mono text-[13px]">owners</code>{' '}
              mapping. This turns the transitive closure into induction on
              list indices, making the proof mechanically checkable.
            </p>
            <p className="leading-relaxed mb-4">
              For{' '}
              <code className="font-mono text-[13px]">removeOwner</code>{' '}
              and{' '}
              <code className="font-mono text-[13px]">swapOwner</code>,
              the proofs require <em>strong acyclicity</em>{' '}
              (antisymmetry of the reachability relation) to show that
              excising or replacing a node does not orphan downstream
              nodes. This matches Certora&apos;s{' '}
              <code className="font-mono text-[13px]">reach_invariant</code>{' '}
              axiom.
            </p>
            <p className="leading-relaxed mb-4">
              Reference proofs are provided in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
                Proofs.lean
              </ExternalLink>
              . The proof is checked by Lean 4&apos;s kernel, a small
              program that accepts or rejects proofs deterministically. If
              the proof were wrong, it would not compile.
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
              Six benchmark tasks are defined, all proven. Additional{' '}
              <code className="font-mono text-[12px]">ownerListInvariant</code>{' '}
              theorems remain open in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/OpenProofs.lean">
                OpenProofs.lean
              </ExternalLink>
              .
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-semibold">Function</th>
                    <th className="px-4 py-2 font-semibold">Invariant</th>
                    <th className="px-4 py-2 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">setupOwners</td>
                    <td className="px-4 py-1.5">inListReachable</td>
                    <td className="px-4 py-1.5 text-center text-green-600">Proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">setupOwners</td>
                    <td className="px-4 py-1.5">acyclic</td>
                    <td className="px-4 py-1.5 text-center text-green-600">Proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">addOwner</td>
                    <td className="px-4 py-1.5">inListReachable</td>
                    <td className="px-4 py-1.5 text-center text-green-600">Proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">addOwner</td>
                    <td className="px-4 py-1.5">acyclic</td>
                    <td className="px-4 py-1.5 text-center text-green-600">Proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">removeOwner</td>
                    <td className="px-4 py-1.5">inListReachable</td>
                    <td className="px-4 py-1.5 text-center text-green-600">Proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">swapOwner</td>
                    <td className="px-4 py-1.5">inListReachable</td>
                    <td className="px-4 py-1.5 text-center text-green-600">Proven</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-muted text-[13px]">
              Open tasks (not yet proven):{' '}
              <code className="font-mono text-[12px]">ownerListInvariant</code>{' '}
              for all four functions, plus{' '}
              <code className="font-mono text-[12px]">removeOwner</code>{' '}
              and{' '}
              <code className="font-mono text-[12px]">swapOwner</code>{' '}
              acyclicity.
            </p>
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
                source="Proven for setupOwners and addOwner"
              >
                The linked list does not cycle back to SENTINEL before
                reaching its natural end. Proven as a theorem for{' '}
                <code className="font-mono text-[12px]">setupOwners</code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">addOwner</code>.
                Used as a hypothesis for{' '}
                <code className="font-mono text-[12px]">removeOwner</code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">swapOwner</code>.
              </Hypothesis>
              <Hypothesis
                name="hStrongAcyclic"
                constraint="reachable(a, b) and reachable(b, a) implies a = b"
                source="Certora reach_invariant antisymmetry"
              >
                Strong acyclicity: the reachability relation is
                antisymmetric. Required by{' '}
                <code className="font-mono text-[12px]">removeOwner</code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">swapOwner</code>{' '}
                to ensure that excising or replacing a node doesn&apos;t
                orphan downstream nodes through non-SENTINEL cycles.
              </Hypothesis>
              <Hypothesis
                name="hOwnerInList"
                constraint="next(owner) != 0x0"
                source="Solidity implicit precondition"
              >
                The owner being removed must actually be in the list (has a
                non-zero successor). Removing a node that isn&apos;t in the
                list would zero SENTINEL&apos;s pointer. Used by{' '}
                <code className="font-mono text-[12px]">removeOwner</code>.
              </Hypothesis>
              <Hypothesis
                name="hOldNePrev"
                constraint="oldOwner != prevOwner"
                source="Solidity implicit precondition"
                border={false}
              >
                In{' '}
                <code className="font-mono text-[12px]">swapOwner</code>,
                the old owner cannot be its own predecessor. A self-loop
                would cause the if-chain in the storage map to zero out the
                previous owner&apos;s pointer, orphaning the new owner.
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
            <p className="leading-relaxed mb-2">
              <ExternalLink href="https://github.com/safe-fndn/safe-smart-account/blob/main/certora/specs/OwnerReach.spec">
                Certora OwnerReach.spec
              </ExternalLink>{' '}
              &mdash; the original specification this work is based on.
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

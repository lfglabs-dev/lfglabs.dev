import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import SafeGuarantee from '../../components/research/SafeGuarantee'
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
lake build Benchmark.Cases.Safe.OwnerManagerReach.Compile`

export default function SafeOwnerReachabilityPage() {
  const otherResearch = research.filter(
    (r) => r.slug !== 'safe-owner-reachability'
  )

  return (
    <>
      <Head>
        <title>
          Safe Owner List Reachability Invariant | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="A formally verified reachability invariant for the Safe smart account owner linked list, proven using Verity and Lean 4."
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
              Safe Owner List Reachability Invariant
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
              the list. When an owner is added, it is inserted at the head:
            </p>
            <pre className="mt-4 bg-[#f8f8f8] border border-gray-200 rounded px-5 py-4 text-sm font-mono leading-relaxed overflow-x-auto text-muted">
              {'SENTINEL \u2192 ownerA \u2192 ownerB \u2192 SENTINEL\n'}
              {'SENTINEL \u2192 NEW \u2192 ownerA \u2192 ownerB \u2192 SENTINEL'}
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
              contract maintains the set of signers as a linked list. If{' '}
              <code className="font-mono text-[13px]">addOwnerWithThreshold</code>{' '}
              could leave a node unreachable from the sentinel, the owner
              would exist in storage but be invisible to the signing logic,
              breaking the integrity of the multisig.
            </p>
            <Disclosure title="What this invariant covers">
              <p className="mb-3 text-muted">
                This proof covers the{' '}
                <code className="font-mono text-[12px]">inListReachable</code>{' '}
                invariant from Certora&apos;s{' '}
                <code className="font-mono text-[12px]">OwnerReach.spec</code>:
                after{' '}
                <code className="font-mono text-[12px]">addOwner</code>{' '}
                executes, every node with a non-zero successor in the{' '}
                <code className="font-mono text-[12px]">owners</code> mapping
                is reachable from SENTINEL by following next-pointers.
              </p>
              <p className="text-muted">
                It does not cover{' '}
                <code className="font-mono text-[12px]">removeOwner</code>,{' '}
                <code className="font-mono text-[12px]">swapOwner</code>, or the
                initial{' '}
                <code className="font-mono text-[12px]">setupOwners</code>{' '}
                call. Threshold management is also elided as it does not
                affect the owners mapping.
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
              <code className="font-mono text-[13px]">addOwnerWithThreshold</code>{' '}
              function performs a head insertion into the linked list. Proving
              reachability is preserved requires showing that: the new
              owner is reachable (via{' '}
              <code className="font-mono text-[13px]">
                SENTINEL &rarr; owner
              </code>
              ), and all previously reachable nodes remain reachable through
              the updated path (
              <code className="font-mono text-[13px]">
                SENTINEL &rarr; owner &rarr; old head &rarr; ...
              </code>
              ).
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
              The contract logic was modeled in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Contract.lean">
                Verity
              </ExternalLink>
              . The proof first characterizes the post-state (which
              next-pointers changed), then lifts pre-state chains to the
              post-state and prepends the new path. A reference proof is
              provided in{' '}
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
          </section>

          {/* Hypotheses */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Hypotheses
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proof uses zero axioms. The theorem requires these
              hypotheses, which encode the function&apos;s preconditions and
              structural assumptions about the linked list:
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hNotZero"
                constraint="owner != 0x0"
                source="Solidity require (GS203)"
              >
                The new owner cannot be the zero address. Enforced by the{' '}
                <code className="font-mono text-[12px]">require</code> guard
                in{' '}
                <code className="font-mono text-[12px]">
                  addOwnerWithThreshold
                </code>
                .
              </Hypothesis>
              <Hypothesis
                name="hNotSentinel"
                constraint="owner != SENTINEL (0x1)"
                source="Solidity require (GS203)"
              >
                The sentinel address is reserved as the list anchor and
                cannot be used as an owner. Adding it would corrupt the list
                structure.
              </Hypothesis>
              <Hypothesis
                name="hFresh"
                constraint="owners[owner] == 0x0"
                source="Solidity require (GS204)"
              >
                The owner must not already be in the list. A zero mapping
                value means the address is not yet a node. This prevents
                duplicate insertion which would create cycles.
              </Hypothesis>
              <Hypothesis
                name="hPreReach"
                constraint="pre-state invariant holds"
                source="Inductive hypothesis"
              >
                The proof is inductive: it assumes the reachability invariant
                holds before{' '}
                <code className="font-mono text-[12px]">addOwner</code> and
                shows it holds after. The base case (initial setup via{' '}
                <code className="font-mono text-[12px]">setupOwners</code>)
                is not covered.
              </Hypothesis>
              <Hypothesis
                name="hAcyclic"
                constraint="SENTINEL does not appear in chains past the head"
                source="Structural assumption"
              >
                The linked list does not cycle back to SENTINEL before
                reaching its natural end. Without this, lifting pre-state
                chains to the post-state would be unsound, because
                SENTINEL&apos;s next-pointer changes during insertion.
              </Hypothesis>
              <Hypothesis
                name="hOwnerFresh"
                constraint="owner does not appear in existing chains"
                source="Structural assumption"
                border={false}
              >
                Strengthens{' '}
                <code className="font-mono text-[12px]">hFresh</code>: the
                new owner address must not appear anywhere in the existing
                chain, not just have a zero mapping value. This ensures that
                the owner&apos;s next-pointer (which changes during
                insertion) does not affect any existing chain.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean">
                View specs in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
                View proof in Lean
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

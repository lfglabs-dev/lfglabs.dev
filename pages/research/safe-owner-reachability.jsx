import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import SafeGuarantee from '../../components/research/SafeGuarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import TikZDiagram from '../../components/research/TikZDiagram'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.Safe.OwnerManagerReach.Compile`

const OWNER_MANAGER_SOL =
  'https://github.com/safe-fndn/safe-smart-account/blob/a2e19c6aa42a45ceec68057f3fa387f169c5b321/contracts/base/OwnerManager.sol'

const VERITY_OWNER_MANAGER_CONTRACT =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Contract.lean'

const OWNERS_LINKED_LIST_TIKZ = String.raw`
\begin{tikzpicture}[scale=1.4, every node/.style={transform shape},
  box/.style={draw, rounded corners=2pt, minimum width=1.6cm, minimum height=0.75cm, font=\footnotesize, inner sep=4pt},
  sentinel/.style={box, fill=black!7, draw=black!40},
  ptr/.style={-stealth, thick, shorten >=2pt, shorten <=2pt},
  lbl/.style={font=\tiny, above=1pt, midway}
]
  \node[sentinel] (s) at (0,0) {\texttt{0x1}};
  \node[box] (a) at (3,0) {\textsf{Owner A}};
  \node[box] (b) at (6,0) {\textsf{Owner B}};
  \node[box] (c) at (9,0) {\textsf{Owner C}};

  \draw[ptr] (s) -- node[lbl] {\texttt{owners[0x1]}} (a);
  \draw[ptr] (a) -- node[lbl] {\texttt{owners[A]}} (b);
  \draw[ptr] (b) -- node[lbl] {\texttt{owners[B]}} (c);
  \draw[ptr] (c.south) .. controls +(0,-1.2) and +(0,-1.2) .. node[lbl, below=1pt] {\texttt{owners[C]}} (s.south);

  \node[font=\scriptsize, text=black!50] at (0, 0.75) {sentinel};
\end{tikzpicture}
`

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
          content="Formally verified linked list invariants for Safe smart account OwnerManager, covering all four ownership-mutating functions in Verity and Lean 4."
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
              <ExternalLink href="https://github.com/safe-global/safe-smart-account">
                Safe smart account
              </ExternalLink>{' '}
              manages its owners using a{' '}
              <ExternalLink href="https://en.wikipedia.org/wiki/Linked_list">
                singly-linked list
              </ExternalLink>{' '}
              stored in a mapping{' '}
              <code className="font-mono text-[13px]">
                owners: address &rarr; address
              </code>
              . A sentinel node at address{' '}
              <code className="font-mono text-[13px]">0x1</code> anchors
              the list.
            </p>
            <TikZDiagram
              tikz={OWNERS_LINKED_LIST_TIKZ}
              className="my-8 flex justify-center overflow-x-auto"
            />
            <p className="text-muted text-[15px] leading-relaxed">
              The list is updated by four operations:{' '}
              <code className="font-mono text-[13px]">setupOwners</code>{' '}
              builds it from an address array,{' '}
              <code className="font-mono text-[13px]">addOwner</code>{' '}
              inserts at the head,{' '}
              <code className="font-mono text-[13px]">removeOwner</code>{' '}
              unlinks a node, and{' '}
              <code className="font-mono text-[13px]">swapOwner</code>{' '}
              replaces one owner with another in a single step.
            </p>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              Safe is the most widely used multi-signature wallet on Ethereum,
              securing billions of dollars. If the owners list in{' '}
              <ExternalLink
                href={OWNER_MANAGER_SOL}
                className="font-mono text-[13px]"
              >
                OwnerManager
              </ExternalLink>{' '}
              were malformed, approval checks could skip a real owner or treat
              the signer set differently than what is expected.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-4 leading-relaxed text-muted">
                The owners mapping forms a proper loop-free circular linked
                list.
              </p>
              <p className="mb-3 text-muted text-[15px]">
                In Lean, that goal is split into three named properties:
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <code className="font-mono text-[12px]">inListReachable</code>
                  : every node with a non-zero successor is reachable from
                  SENTINEL
                </li>
                <li>
                  <code className="font-mono text-[12px]">ownerListInvariant</code>
                  : membership (non-zero successor) is equivalent to
                  reachability from SENTINEL (combines{' '}
                  <code className="font-mono text-[12px]">inListReachable</code> and{' '}
                  <code className="font-mono text-[12px]">reachableInList</code>)
                </li>
                <li>
                  <code className="font-mono text-[12px]">acyclic</code>: the
                  linked list has no internal SENTINEL cycles
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
              The ownership operations are modeled in Verity from the Solidity{' '}
              <ExternalLink href={OWNER_MANAGER_SOL}>OwnerManager.sol</ExternalLink>{' '}
              implementation in safe-smart-account; the Verity contract slice is
              in{' '}
              <ExternalLink href={VERITY_OWNER_MANAGER_CONTRACT}>
                Contract.lean
              </ExternalLink>
              . Each function mutates the linked list differently:
            </p>
            <ul className="mb-6 text-[15px] leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>setupOwners</strong>: constructs the initial linked
                list from a list of addresses (base case)
              </li>
              <li>
                <strong>addOwner</strong>: head insertion. The new owner is
                placed between SENTINEL and the old head
              </li>
              <li>
                <strong>removeOwner</strong>: chain excision. The previous
                owner&apos;s pointer is redirected past the removed node
              </li>
              <li>
                <strong>swapOwner</strong>: atomic replacement. The old owner
                is unlinked and the new owner spliced into its position
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
              The structural property doing the heavy lifting for{' '}
              <code className="font-mono text-[13px]">removeOwner</code>{' '}
              and{' '}
              <code className="font-mono text-[13px]">swapOwner</code>{' '}
              is{' '}
              <em>unique predecessor</em>: each non-zero node in the list
              has at most one non-zero predecessor. An earlier draft used
              antisymmetry of reachability (matching Certora&apos;s{' '}
              <code className="font-mono text-[13px]">reach_invariant</code>{' '}
              axiom), but antisymmetry is false on Safe&apos;s circular list{' '}
              (<code className="font-mono text-[13px]">SENTINEL &rarr; o &rarr; SENTINEL</code>{' '}
              makes both directions reachable). Unique-predecessor captures
              the same &ldquo;simple path, no branching&rdquo; truth and is
              preserved by every mutation.
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
              All 12 theorems are proven.{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
                Proofs.lean
              </ExternalLink>{' '}
              is <code className="font-mono text-[12px]">sorry</code>-free.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-medium text-muted">Function</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">inListReachable</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">ownerListInvariant</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">acyclicity</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">setupOwners</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">addOwner</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">removeOwner</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">swapOwner</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Hypotheses */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Hypotheses
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proofs use zero axioms. Every hypothesis is either a
              Solidity <code className="font-mono text-[12px]">require</code>{' '}
              guard the contract already enforces, or a structural fact
              about the linked list that holds inductively.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="Solidity require guards"
                constraint="owner != 0, owner != SENTINEL, owners[owner] == 0, owners[prevOwner] == owner"
                source="OwnerManager.sol (GS203–GS205)"
              >
                Every ownership-mutating function begins with{' '}
                <code className="font-mono text-[12px]">require</code>{' '}
                checks on its arguments. The proofs consume these as
                hypotheses in exactly the form the contract enforces, so no
                additional trust is needed.
              </Hypothesis>
              <Hypothesis
                name="hPreInv"
                constraint="pre-state invariant holds"
                source="Inductive hypothesis"
              >
                The proof is inductive: it assumes the invariant holds
                before the function executes and shows it holds after.{' '}
                <code className="font-mono text-[12px]">setupOwners</code>{' '}
                is the base case and needs{' '}
                <code className="font-mono text-[12px]">hClean</code>{' '}
                (all storage slots start zero) instead.
              </Hypothesis>
              <Hypothesis
                name="uniquePredecessor"
                constraint="each non-zero node has at most one non-zero predecessor"
                source="Preserved by every mutation"
              >
                The linked list is a simple path with no branching. This is
                the structural fact that lets{' '}
                <code className="font-mono text-[12px]">removeOwner</code>{' '}
                and{' '}
                <code className="font-mono text-[12px]">swapOwner</code>{' '}
                re-route chains through the new node without orphaning
                anything downstream. It replaces the antisymmetry axiom
                from Certora&apos;s spec, which is false on Safe&apos;s
                circular list.
              </Hypothesis>
              <Hypothesis
                name="hOwnerInList / hOldNePrev"
                constraint="the target owner is actually in the list; in swapOwner, oldOwner ≠ prevOwner"
                source="Implicit Solidity preconditions"
                border={false}
              >
                Removing or replacing an owner that isn&apos;t in the list
                would zero SENTINEL&apos;s pointer. In{' '}
                <code className="font-mono text-[12px]">swapOwner</code>,
                the old owner cannot be its own predecessor — a self-loop
                would zero the previous owner&apos;s pointer and orphan the
                new node.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Specs.lean">
                View specs in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
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
              <ExternalLink href="https://github.com/safe-fndn/safe-smart-account/blob/main/certora/specs/OwnerReach.spec">
                Certora OwnerReach.spec
              </ExternalLink>
              {', the original specification this work is based on.'}
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

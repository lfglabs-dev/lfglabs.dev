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
  \node[sentinel] (s) at (0,0) {\textsf{SENTINEL}};
  \node[box] (a) at (3,0) {\textsf{Owner A}};
  \node[box] (b) at (6,0) {\textsf{Owner B}};
  \node[box] (c) at (9,0) {\textsf{Owner C}};

  \draw[ptr] (s) -- node[lbl] {\texttt{owners[0x1]}} (a);
  \draw[ptr] (a) -- node[lbl] {\texttt{owners[A]}} (b);
  \draw[ptr] (b) -- node[lbl] {\texttt{owners[B]}} (c);
  \draw[ptr] (c.south) .. controls +(0,-1.2) and +(0,-1.2) .. node[lbl, below=1pt] {\texttt{owners[C]}} (s.south);

  \node[font=\scriptsize, text=black!50] at (0, 0.75) {\texttt{0x1}};
\end{tikzpicture}
`

export async function getStaticProps() {
  const { renderTikz } = require('../../lib/renderTikz')
  const ownersSvg = await renderTikz(OWNERS_LINKED_LIST_TIKZ)
  return { props: { ownersSvg } }
}

export default function SafeOwnerReachabilityPage({ ownersSvg }) {
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
              manages its owners using a{' '}
              <ExternalLink href="https://en.wikipedia.org/wiki/Linked_list">
                singly-linked list
              </ExternalLink>{' '}
              stored in a mapping{' '}
              <code className="font-mono text-[13px]">
                owners: address &rarr; address
              </code>
              . The first node of the list is called SENTINEL and anchors
              the list at address key{' '}
              <code className="font-mono text-[13px]">0x1</code>.
            </p>
            <div
              className="my-8 flex justify-center overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: ownersSvg }}
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
                In Lean, that goal is split into four families of properties:
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <code className="font-mono text-[12px]">ownerListInvariant</code>
                  : membership (non-zero successor) is equivalent to
                  reachability from SENTINEL
                </li>
                <li>
                  <code className="font-mono text-[12px]">uniquePredecessor</code>
                  : each non-zero node has at most one non-zero predecessor
                  (the list is a simple path with no branching)
                </li>
                <li>
                  <code className="font-mono text-[12px]">acyclic</code>: the
                  linked list has no internal SENTINEL cycles
                </li>
                <li>
                  <code className="font-mono text-[12px]">isOwner correctness</code>
                  : each operation changes exactly the intended owners and
                  leaves all others unchanged
                </li>
              </ul>
              <p className="text-muted">
                The invariant properties correspond to Certora&apos;s{' '}
                <ExternalLink href="https://github.com/safe-fndn/safe-smart-account/blob/main/certora/specs/OwnerReach.spec">
                  OwnerReach.spec
                </ExternalLink>
                . The functional correctness proofs go beyond what Certora
                specifies. Threshold management is elided as it does not
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
              How do you prove an owner is in the list? You show a concrete
              path: start at SENTINEL, follow the{' '}
              <code className="font-mono text-[13px]">owners</code>{' '}
              mapping one hop at a time, and arrive at that owner. If such a
              path exists, the owner is reachable. If no path exists, the
              owner is not in the list.
            </p>
            <p className="leading-relaxed mb-4">
              Beyond reachability, each function must preserve the full
              structural invariant: every node has exactly one incoming edge
              (unique predecessor), the list has no internal cycles, and{' '}
              <code className="font-mono text-[13px]">isOwner</code>{' '}
              changes exactly the intended addresses. The unique predecessor
              property is what makes{' '}
              <code className="font-mono text-[13px]">removeOwner</code>{' '}
              and{' '}
              <code className="font-mono text-[13px]">swapOwner</code>{' '}
              work: if you re-route a pointer, you need to know that nothing
              else was pointing to the old target. Because each node has
              exactly one incoming edge, that guarantee holds. An earlier
              draft assumed antisymmetry of reachability (matching
              Certora&apos;s spec), but that property is false on circular
              lists. Unique predecessor captures the same &ldquo;no
              branching&rdquo; truth without breaking on the cycle.
            </p>
            <p className="leading-relaxed mb-4">
              All proofs are verified by Lean 4&apos;s kernel and are
              provided in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Safe/OwnerManagerReach/Proofs.lean">
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
              All 16 theorems are proven.{' '}
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
                    <th className="px-4 py-2 font-medium text-muted text-center">uniquePredecessor</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">ownerListInvariant</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">acyclicity</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">isOwner</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">setupOwners</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">addOwner</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">removeOwner</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">swapOwner</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
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
              The proofs use zero axioms. The only assumptions are the
              Solidity{' '}
              <code className="font-mono text-[12px]">require</code>{' '}
              guards the contract already enforces, and a three-field
              inductive invariant that is proven preserved by every
              mutation. Properties like{' '}
              <code className="font-mono text-[12px]">noSelfLoops</code>,{' '}
              <code className="font-mono text-[12px]">freshInList</code>,{' '}
              and{' '}
              <code className="font-mono text-[12px]">acyclic</code>{' '}
              are derived inside the proofs, not assumed.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="Solidity require guards"
                constraint="owner != 0, owner != SENTINEL, owners[owner] == 0, owners[prevOwner] == owner"
                source="OwnerManager.sol (GS203–GS205)"
              >
                Every ownership-mutating function begins with{' '}
                <code className="font-mono text-[12px]">require</code>{' '}
                checks on its arguments. The proofs consume these in
                exactly the form the contract enforces, so no additional
                trust is needed.
              </Hypothesis>
              <Hypothesis
                name="SafeOwnerInvariant (inductive)"
                constraint="ownerListInvariant + uniquePredecessor + zeroInert"
                source="Proven preserved by every mutation"
                border={false}
              >
                The proof is inductive: it assumes this bundled invariant
                holds before a function executes and proves it still holds
                after. The bundle contains three fields: the owner-list
                biconditional (membership equals reachability), unique
                predecessors (no branching), and zero-address inertness.{' '}
                <code className="font-mono text-[12px]">setupOwners</code>{' '}
                establishes it from clean storage (base case);{' '}
                <code className="font-mono text-[12px]">addOwner</code>,{' '}
                <code className="font-mono text-[12px]">removeOwner</code>,
                and{' '}
                <code className="font-mono text-[12px]">swapOwner</code>{' '}
                each preserve it (inductive step). Because preservation is
                proven, the invariant is a theorem, not a blind assumption.
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

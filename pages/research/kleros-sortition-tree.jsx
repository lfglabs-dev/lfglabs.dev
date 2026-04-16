import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import KlerosGuarantee from '../../components/research/KlerosGuarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import SortitionTreeDiagram from '../../components/research/SortitionTreeDiagram'
import SortitionDrawExample from '../../components/research/SortitionDrawExample'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.Kleros.SortitionTrees.Compile`

const UPSTREAM_CONTRACT =
  'https://github.com/kleros/kleros-v2/blob/75125dfa/contracts/src/libraries/SortitionTrees.sol'

const VERITY_CONTRACT =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Kleros/SortitionTrees/Contract.lean'

const SPECS_URL =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Kleros/SortitionTrees/Specs.lean'

const PROOFS_URL =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Kleros/SortitionTrees/Proofs.lean'

export default function KlerosSortitionTreePage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'kleros-sortition-tree'
  )

  return (
    <>
      <Head>
        <title>
          Kleros Sortition Tree Conservation & Draw Invariants | Research | LFG
          Labs
        </title>
        <meta
          name="description"
          content="Formally verified stake conservation and draw fairness properties of the Kleros sortition tree, covering parent-sum propagation and weighted-interval juror selection in Verity and Lean 4."
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
              Kleros Sortition Tree Conservation & Draw Invariants
            </h1>
          </header>

          {/* The Guarantee */}
          <section className="mb-16">
            <KlerosGuarantee />
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              <ExternalLink href="https://kleros.io">Kleros</ExternalLink> is a
              decentralized dispute resolution protocol, an on-chain
              court system. When two parties disagree (over an escrow payment, a
              content moderation decision, an insurance claim), they submit the
              dispute to Kleros. The protocol randomly selects a panel of jurors
              from a pool of PNK token stakers, the jurors vote, and the
              majority ruling is enforced on-chain.
            </p>
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              For this to be fair, juror selection must be both random and
              stake-weighted: a juror who staked twice as much PNK should be
              twice as likely to be drawn. The{' '}
              <ExternalLink href={UPSTREAM_CONTRACT}>
                sortition tree
              </ExternalLink>{' '}
              is the data structure that makes this possible. It is a
              sum-tree where each leaf holds one juror&apos;s staked weight, and
              each internal node holds the sum of its children. The root always
              equals the total staked amount.
            </p>
            <SortitionTreeDiagram className="my-8" />
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              To select a juror, the protocol picks a random number
              (the &ldquo;ticket&rdquo;) between 0 and the root. Think of it
              as a number line of length 800, split into segments, one per
              juror, sized by their stake. The tree turns this lookup into a
              three-step walk from root to leaf.
            </p>
            <p className="text-muted text-[15px] leading-relaxed mb-2">
              Example with{' '}
              <code className="font-mono text-[13px]">ticket = 200</code>:
            </p>
            <ol className="text-muted text-[15px] leading-relaxed mb-4 list-decimal pl-5 space-y-1">
              <li>
                <strong>Root (800)</strong>: left subtree = 350.
                200&nbsp;&lt;&nbsp;350, so go left.
              </li>
              <li>
                <strong>Node1 (350)</strong>: left child = 150.
                200&nbsp;&ge;&nbsp;150, so subtract 150 and go right.
                Remaining ticket = 50.
              </li>
              <li>
                <strong>Node4 (200)</strong>: left child (L2) = 100.
                50&nbsp;&lt;&nbsp;100, so go left. The draw lands
                on <strong>L2</strong>.
              </li>
            </ol>
            <SortitionDrawExample className="my-6" />
            <p className="text-muted text-[15px] leading-relaxed mb-4">
              Any ticket from 150 to 249 follows the same path and lands on
              L2. The ticket is drawn uniformly at random from 0 to 799,
              so L2 owns 100 out of 800 possible values: its selection
              probability is exactly 100/800. The same applies to every leaf.
            </p>
            <p className="text-muted text-[15px] leading-relaxed">
            </p>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              Kleros handles real arbitration with real money at stake. If a
              propagation bug means the root does not reflect actual total
              stake, draw intervals shift and some jurors are systematically
              over- or under-selected. Every dispute resolved by a biased
              jury is compromised.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-3 text-muted text-[15px]">
                <strong>In scope</strong> (12 proven theorems):
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <strong>level2_parent_equals_sum_of_children</strong>: Each
                  grandparent-of-leaves node equals the sum of its two leaf
                  children (4 nodes verified)
                </li>
                <li>
                  <strong>level1_parent_equals_sum_of_children</strong>: Each
                  subtree-root node equals the sum of its two level-2 children (2
                  nodes verified)
                </li>
                <li>
                  <strong>root_equals_sum_of_leaves</strong>: Root = sum of all 8
                  leaf weights (total stake conservation)
                </li>
                <li>
                  <strong>root_minus_left_equals_right_subtree</strong>: Root
                  partitions cleanly into left and right subtrees
                </li>
                <li>
                  <strong>draw_selects_valid_leaf</strong>: Every draw lands on a
                  valid leaf index (7..14)
                </li>
                <li>
                  <strong>draw_interval_matches_weights</strong>: Draw intervals
                  match leaf weights across all 3 traversal levels (8-way
                  coverage)
                </li>
                <li>
                  <strong>node_id_bijection</strong>: Forward and reverse ID
                  mappings are consistent
                </li>
                <li>
                  <strong>sequential_setLeaf_root_conservation</strong>:
                  Conservation holds inductively after multiple operations
                </li>
              </ul>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <strong>overflow_safety_of_no_wrap</strong> /{' '}
                  <strong>level1_overflow_safety_of_no_wrap</strong>: node sums
                  never exceed 2<sup>256</sup>&nbsp;-&nbsp;1 and wrap around
                  to zero, proven under explicit no-wrap assumptions
                </li>
                <li>
                  <strong>remove_leaf_zeroed</strong> /{' '}
                  <strong>remove_leaf_clears_associated_id</strong>: removing a
                  juror sets their leaf weight to zero and clears all associated
                  mappings
                </li>
              </ul>
              <p className="mb-3 text-muted text-[15px]">
                <strong>No ghost draws</strong> (not proven as a separate
                theorem): we originally wanted to prove that a draw can never
                select a juror whose stake is zero. When we tried to formalize
                this as its own statement, a counterexample showed the naive
                formulation was wrong. However, the guarantee still holds: it
                follows directly from two theorems that are already proven. If
                the root equals the sum of all leaves (
                <code className="font-mono text-[12px]">
                  root_equals_sum_of_leaves
                </code>
                ) and each leaf&apos;s draw interval equals its weight (
                <code className="font-mono text-[12px]">
                  draw_interval_matches_weights
                </code>
                ), then a leaf with weight 0 has an interval of size 0, so no
                ticket can ever land on it.
              </p>
              <p className="mb-3 text-muted text-[15px]">
                <strong>Simplifications</strong> (the benchmark works on a
                simplified version of the production contract):
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  The production tree supports a variable number of children per
                  node (K-ary). The benchmark fixes K=2 (binary tree) to isolate
                  the core logic.
                </li>
                <li>
                  Low-level encoding details (bytes32 stake-path packing, vacancy
                  stack) are abstracted.
                </li>
                <li>
                  Ticket generation uses keccak256 in production. The benchmark
                  treats the ticket as an opaque number, proving fairness for any
                  ticket value, not just hash-derived ones.
                </li>
              </ul>
              <p className="text-muted">
                The benchmark specializes the production sortition tree to a
                balanced binary tree with eight leaves (three levels). This
                preserves the core algorithmic logic (parent-sum propagation and
                weighted-interval draw traversal) while abstracting encoding and
                randomness details that Verity does not yet support.
              </p>
            </Disclosure>
          </section>

          {/* How this was proven */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              We translated the Solidity{' '}
              <ExternalLink href={UPSTREAM_CONTRACT}>
                SortitionTrees.sol
              </ExternalLink>{' '}
              into{' '}
              <ExternalLink href={VERITY_CONTRACT}>Verity</ExternalLink>, our
              Lean 4 framework for writing smart contract logic as
              mathematical definitions. Once the contract is expressed in Lean,
              we can state properties about it and prove them.
            </p>
            <p className="leading-relaxed mb-4">
              Two kinds of properties were proven:
            </p>
            <ul className="mb-6 text-[15px] leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>Conservation</strong>: after any{' '}
                <code className="font-mono text-[13px]">setLeaf</code> call,
                every parent still equals the sum of its children, all the way
                up to the root. We proved this level by level (leaves &rarr;
                mid-nodes &rarr; root), then composed those results to show
                that the root always equals the sum of all 8 leaves.
              </li>
              <li>
                <strong>Draw fairness</strong>: for any valid ticket, the draw
                function lands on a real leaf, and each leaf&apos;s draw
                interval matches its weight exactly. The proof considers each
                of the 8 leaf positions separately, but within each position
                it covers every possible combination of weights and ticket
                values, not just specific examples. Eight universal proofs,
                not eight test cases.
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              All proofs are checked by Lean 4&apos;s type-checking kernel.
              This is not testing or simulation: if any proof step were wrong,
              the code would not compile.
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
              <ExternalLink href={PROOFS_URL}>Proofs.lean</ExternalLink>{' '}
              contains no unfinished proofs.
            </p>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The table below shows which properties have been proven for each
              function. &ldquo;Conservation&rdquo; means the tree sums stay
              correct. &ldquo;Draw correctness&rdquo; means the draw always
              picks a valid leaf with the right probability.
              &ldquo;Composition&rdquo; means the property still holds after
              multiple operations in sequence.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-medium text-muted">
                      Function
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Conservation
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Draw correctness
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      ID mapping
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Composition
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">setLeaf</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">draw</td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">removeLeaf</td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &ndash;
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
              The proofs use zero axioms. Most hypotheses correspond directly
              to Solidity{' '}
              <code className="font-mono text-[12px]">require</code> statements
              that revert the transaction if violated. The overflow and removal
              proofs carry additional assumptions noted below.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hLow / hHigh"
                constraint="nodeIndex >= 7 \u2227 nodeIndex <= 14"
                source="require guard in SortitionTrees.sol"
              >
                The caller passes a valid leaf index. Enforced by{' '}
                <code className="font-mono text-[12px]">require</code> guards in
                the contract. Matches the Solidity implementation&apos;s bounds
                check for the 8-leaf tree.
              </Hypothesis>
              <Hypothesis
                name="hRoot"
                constraint="root != 0"
                source="require(root != 0) in draw function"
              >
                The tree is non-empty. Enforced by{' '}
                <code className="font-mono text-[12px]">
                  require(root != 0)
                </code>{' '}
                in the draw function. A draw on an empty tree would be
                meaningless.
              </Hypothesis>
              <Hypothesis
                name="hInRange"
                constraint="ticket < root"
                source="require(ticket < root) in draw function"
              >
                The ticket is within the valid range. Enforced by{' '}
                <code className="font-mono text-[12px]">
                  require(ticket {'<'} root)
                </code>{' '}
                in the draw function. Ensures the ticket falls within the total
                stake interval.
              </Hypothesis>
              <Hypothesis
                name="hNoWrap"
                constraint="leaf sums fit in 256 bits"
                source="Overflow safety proofs only"
              >
                The mathematical sum of leaf weights does not exceed
                2<sup>256</sup>&nbsp;-&nbsp;1. This assumption is only used by
                the overflow safety theorems. The core conservation and draw
                proofs do not depend on it.
              </Hypothesis>
              <Hypothesis
                name="hStakePathID"
                constraint="known associated ID before removal"
                source="Removal proofs only"
                border={false}
              >
                The caller knows which juror ID was associated with the leaf
                being removed. Used only by the removal cleanup proofs.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href={SPECS_URL}>View specs in Lean</ExternalLink>
              <ExternalLink href={PROOFS_URL}>
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
              <ExternalLink href="https://github.com/kleros/kleros-v2">
                Kleros V2 repository
              </ExternalLink>
              {', the upstream protocol.'}
            </p>
            <p className="leading-relaxed mb-2">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                Verity Benchmark
              </ExternalLink>
              {', the open-source benchmark suite.'}
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

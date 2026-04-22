import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import CodeBlock from '../../components/research/CodeBlock'
import Disclosure from '../../components/research/Disclosure'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import MidasGuarantee from '../../components/research/MidasGuarantee'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Cases.Midas.CustomFeedGrowthSafe.Proofs`

const UPSTREAM_CONTRACT =
  'https://github.com/midas-apps/contracts/blob/main/contracts/feeds/CustomAggregatorV3CompatibleFeedGrowth.sol'

const BENCHMARK_REPO =
  'https://github.com/lfglabs-dev/verity-benchmark'

const BENCHMARK_COMMIT =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/5ee8e4dd4e29ea9c3181ac6358d516f954b62d89'

const SPECS_LINK = `${BENCHMARK_COMMIT}/Benchmark/Cases/Midas/CustomFeedGrowthSafe/Specs.lean`
const PROOFS_LINK = `${BENCHMARK_COMMIT}/Benchmark/Cases/Midas/CustomFeedGrowthSafe/Proofs.lean`

export default function MidasFeedGrowthSafetyPage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'midas-feed-growth-safety'
  )

  return (
    <>
      <Head>
        <title>
          Midas Growth-Aware Feed Safety Guarantees | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Formally verified safety properties of the safe submission path in Midas's growth-aware price feed, covering zero-price rejection, deviation bounds, timing guards, and configured value bands in Verity and Lean 4."
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
              Midas Growth-Aware Feed Safety Guarantees
            </h1>
          </header>

          <section className="mb-16">
            <MidasGuarantee specsHref={SPECS_LINK} />
            <p className="text-muted text-[15px] leading-relaxed">
              Midas&apos;s{' '}
              <ExternalLink href={UPSTREAM_CONTRACT}>
                CustomAggregatorV3CompatibleFeedGrowth
              </ExternalLink>{' '}
              is an onchain price feed that stores a raw answer, a start
              timestamp, and a growth APR for each round. In other words, the
              contract does not treat the stored answer as the final price
              forever. Starting from the round&apos;s{' '}
              <code className="font-mono text-[13px]">startedAt</code>, it
              updates that answer over time using the configured APR. This lets
              the feed track assets whose price is expected to increase between
              submissions, instead of staying flat until the next manual update.
            </p>
            <p className="mt-4 text-muted text-[15px] leading-relaxed">
              That makes the safe submission path economically important. When a
              new round is submitted, the contract compares the new
              growth-adjusted price at the current block time against the
              previous growth-adjusted price at the current block time. It does
              not just compare the two stored round values as if no time had
              passed.
            </p>
            <p className="mt-4 text-muted text-[15px] leading-relaxed">
              In the shape of this contract, most of the risk is operator risk:
              an authorized updater submits the next round by hand. Formal
              verification helps here by showing exactly what the safe wrapper{' '}
              <code className="font-mono text-[13px]">setRoundDataSafe</code>{' '}
              does and does not prevent. In particular, it highlights that the
              safe path really does enforce the configured rejection criteria,
              including the zero-price case under a strict enough deviation
              setting.
            </p>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-4">
              This is a manually updated price feed. That means the main
              operational risk is not an adversary exploiting arithmetic from
              nowhere, but an authorized operator submitting a round that should
              have been rejected by the feed&apos;s own configured rules.
            </p>
            <p className="leading-relaxed mb-6">
              If the safe path accepted a submission outside those rules, every
              downstream integration reading the feed would inherit a price the
              contract itself was supposed to screen out. The point of this case
              study is to make those guardrails explicit and machine-check that
              they hold on the guarded entrypoint.
            </p>
            <Disclosure title="What this covers">
              <p className="mb-3 text-muted text-[15px]">
                This case study is about{' '}
                <code className="font-mono text-[12px]">setRoundDataSafe</code>
                , the guarded submission path. It also models the underlying
                write behavior of{' '}
                <code className="font-mono text-[12px]">setRoundData</code>,
                because a successful safe call ends by writing a new round
                through that path.
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-2">
                <li>
                  <strong>Rejection guarantee:</strong> once the feed has prior
                  history, a zero-price submission through the safe path is
                  rejected whenever{' '}
                  <code className="font-mono text-[12px]">
                    maxAnswerDeviation
                  </code>{' '}
                  is set below 100% in the contract&apos;s fixed-point units.
                  The contract uses 8 decimals for percentages, so 100% is{' '}
                  <code className="font-mono text-[12px]">100 * 1e8</code>. Any
                  smaller cap rules out a candidate live price of zero.
                </li>
                <li>
                  <strong>Successful-write guarantees:</strong> for executions
                  that satisfy the contract&apos;s own guards and complete the
                  safe path, the verified model shows that the candidate live
                  price is within the configured deviation bound, more than one
                  hour has passed since the previous update, the new round&apos;s{' '}
                  <code className="font-mono text-[12px]">startedAt</code>{' '}
                  strictly increases,{' '}
                  <code className="font-mono text-[12px]">onlyUp</code>{' '}
                  excludes negative deviation, and the stored answer and growth
                  APR remain inside the configured min/max bands.
                </li>
              </ul>
              <p className="mb-3 text-muted">
                The comparison is growth-aware on both sides. The previous round
                is first turned into a live price at the current block time, and
                the incoming submission is also projected forward to the current
                block time before deviation is measured.
              </p>
              <p className="text-muted">
                Out of scope: direct calls that bypass{' '}
                <code className="font-mono text-[12px]">setRoundDataSafe</code>{' '}
                and invoke{' '}
                <code className="font-mono text-[12px]">setRoundData</code>{' '}
                directly, access control plumbing, events, unrelated read-only
                interface methods, and downstream protocol integrations outside
                this contract.
              </p>
            </Disclosure>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was modeled
            </h2>
            <p className="leading-relaxed mb-4">
              The benchmark isolates the contract slice that determines whether
              a safe submission is accepted and what gets written if it is. That
              includes the current configuration fields, the storage for the
              latest round, and the next-round write path that records the new
              answer, timestamps, APR, and round id.
            </p>
            <p className="leading-relaxed mb-4">
              The model also captures the growth arithmetic used to reconstruct
              the previous live price and the candidate live price of the new
              submission. This matters because the safety check is about the
              economically meaningful price at the current moment, not just the
              raw number stored in storage.
            </p>
            <p className="leading-relaxed mb-4">
              Deviation is modeled with the contract&apos;s special zero-price
              branch, where a candidate live price of zero is treated as a full
              100% move. The negative-deviation branch used by{' '}
              <code className="font-mono text-[13px]">onlyUp</code>{' '}
              is included as well, along with the underlying band checks from{' '}
              <code className="font-mono text-[13px]">setRoundData</code>.
            </p>
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
              The six guarantee families for this case are machine-checked in
              Lean 4. The corresponding proof file in the{' '}
              <ExternalLink href={BENCHMARK_REPO}>
                Verity benchmark repository
              </ExternalLink>{' '}
              is <code className="font-mono text-[12px]">sorry</code>-free, so
              the claims below are accepted by Lean&apos;s kernel rather than
              by informal review.
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
                    <td className="px-4 py-1.5">Rejects zero price below 100% cap</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">Deviation bound on accepted write</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">More than one hour since last update</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">startedAt strictly increases</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">onlyUp forbids negative deviation</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">Stored answer and APR stay in bands</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href={SPECS_LINK}>View specs in Lean</ExternalLink>
              <ExternalLink href={PROOFS_LINK}>View proofs in Lean</ExternalLink>
            </p>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Assumptions
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proofs use zero axioms. Two hypotheses matter for the
              zero-price rejection theorem.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hHistory"
                constraint="the feed already has a previous round"
                source="setRoundDataSafe compares against lastAnswer() only when history exists"
              >
                The zero-price rejection claim is about states where the safe
                path actually compares the new submission against an existing
                live price. If there is no prior round,{' '}
                <code className="font-mono text-[12px]">setRoundDataSafe</code>{' '}
                skips the deviation check entirely.
              </Hypothesis>
              <Hypothesis
                name="hStrictDeviation"
                constraint="maxAnswerDeviation &lt; 100 * 1e8"
                source="Fixed-point threshold in the contract's percentage units"
                border={false}
              >
                The contract allows a maximum deviation up to and including
                100%. The zero-price rejection theorem therefore needs the
                configured deviation cap to be strictly below 100%. At exactly
                100%, that specific rejection claim no longer follows from the
                deviation check alone.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href={SPECS_LINK}>View specs in Lean</ExternalLink>
              <ExternalLink href={PROOFS_LINK}>View proofs in Lean</ExternalLink>
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
            <p className="leading-relaxed mb-2">
              <ExternalLink href={UPSTREAM_CONTRACT}>
                Upstream Solidity contract
              </ExternalLink>
              {', the production source modeled in this case.'}
            </p>
            <p className="leading-relaxed mb-2">
              <ExternalLink href={BENCHMARK_REPO}>
                Verity benchmark repository
              </ExternalLink>
              {', which contains the formal specification, machine-checked proofs, and the broader benchmark suite this case belongs to.'}
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

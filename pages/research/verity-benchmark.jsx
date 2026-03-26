import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import ExternalLink from '../../components/research/ExternalLink'
import { research } from '../../data/research'

export default function VerityBenchmarkPage() {
  const otherResearch = research.filter((r) => r.slug !== 'verity-benchmark')

  return (
    <>
      <Head>
        <title>Verity Benchmark | Research | LFG Labs</title>
        <meta
          name="description"
          content="An open benchmark suite for evaluating AI agents on formal proof generation for real smart contracts."
        />
      </Head>
      <PageLayout>
        <div className="font-serif max-w-[680px] mx-auto px-6 py-20 md:py-32">
          <nav className="mb-10">
            <Link
              href="/research"
              className="text-sm text-muted hover:text-primary transition-colors font-sans"
            >
              &larr; Back
            </Link>
          </nav>

          <header className="mb-20">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                Verity Benchmark
              </h1>
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-muted bg-card-bg px-2.5 py-1 rounded-full translate-y-[2px]">
                Work in progress
              </span>
            </div>
            <p className="text-muted text-base">
              A benchmark suite for AI-driven formal proof generation on real
              smart contracts.
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              Formal proofs are only useful if someone can write them. Today
              that requires deep expertise in both the contract logic and the
              proof assistant. We think AI agents can close this gap, but to
              get there, we need a way to measure how well they do it.
            </p>
            <p>
              Verity Benchmark is an open database of formally specified
              properties drawn from real, deployed smart contracts. Each
              property comes with a{' '}
              <ExternalLink href="https://github.com/Th0rgal/verity">
                Verity
              </ExternalLink>{' '}
              model of the contract logic, a Lean 4 theorem statement, and a
              harness that evaluates whether an agent&apos;s proof compiles and
              is correct.
            </p>
            <p>
              The goal is simple: give agents a theorem and see if they can
              prove it. The better they get, the cheaper and more accessible
              formal verification becomes.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-semibold tracking-tight mb-4">
              What&apos;s in the benchmark
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The suite currently covers 5 protocols with 22 tasks across a
                range of property types: from conservation laws and economic
                invariants to state-transition correctness and tree structure
                proofs.
              </p>
            </div>

            <div className="mt-6 border border-gray-200 rounded overflow-hidden text-sm">
              <div className="grid grid-cols-3 gap-4 px-5 py-3 bg-[#f8f8f8] font-sans font-semibold text-heading text-xs uppercase tracking-wider">
                <span>Protocol</span>
                <span>Contract</span>
                <span>Tasks</span>
              </div>
              <div className="grid grid-cols-3 gap-4 px-5 py-3 border-t border-gray-100">
                <span>Ethereum</span>
                <span className="text-muted">Deposit Contract</span>
                <span className="text-muted">5</span>
              </div>
              <div className="grid grid-cols-3 gap-4 px-5 py-3 border-t border-gray-100">
                <span>Kleros</span>
                <span className="text-muted">Sortition Trees</span>
                <span className="text-muted">6</span>
              </div>
              <div className="grid grid-cols-3 gap-4 px-5 py-3 border-t border-gray-100">
                <span>Nexus Mutual</span>
                <span className="text-muted">RAMM Price Band</span>
                <span className="text-muted">4</span>
              </div>
              <div className="grid grid-cols-3 gap-4 px-5 py-3 border-t border-gray-100">
                <span>Paladin</span>
                <span className="text-muted">Stream Recovery</span>
                <span className="text-muted">3</span>
              </div>
              <div className="grid grid-cols-3 gap-4 px-5 py-3 border-t border-gray-100">
                <span>Reserve</span>
                <span className="text-muted">Folio Mint Fees</span>
                <span className="text-muted">4</span>
              </div>
            </div>

            <p className="mt-4 text-muted text-[14px] leading-relaxed">
              Each task includes the contract model, a formal specification, and
              a proof template. The agent&apos;s job is to fill in the proof.
              Difficulty ranges from straightforward arithmetic lemmas to
              multi-step reasoning over non-linear{' '}
              <code className="font-mono text-[12px]">uint256</code>{' '}
              operations.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The bottleneck for formal verification today isn&apos;t the
                proof checker. Lean&apos;s kernel is fast and reliable. The
                bottleneck is writing the proofs. If AI agents can learn to
                generate valid Lean proofs from contract specifications, then
                formal verification stops being a luxury reserved for the
                highest-value contracts and becomes something every serious
                protocol can afford.
              </p>
              <p>
                To train and evaluate these agents, they need data: real
                contracts, real properties, real proofs. That&apos;s what
                the benchmark provides: a growing collection of cases that
                any agent builder can use.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-semibold tracking-tight mb-4">
              How it works
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Each case starts from a deployed smart contract. We model the
                relevant logic in Verity, write a formal specification of the
                property to be verified, and create a proof template with the
                theorem statement but no proof body.
              </p>
              <p>
                An agent receives the template and must produce a complete Lean
                proof. The harness compiles it against the fixed specification
                if it compiles, the proof is correct. No human review needed.
              </p>
              <p>
                Reference solutions exist for every task but are kept separate
                from the public templates, so agents are evaluated on their
                ability to discover proofs independently.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-semibold tracking-tight mb-4">
              Current status
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                This is an ongoing effort. We&apos;re actively adding new
                cases from important contracts across the ecosystem: lending
                protocols, DEXs, staking infrastructure, governance systems.
                The more diverse the benchmark, the better agents will
                generalize.
              </p>
              <p>
                We hope this work will result in a publication documenting the
                benchmark design, early agent evaluation results, and what
                we&apos;ve learned about the gap between current AI capabilities
                and production-grade formal verification.
              </p>
              <p>
                Contributions are welcome, both new cases and agent
                implementations.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-lg font-semibold tracking-tight mb-4">
              Source
            </h2>
            <p className="leading-relaxed">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                View on GitHub
              </ExternalLink>
            </p>
          </section>

          {otherResearch.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200 font-sans">
              <h2 className="text-base font-bold text-heading mb-6">
                More research
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherResearch.slice(0, 2).map((r) => (
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

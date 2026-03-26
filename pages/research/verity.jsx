import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import ExternalLink from '../../components/research/ExternalLink'
import { research } from '../../data/research'

export default function VerityPage() {
  const otherResearch = research.filter((r) => r.slug !== 'verity')

  return (
    <>
      <Head>
        <title>Verity | Research | LFG Labs</title>
        <meta
          name="description"
          content="Verity, A Formally Verified Smart Contract Compiler in Lean 4."
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

          <header className="mb-20">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Verity
            </h1>
            <p className="mt-3 text-muted text-base">
              A Formally Verified Smart Contract Compiler in Lean 4.
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              Verity is our attempt to bridge the gap between Solidity smart
              contracts and formal mathematics. It lets you express contract
              logic in{' '}
              <ExternalLink href="https://lean-lang.org/">Lean 4</ExternalLink>,
              state properties about that logic, and produce machine-checkable
              proofs that those properties hold, not for a sample of inputs,
              but for all of them.
            </p>

            <p>
              The framework compiles to EVM bytecode via Yul, so verified
              contracts can be deployed directly. The goal is to make it
              possible to ship contracts where critical invariants are
              mathematically guaranteed, not just tested.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Where we are
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Verity is still early. The current state: 431 theorems, 0
                unproven steps, 1 axiom (keccak256 collision resistance), 403
                Foundry tests, and 11 contracts. We&apos;re iterating on the
                framework as we use it on real verification engagements.
              </p>

              <p>
                We&apos;re writing a research paper that documents the approach
                and our findings so far. The draft is available below.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              What we&apos;re trying to solve
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Audits are valuable but inherently limited: they check what the
                auditor thinks to check. Bounded model checking (e.g. Certora)
                can verify properties up to a search depth, but can&apos;t prove
                them universally. Full formal proofs can, but they&apos;ve
                historically been too expensive and too slow for most teams.
              </p>

              <p>
                Verity is our bet that this is a tooling problem, not a
                fundamental one. If the framework is good enough, formal
                verification becomes practical, especially as AI gets better at
                generating proofs.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Research paper
            </h2>
            <p className="leading-relaxed mb-6">
              The draft of our research paper covers the Verity architecture,
              the compilation pipeline, and case studies from real contracts.
            </p>

            <a
              href="/papers/verity.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-card-bg hover:bg-gray-100 transition-colors rounded-xl px-6 py-4 font-sans"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-muted flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <div>
                <span className="font-medium text-heading text-sm block">
                  Read the paper (PDF)
                </span>
                <span className="text-xs text-muted">
                  Draft, work in progress
                </span>
              </div>
            </a>

            <p className="mt-4">
              <ExternalLink href="https://github.com/Th0rgal/verity">
                View source on GitHub
              </ExternalLink>
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

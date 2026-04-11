import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import ExternalLink from '../../components/research/ExternalLink'
import { getSortedResearch } from '../../lib/getSortedResearch'

export default function VerityPage() {
  const otherResearch = getSortedResearch().filter((r) => r.slug !== 'verity')

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
              Verity lets you express smart contract logic in{' '}
              <ExternalLink href="https://lean-lang.org/">Lean 4</ExternalLink>,
              state properties about that logic, and produce machine-checkable
              proofs that those properties hold for all inputs. The framework
              compiles to EVM bytecode via Yul, so verified contracts can be
              deployed directly.
            </p>
            <p>
              Verity is still early: 431 theorems, 0 unproven steps, 1 axiom
              (keccak256 collision resistance), 403 Foundry tests, 11
              contracts. We are iterating on the framework as we use it on
              real verification engagements.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Audits check what the auditor thinks to check. Bounded model
                checking can verify properties up to a search depth. Full formal
                proofs can prove them universally, but they have historically
                been too expensive for most teams.
              </p>
              <p>
                We think this is a tooling problem. If the framework is good
                enough, formal verification becomes practical, especially as
                AI gets better at generating proofs.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Links
            </h2>
            <div className="leading-relaxed space-y-2">
              <p>
                <a
                  href="/papers/verity.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-3 hover:text-heading transition-colors"
                >
                  Research paper draft
                </a>{' '}
                <span className="text-muted text-sm">(PDF, work in progress)</span>
              </p>
              <p>
                <ExternalLink href="https://github.com/Th0rgal/verity">
                  Source on GitHub
                </ExternalLink>
              </p>
            </div>
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

import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import ExternalLink from '../../components/research/ExternalLink'
import { research } from '../../data/research'

export default function WhyClearSigningShouldNotRequireTrustPage() {
  const otherResearch = research.filter(
    (r) => r.slug !== 'why-clear-signing-should-not-require-trust'
  )

  return (
    <>
      <Head>
        <title>
          Why Clear Signing Should Not Require Trust | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="VeryClear reframes transaction explanation as a verification problem: users should trust auditable specs, not opaque translators."
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
              Why Clear Signing Should Not Require Trust
            </h1>
            <p className="mt-3 text-muted text-base">
              VeryClear, Verity, and a smaller trust boundary for wallet UX.
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              In crypto, we like to say that code is law. The problem is that
              code is hard to read, and transaction calldata is even worse. For
              most users, a transaction request still looks like an opaque blob
              of hex.
            </p>
            <p>
              Verity exists to reduce what people need to trust. Instead of
              asking users to trust a large implementation, we want to reduce
              trust to small specifications that can be audited directly, or
              audited by people they trust. That works well for proving what a
              contract does. Until now, it did not help much with a simpler
              question users face every day: what am I about to sign?
            </p>
            <p>
              That is the problem behind VeryClear. Clear signing is usually
              presented as a UX improvement, but readability alone is not
              enough. If a wallet translates calldata into a sentence, the user
              still has to trust the translator.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              The real trust problem
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Blind signing is obviously bad. A transaction like{' '}
                <code className="font-mono text-[13px]">
                  0x095ea7b300000000000000000000000...
                </code>{' '}
                tells a human almost nothing. Clear signing improves that by
                showing a sentence such as &ldquo;Approve Uniswap to spend
                unlimited USDC.&rdquo;
              </p>
              <p>
                But the sentence is only useful if it is correct. Otherwise,
                clear signing just moves the trust boundary. Instead of trusting
                unreadable calldata, the user trusts a piece of software that
                claims to have interpreted it correctly.
              </p>
              <p>
                We think this gap should be explicit. The problem is not only
                how to display a transaction. The problem is how to justify the
                claim being displayed.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Trust specifications, not code
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Our broader view is that users should not need to trust large
                opaque codebases. They should trust small specifications. A
                specification is easier to audit, easier to compare, and easier
                to publish as a public object that different implementations can
                follow.
              </p>
              <p>
                That does not mean code stops mattering. It means code should be
                forced to prove that it follows the specification, instead of
                asking users to trust that it probably does.
              </p>
              <p>
                VeryClear is a first step in that direction. We focused on a
                narrow but important property: ensuring that the explanation
                shown to the user really follows from the calldata and from a
                formal intent specification.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              What VeryClear builds
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                VeryClear starts from an intent specification written in the
                Verity DSL. The spec describes how a contract call should be
                interpreted. For an ERC-20{' '}
                <code className="font-mono text-[13px]">approve</code>, that
                may mean rendering either an &ldquo;unlimited approval&rdquo;
                sentence or a bounded allowance sentence depending on the
                amount.
              </p>
              <p>
                From that same source of truth, the compiler produces two
                artifacts: a descriptor that a frontend can use to decode and
                render the transaction, and a zero-knowledge circuit that proves
                the rendered explanation is the one required by the
                specification.
              </p>
              <p>
                That shared origin is the key point. The display logic and the
                proof logic are not maintained separately and hoped to agree.
                They are both derived from the same formal description.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              The pipeline
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>In the demo, the flow is straightforward:</p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>Look up the relevant spec for the target contract.</li>
                <li>Match the function selector.</li>
                <li>Decode calldata into typed parameters.</li>
                <li>Evaluate the intent rules in the spec.</li>
                <li>Resolve useful external labels such as token names.</li>
                <li>Render the final sentence shown to the user.</li>
                <li>
                  Generate a proof that this sentence is the correct
                  interpretation of the transaction.
                </li>
              </ol>
              <p>
                We also extended the model to hardware verification. In the{' '}
                <ExternalLink href="https://explain.md/clear-signing-hw">
                  hardware flow
                </ExternalLink>
                , the proof can be checked on a Ledger device, which reduces
                the need to trust the host machine for the final display.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              What this proves, and what it does not
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The part we solved is: does the implementation produce the
                explanation required by the formal specification? That is
                already a meaningful shift. A fragile software promise becomes a
                machine-checkable claim.
              </p>
              <p>
                The harder question is above that layer: is the specification
                itself the right way to explain the transaction to a human?
                Natural language is ambiguous, context matters, and a sentence
                can be technically correct while still failing to communicate
                risk.
              </p>
              <p>
                During the hackathon, we focused on the first layer with the
                team from{' '}
                <ExternalLink href="https://zknox.com">ZKNOX</ExternalLink>.
                In parallel, we also explored the second one: how formal intent
                specifications should eventually be expressed so humans can rely
                on them, not just verify that a program followed them.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Where we want this to go
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The end state is not better wallet copy. It is a better trust
                model.
              </p>
              <p>
                Protocols should publish small formal specifications of what
                their transactions mean. Wallets should render explanations from
                those specifications. Devices should verify proofs that bind the
                explanation to the calldata. Users should be able to trust the
                specification, or trust someone who audited it, instead of
                trusting a closed translation layer.
              </p>
              <p>
                VeryClear is an early prototype, but it demonstrates the
                direction clearly: clear signing should not mean &ldquo;the
                wallet showed me something readable.&rdquo; It should mean
                &ldquo;the claim I am reading is justified.&rdquo;
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Links
            </h2>
            <div className="leading-relaxed space-y-2">
              <p>
                <ExternalLink href="https://explain.md/clear-signing">
                  Clear-signing demo
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://explain.md/clear-signing-hw">
                  Hardware verification demo
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/lfglabs-dev/verity/pull/1677">
                  Verity PR: Provable Intent DSL for clear signing
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/lfglabs-dev/explain.md">
                  explain.md source
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

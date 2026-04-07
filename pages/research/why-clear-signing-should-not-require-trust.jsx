import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import CodeBlock from '../../components/research/CodeBlock'
import Disclosure from '../../components/research/Disclosure'
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
              VeryClear, Verity, and a smaller trust boundary for transaction
              explanations.
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              In crypto, we like to say that code is law. In practice, that is
              a hard thing to rely on, because almost nobody reads code at the
              moment they need to make a security decision. What they see
              instead is usually worse: raw transaction calldata, rendered as
              an opaque blob of hex.
            </p>
            <p>
              Verity exists to reduce what people need to trust. Instead of
              asking users to trust a large implementation, we want to reduce
              trust to small specifications that can be audited directly, or
              audited by people they trust. That works well for proving what a
              contract does. Until now, it did not help enough with the more
              immediate question users face every day: what am I about to sign?
            </p>
            <p>
              That is the problem behind VeryClear. Clear signing is usually
              presented as a UX improvement, but readability alone is not
              enough. If a wallet translates calldata into a sentence, the user
              still has to trust the translator.
            </p>
          </section>

          <section className="mb-16">
            <div className="rounded-lg border border-gray-200 bg-[#f8f8f8] px-6 py-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                Thesis
              </p>
              <p className="mt-3 text-[17px] leading-relaxed">
                Clear signing only really helps if the sentence on screen is
                not just readable, but justified. Our goal is to move trust
                away from opaque wallet code and toward small public
                specifications that can be audited independently.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-[#f8f8f8]">
              <video
                src="/images/veryclear-demo.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
              />
            </div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              The demo takes a transaction that would normally be shown as raw
              calldata, renders a human-readable interpretation, and binds that
              interpretation to the calldata with a proof.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              What changes with VeryClear
            </h2>
            <div className="border border-gray-200 rounded overflow-hidden text-sm">
              <div className="grid grid-cols-2 gap-4 px-5 py-3 bg-[#f8f8f8] font-sans font-semibold text-heading text-xs uppercase tracking-wider">
                <div>Standard clear signing</div>
                <div>VeryClear</div>
              </div>
              <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-gray-200">
                <div className="leading-relaxed text-primary">
                  Wallet software decodes calldata and displays a sentence.
                </div>
                <div className="leading-relaxed text-primary">
                  A public spec defines the sentence, and the wallet proves that
                  the displayed interpretation follows from that spec.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-gray-200">
                <div className="leading-relaxed text-primary">
                  The user trusts the translator.
                </div>
                <div className="leading-relaxed text-primary">
                  The user trusts an auditable specification, or someone they
                  trust to audit it.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 px-5 py-4 border-t border-gray-200">
                <div className="leading-relaxed text-primary">
                  A hardware wallet usually trusts what the host sends.
                </div>
                <div className="leading-relaxed text-primary">
                  A hardware wallet can verify a proof before trusting the
                  displayed claim.
                </div>
              </div>
            </div>
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
              A concrete example
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Take a standard ERC-20{' '}
                <code className="font-mono text-[13px]">approve</code> call.
                The raw transaction says almost nothing to a human. A good
                wallet UI might translate it into something like
                &ldquo;Approve Uniswap to spend unlimited USDC.&rdquo;
              </p>
              <p>
                That is better, but the user still has no direct reason to
                trust the sentence. Was the spender decoded correctly? Was the
                token resolved correctly? Did the software correctly detect that{' '}
                <code className="font-mono text-[13px]">2^256 - 1</code> means
                an unlimited approval in this context? A normal clear-signing
                stack asks the user to assume all of that machinery behaved
                correctly.
              </p>
              <p>
                VeryClear changes that question. Instead of asking whether the
                frontend probably interpreted the calldata correctly, we ask
                whether the displayed sentence can be derived from a public
                specification and proved from the calldata itself. That is a
                much smaller and more defensible trust boundary.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm font-sans uppercase tracking-[0.14em] text-muted">
                One possible specification
              </p>
              <CodeBlock>{`match approve(spender, amount)
| amount == maxUint256 =>
    "Approve {spender} to spend unlimited USDC"
| otherwise =>
    "Approve {spender} to spend {amount} USDC"`}</CodeBlock>
              <p className="text-sm text-muted leading-relaxed">
                The important property is not the exact syntax. It is that the
                explanation exists as a small public object that can be audited
                independently from the wallet implementation.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              What you trust in practice
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                VeryClear does not ask the user to trust nothing. It asks the
                user to trust a smaller and more legible stack.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>
                  Trust that the published specification is the right way to
                  describe the transaction.
                </li>
                <li>
                  Trust the proof system and verifier rather than a large
                  translation layer running on the host.
                </li>
                <li>
                  Optionally trust a hardware device to verify the proof before
                  displaying the final claim.
                </li>
              </ol>
              <p>
                That is a meaningful reduction. Instead of trusting hidden UI
                logic, users can inspect the spec themselves or rely on an
                auditor, protocol team, or wallet vendor they already trust to
                do it.
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
                From that same source of truth, the compiler can produce both
                an ERC-7730 clear-signing descriptor and a zero-knowledge
                circuit. In other words, the ecosystem can keep the familiar
                wallet display path, but now that path has a formal source of
                truth and a proof-oriented backend instead of a separate,
                hand-maintained translation layer.
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
                <li>
                  Produce a structured interpretation: a template plus the
                  values that fill it.
                </li>
                <li>
                  Generate a proof that this interpretation is the correct
                  result of evaluating the spec on that calldata.
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
                The part we solved is narrow, but important: does the
                implementation produce the explanation required by the formal
                specification? That is already a meaningful shift. A fragile
                software promise becomes a machine-checkable claim.
              </p>
              <p>
                More precisely, the proof does not need to certify an entire
                sentence as free-form text. It certifies that the calldata
                evaluates to a specific display template and a specific set of
                formatted values under the public spec. That is a better fit
                for constrained devices, because the hardware wallet can verify
                the proof and render the final human-readable message locally.
              </p>
              <p>
                That distinction matters because transaction explanation sits
                on a security boundary. If the host machine, browser extension,
                or wallet integration is compromised, a friendly sentence is
                not enough. The sentence has to be justified by something
                smaller and more stable than the UI stack that produced it.
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
                specifications should eventually be expressed so humans can
                rely on them, not just verify that a program followed them.
              </p>
              <p>
                Put differently: VeryClear can help prove that the wallet is
                faithfully saying what the spec says. It does not yet solve the
                full problem of making sure the spec says exactly what a human
                needs to hear before making a security decision.
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
              Why this is better than static descriptors
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Standards such as ERC-7730 are useful because they push wallets
                toward structured transaction display. The problem is that a
                static descriptor is still just an artifact you are asked to
                trust. It can be incomplete, wrong, or maliciously misleading,
                and by itself it cannot express much conditional logic.
              </p>
              <p>
                The intent DSL in Verity is contract-specific and expressive
                enough to cover cases like &ldquo;if the amount is max uint,
                display unlimited approval.&rdquo; The important improvement is
                not only expressiveness. It is that the same spec can also be
                compiled into something a verifier can check, including on a
                hardware wallet.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Likely objections
            </h2>
            <div className="space-y-4">
              <Disclosure
                title="Isn’t this still trust, just moved somewhere else?"
                defaultOpen
              >
                <p>
                  Yes, but that is the point. We are not claiming to remove
                  trust completely. We are trying to move it from a large,
                  opaque, fast-moving software stack to a much smaller object:
                  a public specification. That object can be reviewed,
                  versioned, compared across implementations, and audited by
                  people other than the wallet vendor.
                </p>
              </Disclosure>
              <Disclosure title="Why not just standardize better wallet metadata?">
                <p>
                  Better metadata helps, and standards work is valuable. But
                  metadata alone still leaves the user trusting that the host
                  software interpreted and rendered everything correctly. The
                  extra step here is proving that the displayed claim actually
                  follows from the calldata and the published rules.
                </p>
              </Disclosure>
              <Disclosure title="Did VeryClear solve the natural-language problem?">
                <p>
                  No. VeryClear focuses on proving that the implementation
                  followed the specification. The harder question is whether the
                  specification expresses the right thing for a human making a
                  security decision. That is where our hackathon exploration
                  with ZKNOX becomes relevant, and it remains an open problem.
                </p>
              </Disclosure>
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
                <ExternalLink href="https://lfglabs.dev/projects/veryclear">
                  VeryClear project page
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
                <ExternalLink href="https://github.com/lfglabs-dev/verity/blob/main/docs/PROVABLE_INTENT_DSL.md">
                  Provable Intent DSL documentation
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://ethglobal.com/showcase/veryclear-vu8i7">
                  ETHGlobal showcase
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

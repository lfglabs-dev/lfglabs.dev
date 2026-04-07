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
          content="If code is law, the sentence your wallet shows should be justified, not trusted. VeryClear reframes clear signing as a verification problem."
        />
        <meta
          property="og:title"
          content="Why Clear Signing Should Not Require Trust"
        />
        <meta
          property="og:description"
          content="If code is law, the sentence your wallet shows should be justified, not trusted. VeryClear reframes clear signing as a verification problem."
        />
        <meta
          property="og:type"
          content="article"
        />
        <meta
          property="og:url"
          content="https://lfglabs.dev/research/why-clear-signing-should-not-require-trust"
        />
        <meta
          property="og:image"
          content="https://lfglabs.dev/images/veryclear-thumb.webp"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content="Why Clear Signing Should Not Require Trust"
        />
        <meta
          name="twitter:description"
          content="If code is law, the sentence your wallet shows should be justified, not trusted."
        />
        <meta
          name="twitter:image"
          content="https://lfglabs.dev/images/veryclear-thumb.webp"
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
            <div className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
              April 7, 2026 · Case study
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Why Clear Signing Should Not Require Trust
            </h1>
            <p className="mt-3 text-muted text-base">
              If code is law, the sentence your wallet shows should be
              justified, not trusted.
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              In crypto, we like to say that code is law. The problem is that
              code is hard to understand, and transaction calldata is worse.
              At signing time, the user is not reviewing a protocol design or
              a contract implementation. They are staring at an opaque blob of
              bytes and trying to decide whether it is safe.
            </p>
            <p>
              Verity exists to reduce what people need to trust. Instead of
              asking users to trust a large implementation, we want to reduce
              trust to small specifications that can be audited directly, or by
              people they already trust. That helps when the question is what a
              contract does in general. But until recently, it did not solve
              the question users face every day: what exactly am I about to
              sign?
            </p>
            <p>
              That is the gap VeryClear targets. Clear signing is usually sold
              as a UX improvement: take unreadable calldata, turn it into a
              sentence, and let the user decide. But readability alone is not
              enough. If a wallet translates calldata into a sentence, the user
              still has to trust the translator.
            </p>
          </section>

          <section className="mb-16">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-[#f8f8f8] p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  What users get today
                </p>
                <p className="mt-4 font-mono text-[13px] leading-relaxed text-primary break-all">
                  0x095ea7b300000000000000000000000...
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  Or, at best, a sentence like &ldquo;Approve Uniswap to spend
                  unlimited USDC&rdquo; that the wallet asks you to trust.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  What we want instead
                </p>
                <p className="mt-4 text-sm leading-relaxed">
                  A public spec says what that calldata means, and the wallet
                  proves that the sentence on screen is the one the spec allows
                  for this exact transaction.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  The user no longer has to trust a hidden translator. They can
                  trust a small auditable specification and a verifier.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="rounded-lg border border-gray-200 bg-[#f8f8f8] px-6 py-5">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                Thesis
              </p>
              <p className="mt-3 text-[17px] leading-relaxed">
                Clear signing only really helps if the sentence on screen is
                not just readable, but justified. VeryClear moves trust away
                from opaque wallet code and toward small public specifications
                that can be audited independently and checked by machines.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid gap-4 md:grid-cols-3 text-sm leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  Problem
                </p>
                <p className="mt-3">
                  Normal clear signing still asks users to trust the software
                  that translated calldata into a sentence.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  VeryClear
                </p>
                <p className="mt-3">
                  A Verity spec defines what the wallet is allowed to say, and
                  a proof binds that claim to the calldata.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  Limit
                </p>
                <p className="mt-3">
                  This proves the implementation followed the spec. It does not
                  fully solve how intent should be expressed to humans.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              What is actually being proved
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The most useful way to read VeryClear is not as
                &ldquo;zk for wallet UX,&rdquo; but as a precise claim about
                what the wallet is allowed to say. The proof does not try to
                certify free-form prose in the abstract. It certifies a much
                narrower object that a device can verify reliably.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  1. Spec match
                </p>
                <p className="mt-3">
                  The calldata matches a public intent specification for the
                  target contract and function selector.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  2. Correct interpretation
                </p>
                <p className="mt-3">
                  Decoding and rule evaluation produce one specific display
                  template and one specific set of values.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  3. Verifiable display
                </p>
                <p className="mt-3">
                  A verifier, including on hardware, can check that the final
                  message shown to the user is exactly the one permitted by the
                  spec for that calldata.
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              This is deliberately narrower than proving that the explanation
              is the best possible English description for every user. It
              proves that the wallet faithfully followed an auditable public
              spec.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              The trust boundary, before and after
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  Standard flow
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div className="rounded border border-gray-200 bg-[#f8f8f8] px-4 py-3">
                    Raw calldata
                  </div>
                  <div className="text-center text-muted">&darr;</div>
                  <div className="rounded border border-gray-200 bg-[#f8f8f8] px-4 py-3">
                    Wallet or frontend translator
                  </div>
                  <div className="text-center text-muted">&darr;</div>
                  <div className="rounded border border-gray-200 bg-[#fdf4e7] px-4 py-3">
                    User trusts the sentence because the software said so
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  VeryClear flow
                </p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed">
                  <div className="rounded border border-gray-200 bg-[#f8f8f8] px-4 py-3">
                    Raw calldata + public intent spec
                  </div>
                  <div className="text-center text-muted">&darr;</div>
                  <div className="rounded border border-gray-200 bg-[#f8f8f8] px-4 py-3">
                    Prover derives the display claim from the spec
                  </div>
                  <div className="text-center text-muted">&darr;</div>
                  <div className="rounded border border-gray-200 bg-[#edf6ee] px-4 py-3">
                    User trusts an auditable spec and a verifier, not a hidden
                    translator
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted leading-relaxed">
              The shift is not from trust to no trust. It is from trusting a
              large implementation to trusting a much smaller public object and
              checking that the implementation followed it.
            </p>
          </section>

          <section className="mb-16">
            <div className="rounded-lg overflow-hidden border border-gray-200 bg-[#f8f8f8]">
              <video
                src="/images/veryclear-demo.mp4"
                controls
                playsInline
                preload="metadata"
                poster="/images/veryclear-thumb.webp"
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
                  A public spec defines the allowed display claim, and the
                  wallet proves that the displayed interpretation follows it.
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

            <div className="mt-8 space-y-4">
              <p className="text-sm font-sans uppercase tracking-[0.14em] text-muted">
                The claim the wallet should be able to justify
              </p>
              <CodeBlock>{`{
  contract: "USDC",
  selector: "approve(address,uint256)",
  template: "erc20.approve.unlimited",
  fields: {
    spender: "Uniswap V2 Router",
    token: "USDC"
  },
  display: "Approve Uniswap V2 Router to spend unlimited USDC"
}`}</CodeBlock>
              <p className="text-sm text-muted leading-relaxed">
                This is the useful distinction in practice. The proof does not
                need to certify every nuance of free-form prose. It needs to
                certify that one structured display claim is the correct result
                of evaluating the public spec on the calldata. The sentence the
                user reads is then a rendering of that claim.
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
                  Trust the proof system and verifier instead of a large
                  translation layer running on the host.
                </li>
                <li>
                  On hardware, trust the device to verify the proof before
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
                specification is easier to audit, compare across
                implementations, and publish as a public object that many
                parties can review.
              </p>
              <p>
                That does not mean code stops mattering. It means code should be
                forced to prove that it follows the specification, instead of
                asking users to trust that it probably does.
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
              How the claim is bound
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The critical detail is that the proof is not asserting a vague
                statement like &ldquo;the UI seems reasonable.&rdquo; It binds
                two concrete commitments: one to the transaction input, and one
                to the structured display output produced by the spec.
              </p>
              <p>
                In the prototype, the circuit checks the selector, evaluates
                the Verity intent rules, and computes commitments over both the
                calldata and the resulting display claim. The proof then
                certifies that these commitments are consistent with each other
                under the public specification.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  Inside the circuit
                </p>
                <ul className="mt-3 space-y-2 text-primary list-disc pl-5">
                  <li>Match the function selector against a known intent.</li>
                  <li>Decode typed parameters from calldata.</li>
                  <li>Evaluate the display template required by the spec.</li>
                  <li>
                    Commit to the calldata and to the output claim with
                    Poseidon.
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  On the verifier side
                </p>
                <ul className="mt-3 space-y-2 text-primary list-disc pl-5">
                  <li>Check the proof against the public commitments.</li>
                  <li>
                    Check that the circuit verification key matches the hash
                    committed in ENS.
                  </li>
                  <li>
                    On hardware, verify both the proof and the storage proof
                    for the ENS verification-key commitment before trusting the
                    host&apos;s display claim.
                  </li>
                </ul>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted leading-relaxed">
              That is what makes the trust model different in practice. The
              browser is no longer just a translator. It is a prover whose work
              can be checked.
            </p>
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
                , the proof can be checked on a Ledger device, alongside a
                storage proof for the ENS-published verification-key hash,
                which reduces the need to trust the host machine for the final
                display.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Verify it yourself
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The strongest part of the VeryClear story is that the
                prototype is inspectable. The easiest way to understand the
                trust model is to compare the three pieces directly.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-primary">
                <li>
                  Open the{' '}
                  <ExternalLink href="https://explain.md/clear-signing">
                    browser demo
                  </ExternalLink>{' '}
                  and inspect the step-by-step pipeline from spec lookup to
                  proof verification.
                </li>
                <li>
                  Open the{' '}
                  <ExternalLink href="https://explain.md/clear-signing-hw">
                    hardware demo
                  </ExternalLink>{' '}
                  to see the same display claim checked on a Ledger device.
                </li>
                <li>
                  Read the{' '}
                  <ExternalLink href="https://github.com/lfglabs-dev/explain.md/blob/main/README.md">
                    prototype README
                  </ExternalLink>{' '}
                  for the concrete trust chain: ENS registry, verification-key
                  hash commitment, and storage-proof verification on hardware.
                </li>
              </ol>
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
                More precisely, the proof certifies that the calldata evaluates
                to a specific display template and a specific set of formatted
                values under the public spec. That is a better fit for
                constrained devices, because the hardware wallet can verify the
                proof and render the final human-readable message locally.
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
            <div className="rounded-lg border border-gray-200 bg-[#f8f8f8] px-6 py-6">
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                If you are building in this area
              </p>
              <div className="mt-4 space-y-4 leading-relaxed">
                <p>
                  VeryClear is most relevant for three groups: wallet teams
                  that want a stronger clear-signing story, protocol teams that
                  want their transaction semantics published as auditable
                  specifications, and hardware-wallet teams that want the final
                  display claim checked on-device instead of trusted from the
                  host.
                </p>
                <p>
                  If that describes your stack, the useful next step is not a
                  generic integration discussion. It is to pick one concrete
                  transaction family, write the smallest spec that captures it,
                  and decide what the device should actually verify before the
                  user signs.
                </p>
                <p>
                  We are interested in collaborating on that path. Reach us at{' '}
                  <a
                    href="mailto:ben@lfglabs.dev"
                    className="underline underline-offset-3 hover:text-heading transition-colors"
                  >
                    ben@lfglabs.dev
                  </a>{' '}
                  or start by inspecting the demos and implementation links
                  below.
                </p>
              </div>
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
                <Link
                  href="/projects/veryclear"
                  className="underline underline-offset-3 hover:text-heading transition-colors"
                >
                  VeryClear project page
                </Link>
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
                <ExternalLink href="https://github.com/lfglabs-dev/explain.md/blob/main/README.md">
                  Prototype architecture README
                </ExternalLink>
              </p>
              <p>
                <ExternalLink href="https://github.com/lfglabs-dev/verity/pull/1677/files">
                  Provable Intent DSL implementation diff
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
              <p>
                <ExternalLink href="https://zknox.eth.limo/posts/2026/03/13/zk_clear_signing_160326.html">
                  ZKNOX write-up on hardware-verified clear signing
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

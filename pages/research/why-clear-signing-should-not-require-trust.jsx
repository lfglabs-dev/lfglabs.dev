import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import CodeBlock from '../../components/research/CodeBlock'
import Disclosure from '../../components/research/Disclosure'
import ExternalLink from '../../components/research/ExternalLink'
import HighlightedDSL from '../../components/research/HighlightedDSL'
import { research } from '../../data/research'

export default function WhyClearSigningShouldNotRequireTrustPage() {
  const canonicalUrl =
    'https://lfglabs.dev/research/why-clear-signing-should-not-require-trust'
  const publishedDate = '2026-04-07'
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Formalizing Transaction Interpretation',
    description:
      'Developer-authored display specs, compiled to JSON and ZK circuits.',
    image: ['https://lfglabs.dev/images/veryclear-thumb.webp'],
    datePublished: `${publishedDate}T00:00:00Z`,
    dateModified: `${publishedDate}T00:00:00Z`,
    author: {
      '@type': 'Organization',
      name: 'LFG Labs',
      url: 'https://lfglabs.dev'
    },
    publisher: {
      '@type': 'Organization',
      name: 'LFG Labs',
      logo: {
        '@type': 'ImageObject',
        url: 'https://lfglabs.dev/images/lfg_logo.webp'
      }
    },
    mainEntityOfPage: canonicalUrl
  }
  const otherResearch = research.filter(
    (r) => r.slug !== 'why-clear-signing-should-not-require-trust'
  )

  return (
    <>
      <Head>
        <title>
          Formalizing Transaction Interpretation | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Developer-authored display specs, compiled to JSON and ZK circuits."
        />
        <meta
          property="og:title"
          content="Formalizing Transaction Interpretation"
        />
        <meta
          property="og:description"
          content="Developer-authored display specs, compiled to JSON and ZK circuits."
        />
        <meta
          property="og:type"
          content="article"
        />
        <meta
          property="article:published_time"
          content={`${publishedDate}T00:00:00Z`}
        />
        <meta
          property="article:author"
          content="LFG Labs"
        />
        <meta
          property="og:url"
          content={canonicalUrl}
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
          content="Formalizing Transaction Interpretation"
        />
        <meta
          name="twitter:description"
          content="Developer-authored display specs, compiled to JSON and ZK circuits."
        />
        <meta
          name="twitter:image"
          content="https://lfglabs.dev/images/veryclear-thumb.webp"
        />
        <link
          rel="canonical"
          href={canonicalUrl}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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

          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
              Formalizing Transaction Interpretation
            </h1>
            <p className="mt-3 text-muted text-base">
              Developer-authored display specs, compiled to JSON and ZK
              circuits.
            </p>
          </header>

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
              VeryClear won 1st place in Ledger&apos;s &ldquo;Clear Signing,
              Integrations &amp; Apps&rdquo; category at ETHGlobal Cannes 2026.
              We built it in under 36 hours with{' '}
              <ExternalLink href="https://zknox.com">ZKNOX</ExternalLink>.
            </p>
          </section>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              When you sign an Ethereum transaction, your wallet shows you raw
              calldata, a hex blob that means nothing to a human. Clear signing
              solves this by translating calldata into a sentence
              like &ldquo;Approve Uniswap to spend unlimited USDC.&rdquo;
            </p>
            <p>
              But who guarantees the translation is correct? A buggy or
              malicious translator could show a friendly sentence while the
              underlying transaction does something entirely different. You
              have replaced trusting calldata with trusting a translator.
            </p>
            <p>
              VeryClear removes that trust. Instead of asking whether the
              frontend probably interpreted the calldata correctly, we ask
              whether the displayed sentence can be derived from a public
              specification and proved from the calldata itself.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
              Specifications as code
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                The standard approach to clear signing today
                is{' '}
                <ExternalLink href="https://eips.ethereum.org/EIPS/eip-7730">
                  ERC-7730
                </ExternalLink>
                : a JSON file that maps selectors to display templates. It
                works, but the descriptions are static. They cannot branch on
                parameter values, compute derived fields, or resolve external
                labels. A single JSON entry cannot distinguish an unlimited
                approval from a bounded one.
              </p>
              <p>
                VeryClear replaces that static mapping with a small program
                written in the Verity DSL, an extension of the Lean 4
                framework we built for formal verification of smart contracts.
                A Verity spec is scriptable: it can pattern-match on decoded
                arguments, format token amounts with the right number of
                decimals, and select different human-readable sentences
                depending on runtime values.
              </p>
              <p>
                Because the spec is code, it can live in the same repository
                as the contract itself. The developer who writes the contract
                is the person best positioned to describe what each call means.
                Instead of hoping that a third-party registry eventually adds
                a JSON entry for your function, you ship the display spec
                alongside the implementation.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-sm font-sans uppercase tracking-[0.14em] text-muted">
                Example: the full USDC display spec
              </p>
              <HighlightedDSL source={`import Verity.Intent.DSL

namespace Contracts.USDC
open Verity.Intent.DSL

private def maxUint256 : Int := (2 ^ 256 : Nat) - 1

intent_spec "USDC" where
  const decimals := 6

  intent transfer(to : address, amount : uint256) where
    when amount == maxUint256 =>
      emit "Send all USDC to {to}"
    otherwise =>
      emit "Send {amount:fixed decimals} USDC to {to}"

  intent approve(spender : address, amount : uint256) where
    when amount == maxUint256 =>
      emit "Approve {spender} to spend unlimited USDC"
    otherwise =>
      emit "Approve {spender} to spend {amount:fixed decimals} USDC"

  intent transferFrom(from : address, to : address, amount : uint256) where
    when amount == maxUint256 =>
      emit "Transfer all USDC from {from} to {to}"
    otherwise =>
      emit "Transfer {amount:fixed decimals} USDC from {from} to {to}"

end Contracts.USDC`} />
              <p className="text-sm text-muted leading-relaxed">
                This is the entire display specification for USDC. It reads
                like documentation: for each function, list the cases and what
                the wallet should say. The compiler turns it into both an
                ERC-7730-compatible JSON descriptor and a ZK circuit that
                proves any wallet follows it exactly.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  ERC-7730 (static JSON)
                </p>
                <ul className="mt-3 space-y-1.5 list-disc pl-4">
                  <li>One template per selector</li>
                  <li>Cannot branch on parameter values</li>
                  <li>Written by a third-party registry</li>
                  <li>No link to the contract source</li>
                </ul>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  Verity DSL (scriptable spec)
                </p>
                <ul className="mt-3 space-y-1.5 list-disc pl-4">
                  <li>Pattern-matches on decoded arguments</li>
                  <li>Formats amounts, resolves labels</li>
                  <li>Written by the contract developer</li>
                  <li>Compiles to JSON + ZK circuit</li>
                </ul>
              </div>
            </div>
          </section>


          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
              One transaction, end to end
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

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
              <p className="text-sm font-sans uppercase tracking-[0.14em] text-muted">
                The raw input
              </p>
              <CodeBlock>{`0x095ea7b3...
selector: approve(address,uint256)
spender: 0x7a250d5630b4cf539739df2c5dacab4c659f2488
amount:  0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff`}</CodeBlock>
              <p className="text-sm text-muted leading-relaxed">
                A normal wallet pipeline decodes this and asks the user to
                trust the result. VeryClear treats the result as a claim that
                must be justified from a public spec.
              </p>
            </div>

            <p className="mt-8 text-sm text-muted leading-relaxed">
              The USDC spec shown above handles this case. The{' '}
              <code className="font-mono text-[13px]">approve</code> intent
              checks whether the amount
              equals <code className="font-mono text-[13px]">maxUint256</code>,
              picks the unlimited template, and fills in the spender. The
              pipeline then runs in four steps:
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4 text-sm leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  1. Decode
                </p>
                <p className="mt-3">
                  Parse the selector and typed arguments from calldata.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  2. Evaluate
                </p>
                <p className="mt-3">
                  Run the public intent rules and select the unlimited-approval
                  template.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  3. Commit
                </p>
                <p className="mt-3">
                  Bind both the calldata and the structured output claim inside
                  the circuit.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted">
                  4. Verify
                </p>
                <p className="mt-3">
                  Check on the browser or hardware wallet that the displayed
                  claim is the one the spec permits.
                </p>
              </div>
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
              <p className="text-sm text-muted leading-relaxed">
                The browser prototype and the hardware flow are both public, so
                a reader can inspect the same example in the{' '}
                <ExternalLink href="https://explain.md/clear-signing">
                  browser demo
                </ExternalLink>{' '}
                and the{' '}
                <ExternalLink href="https://explain.md/clear-signing-hw">
                  hardware demo
                </ExternalLink>
                .
              </p>
            </div>
          </section>


          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
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
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
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
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
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

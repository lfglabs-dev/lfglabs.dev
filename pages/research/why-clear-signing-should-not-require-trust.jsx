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
      'What if we formalized natural language interpretation?',
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
          content="What if we formalized natural language interpretation?"
        />
        <meta
          property="og:title"
          content="Formalizing Transaction Interpretation"
        />
        <meta
          property="og:description"
          content="What if we formalized natural language interpretation?"
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
          content="What if we formalized natural language interpretation?"
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
              What if we formalized natural language interpretation?
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
              For years, signing an Ethereum transaction meant staring at raw
              calldata, a hex blob that means nothing to a human. Clear signing
              changed that by translating calldata into sentences
              like &ldquo;Approve Uniswap to spend unlimited USDC.&rdquo;
            </p>
            <p>
              The{' '}
              <ExternalLink href="https://eips.ethereum.org/EIPS/eip-7730">
                ERC-7730
              </ExternalLink>{' '}
              standard has been a major step forward, and adoption is growing
              fast. But it has two practical limitations. First, most ERC-7730
              descriptors are not written by the contract developers
              themselves. They are contributed by third parties to the Ledger
              repository, which means the people closest to the code are not
              the ones describing what it does. Second, when using a hardware
              wallet like a Ledger, the device fetches the descriptor from
              Ledger&apos;s backend. The user has to trust that backend to
              serve the correct ERC-7730 file for the contract they are
              interacting with.
            </p>
            <p>
              In both cases, the user is trusting a translator. VeryClear asks
              a different question: can the sentence on screen be proved
              correct from the calldata and a public specification?
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
              Specifications as code
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                VeryClear replaces static JSON descriptors with a small
                program written in the Verity DSL, an extension of the Lean 4
                framework we built for formal verification of smart contracts.
                A Verity spec can pattern-match on decoded arguments, format
                token amounts with the right number of decimals, and select
                different sentences depending on runtime values. A single
                ERC-7730 entry cannot distinguish an unlimited approval from a
                bounded one. A Verity spec can.
              </p>
              <p>
                Because the spec is code, it lives in the same repository as
                the contract itself. The developer ships the display spec
                alongside the implementation. The compiler turns it into both
                an ERC-7730-compatible JSON descriptor and a ZK circuit that
                proves any wallet follows it exactly.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="font-serif text-lg font-semibold tracking-tight text-heading">
                Example: the full USDC display spec
              </h3>
              <HighlightedDSL source={`intent_spec "USDC" where
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
`} />
              <p className="text-sm text-muted leading-relaxed">
                The entire display specification for USDC. For each function,
                list the cases and what the wallet should say.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
              <div className="rounded-lg border border-gray-200 bg-white p-5">
                <p className="text-base font-semibold text-heading">
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
                <p className="text-base font-semibold text-heading">
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
                <code className="font-mono text-[13px]">approve</code> call
                on USDC. Here is what the wallet receives, and how VeryClear
                turns it into a provable claim.
              </p>
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-5">
              <p className="font-serif text-sm font-semibold tracking-tight text-heading">
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
                <p className="font-serif text-sm font-semibold tracking-tight text-heading">
                  1. Decode
                </p>
                <p className="mt-3">
                  Parse the selector and typed arguments from calldata.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-serif text-sm font-semibold tracking-tight text-heading">
                  2. Evaluate
                </p>
                <p className="mt-3">
                  Run the public intent rules and select the unlimited-approval
                  template.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-serif text-sm font-semibold tracking-tight text-heading">
                  3. Commit
                </p>
                <p className="mt-3">
                  Bind both the calldata and the structured output claim inside
                  the circuit.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <p className="font-serif text-sm font-semibold tracking-tight text-heading">
                  4. Verify
                </p>
                <p className="mt-3">
                  Check on the browser or hardware wallet that the displayed
                  claim is the one the spec permits.
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="font-serif text-sm font-semibold tracking-tight text-heading">
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
                The proof certifies that this structured claim is the correct
                result of evaluating the public spec on the calldata. But the
                claim is still a template with typed holes. To show a
                human-readable sentence, the wallet needs to fill those holes
                with the actual display strings from the spec.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
              Where the spec text comes from
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Once the proof confirms which template matches, the wallet
                still needs the human-readable text that fills the template.
                That text lives in the spec itself, so the question becomes:
                how does the wallet get a spec it can trust?
              </p>
              <p>
                In our proof of concept, we stored specs directly in an ENS
                registry we deployed on chain. That works, but it means users
                trust whoever published the registry entry. A better model
                would let users review and approve a spec the first time they
                interact with a new contract. The wallet would show the spec,
                the user would sign their approval, and that approval would
                remain valid for a fixed period, say one year. After that, the
                wallet prompts for re-approval, which also gives spec authors
                a natural window to publish updates.
              </p>
            </div>
          </section>


          <section className="mb-16">
            <h2 className="font-serif text-xl font-semibold tracking-tight mb-4">
              Verify it yourself
            </h2>
            <div className="leading-relaxed space-y-4">
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

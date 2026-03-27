import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import Guarantee from '../../components/research/Guarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import { research } from '../../data/research'

function Hypothesis({ name, constraint, source, children, border = true }) {
  return (
    <li
      className={`list-none ${border ? 'border-b border-gray-200/50' : ''}`}
    >
      <details className="group/hyp">
        <summary className="px-5 py-3 cursor-pointer select-none list-none flex items-center gap-3 [&::-webkit-details-marker]:hidden">
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-muted/50 transition-transform group-open/hyp:rotate-90 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
          <code className="font-mono text-[12px] font-medium">{name}</code>
          <span className="text-muted text-[13px]">{constraint}</span>
        </summary>
        <div className="px-5 pb-3 pl-12 text-[13px] text-muted leading-relaxed">
          <p className="mb-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted/60">
              {source}
            </span>
          </p>
          <p>{children}</p>
        </div>
      </details>
    </li>
  )
}

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
./scripts/run_default_agent.sh lido/vaulthub_locked/locked_funds_solvency`

export default function LidoVaultSolvencyPage() {
  const otherResearch = research.filter(
    (r) => r.slug !== 'lido-vault-solvency'
  )

  return (
    <>
      <Head>
        <title>
          Lido V3 Vault Solvency Guarantee | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="A formally verified solvency invariant of Lido V3 StakingVaults, proven using Verity and Lean 4."
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.43/dist/katex.min.css"
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
              Lido V3 Vault Solvency Guarantee
            </h1>
          </header>

          {/* The Guarantee */}
          <section className="mb-16">
            <Guarantee />
            <p className="text-muted text-[15px] leading-relaxed">
              Lido V3 introduced StakingVaults, which allow stETH to be minted
              against ETH held in isolated vaults. The VaultHub contract
              enforces overcollateralization: part of the vault&apos;s value
              must remain locked, covering the outstanding stETH liability plus
              a reserve buffer.
            </p>
            <p className="mt-2 text-muted text-[15px]">
              <ExternalLink href="https://docs.lido.fi/run-on-lido/stvaults/tech-documentation/tech-design/">
                View technical design
              </ExternalLink>
            </p>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              VaultHub only allows minting when{' '}
              <code className="font-mono text-[13px]">
                totalValue ≥ _locked()
              </code>
              . If{' '}
              <code className="font-mono text-[13px]">_locked()</code>{' '}
              didn&apos;t satisfy this inequality (due to an overflow, rounding
              error, or edge case), a vault could pass that check while locking
              less ETH than the stETH minted against it.
            </p>
            <Disclosure title="What this invariant covers">
              <p className="mb-3 text-muted">
                This proof covers the <em>formula</em>: for any inputs,{' '}
                <code className="font-mono text-[12px]">_locked()</code> never
                underestimates how much ETH should be locked.
              </p>
              <p className="text-muted">
                It does not cover whether the vault <em>actually holds</em>{' '}
                that much ETH. That is enforced at runtime: VaultHub checks{' '}
                <code className="font-mono text-[12px]">
                  totalValue ≥ locked
                </code>{' '}
                at mint time. If a validator is slashed between oracle reports,
                the vault may temporarily be under-collateralized. The contract
                handles this through forced validator exits (EIP-7002) and
                permissionless{' '}
                <code className="font-mono text-[12px]">
                  forceRebalance()
                </code>
                .
              </p>
            </Disclosure>
          </section>

          {/* How this was proven */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              The{' '}
              <code className="font-mono text-[13px]">_locked()</code>{' '}
              function uses non-linear{' '}
              <code className="font-mono text-[13px]">uint256</code>{' '}
              arithmetic (multiplications, ceiling division,{' '}
              <code className="font-mono text-[13px]">max()</code>) that
              standard verification tools cannot reason about. This property
              was flagged as unproven (finding F-01) in Certora&apos;s formal
              verification report.
            </p>
            <p className="leading-relaxed mb-4">
              The contract logic was modeled in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Lido/VaulthubLocked/Contract.lean">
                Verity
              </ExternalLink>
              , a framework for expressing smart contract logic in a way that
              allows mathematical proofs. The theorem was given to AI agents as
              a benchmark task. A proof was generated by GPT 5.4 for ~$45 (3M
              tokens) and is provided as{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Lido/VaulthubLocked/Proofs.lean">
                reference
              </ExternalLink>
              .
            </p>
            <p className="leading-relaxed mb-4">
              The proof is checked by Lean 4&apos;s kernel, a small program
              that accepts or rejects proofs deterministically. If the proof
              were wrong, it would not compile.
            </p>
            <Disclosure title="Verify it yourself" className="mb-4">
              <CodeBlock>{VERIFY_COMMAND}</CodeBlock>
              <p className="mt-3 text-muted">
                If the build succeeds, the proof is correct.{' '}
                <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                  Source repository
                </ExternalLink>
              </p>
            </Disclosure>
            <p className="text-muted text-[14px] leading-relaxed">
              Note: the current proof is neither optimized for performance nor
              elegance. It may be replaced by a cleaner version as the
              benchmark is run with more models.
            </p>
          </section>

          {/* Hypotheses */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Hypotheses
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proof uses zero axioms. The theorem requires these
              hypotheses, which encode assumptions about valid protocol states:
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hMaxLS"
                constraint="maxLiabilityShares ≥ liabilityShares"
                source="Certora P-VH-04, verified"
              >
                Core invariant maintained by VaultHub&apos;s minting and
                reporting logic.{' '}
                <code className="font-mono text-[12px]">_locked()</code> is
                computed from{' '}
                <code className="font-mono text-[12px]">
                  maxLiabilityShares
                </code>{' '}
                (worst-case), not current shares. Without this, the locked
                amount wouldn&apos;t cover the real liability.
              </Hypothesis>
              <Hypothesis
                name="hRR_pos"
                constraint="reserveRatioBP > 0"
                source="Certora P-VH-03, verified"
              >
                Enforced by{' '}
                <code className="font-mono text-[12px]">connectVault()</code>.
                A zero reserve ratio would make the overcollateralization
                trivial but the proof structure requires it for the algebra to
                work out.
              </Hypothesis>
              <Hypothesis
                name="hRR_lt"
                constraint="reserveRatioBP < 10000"
                source="Certora P-VH-03, verified"
              >
                Critical. If{' '}
                <code className="font-mono text-[12px]">
                  reserveRatioBP ≥ 10000
                </code>
                , the subtraction{' '}
                <code className="font-mono text-[12px]">BP − RR</code>{' '}
                underflows in{' '}
                <code className="font-mono text-[12px]">uint256</code>,
                producing a nonsensical denominator. On-chain, Solidity 0.8+
                would revert; in the Lean model, it wraps.
              </Hypothesis>
              <Hypothesis
                name="hTS"
                constraint="totalShares > 0"
                source="Lido base assumption"
              >
                Required for share-to-ETH conversion. If{' '}
                <code className="font-mono text-[12px]">totalShares = 0</code>,{' '}
                <code className="font-mono text-[12px]">ceilDiv</code> divides
                by zero and underestimates the liability. In practice, always
                true after Lido&apos;s bootstrap deposit.
              </Hypothesis>
              <Hypothesis
                name="hTPE"
                constraint="totalPooledEther > 0"
                source="Lido base assumption"
                border={false}
              >
                Unused by the proof (prefixed with{' '}
                <code className="font-mono text-[12px]">_</code> in Lean).
                Included for specification completeness: a pool with shares but
                no ether would be nonsensical.
              </Hypothesis>
            </ul>
            <p className="mt-2 text-muted text-[13px] leading-relaxed">
              Five additional{' '}
              <code className="font-mono text-[12px]">hNoOverflow</code>{' '}
              hypotheses guard that intermediate{' '}
              <code className="font-mono text-[12px]">uint256</code> products
              stay below 2<sup>256</sup>. With Lido&apos;s total staked ETH at
              ~30M ETH (~2<sup>85</sup> wei), products reach ~2<sup>170</sup>,
              far below the 2<sup>256</sup> limit.
            </p>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Lido/VaulthubLocked/Specs.lean#L30-L52">
                View in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lidofinance/audits/blob/main/Certora%20Lido%20V3%20Formal%20Verification%20Report%20-%2012-2025.pdf">
                Certora report
              </ExternalLink>
            </p>
          </section>

          {/* Learn more */}
          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
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

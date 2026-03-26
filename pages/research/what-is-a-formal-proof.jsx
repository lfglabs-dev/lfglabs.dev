import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import { research } from '../../data/research'

export default function WhatIsAFormalProofPage() {
  const otherResearch = research.filter(
    (r) => r.slug !== 'what-is-a-formal-proof'
  )

  return (
    <>
      <Head>
        <title>What is a formal proof? | Research | LFG Labs</title>
        <meta
          name="description"
          content="A short explanation of formal verification for smart contracts, for non-specialists."
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
              What is a formal proof?
            </h1>
            <p className="mt-3 text-muted text-base">
              A short explanation for non-specialists
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              A formal proof is a program that a computer can check. Either the
              proof is accepted, or it is rejected. There is no middle ground.
            </p>
            <p>
              A test checks that code works for a few examples. A formal proof
              checks that it works for <em>every possible input</em>.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              A concrete example
            </h2>
            <p className="leading-relaxed mb-6">
              Consider a simplified ERC-20 token. The contract stores balances
              and a total supply. Here is the transfer function written in{' '}
              <a
                href="https://github.com/Th0rgal/verity"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-3 hover:text-heading transition-colors"
              >
                Verity
              </a>
              , a framework for formally verified smart contracts:
            </p>

            {/* Contract definition */}
            <div className="bg-[#f8f8f8] rounded-lg px-6 py-5 overflow-x-auto text-[13.5px] leading-[1.7] font-mono">
              <div className="text-[#9ca3af]">-- Contract storage</div>
              <div>
                <span className="text-[#8b5cf6]">verity_contract</span>{' '}
                <span className="text-[#5eadb5]">ERC20</span>{' '}
                <span className="text-[#8b5cf6]">where</span>
              </div>
              <div>
                {'  '}
                <span className="text-[#8b5cf6]">storage</span>
              </div>
              <div>
                {'    '}
                <span className="text-[#575279]">totalSupplySlot</span>{' '}
                <span className="text-[#6b7280]">:</span>{' '}
                <span className="text-[#d4a054]">Uint256</span>{' '}
                <span className="text-[#6b7280]">:=</span>{' '}
                <span className="text-[#575279]">slot 1</span>
              </div>
              <div>
                {'    '}
                <span className="text-[#575279]">balancesSlot</span>{' '}
                <span className="text-[#6b7280]">:</span>{' '}
                <span className="text-[#d4a054]">Address → Uint256</span>{' '}
                <span className="text-[#6b7280]">:=</span>{' '}
                <span className="text-[#575279]">slot 2</span>
              </div>
              <div className="mt-3 text-[#9ca3af]">
                -- Transfer tokens from sender to recipient
              </div>
              <div>
                {'  '}
                <span className="text-[#8b5cf6]">function</span>{' '}
                <span className="text-[#5eadb5]">transfer</span>{' '}
                <span className="text-[#575279]">
                  (to : Address, amount : Uint256) : Unit
                </span>{' '}
                <span className="text-[#6b7280]">:=</span>{' '}
                <span className="text-[#8b5cf6]">do</span>
              </div>
              <div>
                {'    '}
                <span className="text-[#8b5cf6]">let</span>{' '}
                <span className="text-[#575279]">sender ← msgSender</span>
              </div>
              <div>
                {'    '}
                <span className="text-[#8b5cf6]">let</span>{' '}
                <span className="text-[#575279]">
                  senderBalance ← getMapping balancesSlot sender
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#8b5cf6]">require</span>{' '}
                <span className="text-[#575279]">
                  (senderBalance {'>'}= amount)
                </span>{' '}
                <span className="text-[#6ba3b5]">
                  &quot;Insufficient balance&quot;
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#575279]">
                  setMapping balancesSlot sender
                </span>{' '}
                <span className="text-[#575279]">
                  (sub senderBalance amount)
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#8b5cf6]">let</span>{' '}
                <span className="text-[#575279]">
                  recipientBalance ← getMapping balancesSlot to
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#575279]">
                  setMapping balancesSlot to
                </span>{' '}
                <span className="text-[#575279]">
                  (add recipientBalance amount)
                </span>
              </div>
            </div>

            <p className="leading-relaxed mt-6 mb-6 text-muted text-[15px]">
              This reads like pseudocode, but it compiles to real EVM bytecode.
              Now we state a property we want to guarantee:
            </p>

            <p className="leading-relaxed mb-3 font-medium">
              &ldquo;Calling transfer never changes the total supply.&rdquo;
            </p>

            {/* Invariant definition */}
            <div className="bg-[#f8f8f8] rounded-lg px-6 py-5 overflow-x-auto text-[13.5px] leading-[1.7] font-mono">
              <div className="text-[#9ca3af]">
                -- The sum of all balances equals total supply
              </div>
              <div>
                <span className="text-[#8b5cf6]">def</span>{' '}
                <span className="text-[#5eadb5]">
                  supply_matches_balances
                </span>{' '}
                <span className="text-[#575279]">(s : ContractState)</span>{' '}
                <span className="text-[#6b7280]">:</span>{' '}
                <span className="text-[#d4a054]">Prop</span>{' '}
                <span className="text-[#6b7280]">:=</span>
              </div>
              <div>
                {'  '}
                <span className="text-[#575279]">
                  totalBalance s = s.storage 1
                </span>
              </div>
              <div className="mt-3 text-[#9ca3af]">
                -- Transfer preserves the sum of all balances
              </div>
              <div>
                <span className="text-[#8b5cf6]">def</span>{' '}
                <span className="text-[#5eadb5]">
                  transfer_preserves_total
                </span>{' '}
                <span className="text-[#575279]">
                  (s s&apos; : ContractState)
                </span>{' '}
                <span className="text-[#6b7280]">:</span>{' '}
                <span className="text-[#d4a054]">Prop</span>{' '}
                <span className="text-[#6b7280]">:=</span>
              </div>
              <div>
                {'  '}
                <span className="text-[#575279]">
                  totalBalance s&apos; = totalBalance s
                </span>
              </div>
            </div>

            <p className="leading-relaxed mt-6 mb-6 text-muted text-[15px]">
              And we prove it:
            </p>

            {/* Proof */}
            <div className="bg-[#f8f8f8] rounded-lg px-6 py-5 overflow-x-auto text-[13.5px] leading-[1.7] font-mono">
              <div>
                <span className="text-[#8b5cf6]">theorem</span>{' '}
                <span className="text-[#6ba3b5]">
                  transfer_preserves_totalSupply
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#575279]">
                  (s : ContractState) (to : Address) (amount : Uint256)
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#575279]">
                  (h_balance : s.storageMap 2 s.sender ≥ amount)
                </span>
              </div>
              <div>
                {'    '}
                <span className="text-[#6b7280]">:</span>{' '}
                <span className="text-[#d4a054]">
                  transfer_preserves_total s (transfer to amount).runState s
                </span>{' '}
                <span className="text-[#6b7280]">:=</span>{' '}
                <span className="text-[#8b5cf6]">by</span>
              </div>
              <div className="mt-1 text-[#9ca3af]">
                {'  '}
                <span>-- transfer only touches balances (slot 2)</span>
              </div>
              <div>
                {'  '}
                <span className="text-[#8b5cf6]">have</span>{' '}
                <span className="text-[#575279]">
                  h_slot : transfer does not write to slot 1
                </span>
              </div>
              <div className="text-[#9ca3af]">
                {'  '}
                <span>
                  -- subtracting from sender and adding to recipient cancels out
                </span>
              </div>
              <div>
                {'  '}
                <span className="text-[#8b5cf6]">have</span>{' '}
                <span className="text-[#575279]">
                  h_sum : sub a x + add b x = a + b
                </span>
              </div>
              <div className="text-[#9ca3af]">
                {'  '}
                <span>
                  -- therefore total balance is unchanged, and so is total
                  supply
                </span>
              </div>
              <div>
                {'  '}
                <span className="text-[#8b5cf6]">exact</span>{' '}
                <span className="text-[#575279]">eq.trans h_sum h_slot</span>
              </div>
            </div>

            <p className="leading-relaxed mt-6 text-muted text-[15px]">
              The <span className="font-mono text-[13px]">theorem</span>{' '}
              keyword tells Lean: &ldquo;I claim this is true, and here is my
              proof.&rdquo; The{' '}
              <span className="font-mono text-[13px]">by</span> block contains
              the actual proof steps. If any step has a gap or error, Lean
              refuses to compile.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How does the checking work?
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Lean has a small, well-audited <em>kernel</em> that accepts or
                rejects proofs. Every proof must pass through this kernel. It
                does not care how the proof was found: by a human, an AI,
                or an automated solver. What matters is that each step is valid.
              </p>
              <p className="font-medium">
                If the proof compiles, it is correct. If it doesn&apos;t, it
                isn&apos;t.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Tests vs. formal proofs
            </h2>
            <div className="border border-gray-200 rounded px-6 py-5 leading-relaxed">
              <p className="mb-4">
                <strong className="font-medium">A test</strong> says: &ldquo;I
                transferred 50 tokens from Alice to Bob and the total supply
                didn&apos;t change.&rdquo;
              </p>
              <p>
                <strong className="font-medium">A formal proof</strong> says:
                &ldquo;For <em>every</em> sender, <em>every</em> recipient, and{' '}
                <em>every</em> amount, transfer preserves total supply.&rdquo;
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why does this matter for smart contracts?
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Smart contracts handle real money. A bug in token arithmetic can
                drain millions. Tests catch some bugs, audits catch more, but
                neither can guarantee correctness for all possible states.
              </p>
              <p>
                A formal proof can. It is a mathematical certificate that the
                property holds in every case, not just the ones the auditor
                thought to check.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-6">
              See it in practice
            </h2>
            <p className="leading-relaxed">
              <Link
                href="/research/lido-vault-solvency"
                className="underline underline-offset-3 hover:text-heading transition-colors"
              >
                Lido V3 Vault Solvency Guarantee
              </Link>
              . A formally verified property of a production smart contract.
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

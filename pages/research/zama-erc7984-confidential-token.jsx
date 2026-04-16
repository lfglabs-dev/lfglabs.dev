import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import ZamaGuarantee from '../../components/research/ZamaGuarantee'
import ConfidentialTransferDiagram from '../../components/research/ConfidentialTransferDiagram'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
lake build Benchmark.Generated.Zama.ERC7984ConfidentialToken.Tasks.TransferConservation`

const UPSTREAM_STANDARD =
  'https://www.zama.org/post/erc-7984-the-confidential-token-standard-explained'

const UPSTREAM_CONTRACTS =
  'https://docs.openzeppelin.com/confidential-contracts/token'

const VERITY_CONTRACT =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Zama/ERC7984ConfidentialToken/Contract.lean'

const PR_22 = 'https://github.com/lfglabs-dev/verity-benchmark/pull/22'

export default function ZamaERC7984Page() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'zama-erc7984-confidential-token'
  )

  return (
    <>
      <Head>
        <title>
          ERC-7984 Confidential Token Invariants | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Formally verified accounting properties of the ERC-7984 Confidential Token Standard (Zama fhEVM + OpenZeppelin), covering transfer conservation, mint/burn correctness, and overflow protection in Verity and Lean 4."
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
              ERC-7984 Confidential Token Invariants
            </h1>
          </header>

          {/* The Guarantee */}
          <section className="mb-16">
            <ZamaGuarantee />
            <p className="text-muted text-[15px] leading-relaxed">
              <ExternalLink href={UPSTREAM_STANDARD}>ERC-7984</ExternalLink> is
              a confidential fungible token standard co-developed by Zama and
              OpenZeppelin for the fhEVM. All balances and transfer amounts are
              encrypted as{' '}
              <code className="font-mono text-[13px]">euint64</code> ciphertext
              handles using Fully Homomorphic Encryption. Users can hold, send,
              and receive tokens without revealing their balances to anyone,
              including validators.
            </p>
            <ConfidentialTransferDiagram className="my-8" />
            <p className="mt-4 text-muted text-[15px] leading-relaxed">
              The main difference from ERC-20: because the contract
              cannot branch on encrypted values, transfers with insufficient
              balance <em>silently transfer zero</em> instead of reverting.{' '}
              <code className="font-mono text-[13px]">FHE.select</code> picks
              the result without revealing which path was taken. Arithmetic wraps
              at 2<sup>64</sup> (not 2<sup>256</sup>), and{' '}
              <code className="font-mono text-[13px]">
                FHESafeMath.tryIncrease
              </code>{' '}
              /{' '}
              <code className="font-mono text-[13px]">tryDecrease</code>{' '}
              detect overflow and underflow without revealing whether they
              occurred.
            </p>
            <p className="mt-4 text-muted text-[15px] leading-relaxed">
              We also proved that a transfer <em>never reverts</em> based on
              balance sufficiency. The only reverts come from plaintext checks
              (zero address, uninitialized balance). An on-chain observer
              cannot learn whether the sender had enough tokens by watching
              whether the transaction succeeded.
            </p>
            <p className="mt-2 text-muted text-[15px]">
              <ExternalLink href={UPSTREAM_CONTRACTS}>
                View OpenZeppelin implementation
              </ExternalLink>
            </p>
          </section>

          {/* Why this matters */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-4">
              In a standard ERC-20, a broken transfer reverts and the user sees
              the error. In ERC-7984, a broken transfer looks identical to a
              successful one from the outside. If the accounting logic had a
              bug, tokens could silently appear or vanish with no on-chain
              signal that anything went wrong.
            </p>
            <p className="leading-relaxed mb-6">
              The confidentiality that protects users also hides accounting
              errors. If a bug caused tokens to silently vanish, there would be
              no on-chain signal. Formal verification closes that gap: if the
              invariants hold for all inputs, the accounting is correct
              regardless of what the ciphertexts contain.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-3 text-muted text-[15px]">
                The proofs cover the core accounting of all four state-mutating
                functions:{' '}
                <code className="font-mono text-[12px]">transfer</code>,{' '}
                <code className="font-mono text-[12px]">transferFrom</code>,{' '}
                <code className="font-mono text-[12px]">mint</code>, and{' '}
                <code className="font-mono text-[12px]">burn</code>. Eight
                theorems verify: balance conservation across transfers,
                correct behavior for both sufficient and insufficient balances,
                supply isolation from transfers, mint/burn supply correctness,
                overflow protection, and non-revertability on insufficient
                balance (the contract-level non-leakage guarantee).
              </p>
              <p className="text-muted">
                Out of scope: the FHE encryption layer (handled by
                Zama&apos;s TFHE library), the ACL system (
                <code className="font-mono text-[12px]">FHE.allow</code>,
                which controls ciphertext access, not balances),
                cryptographic proof verification (
                <code className="font-mono text-[12px]">fromExternal</code>{' '}
                + <code className="font-mono text-[12px]">inputProof</code>
                ), off-chain gateway decryption, and receiver callbacks (
                <code className="font-mono text-[12px]">AndCall</code>{' '}
                variants). These are separate systems that do not affect
                balance state.
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
              <ExternalLink href={VERITY_CONTRACT}>contract model</ExternalLink>{' '}
              captures the three paths through{' '}
              <code className="font-mono text-[13px]">_update</code>:
              transfer, mint, and burn, using{' '}
              <code className="font-mono text-[13px]">tryIncrease64</code> /{' '}
              <code className="font-mono text-[13px]">tryDecrease64</code>{' '}
              for overflow-safe arithmetic, matching the Solidity exactly. The
              only structural simplification: Verity does not support nested
              mappings, so operator expiry is passed as a function parameter
              instead of read from{' '}
              <code className="font-mono text-[13px]">
                _operators[holder][spender]
              </code>.
            </p>
            <p className="leading-relaxed mb-4">
              Token conservation is straightforward to state: show that{' '}
              <code className="font-mono text-[13px]">
                balances[from] + balances[to]
              </code>{' '}
              is the same before and after, for <em>all</em> inputs. If the
              sender has enough, exactly{' '}
              <code className="font-mono text-[13px]">amount</code> moves. If
              not,{' '}
              <code className="font-mono text-[13px]">select</code> picks
              zero, both balances write back unchanged, and the sum is
              trivially preserved.
            </p>
            <p className="leading-relaxed mb-4">
              Outside the FHE layer, there is a subtler thing to prove. In a
              standard ERC-20, a transfer with insufficient balance reverts.
              That revert is public: an on-chain observer can tell the sender
              was short. ERC-7984 does not revert. We{' '}
              <ExternalLink href={PR_22}>formally proved</ExternalLink> that
              the transfer path never reverts on insufficient balance. The
              privacy guarantee holds for every possible execution, not just
              the cases someone thought to test.
            </p>
            <Disclosure title="Verify it yourself" className="mb-4">
              <CodeBlock>{VERIFY_COMMAND}</CodeBlock>
              <p className="mt-3 text-muted">
                If the build succeeds, the proofs are correct.{' '}
                <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                  Source repository
                </ExternalLink>
              </p>
            </Disclosure>
          </section>

          {/* Proof status */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Proof status
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              All 8 theorems are proven. Every task file is{' '}
              <code className="font-mono text-[12px]">sorry</code>-free.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-medium text-muted">
                      Function
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Conservation
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Sufficient
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Insufficient
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      No revert
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Supply
                    </th>
                    <th className="px-4 py-2 font-medium text-muted text-center">
                      Overflow
                    </th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">transfer</td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">mint</td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5">burn</td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                    <td className="px-4 py-1.5 text-center text-green-600">
                      proven
                    </td>
                    <td className="px-4 py-1.5 text-center text-muted">
                      &mdash;
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-muted text-[13px] leading-relaxed">
              <strong>Conservation</strong>: sender + receiver sum preserved.{' '}
              <strong>Sufficient</strong>: correct amount moves when balance
              covers it. <strong>Insufficient</strong>: no change when balance
              is too low. <strong>No revert</strong>: transfer does not revert
              on insufficient balance. <strong>Supply</strong>: totalSupply
              changes correctly
              (or not at all for transfers). <strong>Overflow</strong>: mint
              detects uint64 overflow and mints nothing.
            </p>
          </section>

          {/* Assumptions */}
          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Assumptions
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proofs use zero axioms. The theorems require these
              hypotheses, which encode constraints about valid{' '}
              <code className="font-mono text-[12px]">euint64</code> state:
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="hAmount64"
                constraint="amount < 2^64"
                source="euint64 range"
              >
                Transfer, mint, and burn amounts are valid{' '}
                <code className="font-mono text-[12px]">euint64</code> values.
                In the real contract, the FHE layer enforces this: ciphertext
                handles always encrypt values in{' '}
                <code className="font-mono text-[12px]">[0, 2^64)</code>.
              </Hypothesis>
              <Hypothesis
                name="hFromBal64"
                constraint="balances[from] < 2^64"
                source="euint64 range"
              >
                Sender balance is a valid{' '}
                <code className="font-mono text-[12px]">euint64</code>. Same
                reasoning: all stored ciphertext handles decrypt to values in
                range.
              </Hypothesis>
              <Hypothesis
                name="hToBal64"
                constraint="balances[to] < 2^64"
                source="euint64 range"
              >
                Receiver balance is a valid{' '}
                <code className="font-mono text-[12px]">euint64</code>.
              </Hypothesis>
              <Hypothesis
                name="hSupply64"
                constraint="totalSupply < 2^64"
                source="euint64 range"
              >
                Total supply is a valid{' '}
                <code className="font-mono text-[12px]">euint64</code>.
                Required by mint and burn proofs.
              </Hypothesis>
              <Hypothesis
                name="hInit"
                constraint="balanceInitialized[from] != 0"
                source="FHE.isInitialized gate"
              >
                The sender&apos;s balance has been initialized. The real
                contract checks{' '}
                <code className="font-mono text-[12px]">
                  FHE.isInitialized(fromBalance)
                </code>{' '}
                and reverts with{' '}
                <code className="font-mono text-[12px]">
                  ERC7984ZeroBalance
                </code>{' '}
                if not. This hypothesis encodes that the transfer is from an
                account that has received tokens before.
              </Hypothesis>
              <Hypothesis
                name="hDistinct"
                constraint="sender != recipient"
                source="Storage model"
              >
                Sender and receiver are different addresses. Required because
                the model reads and writes balance slots independently. A
                self-transfer is a separate (trivial) case.
              </Hypothesis>
              <Hypothesis
                name="hToNoWrap"
                constraint="balances[to] + amount < 2^64"
                source="Conservation proof only"
                border={false}
              >
                Receiver balance does not overflow after adding the transfer
                amount. Only needed for the conservation theorem. In practice,
                this holds because total supply is bounded by{' '}
                <code className="font-mono text-[12px]">2^64</code> and no
                individual balance can exceed supply.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Zama/ERC7984ConfidentialToken/Specs.lean">
                View specs in Lean
              </ExternalLink>
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/blob/main/Benchmark/Cases/Zama/ERC7984ConfidentialToken/Contract.lean">
                View contract model in Lean
              </ExternalLink>
            </p>
          </section>

          {/* Learn more */}
          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
            <p className="leading-relaxed mb-2">
              <ExternalLink href={UPSTREAM_STANDARD}>
                ERC-7984: The Confidential Token Standard Explained
              </ExternalLink>
              {', by Zama.'}
            </p>
            <p className="leading-relaxed mb-2">
              <ExternalLink href={UPSTREAM_CONTRACTS}>
                OpenZeppelin Confidential Contracts
              </ExternalLink>
              {', the upstream implementation.'}
            </p>
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

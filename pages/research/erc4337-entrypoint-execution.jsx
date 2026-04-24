import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import EntryPointGuarantee from '../../components/research/EntryPointGuarantee'
import Disclosure from '../../components/research/Disclosure'
import CodeBlock from '../../components/research/CodeBlock'
import ExternalLink from '../../components/research/ExternalLink'
import Hypothesis from '../../components/research/Hypothesis'
import { getSortedResearch } from '../../lib/getSortedResearch'

const VERIFY_COMMAND = `git clone https://github.com/lfglabs-dev/verity-benchmark
cd verity-benchmark
git checkout feat/erc4337-entrypoint-invariant
lake build Benchmark.Cases.ERC4337.EntryPointInvariant.Compile`

const ENTRYPOINT_SOL =
  'https://github.com/eth-infinitism/account-abstraction/blob/v0.9.0/contracts/core/EntryPoint.sol'

const BENCHMARK_BRANCH =
  'https://github.com/lfglabs-dev/verity-benchmark/blob/feat/erc4337-entrypoint-invariant'

const VERITY_PR = 'https://github.com/lfglabs-dev/verity/pull/1746'

export default function ERC4337EntryPointExecutionPage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'erc4337-entrypoint-execution'
  )

  return (
    <>
      <Head>
        <title>
          ERC-4337 EntryPoint Execution Invariant | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="Formally verified ERC-4337 EntryPoint execution invariants, proving that each UserOperation execution happens exactly once if and only if validation succeeds."
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
              ERC-4337 EntryPoint Execution Invariant
            </h1>
          </header>

          <section className="mb-16">
            <EntryPointGuarantee />
            <p className="text-muted text-[15px] leading-relaxed">
              ERC-4337 adds account abstraction without changing Ethereum
              consensus. Users submit{' '}
              <code className="font-mono text-[13px]">UserOperation</code>s,
              bundlers collect them, and a singleton{' '}
              <ExternalLink href={ENTRYPOINT_SOL}>EntryPoint</ExternalLink>{' '}
              contract validates and executes the bundle onchain.
            </p>
            <p className="text-muted text-[15px] leading-relaxed mt-4">
              EntryPoint is the trusted router in that flow. For every
              operation, it may deploy the account, call account validation,
              call paymaster validation, account for gas, execute the account
              call, run post-operation accounting, and compensate the bundler.
              The security-critical question is simple to say and hard to
              prove: did the exact operation that passed validation get
              executed exactly once?
            </p>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              ERC-4337 accounts and paymasters are arbitrary contracts. A proof
              cannot assume that they are honest, simple, or even cooperative.
              The invariant has to hold across reverts, external calls,
              callbacks, gas-sensitive branches, and malicious return data.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-4 leading-relaxed text-muted">
                The proof tracks validation and execution as trace events for
                each operation index in a call to{' '}
                <code className="font-mono text-[12px]">handleOps</code>.
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <strong>Safety</strong>: EntryPoint never executes operation{' '}
                  <code className="font-mono text-[12px]">i</code> unless
                  account validation, paymaster validation when present, nonce
                  checks, and prefund checks for that same operation succeeded.
                </li>
                <li>
                  <strong>Exactness</strong>: a successfully validated
                  operation produces exactly one account execution attempt, not
                  zero and not two.
                </li>
                <li>
                  <strong>Ordering</strong>: execution for operation{' '}
                  <code className="font-mono text-[12px]">i</code> occurs only
                  after validation for operation{' '}
                  <code className="font-mono text-[12px]">i</code>.
                </li>
                <li>
                  <strong>Isolation</strong>: validation for one operation does
                  not authorize execution for a different operation.
                </li>
              </ul>
              <p className="text-muted">
                This is the main invariant engineers usually mean when they say
                EntryPoint should call the account with{' '}
                <code className="font-mono text-[12px]">userOp.callData</code>{' '}
                if and only if{' '}
                <code className="font-mono text-[12px]">validateUserOp</code>{' '}
                passed for that same{' '}
                <code className="font-mono text-[12px]">UserOperation</code>.
              </p>
            </Disclosure>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              The Verity model follows the Solidity{' '}
              <ExternalLink href={ENTRYPOINT_SOL}>EntryPoint.sol</ExternalLink>{' '}
              structure function by function. The model keeps the same major
              phases as the production implementation: the validation pass over
              the bundle, the transition to execution, the per-operation
              execution wrapper, and the post-operation accounting path.
            </p>
            <ul className="mb-6 text-[15px] leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>Validation phase</strong>: models account creation,
                account validation, paymaster validation, signature/time-range
                data, nonce checks, prefund checks, and validation failure.
              </li>
              <li>
                <strong>External contracts</strong>: account, factory,
                aggregator, and paymaster calls are modeled as adversarial
                oracle-backed calls, so the theorem ranges over all possible
                external behaviors admitted by the EVM model.
              </li>
              <li>
                <strong>Execution phase</strong>: records account execution as
                an indexed trace event tied to the same operation data that was
                validated.
              </li>
              <li>
                <strong>Failure paths</strong>: distinguishes validation
                failure, execution failure, bundle revert, and post-operation
                behavior instead of collapsing them into a single boolean.
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              The proof is written in Lean 4 over the Verity model. The main
              theorem decomposes the English statement into safety, liveness,
              exactness, and ordering lemmas, then combines them into the final
              biconditional over execution trace counts.
            </p>
            <p className="leading-relaxed mb-4">
              The benchmark case lives in{' '}
              <ExternalLink
                href={`${BENCHMARK_BRANCH}/Benchmark/Cases/ERC4337/EntryPointInvariant/Contract.lean`}
              >
                Contract.lean
              </ExternalLink>
              , with specifications in{' '}
              <ExternalLink
                href={`${BENCHMARK_BRANCH}/Benchmark/Cases/ERC4337/EntryPointInvariant/Specs.lean`}
              >
                Specs.lean
              </ExternalLink>{' '}
              and proofs in{' '}
              <ExternalLink
                href={`${BENCHMARK_BRANCH}/Benchmark/Cases/ERC4337/EntryPointInvariant/Proofs.lean`}
              >
                Proofs.lean
              </ExternalLink>
              . The required Verity features for faithful external-call and
              control-flow modeling are introduced in{' '}
              <ExternalLink href={VERITY_PR}>Verity PR 1746</ExternalLink>.
            </p>
            <Disclosure title="Verify it yourself" className="mb-4">
              <CodeBlock>{VERIFY_COMMAND}</CodeBlock>
              <p className="mt-3 text-muted">
                If the build succeeds, Lean has checked every proof term.{' '}
                <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark/pull/32">
                  Benchmark pull request
                </ExternalLink>
              </p>
            </Disclosure>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Proof status
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The case proves the main EntryPoint execution invariant and
              supporting trace properties.{' '}
              <ExternalLink
                href={`${BENCHMARK_BRANCH}/Benchmark/Cases/ERC4337/EntryPointInvariant/Proofs.lean`}
              >
                Proofs.lean
              </ExternalLink>{' '}
              is <code className="font-mono text-[12px]">sorry</code>-free.
            </p>
            <div className="overflow-x-auto border border-gray-200 rounded">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-[#f8f8f8] text-left">
                    <th className="px-4 py-2 font-medium text-muted">Property</th>
                    <th className="px-4 py-2 font-medium text-muted">Meaning</th>
                    <th className="px-4 py-2 font-medium text-muted text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">execution_implies_validation</td>
                    <td className="px-4 py-1.5">no execution without prior validation</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">validation_implies_execution</td>
                    <td className="px-4 py-1.5">validated operations are executed</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">exactly_once_execution</td>
                    <td className="px-4 py-1.5">one indexed execution event per validated op</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">validation_before_execution</td>
                    <td className="px-4 py-1.5">execution occurs after same-op validation</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">operation_isolation</td>
                    <td className="px-4 py-1.5">one op cannot validate execution for another</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Assumptions
            </h2>
            <p className="leading-relaxed mb-4 text-muted text-[15px]">
              The proof does not assume that accounts or paymasters are honest.
              Their behavior is universally quantified through the external-call
              model. The remaining assumptions are the same engineering
              boundary any formal model needs: the audited Solidity source,
              Verity&apos;s EVM semantics, and the mapping from Solidity events
              of interest to trace predicates.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="Source alignment"
                constraint="EntryPoint.sol v0.9 control flow"
                source="eth-infinitism/account-abstraction"
              >
                The Verity model follows the v0.9 EntryPoint control flow. The
                proof is a statement about that modeled source, not about an
                unrelated deployed fork.
              </Hypothesis>
              <Hypothesis
                name="External-call semantics"
                constraint="all oracle-backed account/paymaster outcomes"
                source="Verity PR 1746"
              >
                Calls to arbitrary contracts are not replaced with trusted
                booleans. They are modeled through Verity&apos;s adversarial
                call interface, and the theorem quantifies over those outcomes.
              </Hypothesis>
              <Hypothesis
                name="Trace interpretation"
                constraint="validate and execute events indexed by UserOperation"
                source="EntryPointInvariant Specs.lean"
                border={false}
              >
                The English guarantee is expressed as a theorem about trace
                events. The trace records which operation was validated and
                which operation was executed, making &ldquo;same operation&rdquo;
                and &ldquo;exactly once&rdquo; explicit.
              </Hypothesis>
            </ul>
            <p className="mt-3 text-muted text-sm space-x-4">
              <ExternalLink
                href={`${BENCHMARK_BRANCH}/Benchmark/Cases/ERC4337/EntryPointInvariant/Specs.lean`}
              >
                View specs in Lean
              </ExternalLink>
              <ExternalLink
                href={`${BENCHMARK_BRANCH}/Benchmark/Cases/ERC4337/EntryPointInvariant/Proofs.lean`}
              >
                View proofs in Lean
              </ExternalLink>
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Learn more
            </h2>
            <p className="leading-relaxed mb-2">
              <ExternalLink href="https://eips.ethereum.org/EIPS/eip-4337">
                ERC-4337
              </ExternalLink>
              {', the account abstraction standard that defines UserOperations and EntryPoint.'}
            </p>
            <p className="leading-relaxed mb-2">
              <ExternalLink href="https://github.com/eth-infinitism/account-abstraction/tree/develop/audits">
                EntryPoint audits
              </ExternalLink>
              {', including OpenZeppelin, Spearbit, and Cantina reviews of the reference implementation.'}
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

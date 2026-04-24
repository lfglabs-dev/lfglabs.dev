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
          content="Formally verified ERC-4337 EntryPoint validation-before-execution control-flow invariants for the modeled handleOps path."
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
              prove in full: can an operation reach execution unless that same
              operation passed validation?
            </p>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              Why this matters
            </h2>
            <p className="leading-relaxed mb-6">
              ERC-4337 accounts and paymasters are arbitrary contracts. The
              full theorem engineers want would quantify over all of that EVM
              behavior. This benchmark proves a narrower, useful slice: the
              two-loop EntryPoint control flow that gates the operation
              execution path on successful validation.
            </p>
            <Disclosure title="What these invariants cover">
              <p className="mb-4 leading-relaxed text-muted">
                The proof tracks validation outcomes and execution-path
                attempts for each operation index in a call to{' '}
                <code className="font-mono text-[12px]">handleOps</code>.
              </p>
              <ul className="mb-3 text-muted list-disc pl-5 space-y-1">
                <li>
                  <strong>Safety</strong>: EntryPoint never attempts the
                  execution path for operation{' '}
                  <code className="font-mono text-[12px]">i</code> unless
                  validation for that same operation succeeded in the model.
                </li>
                <li>
                  <strong>Liveness</strong>: when the modeled validation phase
                  succeeds, every in-bounds operation reaches the execution
                  path.
                </li>
                <li>
                  <strong>Revert behavior</strong>: if validation fails and
                  <code className="font-mono text-[12px]"> handleOps</code>{' '}
                  reverts, no execution-path attempt is recorded.
                </li>
              </ul>
              <p className="text-muted">
                The model records reaching <code className="font-mono text-[12px]">_executeUserOp</code>,
                not successful account execution. It intentionally elides the
                <code className="font-mono text-[12px]"> callData.length &gt; 0</code>{' '}
                branch, gas accounting, and arbitrary account/paymaster
                internals.
              </p>
            </Disclosure>
          </section>

          <section className="mb-20">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              How this was proven
            </h2>
            <p className="leading-relaxed mb-4">
              The Verity model follows the selected Solidity{' '}
              <ExternalLink href={ENTRYPOINT_SOL}>EntryPoint.sol</ExternalLink>{' '}
              control-flow slice. It keeps the validation pass over the bundle
              and the transition to the per-operation execution wrapper, while
              abstracting data payloads and most accounting details.
            </p>
            <ul className="mb-6 text-[15px] leading-relaxed list-disc pl-5 space-y-2">
              <li>
                <strong>Validation phase</strong>: models validation as a
                universally quantified boolean outcome per operation.
              </li>
              <li>
                <strong>Native Verity shape</strong>: includes a contract model
                using bounded loops, oracle-backed calls, and low-level
                try/catch support from Verity PR 1746.
              </li>
              <li>
                <strong>Execution phase</strong>: records whether the modeled
                execution path is reached for each operation index.
              </li>
              <li>
                <strong>Failure path</strong>: preserves the all-or-nothing
                validation loop behavior: a validation failure reverts the
                modeled batch before execution attempts.
              </li>
            </ul>
            <p className="leading-relaxed mb-4">
              The proof is written in Lean 4 over the Verity model. The main
              theorem decomposes the English statement into safety, liveness,
              all-validated-on-success, all-executed-on-success, and
              no-execution-on-revert lemmas, then combines the first two into
              the biconditional.
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
              . The required Verity features for this native-loop and low-level
              call model are introduced in{' '}
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
              The case proves the selected EntryPoint control-flow invariant
              and supporting properties.{' '}
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
                    <td className="px-4 py-1.5">no execution-path attempt without validation</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">validation_implies_execution</td>
                    <td className="px-4 py-1.5">validated operations reach the execution path</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">all_validated_on_success</td>
                    <td className="px-4 py-1.5">a successful modeled batch has all validations true</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">all_executed_on_success</td>
                    <td className="px-4 py-1.5">a successful modeled batch attempts every execution path</td>
                    <td className="px-4 py-1.5 text-center text-green-600">proven</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="px-4 py-1.5 font-mono">no_execution_on_revert</td>
                    <td className="px-4 py-1.5">validation failure records no execution attempts</td>
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
              The proof does not establish full arbitrary account/paymaster EVM
              correctness. The remaining assumptions are explicit: the selected
              Solidity control-flow slice, Verity&apos;s semantics for the modeled
              constructs, and the abstraction from concrete calls and calldata
              to per-index validation and execution-path outcomes.
            </p>
            <ul className="space-y-0 border border-gray-200 rounded overflow-hidden text-[14px]">
              <Hypothesis
                name="Source alignment"
                constraint="EntryPoint.sol v0.9 control flow"
                source="eth-infinitism/account-abstraction"
              >
                The case is pinned to EntryPoint v0.9.0 and models the
                `handleOps` validation loop plus execution loop, not every
                helper branch in the contract.
              </Hypothesis>
              <Hypothesis
                name="External-call semantics"
                constraint="oracle-backed validation and low-level call outcomes"
                source="Verity PR 1746"
              >
                The native Verity model uses oracle-backed calls for the
                validation and execution-attempt stubs, while the pure proof
                quantifies over all validation result lists.
              </Hypothesis>
              <Hypothesis
                name="Trace interpretation"
                constraint="validation and execution-path outcomes indexed by UserOperation"
                source="EntryPointInvariant Specs.lean"
                border={false}
              >
                The English guarantee is expressed as a theorem about indexed
                validation outcomes and execution-path attempts. It does not
                claim account-call success or calldata equivalence.
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

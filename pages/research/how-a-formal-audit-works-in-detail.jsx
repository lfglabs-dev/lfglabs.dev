import Head from 'next/head'
import Link from 'next/link'
import PageLayout from '../../components/PageLayout'
import ResearchCard from '../../components/ResearchCard'
import ExternalLink from '../../components/research/ExternalLink'
import { getSortedResearch } from '../../lib/getSortedResearch'

const AUDIT_PIPELINE = [
  'Freeze a baseline commit',
  'Map the architecture and attack surface',
  'Write human-reviewable security specs',
  'Model the contract logic in Verity',
  'Prove the model satisfies the specs',
  'Report bugs and ambiguous behavior as they appear',
  'Re-run proofs after fixes',
  'Publish the final audit report and proof artifacts'
]

const SPEC_EXAMPLE = `-- Functional guarantee, written before proof work starts.
def no_unbacked_note_created
    (before after : ProtocolState) : Prop :=
  after.totalNotes <= after.totalBackedAssets ∧
  stateTransitionIsAuthorized before after ∧
  nullifiersAreNotReused before after`

const MODEL_EXAMPLE = `verity_contract ShieldedPool where
  storage
    roots : Uint256 → Uint256 := slot 0
    nullifiers : Uint256 → Bool := slot 1
    commitments : Uint256 → Bool := slot 2

  function withdraw
      (root nullifier commitment amount : Uint256) : Unit := do
    require (rootIsKnown roots root) "unknown root"
    requireNot (getMapping nullifiers nullifier) "spent note"
    require (verifyWithdrawProof root nullifier commitment amount)
      "invalid proof"
    setMapping nullifiers nullifier true
    transferOut amount`

const PROOF_TASK = `theorem withdraw_preserves_accounting
    (s : ContractState)
    (root nullifier commitment amount : Uint256) :
    let result := (withdraw root nullifier commitment amount).run s
    result.isOk →
      no_unbacked_note_created s result.state := by
  -- Unfold the Verity model.
  -- Use the signed-off spec.
  -- Discharge every state-transition case.
  -- Lean accepts only if all cases are covered.`

const CIRCUIT_AXIOM = `-- The circuit verifier is outside the EVM proof.
-- We state exactly what it is assumed to guarantee.
axiom withdraw_circuit_sound
    (root nullifier commitment amount : Uint256) :
    verifyWithdrawProof root nullifier commitment amount = true →
      validWithdrawWitness root nullifier commitment amount`

const BENCHMARK_INPUTS = [
  'Fixed contract model',
  'Fixed formal specification',
  'One editable proof file',
  'One theorem name'
]

const BENCHMARK_EVALUATION = [
  'Reject placeholders such as sorry, admit, or new axiom',
  'Run Lean against the submitted proof',
  'Accept only if the required theorem compiles'
]

function Snippet({ children }) {
  return (
    <pre className="bg-[#f8f8f8] rounded-lg px-6 py-5 overflow-x-auto text-[13.5px] leading-[1.7] font-mono text-[#575279]">
      {children}
    </pre>
  )
}

function NumberedList({ items }) {
  return (
    <ol className="border border-gray-200 rounded overflow-hidden text-[15px] leading-relaxed">
      {items.map((item, index) => (
        <li
          key={item}
          className={`flex gap-4 px-5 py-4 ${
            index === items.length - 1 ? '' : 'border-b border-gray-100'
          }`}
        >
          <span className="font-sans text-xs font-semibold text-muted bg-card-bg rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-[2px]">
            {index + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  )
}

function Checklist({ title, items }) {
  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-muted mb-3">
        {title}
      </h3>
      <ul className="space-y-2 text-[15px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="text-accent mt-[1px]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function HowAFormalAuditWorksInDetailPage() {
  const otherResearch = getSortedResearch().filter(
    (r) => r.slug !== 'how-a-formal-audit-works-in-detail'
  )

  return (
    <>
      <Head>
        <title>
          How a Formal Audit Works in Detail | Research | LFG Labs
        </title>
        <meta
          name="description"
          content="The technical workflow behind an LFG Labs formal audit: specification, threat modeling, Verity modeling, Lean proofs, reports, and proof maintenance."
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
              How a Formal Audit Works in Detail
            </h1>
            <p className="mt-3 text-muted text-base">
              The technical path from repo access to machine-checked security
              guarantees.
            </p>
          </header>

          <section className="mb-16 leading-relaxed space-y-4">
            <p>
              A formal audit is not just a normal audit with proofs added at the
              end. The proof work changes the audit process itself.
            </p>
            <p>
              We first decide what the protocol must guarantee, then model the
              relevant contract logic in{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity">
                Verity
              </ExternalLink>
              , then prove in{' '}
              <ExternalLink href="https://lean-lang.org/">Lean 4</ExternalLink>{' '}
              that the model satisfies the agreed specification. Bugs and
              ambiguities usually appear during modeling, before the final proof
              is complete.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              The audit pipeline
            </h2>
            <p className="leading-relaxed mb-6">
              The engagement starts from a fixed commit hash, but the work is
              iterative. Every important claim needs a spec, a model, and a
              proof.
            </p>
            <NumberedList items={AUDIT_PIPELINE} />
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              1. Specification is the core audit work
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Before writing proofs, we audit the protocol with the team and
                decide what actually matters: funds cannot be created out of
                thin air, withdrawals cannot be replayed, state transitions are
                authorized, accounting stays solvent, and edge cases behave
                intentionally.
              </p>
              <p>
                The output is not a vague checklist. It is a set of formal
                properties that engineers can review and sign off on before the
                proof phase starts.
              </p>
            </div>
            <div className="mt-6">
              <Snippet>{SPEC_EXAMPLE}</Snippet>
            </div>
            <p className="leading-relaxed mt-6 text-muted text-[15px]">
              This is where most audit judgment lives. If the wrong invariant is
              specified, a perfect proof still proves the wrong thing.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              2. We model only the security-relevant behavior
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                Verity lets us encode EVM-style contract logic in Lean: storage
                slots, mappings, require checks, uint256 arithmetic, transfers,
                and state updates. The model is the executable object that the
                proof talks about.
              </p>
              <p>
                The point is not to rewrite the whole repository mechanically.
                The point is to model the behavior needed to prove the agreed
                guarantees, while documenting every boundary that is assumed
                rather than proved.
              </p>
            </div>
            <div className="mt-6">
              <Snippet>{MODEL_EXAMPLE}</Snippet>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              3. Proof turns the audit claim into a checkable artifact
            </h2>
            <p className="leading-relaxed mb-6">
              A theorem ties the implementation model to the signed-off spec.
              Lean checks every case. If one branch is missing, if arithmetic
              wraps unexpectedly, or if a state update breaks the invariant, the
              proof does not compile.
            </p>
            <Snippet>{PROOF_TASK}</Snippet>
            <p className="leading-relaxed mt-6">
              This is the difference between &ldquo;we reviewed this&rdquo; and
              &ldquo;this exact property was checked by a proof kernel.&rdquo;
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              4. Bugs show up during modeling
            </h2>
            <div className="border border-gray-200 rounded px-6 py-5 leading-relaxed space-y-4 text-[15px]">
              <p>
                Modeling forces every implicit assumption into the open: which
                state can change, which caller is authorized, which arithmetic
                can overflow, which roots are valid, which nullifiers are spent,
                and which off-chain component is trusted.
              </p>
              <p>
                When the model cannot satisfy the spec, we do not hide that
                until the final report. We sync with the engineering team,
                explain the failing case, let them patch, and continue from the
                new behavior.
              </p>
              <p>
                The pre-audit report records the bugs, ambiguities, required
                fixes, and the on-chain/off-chain attack surface before the
                final proof is presented.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              5. Circuits become explicit assumptions
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                If the protocol uses circuits, we audit and formalize the
                circuit specification in Lean. The circuit compiler and
                underlying cryptography are outside the EVM proof unless they
                are separately verified.
              </p>
              <p>
                That means the EVM proof can use a circuit guarantee as an
                axiom, but the axiom must say exactly what is being trusted.
              </p>
            </div>
            <div className="mt-6">
              <Snippet>{CIRCUIT_AXIOM}</Snippet>
            </div>
            <p className="leading-relaxed mt-6 text-muted text-[15px]">
              This is stronger than leaving the circuit as a black box. The
              trusted boundary is named, scoped, and reviewable.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              6. The benchmark shapes how we run proof tasks
            </h2>
            <p className="leading-relaxed mb-6">
              The{' '}
              <ExternalLink href="https://github.com/lfglabs-dev/verity-benchmark">
                Verity Benchmark
              </ExternalLink>{' '}
              is built around the same unit of work we use internally: fixed
              implementation, fixed spec, one theorem to prove, and Lean as the
              evaluator.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 border border-gray-200 rounded px-6 py-5">
              <Checklist title="Public inputs" items={BENCHMARK_INPUTS} />
              <Checklist title="Evaluation" items={BENCHMARK_EVALUATION} />
            </div>
            <p className="leading-relaxed mt-6">
              This keeps proof work honest. A proof is not accepted because it
              looks plausible. It is accepted only if Lean checks it without
              placeholders.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              7. What the final deliverables contain
            </h2>
            <div className="border border-gray-200 rounded overflow-hidden text-[15px] leading-relaxed">
              <div className="px-5 py-4 border-b border-gray-100">
                <strong className="font-medium">Signed-off specs.</strong>{' '}
                Human-reviewable invariants and threat assumptions written in
                Lean.
              </div>
              <div className="px-5 py-4 border-b border-gray-100">
                <strong className="font-medium">Verity model.</strong> The
                machine-checkable model of the contract behavior used by the
                proofs.
              </div>
              <div className="px-5 py-4 border-b border-gray-100">
                <strong className="font-medium">Pre-fix report.</strong> Bugs,
                ambiguities, exploit paths, and required changes found during
                specification and modeling.
              </div>
              <div className="px-5 py-4 border-b border-gray-100">
                <strong className="font-medium">Post-fix report.</strong> The
                cleaned-up audit report after the engineering team addresses the
                findings.
              </div>
              <div className="px-5 py-4">
                <strong className="font-medium">Proof artifacts.</strong> Lean
                files that anyone can re-run to independently check the claims.
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-serif text-lg font-semibold tracking-tight mb-4">
              8. Maintenance means re-proving equivalence
            </h2>
            <div className="leading-relaxed space-y-4">
              <p>
                After the audit, small implementation changes should not require
                starting over. If the core invariants stay the same, we update
                the Verity model and re-prove that the new implementation still
                satisfies the same specs.
              </p>
              <p>
                If a change breaks or changes the core invariant, that is not
                maintenance. It is new scope, because the security claim itself
                changed.
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

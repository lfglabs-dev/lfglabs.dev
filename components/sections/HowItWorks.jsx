import SectionHeader from '../ui/SectionHeader'
import Step from '../ui/Step'
import BonusCard from '../ui/BonusCard'

const steps = [
  {
    number: 1,
    title: 'Send us your contracts',
    description:
      'Share your Solidity codebase. We scope the engagement and give you a fixed timeline.',
  },
  {
    number: 2,
    title: 'We verify everything',
    description:
      'We translate your contracts into Lean 4 specs and formally verify correctness across all execution paths. Runs parallel to your dev cycle.',
  },
  {
    number: 3,
    title: 'You get mathematical certainty',
    description:
      'Machine-checkable proofs, a plain-English report, and a Formally Verified credential for your docs and investor decks.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-28 border-t border-gray-100">
      <SectionHeader>
        How <span className="text-accent">formal verification</span> works
      </SectionHeader>
      <div className="grid sm:grid-cols-3 gap-8 mb-12">
        {steps.map((step) => (
          <Step key={step.number} {...step} />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <BonusCard
          icon="&#x21bb;"
          title="3 months of maintenance"
          description="Ship a contract change and we re-verify equivalence at no extra cost. Extendable to 12 months for longer coverage."
        />
        <BonusCard
          icon="&#x2714;"
          title="Full refund guarantee"
          description="If we can't prove you have a bug nor formally verify you don't, we refund. We stake our reputation on every job."
        />
      </div>
    </section>
  )
}

import SectionHeader from '../ui/SectionHeader'

const benefits = [
  {
    title: 'Mathematical certainty',
    description:
      'Your contracts are proven correct across every possible input, not just the ones someone thought to test.',
  },
  {
    title: 'Skin in the game',
    description:
      'We either find bugs or formally verify your contract is correct. If we can\'t, you\'re refunded. Our incentives are aligned with yours.',
  },
  {
    title: 'We stay with you',
    description:
      '3 months of re-verification on every code change, included. Auditors move on after they invoice.',
  },
]

export default function Benefits() {
  return (
    <section className="py-20 sm:py-28 border-t border-gray-100">
      <SectionHeader>
        Audits give opinions.{' '}
        <span className="text-accent">We give guarantees.</span>
      </SectionHeader>
      <div className="max-w-xl mx-auto space-y-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-3">
            <span className="text-accent mt-1 flex-shrink-0">&#x2713;</span>
            <div>
              <h3 className="font-bold text-heading text-base">{b.title}</h3>
              <p className="text-base text-primary mt-1">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

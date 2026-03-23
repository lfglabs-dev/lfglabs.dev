import ContactButton from './ContactButton'

const partners = [
  { name: 'Starkware', logo: '/images/logos/starkware.svg' },
  { name: 'Ethereum Foundation', logo: '/images/logos/ethereum-foundation.png' },
  { name: 'Nexus Mutual', logo: '/images/logos/nexus-mutual.png' },
  { name: 'Internet Computer', logo: '/images/logos/internet-computer.png', className: 'h-5' },
]

export default function Hero() {
  return (
    <section className="pt-4 sm:pt-8 pb-8 text-center">
      <h1 className="font-serif text-[40px] sm:text-[56px] text-heading tracking-tight mb-8 leading-[1.15]">
        We secure smart contracts with
        <br />
        <span className="text-accent">formal verification.</span>
      </h1>
      <p className="text-xl text-primary leading-relaxed mb-8 max-w-2xl mx-auto">
        Mathematical proofs that your smart contracts are correct across
        every possible execution path. Not an audit. A proof.
      </p>
      <ContactButton />
      <div className="mt-16">
        <p className="text-sm text-muted mb-4">Trusted by</p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {partners.map((partner) => (
            <img
              key={partner.name}
              src={partner.logo}
              alt={partner.name}
              className={`${partner.className || 'h-7'} w-auto grayscale opacity-40`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

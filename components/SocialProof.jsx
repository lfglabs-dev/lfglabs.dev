const partners = [
  { name: 'Starkware', logo: '/images/logos/starkware.svg' },
  { name: 'Ethereum Foundation', logo: '/images/logos/ethereum-foundation.png' },
  { name: 'Nexus Mutual', logo: '/images/logos/nexus-mutual.png' },
  { name: 'Internet Computer', logo: '/images/logos/internet-computer.png', className: 'h-5' },
]

export default function SocialProof() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-8 flex-wrap">
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
    </section>
  )
}

const partners = [
  { name: 'Starkware', logo: '/images/logos/starkware.svg' },
  { name: 'Ethereum Foundation', logo: '/images/logos/ethereum-foundation.png' },
  { name: 'Nexus Mutual', logo: '/images/logos/nexus-mutual.png' },
  { name: 'Internet Computer', logo: '/images/logos/internet-computer.png', className: 'h-5' },
]

export default function SocialProof() {
  return (
    <section className="py-20 sm:py-28 border-t border-gray-100">
      <p className="text-sm text-muted mb-4 text-center">Trusted by</p>
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
    </section>
  )
}

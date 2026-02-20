import Image from 'next/image'
import SocialLinks from './SocialLinks'

export default function HomeSidebar() {
  return (
    <div className="flex flex-col">
      <Image
        src="/images/lfg_logo.webp"
        alt="LFG Labs"
        width={56}
        height={56}
        className="rounded-full mb-4"
      />
      <p className="text-base text-primary leading-relaxed mb-2">
        Web3 infrastructure team. AI-first engineering. Open-source by default.
      </p>
      <div>
        <p className="text-muted text-sm mb-3">Find Us</p>
        <SocialLinks />
      </div>
    </div>
  )
}

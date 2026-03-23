export default function BonusCard({ icon, title, description }) {
  return (
    <div className="bg-card-bg rounded-xl p-6 sm:p-8 flex-1">
      <div className="text-accent text-2xl mb-3">{icon}</div>
      <h3 className="font-serif text-xl text-heading mb-2">{title}</h3>
      <p className="text-base text-primary leading-relaxed">{description}</p>
    </div>
  )
}

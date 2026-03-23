export default function Step({ number, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-accent/10 text-accent text-base font-bold mb-3">
        {number}
      </div>
      <h3 className="font-serif text-xl text-heading mb-2">{title}</h3>
      <p className="text-base text-primary leading-relaxed">{description}</p>
    </div>
  )
}

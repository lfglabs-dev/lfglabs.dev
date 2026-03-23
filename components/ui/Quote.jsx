export default function Quote({ text, name, title, company, image, href }) {
  return (
    <blockquote className="bg-card-bg rounded-lg p-6">
      <p className="text-base text-primary leading-relaxed italic mb-4">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="text-base flex items-center gap-3">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-heading hover:text-accent transition-colors"
            >
              {name}
            </a>
          ) : (
            <span className="font-bold text-heading">{name}</span>
          )}
          <span className="text-muted"> &ndash; {title}, {company}</span>
        </div>
      </footer>
    </blockquote>
  )
}

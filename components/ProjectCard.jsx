import Link from 'next/link'

function PartnerBadge({ partner }) {
  if (!partner) return null
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted flex-shrink-0">
      <span>with</span>
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-4 w-auto grayscale opacity-50"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

export default function ProjectCard({ project, compact }) {
  if (compact) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-col justify-between bg-card-bg rounded-xl p-5 hover:bg-gray-100 transition-colors duration-200 h-full"
      >
        <div className="min-w-0">
          <h3 className="font-serif text-lg text-primary mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {project.subtitle}
          </p>
        </div>
        <div className="mt-3">
          <PartnerBadge partner={project.partner} />
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block bg-card-bg rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-serif text-[23px] text-primary mb-2">
            {project.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {project.subtitle}
          </p>
        </div>
        <PartnerBadge partner={project.partner} />
      </div>
    </Link>
  )
}

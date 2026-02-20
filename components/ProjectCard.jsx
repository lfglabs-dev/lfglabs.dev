import Link from 'next/link'

export default function ProjectCard({ project, compact }) {
  if (compact) {
    return (
      <Link
        href={`/projects/${project.slug}`}
        className="block bg-card-bg rounded-xl p-5 hover:bg-gray-100 transition-colors duration-200"
      >
        <h3 className="font-serif text-lg text-primary mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">
          {project.subtitle}
        </p>
      </Link>
    )
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block bg-card-bg rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
    >
      <h3 className="font-serif text-[23px] text-primary mb-2">
        {project.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed">
        {project.subtitle}
      </p>
    </Link>
  )
}

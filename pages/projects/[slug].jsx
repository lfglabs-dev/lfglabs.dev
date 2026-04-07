import Head from 'next/head'
import Link from 'next/link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { getProjectSlugs, getProjectBySlug } from '../../lib/getProjects'
import PageLayout from '../../components/PageLayout'
import ProjectCard from '../../components/ProjectCard'
import { projects } from '../../data/projects'

const mdxComponents = {
  img: (props) => (
    <img {...props} className="rounded-lg w-full my-6" loading="lazy" />
  ),
  Video: (props) => (
    <div style={{ paddingBottom: '2.5rem' }}>
      <video {...props} className="rounded-lg w-full" />
    </div>
  ),
  YouTube: ({ id, start }) => (
    <div style={{ paddingBottom: '2.5rem' }}>
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ),
  a: (props) => (
    <a
      {...props}
      className="text-accent hover:underline mx-0.5"
      target={props.href?.startsWith('http') ? '_blank' : undefined}
      rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    />
  ),
  h2: (props) => (
    <h2 {...props} className="font-serif text-lg font-semibold text-heading mt-10 mb-4 tracking-tight" />
  ),
  ul: (props) => (
    <ul {...props} className="list-disc pl-5 space-y-1.5 my-4 text-primary" />
  ),
  li: (props) => <li {...props} className="text-sm leading-relaxed" />,
  p: (props) => (
    <p {...props} className="text-primary leading-relaxed mb-4" />
  ),
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
}

export default function ProjectPage({ frontmatter, source, recommendedProjects }) {
  return (
    <>
      <Head>
        <title>{frontmatter.title} | LFG Labs</title>
        <meta name="description" content={frontmatter.description} />
      </Head>
      <PageLayout>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <nav className="mb-10">
            <Link
              href="/projects"
              className="text-sm text-muted hover:text-primary transition-colors"
            >
              &larr; Back
            </Link>
          </nav>

          <h1 className="font-serif text-[32px] sm:text-[38px] font-bold text-heading tracking-tight leading-tight">
            {frontmatter.title}
          </h1>

          {frontmatter.subtitle && (
            <p className="text-lg text-muted mt-3 leading-relaxed">
              {frontmatter.subtitle}
            </p>
          )}

          <p className="text-sm text-muted mt-3 mb-10">
            LFG Labs &middot; {formatDate(frontmatter.date)}
          </p>

          {frontmatter.image && (
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full rounded-lg mb-8"
            />
          )}

          <div className="font-article">
            <MDXRemote {...source} components={mdxComponents} />
          </div>

          {recommendedProjects.length > 0 && (
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-base font-bold text-heading mb-6">
                More Work
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedProjects.map((p) => (
                  <ProjectCard key={p.slug} project={p} compact />
                ))}
              </div>
            </section>
          )}
        </div>
      </PageLayout>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = getProjectSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { frontmatter, content } = getProjectBySlug(params.slug)
  const source = await serialize(content)

  const recommended = projects
    .filter((p) => p.slug !== params.slug)
    .slice(0, 3)

  return {
    props: {
      frontmatter,
      source,
      recommendedProjects: recommended,
    },
  }
}

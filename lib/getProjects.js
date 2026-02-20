import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export function getProjectSlugs() {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getProjectBySlug(slug) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`)
  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)
  // Convert Date objects to strings for JSON serialization
  const frontmatter = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value instanceof Date ? value.toISOString() : value,
    ])
  )
  return { frontmatter, content }
}

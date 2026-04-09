import { research } from '../data/research'

export function getSortedResearch() {
  return [...research].sort((a, b) => b.date.localeCompare(a.date))
}

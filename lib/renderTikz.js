const { load, tex, dvi2svg } = require('node-tikzjax')

let loaded = false

/**
 * Render a TikZ snippet to an SVG string at build time.
 * The input should be a bare \\begin{tikzpicture}...\\end{tikzpicture} block.
 */
async function renderTikz(tikzSource) {
  if (!loaded) {
    await load()
    loaded = true
  }
  const input = `\\begin{document}\n${tikzSource}\n\\end{document}`
  const dvi = await tex(input)
  const svg = await dvi2svg(dvi)
  return svg
}

module.exports = { renderTikz }

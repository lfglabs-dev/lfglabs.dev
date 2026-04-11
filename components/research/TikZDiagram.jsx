import { useEffect, useRef } from 'react'

export default function TikZDiagram({ tikz, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    // Add TikZJax fonts CSS if not already present
    if (!document.querySelector('link[href*="tikzjax.com"]')) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = 'https://tikzjax.com/v1/fonts.css'
      document.head.appendChild(link)
    }

    // Create the <script type="text/tikz"> element
    const tikzEl = document.createElement('script')
    tikzEl.type = 'text/tikz'
    tikzEl.textContent = tikz
    container.appendChild(tikzEl)

    const existingScript = document.querySelector('script[src*="tikzjax.com"]')
    if (!existingScript) {
      // First load: add tikzjax.js — it sets window.onload to its processing
      // function, but in a SPA that event already fired, so we call it manually.
      const script = document.createElement('script')
      script.src = 'https://tikzjax.com/v1/tikzjax.js'
      script.onload = () => {
        if (typeof window.onload === 'function') {
          window.onload()
        }
      }
      document.head.appendChild(script)
    } else {
      // Already loaded: call the handler again to process new elements
      if (typeof window.onload === 'function') {
        window.onload()
      }
    }

    return () => {
      container.innerHTML = ''
    }
  }, [tikz])

  return <div ref={ref} className={className} />
}

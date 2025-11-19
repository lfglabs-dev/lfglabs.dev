const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> © LFG LABS. <br /> Powered by{' '}
      <span><a href="https://relens.ai" target="_blank" rel="noopener noreferrer">
        ReLens AI</a></span>

    </small>
  ),
  darkMode: true,
  components: (
    <span>
      <img
        src="/path/to/your/logo.png"
        alt="LFG Labs Logo"
        width={32}
        height={32}
      />
      <span style={{ marginLeft: '.4em', fontWeight: 800 }}>LFG Labs</span>
    </span>
  )
}

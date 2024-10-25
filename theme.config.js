const YEAR = new Date().getFullYear()

export default {
  footer: (
    <small style={{ display: 'block', marginTop: '8rem' }}>
      <time>{YEAR}</time> © LFG LABS.
      <style jsx>{`
        a {
          float: right;
        }
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
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

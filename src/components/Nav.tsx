export function Nav() {
  return (
    <nav className="site-nav">
      <span className="nav-logo">
        <span style={{ color: 'var(--framer-light)' }}>Framer</span>
        <span style={{ color: 'var(--text-dim)', margin: '0 6px' }}>vs</span>
        <span style={{ color: 'var(--gsap-light)' }}>GSAP</span>
      </span>
      <a href="#entrance" className="nav-link">Entrance</a>
      <a href="#scroll" className="nav-link">Scroll</a>
      <a href="#drag" className="nav-link">Drag</a>
      <a href="#stagger" className="nav-link">Stagger</a>
      <a href="#timeline" className="nav-link">Timeline</a>
      <a href="#svg" className="nav-link">SVG</a>
      <a href="#cardflip" className="nav-link">3D Flip</a>
      <a href="#magnetic" className="nav-link">Magnetic</a>
      <a href="#counter" className="nav-link">Counter</a>
      <a href="#textreveal" className="nav-link">Text</a>
      <a href="#comparison" className="nav-link">Matrix</a>
      <a href="#decision" className="nav-link">Decide</a>
    </nav>
  )
}

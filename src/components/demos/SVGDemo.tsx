'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import gsap from 'gsap'
import { DemoLayout } from '../DemoLayout'

const PATH = 'M 10,50 C 10,20 40,20 50,50 C 60,80 90,80 90,50 C 90,20 120,20 130,50 C 140,80 170,80 170,50 C 170,20 200,20 210,50'

function getPathPoint(t: number): { x: number; y: number } {
  const x = 10 + t * 200
  const segment = Math.floor(t * 4)
  const localT = (t * 4) % 1
  
  let y: number
  if (segment % 2 === 0) {
    y = 50 - 30 * Math.sin(localT * Math.PI)
  } else {
    y = 50 + 30 * Math.sin(localT * Math.PI)
  }
  
  return { x, y }
}

function FramerSVG({ animKey }: { animKey: number }) {
  const pathControls = useMemo(() => useAnimationControls(), [])
  const dot1Controls = useMemo(() => useAnimationControls(), [])
  const dot2Controls = useMemo(() => useAnimationControls(), [])
  const dot3Controls = useMemo(() => useAnimationControls(), [])

  useEffect(() => {
    const runAnimation = async () => {
      pathControls.set({ pathLength: 0, opacity: 0 })
      dot1Controls.set({ opacity: 0, scale: 0 })
      dot2Controls.set({ opacity: 0, scale: 0 })
      dot3Controls.set({ opacity: 0, scale: 0 })

      pathControls.start({ pathLength: 1, opacity: 1, transition: { duration: 1.8, ease: 'easeInOut' } })
      
      setTimeout(() => {
        dot1Controls.start({ opacity: 1, scale: 1, transition: { duration: 0.3 } })
      }, 0.25 * 1800)
      
      setTimeout(() => {
        dot2Controls.start({ opacity: 1, scale: 1, transition: { duration: 0.3 } })
      }, 0.5 * 1800)
      
      setTimeout(() => {
        dot3Controls.start({ opacity: 1, scale: 1, transition: { duration: 0.3 } })
      }, 0.75 * 1800)
    }
    
    runAnimation()
  }, [animKey])

  const [dot1Pos, dot2Pos, dot3Pos] = [getPathPoint(0.25), getPathPoint(0.5), getPathPoint(0.75)]

  return (
    <div style={{ width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <svg viewBox="0 0 220 100" width="100%" style={{ maxWidth: 280 }}>
        <path d={PATH} fill="none" stroke="rgba(124,90,243,0.15)" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path
          d={PATH}
          fill="none"
          stroke="var(--framer-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={pathControls}
          style={{ filter: 'drop-shadow(0 0 4px rgba(124,90,243,0.6))' }}
        />
        <motion.circle
          cx={dot1Pos.x}
          cy={dot1Pos.y}
          r="5"
          fill="var(--framer)"
          animate={dot1Controls}
          style={{ filter: 'drop-shadow(0 0 3px rgba(124,90,243,0.8))' }}
        />
        <motion.circle
          cx={dot2Pos.x}
          cy={dot2Pos.y}
          r="5"
          fill="var(--framer)"
          animate={dot2Controls}
          style={{ filter: 'drop-shadow(0 0 3px rgba(124,90,243,0.8))' }}
        />
        <motion.circle
          cx={dot3Pos.x}
          cy={dot3Pos.y}
          r="5"
          fill="var(--framer)"
          animate={dot3Controls}
          style={{ filter: 'drop-shadow(0 0 3px rgba(124,90,243,0.8))' }}
        />
      </svg>
      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)' }}>
        motion.path · pathLength motion value
      </span>
    </div>
  )
}

function GsapSVG({ animKey }: { animKey: number }) {
  const pathRef = useRef<SVGPathElement>(null)
  const dotsRef = useRef<SVGGElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const length = pathRef.current.getTotalLength()
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    })

    const tl = gsap.timeline()
    tl.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.8,
      ease: 'power1.inOut',
    })

    if (dotsRef.current) {
      const circles = dotsRef.current.querySelectorAll('circle')
      gsap.set(circles, { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
      tl.to(circles, {
        scale: 1, opacity: 1,
        duration: 0.3,
        stagger: 0.4,
        ease: 'back.out(2)',
      }, 0.4)
    }

    return () => { tl.kill() }
  }, [animKey])

  const getDotPoint = (t: number) => {
    const x = 10 + t * 200
    const base = 50
    const wave = 30 * Math.sin(t * Math.PI * 3)
    return { cx: x, cy: base + wave }
  }

  return (
    <div style={{ width: '100%', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <svg viewBox="0 0 220 100" width="100%" style={{ maxWidth: 280 }}>
        <path d={PATH} fill="none" stroke="rgba(136,206,2,0.12)" strokeWidth="2.5" strokeLinecap="round" />
        <path
          ref={pathRef}
          d={PATH}
          fill="none"
          stroke="var(--gsap-light)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 4px rgba(136,206,2,0.55))' }}
        />
        <g ref={dotsRef}>
          {[0.25, 0.5, 0.75].map((t, i) => {
            const pt = getDotPoint(t)
            return (
              <circle
                key={i}
                cx={pt.cx}
                cy={pt.cy}
                r="5"
                fill="var(--gsap)"
                style={{ filter: 'drop-shadow(0 0 3px rgba(136,206,2,0.8))' }}
              />
            )
          })}
        </g>
      </svg>
      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)' }}>
        strokeDashoffset technique · MotionPath plugin
      </span>
    </div>
  )
}

const framerCode = `// SVG path drawing with Framer Motion
// pathLength is a built-in motion value (0 → 1)

function DrawPath() {
  return (
    <svg viewBox="0 0 200 100">
      <motion.path
        d="M 10,50 C ..."
        fill="none"
        stroke="#7c5af3"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          pathLength: {
            duration: 2,
            ease: 'easeInOut',
          },
          opacity: { duration: 0.3 },
        }}
      />
    </svg>
  )
}

// pathOffset: shift the drawn portion (0-1)
// pathSpacing: gaps between dashes (0-1)
// Works for any SVG shape, not just paths

// For scroll-linked: combine with useScroll
// const { scrollYProgress } = useScroll()
// animate={{ pathLength: scrollYProgress }}`

const gsapCode = `// SVG path drawing with GSAP
// Classic strokeDasharray/Dashoffset technique

function DrawPath() {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    const length = path.getTotalLength()

    // Set starting state: fully "hidden"
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    // Animate offset to 0 → "draws" the path
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power1.inOut',
    })
  }, [])

  return (
    <svg viewBox="0 0 200 100">
      <path ref={pathRef} d="M 10,50 C ..." />
    </svg>
  )
}

// GSAP MotionPath plugin: animate elements ALONG paths
// gsap.to('.ball', {
//   motionPath: { path: '#curve', align: '#curve' },
//   duration: 2,
// })
// → Framer has no direct equivalent for motion along path`

export function SVGDemo() {
  const [framerKey, setFramerKey] = useState(0)
  const [gsapKey, setGsapKey] = useState(0)

  return (
    <DemoLayout
      number="06"
      title="SVG & Path Animation"
      subtitle="Framer's pathLength motion value makes draw-on animations trivially simple. GSAP's MotionPath plugin adds a capability Framer lacks entirely: animating elements along an SVG path."
      framerDemo={<FramerSVG animKey={framerKey} />}
      gsapDemo={<GsapSVG animKey={gsapKey} />}
      framerCode={framerCode}
      gsapCode={gsapCode}
      onReplayFramer={() => setFramerKey(k => k + 1)}
      onReplayGsap={() => setGsapKey(k => k + 1)}
    />
  )
}

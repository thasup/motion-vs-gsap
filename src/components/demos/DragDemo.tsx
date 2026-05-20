'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Draggable from 'gsap/Draggable'
import { DemoLayout } from '../DemoLayout'

gsap.registerPlugin(Draggable)

function FramerDragDemo() {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  return (
    <div style={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          border: '1px dashed rgba(124,90,243,0.2)',
          position: 'absolute',
        }} />
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          drag
          dragConstraints={{ left: -100, right: 100, top: -60, bottom: 60 }}
          dragElastic={0.15}
          whileDrag={{ scale: 1.12, boxShadow: '0 12px 30px rgba(124,90,243,0.4)' }}
          whileHover={{ scale: 1.05 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          style={{
            width: 64, height: 64,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #7c5af3, #a07ff6)',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'white', fontWeight: 600 }}>
            {isDragging ? 'drag' : 'grab'}
          </span>
        </motion.div>
      </div>

      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)',
        whiteSpace: 'nowrap',
      }}>
        drag prop · elastic · constrained
      </div>
    </div>
  )
}

function GsapDragDemo() {
  const boxRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if (!boxRef.current || !containerRef.current) return

    const d = Draggable.create(boxRef.current, {
      type: 'x,y',
      bounds: containerRef.current,
      inertia: false,
      onDragStart() { setIsDragging(true) },
      onDragEnd() {
        setIsDragging(false)
        gsap.to(boxRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
      },
    })[0]

    return () => { d.kill() }
  }, [])

  return (
    <div ref={containerRef} style={{ width: '100%', height: 160, position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          border: '1px dashed rgba(136,206,2,0.18)',
          position: 'absolute',
        }} />
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          ref={boxRef}
          style={{
            width: 64, height: 64,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #5a8a01, #88ce02)',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            userSelect: 'none',
            border: '1px solid rgba(136,206,2,0.5)',
          }}
        >
          <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'white', fontWeight: 600 }}>
            {isDragging ? 'drag' : 'grab'}
          </span>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        fontSize: 10, fontFamily: "'JetBrains Mono'", color: 'var(--text-dim)',
        whiteSpace: 'nowrap',
      }}>
        Draggable · bounds · elastic return
      </div>
    </div>
  )
}

const framerCode = `// Drag with Framer Motion — pure JSX
function DraggableCard() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag                              // enable both axes
      dragConstraints={{                // soft boundary
        left: -100, right: 100,
        top: -60, bottom: 60,
      }}
      dragElastic={0.15}               // resistance outside bounds
      dragMomentum={false}             // no inertia (or use true)
      whileDrag={{ scale: 1.1 }}       // variant while dragging
      whileHover={{ scale: 1.04 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(_, info) => {
        // info.velocity, info.point, info.offset
        setIsDragging(false)
      }}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      Drag me
    </motion.div>
  )
}

// useMotionValue + useTransform for scroll-linked drag
// dragSnapToOrigin for auto-return`

const gsapCode = `// Drag with GSAP Draggable plugin
import { Draggable } from 'gsap/Draggable'
gsap.registerPlugin(Draggable)

function DraggableCard() {
  const ref = useRef(null)
  const container = useRef(null)

  useEffect(() => {
    const [d] = Draggable.create(ref.current, {
      type: 'x,y',
      bounds: container.current,     // constrain to element
      edgeResistance: 0.65,          // friction at boundary
      inertia: true,                 // momentum on release
      snap: {                        // optional: snap to grid
        x: (v) => Math.round(v / 20) * 20,
      },
      onDragEnd() {
        // Return to origin with elastic ease
        gsap.to(ref.current, {
          x: 0, y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        })
      },
    })

    return () => d.kill()
  }, [])

  return (
    <div ref={container}>
      <div ref={ref}>Drag me</div>
    </div>
  )
}

// Draggable supports: rotation, throwProps,
// liveSnap, hitTest, and custom cursors`

export function DragDemo() {
  return (
    <DemoLayout
      number="03"
      title="Gesture & Drag Interactions"
      subtitle="Framer's drag is a first-class prop — no plugins needed. GSAP's Draggable plugin offers lower-level control: hit testing, rotation, inertia, and snap-to-grid."
      framerDemo={<FramerDragDemo />}
      gsapDemo={<GsapDragDemo />}
      framerCode={framerCode}
      gsapCode={gsapCode}
    />
  )
}

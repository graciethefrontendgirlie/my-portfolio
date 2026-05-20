import { useEffect, useRef } from 'react'

export default function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const mouse = useRef({ x: 0, y: 0 })
    const ring = useRef({ x: 0, y: 0 })
    const rafRef = useRef<number>(0)

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', onMove)

        const animate = () => {
            if (dotRef.current) {
                dotRef.current.style.left = mouse.current.x + 'px'
                dotRef.current.style.top = mouse.current.y + 'px'
            }
            ring.current.x += (mouse.current.x - ring.current.x) * 0.12
            ring.current.y += (mouse.current.y - ring.current.y) * 0.12
            if (ringRef.current) {
                ringRef.current.style.left = ring.current.x + 'px'
                ringRef.current.style.top = ring.current.y + 'px'
            }
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafRef.current)
        }
    }, [])

   return (
    <>
      <div
        ref={dotRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ backgroundColor: 'white', mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="fixed w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{ border: '1px solid white', mixBlendMode: 'difference' }}
      />
    </>
  )
}
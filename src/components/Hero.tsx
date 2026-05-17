import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { info } from '../data/info'

function useCountUp(target: number, duration: number, start: boolean) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!start) return
        let current = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            current += step
            if (current >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [start, target, duration])
    return count
}

interface StatProps {
    stat: { label: string; value: number | null; suffix: string; display: string }
    startCount: boolean
}

function StatItem({ stat, startCount }: StatProps) {
    const count = useCountUp(stat.value ?? 0, 1200, startCount && stat.value !== null)
    return (
        <div className="border-b border-border-light pb-8 last:border-b-0 last:pb-0">
            <p className="font-serif text-5xl font-bold text-off-black leading-none mb-1">
                {stat.value === null ? stat.display : `${count}${stat.suffix}`}
            </p>
            <p className="text-xs text-mid-gray tracking-wide">{stat.label}</p>
        </div>
    )
}

export default function Hero() {
    const statsRef = useRef<HTMLDivElement>(null)
    const [startCount, setStartCount] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStartCount(true) },
            { threshold: 0.5 }
        )
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    const words = ['Emmanuel', 'Grace', 'Okuchi']

    return (
        <section id="hero" className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-20">
            {/* LEFT */}
            <div className="bg-cream flex flex-col justify-center px-8 md:px-16 py-20">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="text-xs tracking-[0.18em] text-mid-gray uppercase mb-8"
                >
                    {info.tagline}
                </motion.p>

                <h1
                    className="font-serif font-bold leading-[1.05] tracking-tight text-off-black mb-6 overflow-hidden"
                    style={{ fontSize: 'clamp(2.6rem, 5vw, 4.2rem)' }}
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={word}
                            className="block"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {word === 'Grace'
                                ? <em className="font-serif italic font-normal text-forest">{word}</em>
                                : word}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.6 }}
                    className="text-sm text-mid-gray mb-10"
                >
                    React · TypeScript · Tailwind · Next.js
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.85, duration: 0.6 }}
                    className="flex gap-4 flex-wrap"
                >
                    <a
                        href="#projects" className="bg-off-black text-white text-sm px-7 py-3 rounded-sm hover:opacity-75 transition-opacity duration-200"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="border border-border-light text-off-black text-sm px-7 py-3 rounded-sm hover:border-off-black transition-colors duration-200"
                    >
                        Get In Touch
                    </a>
                </motion.div>
            </div>

            {/* RIGHT */}
            <div className="hidden md:flex bg-white border-l border-border-light flex-col justify-center px-16 py-20">
                <motion.div
                    ref={statsRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="flex flex-col gap-10"
                >
                    {info.stats.map((stat, i) => (
                        <StatItem key={i} stat={stat} startCount={startCount} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
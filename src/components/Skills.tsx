import { useEffect, useRef, useState } from 'react'
import { FaReact, FaHtml5, FaGitAlt, FaPython } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiJavascript } from 'react-icons/si'
import type { ReactElement } from 'react'
import SectionHeader from './SectionHeader'
import { skills } from '../data/skills'

const iconMap: Record<string, ReactElement> = {
  FaReact: <FaReact size={28} color="#61DAFB" />,
  SiTypescript: <SiTypescript size={28} color="#3178C6" />,
  SiTailwindcss: <SiTailwindcss size={28} color="#06B6D4" />,
  SiNextdotjs: <SiNextdotjs size={28} color="#000000" />,
  SiJavascript: <SiJavascript size={28} color="#F7DF1E" />,
  FaHtml5: <FaHtml5 size={28} color="#E34F26" />,
  FaGitAlt: <FaGitAlt size={28} color="#F05032" />,
  FaPython: <FaPython size={28} color="#3776AB" />,
}

export default function Skills() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (gridRef.current) observer.observe(gridRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-16 py-24">
        <SectionHeader num="02" title="Skills" />

        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 border border-border-light"
        >
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="relative overflow-hidden px-6 py-7 border-r border-b border-border-light md:[&:nth-child(4n)]:border-r-0 transition-colors duration-200 hover:bg-cream group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, background 0.2s`,
              }}
            >
              {/* shimmer */}
              <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-[left] duration-500 group-hover:left-full" />
              <div className="mb-3">{iconMap[skill.icon]}</div>
              <p className="text-sm font-medium text-off-black">{skill.name}</p>
              <p className="text-[0.65rem] text-mid-gray tracking-wide">{skill.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
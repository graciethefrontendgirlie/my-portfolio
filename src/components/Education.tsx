import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { education } from '../data/education'

export default function Education() {
  const listRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (listRef.current) observer.observe(listRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="education" className="bg-white">
      <div className="max-w-5xl mx-auto px-8 md:px-16 py-24">
        <SectionHeader num="04" title="Education" />

        <div ref={listRef} className="flex flex-col border border-border-light">
          {education.map((edu, i) => (
            <div
              key={edu.school}
              className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 items-center px-8 py-8 border-b border-border-light last:border-b-0 hover:bg-cream transition-colors duration-200"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms, background 0.2s`,
              }}
            >
              <div>
                <p className="font-serif font-bold text-off-black text-base mb-1">
                  {edu.school}
                </p>
                <p className="text-xs text-mid-gray">{edu.degree}</p>
              </div>
              <p className="text-xs text-mid-gray tracking-wide whitespace-nowrap">
                {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
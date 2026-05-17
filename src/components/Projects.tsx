import { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { projects } from '../data/projects'

export default function Projects() {
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
        <section id="projects" className="bg-cream"> 
            <div className="max-w-5x1 mx-auto px-8 md:px-16 py-24">
                <SectionHeader num="03" title="Projects" />

                <div ref={listRef} className="flex flex-col border border-border-light">
                    {projects.map((project, i) => (
                        <div
                            key={project.title}
                            className="goup grid grid-cols-1 md:grid-cols-[0.6fr_1.4fr_auto] gap-4 md:gap-8 items-center px-6 py-7 border-b border-border-light last:border-b-0 hover:bg-white transition-colors duration-200"
                            style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateX(0)' : 'translateX(-20px)',
                            transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms, background 0.2s`,
                            }}
                            >
                            {/* index */}
                            <p className="font-serif text-2xl font-normal italic text-border-light group-hover:text-forest transition-colors duration-300 hidden md:block">
                                {String(i + 1).padStart(2, '0')}
                            </p>
                            {/* info */}
                            <div>
                                <p className="font-serif font-bold text-off-black text-base mb-1">
                                {project.title}
                                </p>
                                <p className="text-xs text-mid-gray leading-relaxed">
                                {project.description}
                                </p>
                            </div>
                            {/* tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {project.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-[0.62rem] tracking-wide text-mid-gray border border-border-light bg-white px-2.5 py-0.5 rounded-sm group-hover:border-forest group-hover:text-forest transition-colors duration-200"
                                >
                                    {tag}
                                </span>
                                ))}
                            </div>

                            {/* links */}
                            <div className="flex md:flex-col gap-3 md:gap-1.5 md:text-right">
                                {project.live ? (
                                    <a href={project.live} target="_blank"
                                        rel="noreferrer"
                                        className="text-[0.7rem] text-mid-gray tracking-wide hover:text-off-black transition-colors duration-200"
                                    >
                                        Live → 
                                    </a>
                                ) : (
                                    <span className="text-[0.7rem]       text-border-light tracking-wide">
                                        Coming soon
                                    </span>
                                )}
                                {project.github ? (
                                    <a href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-[0.7rem] text-mid-gray tracking-wide hover:text-off-black transition-colors duration-200"
                                    >
                                        GitHub →
                                    </a>
                                ) : (
                                   <span className="text-[0.7rem]   text-border-light tracking-wide">
                                        Private
                                    </span> 
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
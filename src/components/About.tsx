import { motion } from 'framer-motion'
import { useReveal } from './useReveal'
import SectionHeader from './SectionHeader'
import { info } from '../data/info'

export default function About() {
  const { ref: textRef, visible: textVisible } = useReveal()
  const { ref: factsRef, visible: factsVisible } = useReveal()

  const facts = [
    { label: 'Status', value: info.status },
    { label: 'Location', value: info.location },
    { label: 'University', value: 'MOUAU · B.Eng Chemical Engineering' },
    { label: 'Training', value: 'Aptech Computer Education' },
    { label: 'Availability', value: info.availability },
  ]

  return (
    <section id="about" className="bg-cream">
      <div className="max-w-5xl mx-auto px-8 md:px-16 py-24">
        <SectionHeader num="01" title="About Me" />

        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-16 items-start">
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, y: 24 }}
            animate={textVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65 }}
            className="space-y-5 text-sm text-mid-gray leading-[2]"
          >
            {info.bio.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>

          <motion.div
            ref={factsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={factsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-[0.65rem] tracking-[0.15em] text-mid-gray uppercase">
                  {label}
                </span>
                <span className="text-sm font-medium text-off-black">{value}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
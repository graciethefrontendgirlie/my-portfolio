import { useState } from 'react'
import { FaGithub, FaLinkedinIn, FaTiktok } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useReveal } from './useReveal'
import SectionHeader from './SectionHeader'
import { info } from '../data/info'

export default function Contact() {
  const { ref: leftRef, visible: leftVisible } = useReveal()
  const { ref: rightRef, visible: rightVisible } = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields!')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '4853f7e5-8774-40ac-8752-56696ed7c8bb',
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New message from ${form.name} via Portfolio`,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const socialIcons = [
    { icon: <FaGithub size={18} />, url: info.links.github, label: 'GitHub' },
    { icon: <FaLinkedinIn size={18} />, url: info.links.linkedin, label: 'LinkedIn' },
    { icon: <FaXTwitter size={18} />, url: info.links.twitter, label: 'X' },
    { icon: <FaTiktok size={18} />, url: info.links.tiktok, label: 'TikTok' },
  ]

  return (
    <section id="contact" className="bg-off-black">
      <div className="max-w-5xl mx-auto px-8 md:px-16 py-24">
        <SectionHeader num="05" title="Contact" light />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <div
            ref={leftRef}
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.65s ease, transform 0.65s ease',
            }}
          >
            <p className="text-sm text-white/50 leading-[2] mb-10">
              I'm currently open to frontend roles — full-time, part-time, or
              contract. Remote preferred. If you're building something
              interesting, let's talk.
            </p>

            <a
              href={`mailto:${info.email}`}
              className="font-serif text-white text-lg block mb-10 relative w-fit group hover:opacity-80 transition-opacity duration-200"
            >
              {info.email}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
            </a>

            <div className="flex gap-4">
              {socialIcons.map(({ icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-white/20 text-white/40 flex items-center justify-center hover:border-white hover:text-white transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form */}
          <div
            ref={rightRef}
            style={{
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.65rem] tracking-[0.15em] text-white/40 uppercase">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="bg-transparent border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-white/60 transition-colors duration-200 placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.65rem] tracking-[0.15em] text-white/40 uppercase">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="bg-transparent border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-white/60 transition-colors duration-200 placeholder:text-white/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[0.65rem] tracking-[0.15em] text-white/40 uppercase">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                className="bg-transparent border border-white/20 text-white text-sm px-4 py-3 outline-none focus:border-white/60 transition-colors duration-200 placeholder:text-white/20 resize-none"
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <p className="text-xs text-green-400 tracking-wide">
                ✓ Message sent! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 tracking-wide">
                ✗ Something went wrong. Please try again.
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="bg-white text-off-black text-xs tracking-widest uppercase px-6 py-3 hover:opacity-80 transition-opacity duration-200 mt-2 disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
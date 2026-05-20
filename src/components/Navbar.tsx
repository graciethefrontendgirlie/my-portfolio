import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { info } from '../data/info'

const navLinks = ['About', 'Skills', 'Projects', 'Education', 'Contact']

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    const handleScroll = (id: string) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 bg-white/90 backdrop-blur-md border-b border-border-light"
            >
                <span className="font-serif font-bold text-[1.05rem] tracking-tight text-off-black truncate max-w-[180px] md:max-w-none">
                    {info.name}
                </span>

                {/* Desktop links */}
                <ul className="hidden lg:flex gap-10">
                    {navLinks.map((link) => (
                        <li key={link}>
                            <button
                                onClick={() => handleScroll(link)}
                                className="relative text-mid-gray text-sm tracking-wide pb-0.5 group transition-colors duration-200 hover:text-off-black"
                            >
                                {link}
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-off-black transition-all duration-300 group-hover:w-full" />
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-4">
                    {/* Desktop Download CV */}
                    <a
                        href="/cv.pdf"
                        download="Emmanuel_Grace_Okuchi_CV.pdf"
                        className="hidden lg:block bg-off-black text-white text-xs tracking-widest px-5 py-2 rounded-sm hover:opacity-75 transition-opacity duration-200"
                    >
                        Download CV
                    </a>

                    {/* Hamburger button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden flex flex-col gap-1.5 p-1"
                    >
                        <motion.span
                            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-px bg-off-black transition-all duration-300"
                        />
                        <motion.span
                            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-6 h-px bg-off-black transition-all duration-300"
                        />
                        <motion.span
                            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="block w-6 h-px bg-off-black transition-all duration-300"
                        />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-border-light lg:hidden"
                    >
                        <ul className="flex flex-col">
                            {navLinks.map((link) => (
                                <li key={link}>
                                    <button
                                        onClick={() => handleScroll(link)}
                                        className="w-full text-left px-8 py-4 text-sm text-mid-gray hover:text-off-black hover:bg-cream transition-colors duration-200 border-b border-border-light last:border-b-0"
                                    >
                                        {link}
                                    </button>
                                </li>
                            ))}
                            {/* Mobile Download CV */}
                            <li>
                                <a
                                    href="/cv.pdf"
                                    download="Emmanuel_Grace_Okuchi_CV.pdf"
                                    className="w-full block px-8 py-4 text-sm text-mid-gray hover:text-off-black hover:bg-cream transition-colors duration-200"
                                >
                                    Download CV
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence >
        </>
    )
}
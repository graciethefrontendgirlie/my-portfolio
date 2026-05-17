import { useReveal } from './useReveal'

interface Props {
    num : string
    title : string
    light? : boolean
}

export default function SectionHeader({ num, title, light = false }: Props) {
    const { ref, visible } = useReveal(0.3)

    return (
        <div
            ref={ref}
            className={`flex items-baseline gap-6 mb-14 pb-6 relative ${light ? 'border-white/10' : ''}`}
        >
            <span className={`text-xs tracking-[0.15em] font-sans ${light ? 'text-white/30' : 'text-mid-gray'}`}>
                {num}
            </span>
            <h2
                className={`font-serif font-bold tracking-tight ${light ? 'text-white' : 'text-off-black'}`}
                style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)' }}
            >
                {title}
            </h2>
            <span
                className={`absolute bottom-0 left-0 h-px transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${light ? 'bg-white/10' : 'bg-border-light'}`}
                style={{ width: visible ? '100%' : '0%'}}
            />
        </div>
    )
}
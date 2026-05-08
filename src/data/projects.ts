export interface Project{
    title: string
    description : string
    tags: string[]
    live: string 
    github: string
}

export const projects: Project[] = [
    {
        title: 'AI Chat Interface',
        description: 'ChatGPT-style UI with streaming responses, conversation history and markdown rendering.',
        tags: ['React', 'TypeScript', 'Tailwind'],
        live: '',
        github: '',
    },
    {
        title: 'Kanban Board',
        description: 'Drag-and-drop task management with multiple boards, column management and persistent state.',
        tags: ['React', 'TypeScript', 'Tailwind'],
        live: '',
        github: '',
    },
    {
        title: 'Finance Dashboard',
        description: 'Analytics dashboard with charts, filterable tables, and dark/light mode toggle.',
        tags: ['React', 'TypeScript', 'Recharts'],
        live: '',
        github: '',
    },
    {
        title: 'E-commerce Store',
        description: 'Full-stack storefront with product listing, cart, checkout and Next.js Server Actions.',
        tags: ['Next.js', 'TypeScript', 'Tailwind'],
        live: '',
        github: '',
    },
    {
        title: 'Dev Blog / CMS',
        description: 'MDX-powered developer blog with syntax highlighting, SEO metadata and static generation.',
        tags: ['Next.js', 'MDX', 'TypeScript'],
        live: '',
        github: '',
    },
]
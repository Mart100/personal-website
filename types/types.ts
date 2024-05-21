export interface ProjectData {
    id: string
    title: string
    image: string
    link: string | null
    code: string | null
    article: string | null
    created: Date
    score: number
    description: string
    techStack: string[]
    tags: string[]
}

export interface SkillData {
    logo?: string
    knowledge: number
    name: string
    duration: string
    big?: boolean
    icon: string
}
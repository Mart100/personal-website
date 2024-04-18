export interface ProjectData {
    title: string
    image: string
    link: string
    code: string
    created: Date
    score: number
    description: string
    isProcessed: boolean
    techStack: string[]
    tags: string[]
}

export interface SkillData {
    logo?: string
    knowledge: number
    name: string
    duration: string
    big?: boolean
    isProcessed: boolean
    icon: string
}
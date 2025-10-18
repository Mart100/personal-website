import type { ProjectData, SkillData } from "~~/types/types"


export async function fetchProjects() {
    const { data: projects } = await useFetch('/api/projects', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        key: 'projects',
        transform: (data: ProjectData[]) => {
            return data.map((project, index) => {
                project.created = new Date(project.created)
                return project
            })
        },
        default: () => [] as ProjectData[]
    })
    return projects
}

export async function fetchSkills() {
    const { data: skills } = await useFetch('/api/skills', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        key: 'skills',
        transform: (data: SkillData[]) => data,
        default: () => [] as SkillData[]
    })
    return skills
}
import type { ProjectData, SkillData } from "~/types/types"

export function parseProjectsJson(json: any): ProjectData[] {
    let projs = [] as ProjectData[]
    for (let project of json) {
        if (project.isProcessed != true) {
            let dateParts = project.created.split('/')
            let dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
            project.created = dateObject
            project.score = Number(project.score)
            project.image = project.image.replace('.png', 'm.png')
            project.isProcessed = true
        }
        projs.push(project)
    }
    return projs
}

export function parseSkillsJson(json: any): SkillData[] {
    let skills: SkillData[] = []
    for (let skill of json) {
        if (skill.isProcessed != true) {
            // if (skill.logo.startsWith('~/'))
            //     skill.logo = skill.logo.replace('~/', '../img/skills/')

            skill.isProcessed = true
        }
        skills.push(skill)
    }
    return skills
}
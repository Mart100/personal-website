import { PrismaClient } from '@prisma/client'
import type { ProjectData } from '~~/types/types'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const projects = await prisma.project.findMany({
        where: {},
    })

    const projects2: ProjectData[] = projects.map((project) => {
        let dateParts = project.created.split('/') as [string, string, string]
        let dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])

        return {
            title: project.title,
            image: project.image,
            link: project.link,
            code: project.code,
            created: dateObject,
            score: project.score,
            description: project.description,
            isProcessed: true,
            article: null,
            id: project.id.toString(),
            techStack: project.techStack,
            tags: project.tags,
        }
    })
    return projects2
})
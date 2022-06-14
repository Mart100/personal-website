import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const skills = await prisma.project.findMany({
    where: {},
  })
  return skills
})

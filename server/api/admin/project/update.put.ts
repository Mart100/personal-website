import { PrismaClient, type Project } from '@prisma/client';
import type { ProjectData } from '~/types/types';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Parse the request body to get the updated project data
  let updatedProjectData = await readBody(event) as ProjectData;
  const projectId = updatedProjectData.id;

  console.log(updatedProjectData)
  let projectCreatedDate = new Date(updatedProjectData.created);
  let projectCreatedDay = projectCreatedDate.getDay();
  let projectCreatedMonth = projectCreatedDate.getMonth();
  let projectCreatedYear = projectCreatedDate.getFullYear();
  let projectCreatedString = `${projectCreatedDay}/${projectCreatedMonth}/${projectCreatedYear}`;

  let updatedProjectDataParsed = {
    created: projectCreatedString,
    description: updatedProjectData.description,
    title: updatedProjectData.title,
    image: updatedProjectData.image,
    link: updatedProjectData.link,
    code: updatedProjectData.code,
    score: updatedProjectData.score,
    techStack: updatedProjectData.techStack,
    tags: updatedProjectData.tags,

  }


  // Check if the project ID is provided
  if (!projectId) {
    return createError({ statusCode: 400, statusMessage: 'Project ID is required' });
  }

  // Update the project in the database
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: updatedProjectDataParsed,
    });

    // Return the updated project data
    return setResponseStatus(event, 200);
  } catch (error) {
    // Handle potential errors, such as the project not being found
    console.error(error)
    return createError({ statusCode: 500, statusMessage: 'Failed to update the project' });
  }
});
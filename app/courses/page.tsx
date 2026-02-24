import { prisma } from '@/lib/prisma'
import CoursesClient from './CourseClient'
async function getAllCourses() {
  return await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      courseModules: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}

export default async function CoursesPage() {
  const courses = await getAllCourses()
  
  
  const coursesWithCount = courses.map(course => ({
    id: course.id,
    name: course.name,
    slug: course.slug,
    description: course.description,
    moduleCount: course.courseModules.length,
  }))

  return <CoursesClient courses={coursesWithCount} />
}
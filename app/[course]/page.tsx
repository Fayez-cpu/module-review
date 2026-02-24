import { prisma } from '@/lib/prisma'
import CourseClient from './CourseClient'

type Props = {
  params: Promise<{
    course: string;
  }>;
};

async function getCourseModules(courseSlug: string) {
  const course = await prisma.course.findUnique({
    where: { slug: courseSlug },
    include: {
      courseModules: {
        include: {
          module: {
            select: {
              id: true,
              name: true,
              slug: true,
              year: true,
              credits: true,
            },
          },
        },
      },
    },
  })

  if (!course) {
    return []
  }

  return course.courseModules.map((cm) => cm.module)
}

export default async function CoursePage({ params }: Props) {
  const { course } = await params;
  const modules = await getCourseModules(course);

  return <CourseClient courseSlug={course} modules={modules} />;
}
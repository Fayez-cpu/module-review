import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import ModuleClient from './ModuleClient'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    course: string
    module: string
  }>
}

async function getModuleWithReviews(moduleSlug: string) {
  return await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: {
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              course: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      courseModules: {
        include: {
          course: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  })
}

export default async function ModulePage({ params }: Props) {
  const { course, module: moduleSlug } = await params
  const session = await auth()
  
  const moduleData = await getModuleWithReviews(moduleSlug)
  console.log(moduleData)
  console.log(moduleData?.courseModules)
  if (!moduleData) {
    notFound()
  }

  // Convert Decimal to number before passing to client
  const module = {
    ...moduleData,
    teachingRating: Number(moduleData.teachingRating),
    assessmentRating: Number(moduleData.assessmentRating),
    contentRating: Number(moduleData.contentRating),
    supportRating: Number(moduleData.supportRating),
    overallRating: Number(moduleData.overallRating),
    reviews: moduleData.reviews.map(review => ({
      ...review,
      overallRating: Number(review.overallRating),
      createdAt: review.createdAt.toISOString(), // Also convert Date
    })),
  }

  // Check if user has already reviewed this module
  const userReview = session?.user
    ? module.reviews.find((r) => r.userId === (session.user.id))
    : null

  return (
    <ModuleClient
      module={module}
      courseSlug={course}
      session={session}
      userReview={userReview}
    />
  )
}
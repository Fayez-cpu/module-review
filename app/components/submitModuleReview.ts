'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function submitModuleReview(formData: FormData) {
  // Check authentication
  const session = await auth()
  if (!session?.user) {
    throw new Error('You must be signed in to submit a review')
  }

  const userId = (session.user as any).id
  const moduleId = formData.get('moduleId') as string
  const teachingRating = parseInt(formData.get('teachingRating') as string)
  const assessmentRating = parseInt(formData.get('assessmentRating') as string)
  const contentRating = parseInt(formData.get('contentRating') as string)
  const supportRating = parseInt(formData.get('supportRating') as string)
  const feedback = formData.get('feedback') as string

  // Get user data
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { course: true }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Get module with its courses
  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      courseModules: {
        include: {
          course: {
            select: { name: true }
          }
        }
      }
    }
  })

  if (!module) {
    throw new Error('Module not found')
  }

  // Check if user's course matches any of the module's courses
  const moduleCourses = module.courseModules.map(cm => cm.course.name)
  
  if (!user.course || !moduleCourses.includes(user.course)) {
    throw new Error('You can only review modules from your own course')
  }

  // Check if user has already reviewed this module
  const existingReview = await prisma.review.findUnique({
    where: {
      userId_moduleId: {
        userId,
        moduleId,
      },
    },
  })

  if (existingReview) {
    throw new Error('You have already reviewed this module')
  }

  // Calculate overall rating (average of all ratings)
  const overallRating = (teachingRating + assessmentRating + contentRating + supportRating) / 4

  // Create the review
  await prisma.review.create({
    data: {
      userId,
      moduleId,
      teachingRating,
      assessmentRating,
      contentRating,
      supportRating,
      overallRating,
      feedback,
    },
  })

  // Recalculate module aggregate ratings
  await updateModuleRatings(moduleId)

  // Revalidate the module page
  revalidatePath('/[course]/[module]')

  return { success: true }
}

async function updateModuleRatings(moduleId: string) {
  const reviews = await prisma.review.findMany({
    where: { moduleId },
    select: {
      teachingRating: true,
      assessmentRating: true,
      contentRating: true,
      supportRating: true,
      overallRating: true,
    },
  })

  const count = reviews.length

  if (count === 0) {
    await prisma.module.update({
      where: { id: moduleId },
      data: {
        teachingRating: 0,
        assessmentRating: 0,
        contentRating: 0,
        supportRating: 0,
        overallRating: 0,
        reviewCount: 0,
      },
    })
    return
  }

  const avgTeaching = reviews.reduce((sum, r) => sum + r.teachingRating, 0) / count
  const avgAssessment = reviews.reduce((sum, r) => sum + r.assessmentRating, 0) / count
  const avgContent = reviews.reduce((sum, r) => sum + r.contentRating, 0) / count
  const avgSupport = reviews.reduce((sum, r) => sum + r.supportRating, 0) / count
  const avgOverall = reviews.reduce((sum, r) => sum + Number(r.overallRating), 0) / count

  await prisma.module.update({
    where: { id: moduleId },
    data: {
      teachingRating: avgTeaching,
      assessmentRating: avgAssessment,
      contentRating: avgContent,
      supportRating: avgSupport,
      overallRating: avgOverall,
      reviewCount: count,
    },
  })
}
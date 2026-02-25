import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import OnboardingForm from './OnboardingForm'

export default async function OnboardingPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  // If they already set their course, redirect to courses
  if (session.user.course) {
    redirect('/courses')
  }

  // Get available courses
  const courses = await prisma.course.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return <OnboardingForm courses={courses} />
}
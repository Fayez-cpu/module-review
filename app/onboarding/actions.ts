'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function updateUserProfile(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('Not authenticated')
  }

  const name = formData.get('name') as string
  const course = formData.get('course') as string

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name,
      course,},
  })

  redirect('/courses')
}
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ProfileClient from './ProfileClient'

async function getUserWithReviews(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      email: true,
      course: true,
      reviews: {
        select: {
          id: true,
          teachingRating: true,
          assessmentRating: true,
          contentRating: true,
          supportRating: true,
          overallRating: true,
          feedback: true,
          createdAt: true,
          module: {
            select: {
              name: true,
              slug: true,
              courseModules: {
                take: 1,
                select: {
                  course: { select: { slug: true } },
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  })
}

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user?.id) {
    redirect('/login')
  }

  const user = await getUserWithReviews(session.user.id)

  if (!user) {
    redirect('/login')
  }

  const reviews = user.reviews.map((r) => ({
    ...r,
    overallRating: Number(r.overallRating),
    createdAt: r.createdAt.toISOString(),
  }))

  const initials = user.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : (user.email?.[0]?.toUpperCase() ?? '?')

  return (
    <ProfileClient
      name={user.name}
      email={user.email ?? null}
      course={user.course ?? null}
      initials={initials}
      reviews={reviews}
    />
  )
}

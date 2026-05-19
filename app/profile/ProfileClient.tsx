'use client'

import Link from 'next/link'

type Review = {
  id: string
  teachingRating: number
  assessmentRating: number
  contentRating: number
  supportRating: number
  overallRating: number
  feedback: string | null
  createdAt: string
  module: {
    name: string
    slug: string
    year: number | null
  }
}

type Props = {
  name: string | null
  email: string | null
  course: string | null
  initials: string
  reviews: Review[]
}

function toCourseSlug(courseName: string) {
  return courseName.toLowerCase().replace(/\s+/g, '-')
}

function groupByYear(reviews: Review[]) {
  const map: Record<number, Review[]> = {}
  for (const review of reviews) {
    const year = review.module.year ?? 0
    if (!map[year]) map[year] = []
    map[year].push(review)
  }
  return Object.entries(map)
    .map(([year, items]) => ({ year: Number(year), items }))
    .sort((a, b) => a.year - b.year)
}

export default function ProfileClient({ name, email, course, initials, reviews }: Props) {
  const courseSlug = course ? toCourseSlug(course) : null
  const grouped = groupByYear(reviews)

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container" style={{ maxWidth: '800px' }}>

        {/* Profile card */}
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="d-flex align-items-center gap-4">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold fs-4 flex-shrink-0"
                style={{ width: 72, height: 72 }}
              >
                {initials}
              </div>
              <div>
                <h1 className="h3 fw-bold mb-1">{name ?? 'No name set'}</h1>
                <p className="text-secondary mb-1">{email}</p>
                {course && (
                  <span className="badge text-bg-primary">{course}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <h2 className="h4 mb-3">My Reviews</h2>

        {reviews.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <p className="text-secondary mb-3">You haven't left any reviews yet.</p>
              <Link href="/courses" className="btn btn-primary">Browse Courses</Link>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {grouped.map(({ year, items }) => (
              <div key={year}>
                <h3 className="h6 text-uppercase text-secondary fw-semibold mb-3">
                  {year === 0 ? 'Year unknown' : `Year ${year}`}
                </h3>
                <div className="d-flex flex-column gap-3">
                  {items.map((review) => (
                    <div key={review.id} className="card border-0 shadow-sm">
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h4 className="h5 mb-1">
                              {courseSlug ? (
                                <Link
                                  href={`/${courseSlug}/${review.module.slug}`}
                                  className="text-decoration-none"
                                >
                                  {review.module.name}
                                </Link>
                              ) : (
                                review.module.name
                              )}
                            </h4>
                            <small className="text-secondary">
                              {new Date(review.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </small>
                          </div>
                          <span className="badge text-bg-warning fs-6 px-3 py-2">
                            ⭐ {review.overallRating.toFixed(1)}
                          </span>
                        </div>

                        <div className="row g-2 mb-3">
                          {[
                            { label: 'Teaching', value: review.teachingRating },
                            { label: 'Assessment', value: review.assessmentRating },
                            { label: 'Content', value: review.contentRating },
                            { label: 'Support', value: review.supportRating },
                          ].map(({ label, value }) => (
                            <div key={label} className="col-6 col-sm-3">
                              <div className="bg-light rounded p-2 text-center">
                                <div className="fw-semibold">{value}/5</div>
                                <div className="text-secondary small">{label}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {review.feedback && (
                          <p className="text-secondary mb-0">{review.feedback}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

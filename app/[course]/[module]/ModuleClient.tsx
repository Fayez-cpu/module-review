'use client'

import { useState } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import SubmitReview from './SubmitReview'
import { submitReviewy } from '@/app/lib/actions'


type Review = {
  id: string
  teachingRating: number
  assessmentRating: number
  contentRating: number
  supportRating: number
  overallRating: number
  feedback: string | null
  createdAt: Date
  user: {
    name: string | null
    course: string | null
    enrollmentYear: number | null
  }
}

type Module = {
  id: string
  name: string
  slug: string
  year: number | null
  credits: number | null
  description: string | null
  teachingRating: number
  assessmentRating: number
  contentRating: number
  supportRating: number
  overallRating: number
  reviewCount: number
  reviews: Review[]
  courseModules: Array<{
    course: {
      name: string
      slug: string
    }
  }>
}

type Props = {
  module: Module
  courseSlug: string
  session: any
  userReview: Review | null
}

function StarRating({ rating }: { rating: number }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.round(rating) ? 'text-warning' : 'text-muted'}>
        ★
      </span>
    )
  }
  return <span className="fs-5">{stars}</span>
}

export default function ModuleClient({ module, courseSlug, session, userReview }: Props) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    if (!session?.user.course){
      redirect("/onboarding")
    }
    try {
      
      // Refresh page to show new review
      console.log(session)
      const reviewResult = await SubmitReview(formData)
      console.log("result it")
    } catch (error) {
      alert('Failed to submit review. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">


        {/* Module Header */}
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="h2 fw-bold mb-2">{module.name}</h1>
              <div className="d-flex flex-wrap gap-3 text-secondary">
                {module.year && <span>Year {module.year}</span>}
                {module.credits && <span>• {module.credits} credits</span>}
                <span>• {module.reviewCount} reviews</span>
              </div>
              {module.description && (
                <p className="mt-3 mb-0 text-secondary">{module.description}</p>
              )}
            </div>
            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
              <div className="d-inline-block bg-primary bg-opacity-10 rounded-3 p-3">
                <div className="h1 fw-bold text-primary mb-0">
                  {module.overallRating > 0 ? module.overallRating.toFixed(1) : 'N/A'}
                </div>
                <StarRating rating={Number(module.overallRating)} />
                <div className="small text-muted">Overall Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h2 className="h5 fw-bold mb-3">Rating Breakdown</h2>
          <div className="row g-3">
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <div className="h4 fw-bold mb-1">
                  {module.teachingRating > 0 ? module.teachingRating.toFixed(1) : 'N/A'}
                </div>
                <StarRating rating={Number(module.teachingRating)} />
                <div className="small text-muted mt-2">Teaching Quality</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <div className="h4 fw-bold mb-1">
                  {module.assessmentRating > 0 ? module.assessmentRating.toFixed(1) : 'N/A'}
                </div>
                <StarRating rating={Number(module.assessmentRating)} />
                <div className="small text-muted mt-2">Assessment Fairness</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <div className="h4 fw-bold mb-1">
                  {module.contentRating > 0 ? module.contentRating.toFixed(1) : 'N/A'}
                </div>
                <StarRating rating={Number(module.contentRating)} />
                <div className="small text-muted mt-2">Content Quality</div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-center p-3 bg-light rounded">
                <div className="h4 fw-bold mb-1">
                  {module.supportRating > 0 ? module.supportRating.toFixed(1) : 'N/A'}
                </div>
                <StarRating rating={Number(module.supportRating)} />
                <div className="small text-muted mt-2">Lecturer Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {session && !userReview && (
          <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h5 fw-bold mb-0">Leave a Review</h2>
              {!showReviewForm && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowReviewForm(true)}
                >
                  Write Review
                </button>
              )}
            </div>

            {showReviewForm && (
              <form action={handleSubmit}>
                <input type="hidden" name="moduleId" value={module.id} />

                <div className="row g-3 mb-3">
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Teaching Quality</label>
                    <select name="teachingRating" className="form-select" required>
                      <option value="">Select...</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Very Poor</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Assessment Fairness</label>
                    <select name="assessmentRating" className="form-select" required>
                      <option value="">Select...</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Very Poor</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Content Quality</label>
                    <select name="contentRating" className="form-select" required>
                      <option value="">Select...</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Very Poor</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Lecturer Support</label>
                    <select name="supportRating" className="form-select" required>
                      <option value="">Select...</option>
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Good</option>
                      <option value="3">3 - Average</option>
                      <option value="2">2 - Poor</option>
                      <option value="1">1 - Very Poor</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Your Review</label>
                  <textarea
                    name="feedback"
                    className="form-control"
                    rows={4}
                    placeholder="Share your experience with this module (optional)"
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Already Reviewed Message */}
        {session && userReview && (
          <div className="alert alert-info mb-4">
            You've already reviewed this module. Thank you for your feedback!
          </div>
        )}

        {/* Sign In Prompt */}
        {!session && (
          <div className="bg-white rounded-3 shadow-sm p-4 mb-4 text-center">
            <h3 className="h5 fw-bold mb-2">Want to leave a review?</h3>
            <p className="text-secondary mb-3">
              Sign in with your university email to share your experience
            </p>
            <Link href="/login" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        )}

        {/* Reviews List */}
        <div className="bg-white rounded-3 shadow-sm p-4">
          <h2 className="h5 fw-bold mb-4">Student Reviews ({module.reviews.length})</h2>

          {module.reviews.length === 0 ? (
            <div className="text-center py-5 text-muted">
              <p className="mb-0">No reviews yet. Be the first to review this module!</p>
            </div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {module.reviews.map((review) => (
                <div key={review.id} className="border-bottom pb-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="small text-muted">
                        {review.user.course && `${review.user.course} • `}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold text-primary">
                        {Number(review.overallRating).toFixed(1)}
                      </div>
                      <StarRating rating={Number(review.overallRating)} />
                    </div>
                  </div>

                  <div className="d-flex gap-3 mb-2 small">
                    <span>Teaching: {review.teachingRating}/5</span>
                    <span>Assessment: {review.assessmentRating}/5</span>
                    <span>Content: {review.contentRating}/5</span>
                    <span>Support: {review.supportRating}/5</span>
                  </div>

                  {review.feedback && (
                    <p className="mb-0 text-secondary">{review.feedback}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
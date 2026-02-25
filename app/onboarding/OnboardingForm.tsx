'use client'

import { useState } from 'react'
import { updateUserProfile } from './actions'

type Course = { id: string; name: string }

export default function OnboardingForm({ courses }: { courses: Course[] }) {
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setSubmitting(true)
    updateUserProfile(formData)
    setSubmitting(false)
  }

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container" style={{ maxWidth: '540px' }}>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <div className="display-4 mb-3">👋</div>
              <h1 className="h3 fw-bold mb-2">Welcome!</h1>
              <p className="text-muted">Let's set up your profile</p>
            </div>

            <form action={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="form-label fw-semibold">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="course" className="form-label fw-semibold">
                  Your Course
                </label>
                <select
                  id="course"
                  name="course"
                  className="form-select form-select-lg"
                  required
                >
                  <option value="">Select your course...</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={submitting}
              >
                {submitting ? 'Saving...' : 'Complete Setup'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
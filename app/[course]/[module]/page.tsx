"use client";

import { FormEvent, use, useMemo, useState } from "react";
import { submitReview } from "@/app/lib/actions";

type Review = {
  id: number;
  reviewer: string;
  teachingRating: number;
  assessmentRating: number;
  contentRating: number;
  supportRating: number;
  feedback: string;
  date: string;
};

type Props = {
  params: Promise<{
    course: string;
    module: string;
  }>;
};

const moduleCatalog: Record<
  string,
  {
    name: string;
    code: string;
    credits: number;
    semester: string;
    description: string;
  }
> = {
  "4cs401": {
    name: "Programming Principles",
    code: "4CS401",
    credits: 20,
    semester: "Semester 1",
    description: "Core programming foundations with problem solving and clean coding practices.",
  },
  "4cs402": {
    name: "Computer Systems",
    code: "4CS402",
    credits: 20,
    semester: "Semester 1",
    description: "Introduces computer architecture, operating systems, and low-level concepts.",
  },
  "5cs501": {
    name: "Software Engineering",
    code: "5CS501",
    credits: 20,
    semester: "Semester 1",
    description: "Focuses on agile teamwork, software design, and delivery of real projects.",
  },
  "5cs502": {
    name: "Data Analytics",
    code: "5CS502",
    credits: 20,
    semester: "Semester 1",
    description: "Covers data wrangling, analysis, and communicating insights with modern tools.",
  },
  "5cs503": {
    name: "Cyber Security Fundamentals",
    code: "5CS503",
    credits: 20,
    semester: "Semester 2",
    description: "Practical security foundations including risk, vulnerabilities, and mitigation.",
  },
  "6cs604": {
    name: "Final Year Project",
    code: "6CS604",
    credits: 40,
    semester: "Full Year",
    description: "An independent project applying technical and research skills to a substantial topic.",
  },
};

const initialReviews: Review[] = [
  {
    id: 1,
    reviewer: "A. Student",
    teachingRating: 5,
    assessmentRating: 4,
    contentRating: 5,
    supportRating: 5,
    feedback:
      "Clear lectures and practical lab sessions. Assessment brief was detailed and fair.",
    date: "2026-01-14",
  },
  {
    id: 2,
    reviewer: "B. Student",
    teachingRating: 4,
    assessmentRating: 4,
    contentRating: 4,
    supportRating: 4,
    feedback:
      "Great module overall. Workload is manageable if you keep up weekly with labs.",
    date: "2025-12-03",
  },
  {
    id: 3,
    reviewer: "C. Student",
    teachingRating: 4,
    assessmentRating: 3,
    contentRating: 4,
    supportRating: 4,
    feedback:
      "Useful content for employability. I would have liked more feedback before final submission.",
    date: "2025-11-20",
  },
];

function getOverallRating(review: Review): number {
  return (
    (review.teachingRating +
      review.assessmentRating +
      review.contentRating +
      review.supportRating) /
    4
  );
}

function renderStars(rating: number): string {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

type StarRatingInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function StarRatingInput({ label, value, onChange }: StarRatingInputProps) {
  return (
    <div className="mb-3">
      <label className="form-label d-block">{label}</label>
      <div className="d-flex gap-1 flex-wrap">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            key={`${label}-${starValue}`}
            type="button"
            className={`btn btn-sm ${
              starValue <= value ? "btn-warning" : "btn-outline-secondary"
            }`}
            onClick={() => onChange(starValue)}
            aria-label={`${label} ${starValue} out of 5`}
          >
            ★
          </button>
        ))}
        <span className="small text-secondary align-self-center ms-2">{value}/5</span>
      </div>
    </div>
  );
}

function formatCourseName(slug: string): string {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function formatModuleName(slug: string): string {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ModulePage({ params }: Props) {
  const { course, module } = use(params);
  const moduleKey = module.toLowerCase();
  const courseName = formatCourseName(course);
  const moduleInfo = moduleCatalog[moduleKey];

  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [teachingRating, setTeachingRating] = useState<number>(0);
  const [assessmentRating, setAssessmentRating] = useState<number>(0);
  const [contentRating, setContentRating] = useState<number>(0);
  const [supportRating, setSupportRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + getOverallRating(review), 0);
    return total / reviews.length;
  }, [reviews]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedFeedback = feedback.trim();

    if (!trimmedFeedback) {
      return;
    }

    const formData = new FormData();
    formData.append("courseSlug", course);
    formData.append("moduleSlug", module);
    formData.append("teachingRating", String(teachingRating));
    formData.append("assessmentRating", String(assessmentRating));
    formData.append("contentRating", String(contentRating));
    formData.append("supportRating", String(supportRating));
    formData.append("feedback", trimmedFeedback);

    await submitReview(formData);

    const newReview: Review = {
      id: Date.now(),
      reviewer: "You",
      teachingRating,
      assessmentRating,
      contentRating,
      supportRating,
      feedback: trimmedFeedback,
      date: new Date().toISOString().slice(0, 10),
    };

    setReviews((prev) => [newReview, ...prev]);
    setTeachingRating(5);
    setAssessmentRating(5);
    setContentRating(5);
    setSupportRating(5);
    setFeedback("");
  }

  const title = moduleInfo?.name ?? formatModuleName(module);
  const code = moduleInfo?.code ?? module.toUpperCase();

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <p className="text-uppercase text-primary fw-semibold small mb-2">{courseName}</p>
          <h1 className="h2 fw-bold mb-2">{title}</h1>
          <p className="text-secondary mb-0">University of Derby module review and student feedback.</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h5 mb-3">Module details</h2>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-secondary">Code</span>
                  <strong>{code}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-secondary">Credits</span>
                  <strong>{moduleInfo?.credits ?? "TBC"}</strong>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <span className="text-secondary">Semester</span>
                  <strong>{moduleInfo?.semester ?? "TBC"}</strong>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span className="text-secondary">Average rating</span>
                  <strong>{averageRating.toFixed(1)} / 5</strong>
                </div>
                <p className="small text-secondary mb-0 mt-2">
                  {moduleInfo?.description ?? "Module description will be available soon."}
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h5 mb-3">Write a review</h2>
                <form onSubmit={handleSubmit}>
                  <StarRatingInput
                    label="Teaching quality"
                    value={teachingRating}
                    onChange={setTeachingRating}
                  />
                  <StarRatingInput
                    label="Assessments"
                    value={assessmentRating}
                    onChange={setAssessmentRating}
                  />
                  <StarRatingInput
                    label="Module content"
                    value={contentRating}
                    onChange={setContentRating}
                  />
                  <StarRatingInput
                    label="Support and feedback"
                    value={supportRating}
                    onChange={setSupportRating}
                  />

                  <div className="mb-3">
                    <label htmlFor="feedback" className="form-label">
                      Written feedback
                    </label>
                    <textarea
                      id="feedback"
                      className="form-control"
                      rows={4}
                      value={feedback}
                      onChange={(event) => setFeedback(event.target.value)}
                      placeholder="Share your experience of this module"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    Submit review
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="h4 mb-0">Student reviews</h2>
              <span className="badge text-bg-primary">{reviews.length} reviews</span>
            </div>

            <div className="vstack gap-3">
              {reviews.map((review) => (
                <article className="card border-0 shadow-sm" key={review.id}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h3 className="h6 mb-0">{review.reviewer}</h3>
                      <span className="badge text-bg-success">
                        {getOverallRating(review).toFixed(1)} / 5
                      </span>
                    </div>
                    <p className="small text-secondary mb-2">
                      Teaching: {renderStars(review.teachingRating)} | Assessments:{" "}
                      {renderStars(review.assessmentRating)} | Content:{" "}
                      {renderStars(review.contentRating)} | Support:{" "}
                      {renderStars(review.supportRating)}
                    </p>
                    <p className="mb-2">{review.feedback}</p>
                    <p className="small text-secondary mb-0">Reviewed on {review.date}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

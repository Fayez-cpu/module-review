"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

type Course = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  moduleCount: number;
};

type Props = {
  courses: Course[];
};

export default function CoursesClient({ courses }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter courses by search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      return courses;
    }

    const query = searchQuery.toLowerCase();
    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="mb-4">
          <p className="text-uppercase text-primary fw-semibold small mb-2">
            University of Derby
          </p>
          <h1 className="h2 fw-bold mb-2">Browse Courses</h1>
          <p className="text-secondary mb-0">
            Select a course to view modules and student reviews.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <div className="bg-white border rounded-3 p-3 shadow-sm">
            <label htmlFor="courseSearch" className="form-label fw-semibold mb-2">
              Search courses
            </label>
            <input
              id="courseSearch"
              type="text"
              className="form-control"
              placeholder="Search by course name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Available Courses</h2>
          <span className="badge text-bg-primary">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </span>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="alert alert-info">
            No courses found matching "{searchQuery}".
          </div>
        ) : (
          <div className="row g-4">
            {filteredCourses.map((course) => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <Link
                  href={`/${course.slug}`}
                  className="text-decoration-none"
                >
                  <div className="card h-100 border-0 shadow-sm">
                    <div className="card-body d-flex flex-column">
                      <div className="d-flex align-items-center mb-3">
                        <div className="display-6 me-3">🎓</div>
                        <h3 className="h5 mb-0">{course.name}</h3>
                      </div>
                      
                      {course.description && (
                        <p className="text-secondary mb-3 flex-grow-1">
                          {course.description}
                        </p>
                      )}
                      
                      <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                        <span className="text-secondary small">
                          {course.moduleCount} {course.moduleCount === 1 ? 'module' : 'modules'}
                        </span>
                        <span className="text-primary fw-semibold small">
                          View modules →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Module = {
  id: string;
  name: string;
  slug: string;
  year: number;
  credits: number | null;
};

type Props = {
  courseSlug: string;
  modules: Module[];
};

function prettifyCourseSlug(slug: string): string {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CourseClient({ courseSlug, modules }: Props) {
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const courseName = prettifyCourseSlug(courseSlug);

  // Get available years from modules
  const availableYears = useMemo(() => {
    const years = [...new Set(modules.map((m) => m.year))].sort();
    return years.length > 0 ? years : [1, 2, 3];
  }, [modules]);

  // Filter modules by selected year
  const displayedModules = useMemo(
    () => modules.filter((m) => m.year === selectedYear),
    [modules, selectedYear]
  );

  // Set first available year as default on mount
  useMemo(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  return (
    <main className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
          <div>
            <p className="text-uppercase text-primary fw-semibold small mb-2">
              University of Derby
            </p>
            <h1 className="h2 fw-bold mb-2">{courseName}</h1>
            <p className="text-secondary mb-0">
              Browse modules and pick a year to view the relevant module list.
            </p>
          </div>

          <div
            className="bg-white border rounded-3 p-3 shadow-sm"
            style={{ minWidth: "220px" }}
          >
            <label htmlFor="yearSelect" className="form-label fw-semibold mb-2">
              Select your year
            </label>
            <select
              id="yearSelect"
              className="form-select"
              value={selectedYear}
              onChange={(event) => setSelectedYear(Number(event.target.value))}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Year {selectedYear} Modules</h2>
          <span className="badge text-bg-primary">
            {displayedModules.length} modules
          </span>
        </div>

        {displayedModules.length === 0 ? (
          <div className="alert alert-info">
            No modules found for Year {selectedYear}.
          </div>
        ) : (
          <div className="row g-4">
            {displayedModules.map((module) => (
              <div className="col-md-6 col-lg-4" key={module.id}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h3 className="h5 mb-2">{module.name}</h3>
                    <p className="text-secondary mb-3">Year {module.year}</p>
                    <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                      <span className="text-secondary small">
                        {module.credits || 15} credits
                      </span>
                      <Link
                        className="btn btn-sm btn-outline-primary"
                        href={`/${courseSlug}/${module.slug}`}
                      >
                        View reviews
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
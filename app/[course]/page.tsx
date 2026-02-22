"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type ModuleItem = {
  code: string;
  name: string;
  credits: number;
  semester: string;
};

type Props = {
  params: Promise<{
    course: string;
  }>;
};

const modulesByYear: Record<number, ModuleItem[]> = {
  1: [
    {
      code: "4CS401",
      name: "Programming Principles",
      credits: 20,
      semester: "Semester 1",
    },
    {
      code: "4CS402",
      name: "Computer Systems",
      credits: 20,
      semester: "Semester 1",
    },
    {
      code: "4CS403",
      name: "Web Development Fundamentals",
      credits: 20,
      semester: "Semester 2",
    },
    {
      code: "4CS404",
      name: "Databases and Data Modelling",
      credits: 20,
      semester: "Semester 2",
    },
  ],
  2: [
    {
      code: "5CS501",
      name: "Software Engineering",
      credits: 20,
      semester: "Semester 1",
    },
    {
      code: "5CS502",
      name: "Data Analytics",
      credits: 20,
      semester: "Semester 1",
    },
    {
      code: "5CS503",
      name: "Cyber Security Fundamentals",
      credits: 20,
      semester: "Semester 2",
    },
    {
      code: "5CS504",
      name: "Human Computer Interaction",
      credits: 20,
      semester: "Semester 2",
    },
  ],
  3: [
    {
      code: "6CS601",
      name: "Advanced Software Development",
      credits: 20,
      semester: "Semester 1",
    },
    {
      code: "6CS602",
      name: "Cloud and Distributed Systems",
      credits: 20,
      semester: "Semester 1",
    },
    {
      code: "6CS603",
      name: "Machine Learning Applications",
      credits: 20,
      semester: "Semester 2",
    },
    {
      code: "6CS604",
      name: "Final Year Project",
      credits: 40,
      semester: "Full Year",
    },
  ],
};

const availableYears = [1, 2, 3];

function prettifyCourseSlug(slug: string): string {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CoursePage({ params }: Props) {
  const { course } = use(params);
  const [selectedYear, setSelectedYear] = useState<number>(1);
  const courseName = prettifyCourseSlug(course);
  const { data: session } = useSession();
  console.log("User session:", session);

  const displayedModules = useMemo(
    () => modulesByYear[selectedYear] ?? [],
    [selectedYear],
  );

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

          <div className="bg-white border rounded-3 p-3 shadow-sm" style={{ minWidth: "220px" }}>
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
          <span className="badge text-bg-primary">{displayedModules.length} modules</span>
        </div>

        <div className="row g-4">
          {displayedModules.map((module) => (
            <div className="col-md-6 col-lg-4" key={module.code}>
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <p className="small text-secondary mb-2">{module.code}</p>
                  <h3 className="h5 mb-2">{module.name}</h3>
                  <p className="text-secondary mb-3">{module.semester}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                    <span className="text-secondary small">{module.credits} credits</span>
                    <Link
                      className="btn btn-sm btn-outline-primary"
                      href={`/${course}/${module.code.toLowerCase()}`}
                    >
                      View reviews
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

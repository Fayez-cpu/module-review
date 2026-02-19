export default function Home() {
  const featuredModules = [
    {
      name: "Software Engineering",
      code: "5CS501",
      rating: "4.7/5",
      reviews: 182,
      detail: "Team projects, real client briefs, and practical agile delivery.",
    },
    {
      name: "Data Analytics",
      code: "5CS502",
      rating: "4.5/5",
      reviews: 146,
      detail: "Python-driven analysis with meaningful, real-world datasets.",
    },
    {
      name: "Cyber Security Fundamentals",
      code: "5CS503",
      rating: "4.6/5",
      reviews: 129,
      detail: "Hands-on labs in threat modelling, hardening, and risk control.",
    },
  ];

  const steps = [
    {
      title: "Select your course",
      text: "Choose your degree pathway and see the modules attached to it.",
    },
    {
      title: "Leave a module review",
      text: "Rate teaching quality, workload, assessment fairness, and support.",
    },
    {
      title: "Help future students",
      text: "Share honest feedback so others can make informed choices.",
    },
  ];

  return (
    <div className="bg-light">
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
        <div className="container py-2">
          <a className="navbar-brand fw-bold text-primary" href="#">
            University of Derby
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-controls="navbarMain"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#how-it-works">
                  How it works
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#modules">
                  Modules
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#cta">
                  Get started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="py-5 bg-primary text-white">
        <div className="container py-4">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <p className="text-uppercase mb-2 fw-semibold small">Module Review Platform</p>
              <h1 className="display-5 fw-bold mb-3">
                Honest student feedback for every University of Derby module
              </h1>
              <p className="lead mb-4 opacity-75">
                Discover what current students say about teaching quality, assessment style,
                and workload before picking your modules.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#cta" className="btn btn-light btn-lg px-4 fw-semibold">
                  Leave a Review
                </a>
                <a href="#modules" className="btn btn-outline-light btn-lg px-4">
                  Browse Modules
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h2 className="h5 text-dark mb-3">Platform Snapshot</h2>
                  <div className="d-flex justify-content-between border-bottom py-2 text-dark">
                    <span>Total reviews</span>
                    <strong>1,240+</strong>
                  </div>
                  <div className="d-flex justify-content-between border-bottom py-2 text-dark">
                    <span>Modules listed</span>
                    <strong>180+</strong>
                  </div>
                  <div className="d-flex justify-content-between py-2 text-dark">
                    <span>Courses covered</span>
                    <strong>35+</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="how-it-works" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How it works</h2>
            <p className="text-secondary mb-0">
              A quick way to share and discover module experiences across your course.
            </p>
          </div>
          <div className="row g-4">
            {steps.map((step, index) => (
              <div className="col-md-4" key={step.title}>
                <div className="card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <span className="badge text-bg-primary mb-3">Step {index + 1}</span>
                    <h3 className="h5">{step.title}</h3>
                    <p className="text-secondary mb-0">{step.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="modules" className="pb-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h2 className="fw-bold mb-1">Featured modules</h2>
              <p className="text-secondary mb-0">Most-reviewed modules this semester</p>
            </div>
          </div>

          <div className="row g-4">
            {featuredModules.map((module) => (
              <div className="col-md-6 col-lg-4" key={module.code}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <p className="small text-secondary mb-2">{module.code}</p>
                    <h3 className="h5 mb-2">{module.name}</h3>
                    <p className="text-secondary mb-3">{module.detail}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge text-bg-success">{module.rating}</span>
                      <span className="text-secondary small">{module.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-5 bg-white border-top">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to review your modules?</h2>
          <p className="text-secondary mb-4">
            Sign in with your student account and help improve module transparency at the
            University of Derby.
          </p>
          <a href="#" className="btn btn-primary btn-lg px-5">
            Start Reviewing
          </a>
        </div>
      </section>
    </div>
  );
}

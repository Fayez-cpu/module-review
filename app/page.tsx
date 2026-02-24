// app/page.tsx
"use client"
import Link from 'next/link'

export default function HomePage() {

  return (
    <>
      {/* Hero Section - Bold Editorial Style */}
      <section className="position-relative overflow-hidden bg-dark text-white">
        <div 
          className="position-absolute w-100 h-100 opacity-10"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        ></div>
        
        <div className="container position-relative py-5" style={{ minHeight: '85vh' }}>
          <div className="row align-items-center" style={{ minHeight: '75vh' }}>
            <div className="col-lg-7">
              <div className="mb-3">
                <span className="badge bg-primary px-3 py-2 rounded-pill">
                  Student Reviews Platform
                </span>
              </div>
              
              <h1 
                className="display-1 fw-bold mb-4"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 6rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em',
                }}
              >
                Real Reviews.<br />
                <span className="text-primary">Real Students.</span>
              </h1>
              
              <p className="lead mb-4 text-white-50" style={{ fontSize: '1.25rem', maxWidth: '600px' }}>
                Make informed module choices with honest feedback from students who've been there. 
                No marketing spin—just authentic experiences.
              </p>
              

            </div>
            
            <div className="col-lg-5 d-none d-lg-block">
              <div className="position-relative">
                <div 
                  className="bg-primary rounded-4 p-5 shadow-lg"
                  style={{
                    transform: 'rotate(-3deg)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="text-center">
                    <div className="display-1 mb-3">⭐️</div>
                    <h3 className="h2 fw-bold mb-2">4.2/5.0</h3>
                    <p className="mb-0 opacity-75">Average Student Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-white py-4">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="h2 fw-bold mb-0">500+</div>
              <div className="small opacity-75">Student Reviews</div>
            </div>
            <div className="col-md-4">
              <div className="h2 fw-bold mb-0">50+</div>
              <div className="small opacity-75">Modules Reviewed</div>
            </div>
            <div className="col-md-4">
              <div className="h2 fw-bold mb-0">100%</div>
              <div className="small opacity-75">Verified Students</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted">Three simple steps to better module choices</p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3"
                    style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                  >
                    1
                  </div>
                  <h3 className="h4 fw-bold mb-3">Sign In</h3>
                  <p className="text-muted mb-0">
                    Verify your university email to access authentic student reviews and join the community.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3"
                    style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                  >
                    2
                  </div>
                  <h3 className="h4 fw-bold mb-3">Browse & Read</h3>
                  <p className="text-muted mb-0">
                    Explore modules by course, read detailed reviews, and see ratings for teaching, assessments, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100 hover-lift">
                <div className="card-body p-4">
                  <div 
                    className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3"
                    style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                  >
                    3
                  </div>
                  <h3 className="h4 fw-bold mb-3">Share Your Voice</h3>
                  <p className="text-muted mb-0">
                    Leave your own reviews to help future students make informed decisions about their education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="pe-lg-5">
                <h2 className="display-5 fw-bold mb-4">
                  Why Students Trust Our Reviews
                </h2>
                <p className="lead text-muted mb-4">
                  Every review comes from a verified university student. No fake accounts, 
                  no marketing bias—just honest feedback from your peers.
                </p>
                
                <div className="d-flex gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <div 
                      className="bg-primary bg-opacity-10 text-primary rounded d-flex align-items-center justify-content-center"
                      style={{ width: '48px', height: '48px' }}
                    >
                      ✓
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1">Verified Students Only</h4>
                    <p className="text-muted mb-0">All reviews require university email verification</p>
                  </div>
                </div>

                <div className="d-flex gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <div 
                      className="bg-primary bg-opacity-10 text-primary rounded d-flex align-items-center justify-content-center"
                      style={{ width: '48px', height: '48px' }}
                    >
                      ⭐
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1">Detailed Ratings</h4>
                    <p className="text-muted mb-0">Teaching quality, assessment fairness, content, and support</p>
                  </div>
                </div>

                <div className="d-flex gap-3">
                  <div className="flex-shrink-0">
                    <div 
                      className="bg-primary bg-opacity-10 text-primary rounded d-flex align-items-center justify-content-center"
                      style={{ width: '48px', height: '48px' }}
                    >
                      💬
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1">Real Experiences</h4>
                    <p className="text-muted mb-0">Written feedback from students who took the module</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="bg-dark text-white rounded-4 p-5 shadow-lg">
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-warning">★★★★★</span>
                    <span className="fw-bold">5.0</span>
                  </div>
                  <h5 className="fw-bold mb-2">Software Engineering</h5>
                  <p className="small text-white-50 mb-3">Year 2 • 15 Credits</p>
                  <p className="mb-0 opacity-75">
                    "Great module with practical applications. The coursework really 
                    helped me understand real-world software development practices."
                  </p>
                </div>
                <div className="border-top border-secondary pt-3">
                  <small className="text-white-50">Verified Student • Computer Science</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center py-5">
          <h2 className="display-4 fw-bold mb-4">Ready to Make Better Module Choices?</h2>
          <p className="lead mb-4 opacity-75">
            Join hundreds of students using real reviews to plan their academic journey
          </p>
            <Link href="/courses" className="btn btn-light btn-lg px-5 py-3">
              Browse Modules Now
            </Link>
         

        </div>
      </section>

      <style jsx>{`
        .hover-lift {
          transition: transform 0.2s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </>
  )
}
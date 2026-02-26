import { signIn } from "@/auth"
import { auth } from "@/auth" 
import { redirect } from "next/navigation"
// app/login/page.tsx

export default async function LoginPage() {
  const session = await auth()
  console.log('Current session:', session?.user)
  if (session?.user){
      if (!session?.user?.course){
    redirect("/onboarding")
  }
  }


  if (session?.user){
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
        <div className="container" style={{ maxWidth: "480px" }}>
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5 text-center">
              <h1 className="h3 fw-bold mb-2">You are already signed in</h1>
              <p className="mb-4">Welcome back, {session.user.email}!</p>
              <a href="/" className="btn btn-primary btn-lg w-100 mb-3">
                Go to Home
              </a>
            </div>
          </div>
          </div>
      </main>
    )
  }
    

  return (
    <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container" style={{ maxWidth: "480px" }}>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            {/* Logo/Badge */}
            <div className="text-center mb-4">
              <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <span style={{ fontSize: '2.5rem' }}>📚</span>
              </div>
              <h1 className="h3 fw-bold mb-2">Sign in</h1>
            </div>

            {/* University Badge */}
            <div className="alert alert-primary bg-primary bg-opacity-10 border-0 mb-4">
              <div className="d-flex align-items-center">
                <span className="me-2">🎓</span>
                <small className="mb-0">University of Derby Students Only</small>
              </div>
            </div>

            {/* Sign In Form */}
              <form
                action={async (formData) => {
                  "use server"
                  await signIn("resend", formData)
                }}
              >
              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="you@derby.ac.uk"
                  required
                  autoFocus
                />
                <div className="form-text mt-2">
                  We'll send a magic link to your university email
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100 mb-3">
                Send Magic Link
              </button>

              <div className="text-center">
                <small className="text-muted">
                  No password needed • Secure magic link authentication
                </small>
              </div>
            </form>

            {/* Info Footer */}

          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <a href="/" className="text-muted text-decoration-none">
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  )
}
import { requestMagicLink } from "./actions";

export default function LoginPage() {
  return (
    <main className="bg-light min-vh-100 py-5">
      <div className="container" style={{ maxWidth: "520px" }}>
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <p className="text-uppercase text-primary fw-semibold small mb-2">
              University of Derby
            </p>
            <h1 className="h3 fw-bold mb-3">Sign in with magic link</h1>
            <p className="text-secondary mb-4">
              Enter your email and we will send you a secure login link.
            </p>

            <form action={requestMagicLink}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="you@derby.ac.uk"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send magic link
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'  // ← Client-side signOut
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session} = useSession()
  console.log('Session in Navbar:', session)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" className="navbar-brand fw-bold">
          📚 Module Review
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link href="/courses" className="nav-link">Browse Courses</Link>
            </li>

            {session?.user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50">
                    {session.user.name || session.user.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="nav-link btn btn-link text-decoration-none"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login" className="nav-link">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
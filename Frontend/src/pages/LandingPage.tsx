import { SignUpButton } from '@clerk/react'
import './LandingPage.css'

export function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-content">
        <SignUpButton mode="modal">
          <button className="btn-cta">Get started</button>
        </SignUpButton>
      </div>
    </main>
  )
}

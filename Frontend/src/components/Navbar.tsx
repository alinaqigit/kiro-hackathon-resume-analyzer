import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/react'
import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">MyApp</div>
      <div className="navbar-auth">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="btn btn-ghost">Log in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-primary">Sign up</button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/react'
import './Navbar.css'

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">ResumeIQ</div>
      <div className="navbar-auth">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="btn btn-ghost">Log in</button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="btn btn-primary">Sign up</button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  )
}

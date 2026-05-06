import { SignedIn, SignedOut } from '@clerk/react'
import { Navbar } from './components/Navbar'
import { LandingPage } from './pages/LandingPage'
import { Dashboard } from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <Dashboard />
      </SignedIn>
    </div>
  )
}

export default App

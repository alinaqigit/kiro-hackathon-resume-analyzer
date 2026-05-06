import { Show } from '@clerk/react'
import { Navbar } from './components/Navbar'
import { LandingPage } from './pages/LandingPage'
import ResumeAnalyzerApp from './app/App'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <Show when="signed-out">
        <LandingPage />
      </Show>
      <Show when="signed-in">
        <ResumeAnalyzerApp />
      </Show>
    </div>
  )
}

export default App

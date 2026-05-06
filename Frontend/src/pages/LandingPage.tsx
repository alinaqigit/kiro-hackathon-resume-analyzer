import { SignUpButton } from '@clerk/react'
import { Sparkles, Zap, Target, TrendingUp } from 'lucide-react'
import './LandingPage.css'

export function LandingPage() {
  return (
    <main className="landing">
      {/* Background blobs */}
      <div className="landing-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="landing-content">
        <div className="landing-icon">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="landing-title">
          AI-Powered Resume Analysis
        </h1>
        
        <p className="landing-subtitle">
          Get instant insights into your resume, take a personalized skill assessment,
          and receive a detailed career roadmap tailored to your target role.
        </p>

        <div className="landing-features">
          <div className="feature">
            <Target className="feature-icon" />
            <span>Skill Profiling</span>
          </div>
          <div className="feature">
            <Zap className="feature-icon" />
            <span>Adaptive Quiz</span>
          </div>
          <div className="feature">
            <TrendingUp className="feature-icon" />
            <span>Career Roadmap</span>
          </div>
        </div>

        <SignUpButton mode="modal">
          <button className="btn-cta">
            <Sparkles className="w-5 h-5" />
            Get Started Free
          </button>
        </SignUpButton>

        <p className="landing-note">
          No credit card required • Takes 5 minutes
        </p>
      </div>
    </main>
  )
}

import { SignUpButton } from '@clerk/react'
import { Sparkles, Zap, Target, TrendingUp, Mail, User, Briefcase } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import './LandingPage.css'

export function LandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'Thanks! We\'ll be in touch soon.' })
        setFormData({ name: '', email: '', role: '' })
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Failed to connect. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

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

        {/* Waitlist Form */}
        <div className="waitlist-section">
          <h2 className="waitlist-title">Join the Waitlist</h2>
          <p className="waitlist-subtitle">Get early access and exclusive updates</p>
          
          <form onSubmit={handleSubmit} className="waitlist-form">
            <div className="form-group">
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <Briefcase className="input-icon" />
                <input
                  type="text"
                  placeholder="Target Role (e.g., Frontend Developer)"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-submit"
            >
              {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
            </button>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  )
}

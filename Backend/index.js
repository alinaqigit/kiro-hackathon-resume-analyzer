import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { clerkMiddleware, clerkClient, requireAuth, getAuth } from '@clerk/express'
import OpenAI from 'openai'

const app = express()
const PORT = process.env.PORT || 3001

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(clerkMiddleware())

// Public route
app.get('/', (req, res) => {
  res.json({ message: 'Backend API is running' })
})

// Waitlist endpoint (public - no auth required)
app.post('/api/waitlist', async (req, res) => {
  try {
    const { name, email, role } = req.body

    // Validate input
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' })
    }

    // Log the submission (in production, save to database)
    console.log('📝 New waitlist submission:', {
      name,
      email,
      role,
      timestamp: new Date().toISOString()
    })

    // TODO: In production, save to database
    // await db.waitlist.create({ name, email, role })

    res.json({ 
      success: true,
      message: 'Successfully joined the waitlist!',
      data: { name, email, role }
    })
  } catch (error) {
    console.error('Error processing waitlist submission:', error)
    res.status(500).json({ error: 'Failed to process submission' })
  }
})

// Resume analysis endpoint (requires authentication)
app.post('/api/analyze-resume', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req)
    const { resumeText, jobDescription } = req.body

    // Validate input
    if (!resumeText || !jobDescription) {
      return res.status(400).json({ error: 'Resume text and job description are required' })
    }

    if (resumeText.trim().length < 50) {
      return res.status(400).json({ error: 'Resume text is too short. Please provide more details.' })
    }

    if (jobDescription.trim().length < 10) {
      return res.status(400).json({ error: 'Job description is too short. Please provide more details.' })
    }

    // Log the analysis request
    console.log('🔍 Resume analysis request:', {
      userId,
      resumeLength: resumeText.length,
      jobDescriptionLength: jobDescription.length,
      timestamp: new Date().toISOString()
    })

    // System prompt for OpenAI
    const systemPrompt = `You are an expert resume analyzer and career advisor. Analyze the provided resume against the target job description and return a detailed JSON analysis.

Your analysis should include:
1. Overall skill level (beginner, intermediate, advanced, expert)
2. Level score (0-100)
3. Match score with the job (0-100)
4. Detected skills (array of strings)
5. Strengths (array of 3-5 key strengths)
6. Skill gaps (array of 3-5 areas for improvement)
7. Years of experience (estimated number)
8. Education level (e.g., "Bachelor's Degree", "Master's Degree", "Self-taught", etc.)
9. Job domain (e.g., "frontend", "backend", "fullstack", "data-science", "devops", etc.)
10. Profile summary (2-3 sentences describing the candidate)
11. Skill breakdown by category with scores (e.g., Technical Skills: 85, Soft Skills: 70, etc.)

Return ONLY valid JSON in this exact format:
{
  "level": "intermediate",
  "levelScore": 75,
  "matchScore": 82,
  "detectedSkills": ["React", "TypeScript", "Node.js"],
  "strengths": ["Strong frontend experience", "Good understanding of modern frameworks"],
  "gaps": ["Limited backend experience", "No cloud deployment experience"],
  "yearsOfExperience": 3,
  "educationLevel": "Bachelor's Degree in Computer Science",
  "jobDomain": "frontend",
  "jobTitle": "Frontend Developer",
  "profileSummary": "Experienced frontend developer with strong React skills...",
  "skillBreakdown": [
    {"category": "Technical Skills", "score": 85},
    {"category": "Frameworks & Libraries", "score": 80},
    {"category": "Tools & Platforms", "score": 70}
  ]
}`

    // Call OpenAI API
    console.log('🤖 Calling OpenAI API...')
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Resume:\n${resumeText}\n\nTarget Job Description:\n${jobDescription}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    })

    const analysisText = completion.choices[0].message.content
    const analysis = JSON.parse(analysisText)

    console.log('✅ OpenAI analysis complete:', {
      level: analysis.level,
      matchScore: analysis.matchScore,
      skillsCount: analysis.detectedSkills?.length || 0
    })

    // Return the analysis
    res.json({ 
      success: true,
      message: 'Resume analyzed successfully',
      data: {
        ...analysis,
        userId,
        analyzedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('❌ Error analyzing resume:', error)
    
    // Check if it's an OpenAI API error
    if (error.status === 401) {
      return res.status(500).json({ error: 'OpenAI API key is invalid or missing' })
    }
    
    res.status(500).json({ 
      error: 'Failed to analyze resume',
      details: error.message 
    })
  }
})

// Protected route example
app.get('/api/protected', requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req)
    const user = await clerkClient.users.getUser(userId)
    
    res.json({ 
      message: 'This is a protected route',
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user data' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`)
})

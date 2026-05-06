import { type ExpertiseLevel, type JobDomain, type Question, questionBank } from './quizData';

export type { ExpertiseLevel, JobDomain };

export interface UserProfile {
  level: ExpertiseLevel;
  levelScore: number;
  detectedSkills: string[];
  yearsOfExperience: number;
  educationLevel: string;
  jobDomain: JobDomain;
  jobTitle: string;
  matchScore: number;
  strengths: string[];
  gaps: string[];
  profileSummary: string;
  skillBreakdown: { category: string; score: number }[];
}

export interface ResultAnalysis {
  quizScore: number;
  quizPercentage: number;
  finalMatchScore: number;
  profileConsistency: 'outperforming' | 'consistent' | 'underperforming';
  consistencyNote: string;
  skillCoverage: { subject: string; fullMark: number; value: number }[];
  quizByTopic: { topic: string; correct: number; total: number }[];
  improvements: string[];
  improvementPlan: PlanPhase[];
  overallConclusion: string;
  topStrengths: string[];
  criticalGaps: string[];
}

export interface PlanPhase {
  title: string;
  duration: string;
  goals: string[];
  resources: string[];
  color: string;
}

// ─── Skill keyword maps ────────────────────────────────────────────────────

const SKILLS_MAP: Record<string, string[]> = {
  // Languages
  'JavaScript': ['javascript', 'js ', ' js,', 'es6', 'es2015', 'ecmascript', 'node.js', 'nodejs'],
  'TypeScript': ['typescript', ' ts ', ' ts,'],
  'Python': ['python', ' py ', 'python3', 'python2'],
  'Java': [' java ', 'java8', 'java11', 'java17', 'spring'],
  'C#': ['c#', 'csharp', '.net', 'dotnet', 'asp.net'],
  'C++': ['c++', 'cpp', 'c/c++'],
  'Go': ['golang', ' go ', 'go lang'],
  'Rust': ['rust ', 'rustlang'],
  'Ruby': ['ruby', 'rails', 'ruby on rails'],
  'PHP': [' php', 'laravel', 'symfony'],
  'Swift': ['swift', 'swiftui', 'xcode'],
  'Kotlin': ['kotlin'],
  'R': [' r ', ' r,', 'r studio', 'rstudio', 'tidyverse', 'ggplot'],

  // Frontend
  'React': ['react', 'reactjs', 'react.js', 'react native', 'next.js', 'nextjs'],
  'Angular': ['angular'],
  'Vue.js': ['vue', 'vuejs', 'vue.js', 'nuxt'],
  'HTML/CSS': ['html', 'css', 'html5', 'css3', 'sass', 'scss', 'tailwind', 'bootstrap'],
  'Redux': ['redux', 'zustand', 'recoil', 'jotai', 'mobx'],
  'GraphQL': ['graphql', 'apollo'],

  // Backend
  'Node.js': ['node.js', 'nodejs', 'express', 'fastify', 'nestjs', 'nest.js'],
  'Django': ['django'],
  'Flask': ['flask'],
  'FastAPI': ['fastapi'],
  'Spring Boot': ['spring boot', 'spring framework', 'springboot'],

  // Databases
  'PostgreSQL': ['postgresql', 'postgres', 'psql'],
  'MySQL': ['mysql', 'mariadb'],
  'MongoDB': ['mongodb', 'mongo', 'mongoose'],
  'Redis': ['redis'],
  'Elasticsearch': ['elasticsearch', 'elastic search', 'elk stack'],
  'SQL': [' sql ', 'query', 'database design', 'relational database'],

  // Cloud & DevOps
  'AWS': ['aws', 'amazon web services', 'ec2', 's3 bucket', 'lambda', 'ecs', 'eks', 'cloudformation'],
  'Azure': ['azure', 'microsoft azure', 'azure devops'],
  'GCP': ['gcp', 'google cloud', 'google cloud platform', 'bigquery'],
  'Docker': ['docker', 'dockerfile', 'docker-compose', 'containerization'],
  'Kubernetes': ['kubernetes', ' k8s', 'kubectl', 'helm chart', 'container orchestration'],
  'Terraform': ['terraform', 'infrastructure as code', 'iac', 'pulumi'],
  'CI/CD': ['ci/cd', 'github actions', 'jenkins', 'gitlab ci', 'circleci', 'travis ci'],
  'Linux': ['linux', 'ubuntu', 'centos', 'bash scripting', 'shell script', 'unix'],

  // ML / Data Science
  'TensorFlow': ['tensorflow', ' tf,', ' tf '],
  'PyTorch': ['pytorch', ' torch'],
  'Scikit-learn': ['scikit-learn', 'sklearn'],
  'Pandas': ['pandas'],
  'NumPy': ['numpy'],
  'Machine Learning': ['machine learning', ' ml ', 'deep learning', 'neural network', 'artificial intelligence', ' ai '],
  'NLP': ['nlp', 'natural language processing', 'bert', 'gpt', 'llm', 'large language model'],
  'Data Analysis': ['data analysis', 'data analytics', 'tableau', 'power bi', 'data visualization', 'matplotlib', 'seaborn'],
  'Spark': ['apache spark', ' spark', 'pyspark'],

  // Mobile
  'React Native': ['react native', 'react-native', 'expo'],
  'Flutter': ['flutter', ' dart'],
  'iOS': ['ios', 'objective-c', 'xcode', 'swiftui'],
  'Android': ['android sdk', 'android studio', 'android development'],

  // General
  'Git': ['git ', 'github', 'gitlab', 'bitbucket', 'version control'],
  'Testing': ['unit test', 'integration test', 'jest', 'pytest', 'selenium', 'cypress', 'tdd', 'bdd', 'test driven'],
  'Agile': ['agile', 'scrum', 'kanban', 'sprint', 'jira'],
  'System Design': ['system design', 'distributed systems', 'microservices', 'architecture'],
  'Data Structures': ['data structure', 'algorithm', 'leetcode', 'competitive programming'],
};

const DOMAIN_KEYWORDS: Record<JobDomain, string[]> = {
  frontend: ['frontend', 'front-end', 'front end', 'ui developer', 'ux developer', 'react developer', 'angular developer', 'vue developer', 'web developer', 'ui engineer', 'web engineer', 'css', 'javascript developer'],
  backend: ['backend', 'back-end', 'back end', 'server-side', 'api developer', 'python developer', 'java developer', 'node developer', 'rest api', 'microservice'],
  fullstack: ['full stack', 'fullstack', 'full-stack', 'full stack developer', 'mern', 'mean', 'lamp'],
  datascience: ['data scientist', 'data science', 'machine learning', 'ml engineer', 'ai engineer', 'data analyst', 'data engineer', 'nlp engineer', 'computer vision', 'deep learning'],
  devops: ['devops', 'sre', 'site reliability', 'platform engineer', 'cloud engineer', 'infrastructure engineer', 'kubernetes engineer', 'cloud architect'],
  mobile: ['mobile developer', 'ios developer', 'android developer', 'react native developer', 'flutter developer', 'mobile engineer'],
  general: [],
};

const REQUIRED_SKILLS_PER_DOMAIN: Record<JobDomain, string[]> = {
  frontend: ['React', 'TypeScript', 'HTML/CSS', 'JavaScript', 'Redux', 'Testing'],
  backend: ['Node.js', 'Python', 'SQL', 'PostgreSQL', 'CI/CD', 'Testing'],
  fullstack: ['React', 'Node.js', 'SQL', 'JavaScript', 'Docker', 'Git'],
  datascience: ['Python', 'Machine Learning', 'Pandas', 'NumPy', 'Data Analysis', 'SQL'],
  devops: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux'],
  mobile: ['React Native', 'JavaScript', 'TypeScript', 'Git', 'Testing', 'iOS'],
  general: ['Git', 'Testing', 'Data Structures', 'SQL', 'CI/CD', 'Agile'],
};

const SENIORITY_KEYWORDS: Record<string, number> = {
  'intern': -10,
  'junior': 0,
  'associate': 5,
  'mid-level': 10,
  'mid level': 10,
  'senior': 20,
  'lead': 25,
  'staff': 25,
  'principal': 30,
  'architect': 30,
  'manager': 20,
  'director': 30,
  'cto': 35,
  'vp of engineering': 35,
  'phd': 25,
  'research': 15,
  'published': 15,
};

// ─── Core analysis ─────��───────────────────────────────────────────────────

export function detectSkills(text: string): string[] {
  const lower = ` ${text.toLowerCase()} `;
  const found: string[] = [];
  for (const [skillName, keywords] of Object.entries(SKILLS_MAP)) {
    if (keywords.some(kw => lower.includes(kw))) {
      found.push(skillName);
    }
  }
  return [...new Set(found)];
}

export function detectYearsOfExperience(text: string): number {
  const patterns = [
    /(\d+)\+?\s*years?\s+of\s+(experience|exp)/i,
    /(\d+)\+?\s*years?\s+(professional|work|industry)/i,
    /experience\s*[:\-]?\s*(\d+)\+?\s*years?/i,
    /(\d+)\+?\s*yrs?\s+(of\s+)?(experience|exp)/i,
  ];
  let maxYears = 0;
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const years = parseInt(match[1]);
      if (years > maxYears && years < 50) maxYears = years;
    }
  }
  // Try to infer from graduation year
  if (maxYears === 0) {
    const yearMatch = text.match(/(?:graduated|batch|class of|passed out)\s*(?:in\s*)?(\d{4})/i);
    if (yearMatch) {
      const gradYear = parseInt(yearMatch[1]);
      const currentYear = 2026;
      const inferred = currentYear - gradYear;
      if (inferred >= 0 && inferred < 40) maxYears = inferred;
    }
  }
  return maxYears;
}

export function detectEducation(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('phd') || lower.includes('ph.d') || lower.includes('doctorate')) return 'PhD';
  if (lower.includes('master') || lower.includes('m.s.') || lower.includes('m.tech') || lower.includes('mba') || lower.includes('m.e.')) return 'Masters';
  if (lower.includes('bachelor') || lower.includes('b.s.') || lower.includes('b.tech') || lower.includes('b.e.') || lower.includes('b.sc') || lower.includes('undergraduate')) return 'Bachelors';
  if (lower.includes('bootcamp') || lower.includes('boot camp') || lower.includes('self-taught') || lower.includes('online course') || lower.includes('udemy') || lower.includes('coursera')) return 'Bootcamp/Self-taught';
  if (lower.includes('diploma') || lower.includes('associate degree')) return 'Diploma';
  return 'Not specified';
}

export function detectJobDomain(jobDescription: string): JobDomain {
  const lower = jobDescription.toLowerCase();
  let best: JobDomain = 'general';
  let bestScore = 0;

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS) as [JobDomain, string[]][]) {
    const score = keywords.filter(kw => lower.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      best = domain;
    }
  }
  return best;
}

function calculateLevelScore(
  skills: string[],
  yearsExp: number,
  education: string,
  resumeText: string,
  jobDomain: JobDomain
): number {
  let score = 0;

  // Experience factor (0–40)
  if (yearsExp >= 10) score += 40;
  else if (yearsExp >= 7) score += 32;
  else if (yearsExp >= 5) score += 25;
  else if (yearsExp >= 3) score += 18;
  else if (yearsExp >= 1) score += 10;
  else score += 3;

  // Relevant skill count factor (0–35)
  const relevantSkills = REQUIRED_SKILLS_PER_DOMAIN[jobDomain];
  const relevantCount = skills.filter(s => relevantSkills.includes(s)).length;
  const totalRelevant = relevantSkills.length;
  score += Math.round((relevantCount / totalRelevant) * 20);

  // Total skill breadth (0–15)
  score += Math.min(15, skills.length);

  // Education factor (0–15)
  const eduMap: Record<string, number> = {
    'PhD': 15, 'Masters': 12, 'Bachelors': 8, 'Bootcamp/Self-taught': 4, 'Diploma': 3, 'Not specified': 0
  };
  score += eduMap[education] ?? 0;

  // Seniority keywords (0–15)
  const lower = resumeText.toLowerCase();
  for (const [keyword, bonus] of Object.entries(SENIORITY_KEYWORDS)) {
    if (lower.includes(keyword)) {
      score += bonus;
      break;
    }
  }

  return Math.min(100, Math.max(0, score));
}

function scoreToLevel(score: number): ExpertiseLevel {
  if (score >= 75) return 'expert';
  if (score >= 55) return 'advanced';
  if (score >= 30) return 'intermediate';
  return 'beginner';
}

export function analyzeResume(resumeText: string, jobDescription: string): UserProfile {
  const skills = detectSkills(resumeText + ' ' + jobDescription);
  const yearsExp = detectYearsOfExperience(resumeText);
  const education = detectEducation(resumeText);
  const jobDomain = detectJobDomain(jobDescription);
  const levelScore = calculateLevelScore(skills, yearsExp, education, resumeText, jobDomain);
  const level = scoreToLevel(levelScore);

  const requiredSkills = REQUIRED_SKILLS_PER_DOMAIN[jobDomain];
  const matchedRequired = skills.filter(s => requiredSkills.includes(s));
  const gaps = requiredSkills.filter(s => !skills.includes(s));
  const matchScore = Math.round((matchedRequired.length / requiredSkills.length) * 60 + (levelScore / 100) * 40);

  // Determine a job title from description
  const jobTitleMatch = jobDescription.match(/(?:position|role|title|looking for(?:\s+a)?|hiring)[\s:]+([A-Za-z\s]{5,40})/i);
  const jobTitle = jobTitleMatch ? jobTitleMatch[1].trim() : `${jobDomain.charAt(0).toUpperCase() + jobDomain.slice(1)} Developer`;

  // Strengths
  const strengths: string[] = [];
  if (matchedRequired.length >= 4) strengths.push('Strong alignment with required tech stack');
  if (yearsExp >= 5) strengths.push(`${yearsExp}+ years hands-on experience`);
  if (education === 'PhD' || education === 'Masters') strengths.push('Advanced academic background');
  if (skills.includes('Testing')) strengths.push('Quality-focused with testing experience');
  if (skills.includes('CI/CD')) strengths.push('DevOps & automation mindset');
  if (skills.includes('System Design')) strengths.push('System design & architecture knowledge');
  if (skills.includes('Agile')) strengths.push('Agile/Scrum experience');
  if (strengths.length === 0) strengths.push('Foundational skills in core technologies');

  // Skill breakdown for radar
  const skillBreakdown = generateSkillBreakdown(skills, jobDomain, levelScore);

  const summaryTemplates: Record<ExpertiseLevel, string> = {
    beginner: `Emerging ${jobTitle} with a foundation in core technologies. You show early-stage competency with ${skills.slice(0, 3).join(', ')}, positioning you well for entry-level roles where growth is expected.`,
    intermediate: `Developing ${jobTitle} with solid practical experience in ${skills.slice(0, 4).join(', ')}. You demonstrate meaningful hands-on exposure and are ready to contribute independently on team projects.`,
    advanced: `Experienced ${jobTitle} with deep expertise across ${skills.slice(0, 5).join(', ')}. Your profile reflects production-level knowledge and the ability to lead technical initiatives.`,
    expert: `Senior-level ${jobTitle} with comprehensive mastery of ${skills.slice(0, 6).join(', ')}. Your breadth and depth of expertise position you for architectural decisions and technical leadership.`,
  };

  return {
    level,
    levelScore,
    detectedSkills: skills,
    yearsOfExperience: yearsExp,
    educationLevel: education,
    jobDomain,
    jobTitle,
    matchScore,
    strengths,
    gaps,
    profileSummary: summaryTemplates[level],
    skillBreakdown,
  };
}

function generateSkillBreakdown(skills: string[], _domain: JobDomain, levelScore: number) {
  const categories: Record<string, string[]> = {
    'Core Tech': ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin'],
    'Frontend': ['React', 'Angular', 'Vue.js', 'HTML/CSS', 'Redux', 'GraphQL'],
    'Backend': ['Node.js', 'Django', 'Flask', 'FastAPI', 'Spring Boot'],
    'Data/DB': ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Pandas', 'NumPy', 'Data Analysis', 'Spark'],
    'DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Terraform', 'CI/CD', 'Linux'],
    'ML/AI': ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Machine Learning', 'NLP'],
    'Quality': ['Testing', 'Git', 'Agile', 'System Design', 'Data Structures'],
  };

  return Object.entries(categories).map(([cat, catSkills]) => {
    const matchCount = catSkills.filter(s => skills.includes(s)).length;
    const rawScore = catSkills.length > 0 ? (matchCount / catSkills.length) * 100 : 0;
    // Blend with overall level score for more realistic values
    const score = Math.round(rawScore * 0.7 + levelScore * 0.3);
    return { category: cat, score: Math.min(100, score) };
  });
}

// ─── Quiz generation ────────────────────────────────────────────────────────

export function generateQuiz(profile: UserProfile): Question[] {
  const { level, jobDomain } = profile;

  // Select questions matching domain and difficulty
  const primaryDomain = jobDomain === 'fullstack' ? ['frontend', 'backend'] : [jobDomain, 'general'];
  const difficultyMap: Record<ExpertiseLevel, ExpertiseLevel[]> = {
    beginner: ['beginner'],
    intermediate: ['intermediate', 'beginner'],
    advanced: ['advanced', 'intermediate'],
    expert: ['expert', 'advanced'],
  };
  const allowedDifficulties = difficultyMap[level];

  // Filter candidates
  let candidates = questionBank.filter(q =>
    (primaryDomain.includes(q.domain) || q.domain === 'general') &&
    allowedDifficulties.includes(q.difficulty)
  );

  // Fill up if not enough domain-specific
  if (candidates.length < 10) {
    const extras = questionBank.filter(q =>
      allowedDifficulties.includes(q.difficulty) && !candidates.includes(q)
    );
    candidates = [...candidates, ...extras];
  }

  // Shuffle and pick 10
  const shuffled = [...candidates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

// ─── Result analysis ────────────────────────────────────────────────────────

export function analyzeResults(
  profile: UserProfile,
  questions: Question[],
  answers: (number | null)[]
): ResultAnalysis {
  const quizScore = answers.reduce<number>((acc, ans, i) =>
    ans === questions[i].correctIndex ? acc + 1 : acc, 0);
  const quizPercentage = Math.round((quizScore / questions.length) * 100);

  // Profile consistency
  const expectedPerformance: Record<ExpertiseLevel, [number, number]> = {
    beginner: [20, 55],
    intermediate: [40, 75],
    advanced: [60, 90],
    expert: [75, 100],
  };
  const [low, high] = expectedPerformance[profile.level];
  let profileConsistency: ResultAnalysis['profileConsistency'];
  let consistencyNote: string;

  if (quizPercentage > high) {
    profileConsistency = 'outperforming';
    consistencyNote = `Your quiz score (${quizPercentage}%) exceeds the expected range for a ${profile.level}-level professional. You may be underselling yourself — consider targeting more senior positions.`;
  } else if (quizPercentage < low) {
    profileConsistency = 'underperforming';
    consistencyNote = `Your quiz score (${quizPercentage}%) is below the expected range for a ${profile.level}-level professional. This gap may indicate areas to focus on before applying to ${profile.level} roles.`;
  } else {
    profileConsistency = 'consistent';
    consistencyNote = `Your quiz performance (${quizPercentage}%) aligns well with your ${profile.level}-level profile. Your self-assessed experience is validated by the assessment.`;
  }

  // Final match score = 50% resume match + 50% quiz
  const finalMatchScore = Math.round(profile.matchScore * 0.5 + quizPercentage * 0.5);

  // Skill coverage radar
  const skillCoverage = profile.skillBreakdown.map(sb => ({
    subject: sb.category,
    fullMark: 100,
    value: sb.score,
  }));

  // Quiz by topic
  const topicMap: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q, i) => {
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (answers[i] === q.correctIndex) topicMap[q.topic].correct++;
  });
  const quizByTopic = Object.entries(topicMap).map(([topic, stats]) => ({ topic, ...stats }));

  // Improvements
  const improvements = generateImprovements(profile, quizPercentage);
  const improvementPlan = generatePlan(profile, improvements);
  const overallConclusion = generateConclusion(profile, quizPercentage, finalMatchScore);

  const topStrengths = profile.strengths.slice(0, 3);
  const criticalGaps = profile.gaps.slice(0, 4);

  return {
    quizScore,
    quizPercentage,
    finalMatchScore,
    profileConsistency,
    consistencyNote,
    skillCoverage,
    quizByTopic,
    improvements,
    improvementPlan,
    overallConclusion,
    topStrengths,
    criticalGaps,
  };
}

function generateImprovements(profile: UserProfile, quizPercentage: number): string[] {
  const tips: string[] = [];
  const { gaps, jobDomain, level } = profile;

  // Gap-based
  gaps.slice(0, 3).forEach(gap => {
    const gapTips: Record<string, string> = {
      'React': 'Deep-dive into React 19 features, concurrent rendering, and Server Components. Build 2-3 projects showcasing complex state management.',
      'TypeScript': 'Add TypeScript to existing projects incrementally. Focus on generics, utility types, and strict mode configurations.',
      'Testing': 'Adopt Test-Driven Development (TDD) on your next project. Start with Jest/Vitest for unit tests, then Playwright/Cypress for E2E.',
      'Docker': 'Containerize one of your existing apps. Learn multi-stage builds, Docker Compose, and best practices for production images.',
      'Kubernetes': 'Deploy a personal project on a local Kubernetes cluster (k3s/minikube). Learn pods, deployments, services, and ingress.',
      'AWS': 'Obtain AWS Solutions Architect Associate certification. Build projects using S3, Lambda, RDS, and CloudFront.',
      'Python': 'Write Python scripts for automation. Work through "Fluent Python" and build a backend API with FastAPI or Django.',
      'SQL': 'Practice complex queries on platforms like Mode Analytics or HackerRank. Learn query optimization, indexes, and EXPLAIN plans.',
      'CI/CD': 'Set up GitHub Actions for automated testing and deployment on a personal project. Learn artifact caching and environment secrets.',
      'Machine Learning': 'Complete Andrew Ng\'s Machine Learning Specialization on Coursera. Implement algorithms from scratch, then use scikit-learn.',
      'Linux': 'Practice shell scripting, process management, and system administration on a VPS or WSL. Aim for LFCS certification.',
      'Terraform': 'Use Terraform to provision cloud resources for a project. Practice modules, state management, and Terraform Cloud.',
    };
    if (gapTips[gap]) tips.push(gapTips[gap]);
    else tips.push(`Develop proficiency in ${gap} through hands-on projects and structured learning resources.`);
  });

  // Level-based
  if (level === 'beginner') {
    tips.push('Build at least 3 end-to-end projects and host them publicly (GitHub + deployed URLs) to demonstrate practical ability.');
    tips.push('Contribute to open source projects related to your target domain to gain real-world collaborative coding experience.');
  } else if (level === 'intermediate') {
    tips.push('Practice system design problems (High Scalability blog, System Design Primer on GitHub) to prepare for senior roles.');
    tips.push('Write technical blog posts or give talks to establish thought leadership and deepen your own understanding.');
  } else if (level === 'advanced' || level === 'expert') {
    tips.push('Mentor junior developers and contribute architectural decisions to build leadership credibility.');
    tips.push('Explore adjacent domains (e.g., platform engineering, ML infrastructure) to expand your T-shaped skill profile.');
  }

  // Quiz-based
  if (quizPercentage < 50) {
    tips.push('Revisit fundamentals through structured courses (Educative, Frontend Masters, etc.) to strengthen theoretical foundations.');
  }

  const domainTips: Record<JobDomain, string> = {
    frontend: 'Master Web Performance (Core Web Vitals, Lighthouse) and accessibility (WCAG) — these differentiate senior front-end engineers.',
    backend: 'Study database internals and distributed systems patterns (DDIA by Kleppmann is essential reading).',
    fullstack: 'Develop expertise in API design (REST best practices, OpenAPI spec) and infrastructure as code to bridge front-end and backend deeply.',
    datascience: 'Learn MLOps practices (model serving, monitoring, data pipelines with Airflow) to make your ML work production-ready.',
    devops: 'Study FinOps principles and cost optimization strategies — cloud cost management is increasingly valued.',
    mobile: 'Explore the new React Native architecture (JSI, TurboModules, Fabric) and performance profiling tools.',
    general: 'Solve 2-3 LeetCode problems daily, focusing on dynamic programming, graphs, and system design for technical interview readiness.',
  };

  tips.push(domainTips[jobDomain]);
  return [...new Set(tips)].slice(0, 6);
}

function generatePlan(profile: UserProfile, _improvements: string[]): PlanPhase[] {
  const { level, jobDomain, gaps } = profile;

  const phases: PlanPhase[] = [
    {
      title: 'Foundation & Gap Analysis',
      duration: 'Month 1',
      color: '#6366f1',
      goals: [
        `Master ${gaps[0] || 'core framework'} through structured learning`,
        'Build one project incorporating your identified skill gaps',
        'Complete at least 2 online courses in weak areas',
      ],
      resources: [
        level === 'beginner' ? 'freeCodeCamp & The Odin Project' : 'Frontend Masters / Educative.io',
        'Official documentation for identified skill gaps',
        `${gaps[0] ? gaps[0] + ' official tutorial' : 'MDN Web Docs / DevDocs'}`,
      ],
    },
    {
      title: 'Practical Application',
      duration: 'Month 2',
      color: '#8b5cf6',
      goals: [
        'Launch a production-grade project showcasing target skills',
        `Implement ${gaps[1] || 'testing and CI/CD'} in your project`,
        'Open source the project and document it thoroughly',
      ],
      resources: [
        'GitHub (portfolio projects)',
        'Vercel / Railway / Render for deployment',
        'YouTube tutorials for practical walkthroughs',
      ],
    },
    {
      title: 'Depth & Specialization',
      duration: 'Month 3',
      color: '#a855f7',
      goals: [
        'Complete a domain-specific certification if applicable',
        `Specialize deeper in ${jobDomain} best practices`,
        'Conduct mock technical interviews with peers or platforms',
      ],
      resources: [
        jobDomain === 'devops' ? 'AWS/GCP/Azure certification study guides' :
        jobDomain === 'datascience' ? 'Kaggle competitions' :
        'LeetCode Premium / AlgoExpert',
        'Pramp or Interviewing.io for mock interviews',
        level === 'expert' ? 'Research papers (ArXiv, ACM Digital Library)' : 'DDIA book / System Design Primer',
      ],
    },
  ];

  return phases;
}

function generateConclusion(profile: UserProfile, quizPercentage: number, finalMatch: number): string {
  const { level, jobTitle, jobDomain } = profile;
  const matchLabel = finalMatch >= 75 ? 'strong' : finalMatch >= 50 ? 'moderate' : 'developing';

  return `Overall, you demonstrate a ${matchLabel} fit for ${jobTitle} roles. ` +
    `Your resume reflects ${level}-level expertise in ${jobDomain} development, and your assessment performance ` +
    `${quizPercentage >= 60 ? 'validates this profile well' : 'reveals areas for targeted improvement'}. ` +
    `With focused effort on the identified gaps and consistent project-building, you can ` +
    `${finalMatch >= 70 ? 'confidently apply to target roles' : 'reach competitive readiness within 60-90 days'}.`;
}

import { motion } from 'motion/react';
import {
  Trophy, Zap, BookOpen, Briefcase, Star, AlertTriangle,
  ChevronRight, BarChart2, User, Award
} from 'lucide-react';
import type { UserProfile } from '../utils/analyzer';

interface ProfileStepProps {
  profile: UserProfile;
  onStartQuiz: () => void;
}

const LEVEL_CONFIG = {
  beginner: {
    label: 'Beginner',
    color: 'from-sky-500 to-blue-600',
    bg: 'bg-sky-500/10 border-sky-500/30',
    text: 'text-sky-400',
    icon: BookOpen,
    desc: 'Just starting out — great foundation for growth!',
  },
  intermediate: {
    label: 'Intermediate',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/10 border-emerald-500/30',
    text: 'text-emerald-400',
    icon: BarChart2,
    desc: 'Solid hands-on experience, building momentum.',
  },
  advanced: {
    label: 'Advanced',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-500/10 border-violet-500/30',
    text: 'text-violet-400',
    icon: Award,
    desc: 'Production-grade expertise and leadership potential.',
  },
  expert: {
    label: 'Expert',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-500/10 border-amber-500/30',
    text: 'text-amber-400',
    icon: Trophy,
    desc: 'Elite-level mastery with architectural depth.',
  },
};

export function ProfileStep({ profile, onStartQuiz }: ProfileStepProps) {
  const cfg = LEVEL_CONFIG[profile.level];
  const LevelIcon = cfg.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-center justify-start p-4 md:p-8 py-12">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-indigo-300/60 text-sm mb-2 tracking-widest uppercase">Analysis Complete</p>
          <h1 className="text-white mb-1">Your Career Profile</h1>
          <p className="text-white/40 text-sm">Based on your resume and target role: <span className="text-indigo-300">{profile.jobTitle}</span></p>
        </div>

        {/* Level card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`border rounded-2xl p-6 mb-6 text-center ${cfg.bg}`}
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${cfg.color} mb-4 shadow-lg`}>
            <LevelIcon className="w-8 h-8 text-white" />
          </div>
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm mb-3 bg-gradient-to-r ${cfg.color} text-white`}>
            {cfg.label} Level
          </div>
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-2 w-48 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profile.levelScore}%` }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                className={`h-full bg-gradient-to-r ${cfg.color} rounded-full`}
              />
            </div>
            <span className={`text-sm ${cfg.text}`}>{profile.levelScore}/100</span>
          </div>
          <p className="text-white/60 text-sm">{cfg.desc}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-indigo-400" />
              <h3 className="text-white">Profile Summary</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{profile.profileSummary}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">Experience</p>
                <p className="text-white">
                  {profile.yearsOfExperience > 0
                    ? `${profile.yearsOfExperience}+ yrs`
                    : 'Not specified'}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">Education</p>
                <p className="text-white text-sm">{profile.educationLevel}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">Domain</p>
                <p className="text-white capitalize">{profile.jobDomain}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3">
                <p className="text-white/40 text-xs mb-1">Match Score</p>
                <p className={`${cfg.text}`}>{profile.matchScore}%</p>
              </div>
            </div>
          </motion.div>

          {/* Detected Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-violet-400" />
              <h3 className="text-white">Detected Skills ({profile.detectedSkills.length})</h3>
            </div>
            <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
              {profile.detectedSkills.length > 0 ? profile.detectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 rounded-lg"
                >
                  {skill}
                </span>
              )) : (
                <p className="text-white/40 text-sm">No specific skills detected. Try adding more detail to your resume.</p>
              )}
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {profile.strengths.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  <span className="text-white/70 text-sm">{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Skill Gaps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-white">Identified Gaps</h3>
            </div>
            {profile.gaps.length === 0 ? (
              <p className="text-emerald-400/80 text-sm">No critical gaps detected — great coverage!</p>
            ) : (
              <ul className="space-y-2">
                {profile.gaps.map((g, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span className="text-white/70 text-sm">{g}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Skill Breakdown Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <h3 className="text-white">Skill Category Breakdown</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
            {profile.skillBreakdown.map((item, i) => (
              <div key={item.category}>
                <div className="flex justify-between mb-1">
                  <span className="text-white/60 text-xs">{item.category}</span>
                  <span className="text-white/60 text-xs">{item.score}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ delay: 0.7 + i * 0.06, duration: 0.8, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${cfg.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quiz CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mb-4">
            <p className="text-indigo-200/80 text-sm mb-1">
              Up next: A <span className="text-white">10-question adaptive quiz</span> calibrated to your <span className={cfg.text}>{cfg.label}</span> level
            </p>
            <p className="text-white/30 text-xs">10 seconds per question · No going back · Results analysed alongside your resume</p>
          </div>
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 transition-all"
          >
            <Zap className="w-5 h-5" />
            Begin Adaptive Quiz
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

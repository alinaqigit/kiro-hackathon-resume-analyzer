import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';
import {
  Trophy, Target, TrendingUp, TrendingDown, Minus,
  Lightbulb, Map, CheckCircle2, AlertCircle, ChevronRight,
  RotateCcw, Star, BookOpen, Zap
} from 'lucide-react';
import type { UserProfile, ResultAnalysis } from '../utils/analyzer';
import confetti from 'canvas-confetti';

interface ResultsStepProps {
  profile: UserProfile;
  analysis: ResultAnalysis;
  onRestart: () => void;
}

const LEVEL_COLORS = {
  beginner: { gradient: 'from-sky-500 to-blue-600', text: 'text-sky-400', border: 'border-sky-500/30', bg: 'bg-sky-500/10' },
  intermediate: { gradient: 'from-emerald-500 to-teal-600', text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  advanced: { gradient: 'from-violet-500 to-purple-600', text: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
  expert: { gradient: 'from-amber-400 to-orange-500', text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
};

const PLAN_ICONS = [BookOpen, Zap, Star];

function ScoreRing({ score, label, color, size = 120 }: { score: number; label: string; color: string; size?: number }) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={color}
            strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white" style={{ fontSize: size > 100 ? 24 : 18 }}>{score}%</span>
        </div>
      </div>
      <span className="text-white/50 text-xs text-center">{label}</span>
    </div>
  );
}

const CUSTOM_TOOLTIP = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/80">
        {payload[0].payload.topic}: {payload[0].value}/{payload[0].payload.total}
      </div>
    );
  }
  return null;
};

export function ResultsStep({ profile, analysis, onRestart }: ResultsStepProps) {
  const cfg = LEVEL_COLORS[profile.level];
  const hasConfettiRun = useRef(false);

  useEffect(() => {
    if (!hasConfettiRun.current && analysis.finalMatchScore >= 65) {
      hasConfettiRun.current = true;
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#6366f1', '#8b5cf6', '#a855f7'] });
      }, 600);
    }
  }, [analysis.finalMatchScore]);

  const consistencyConfig = {
    outperforming: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', label: 'Outperforming Profile' },
    consistent: { icon: Minus, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30', label: 'Consistent with Profile' },
    underperforming: { icon: TrendingDown, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', label: 'Below Profile Expectations' },
  };
  const consCfg = consistencyConfig[analysis.profileConsistency];
  const ConsIcon = consCfg.icon;

  const matchLabel = analysis.finalMatchScore >= 75 ? 'Strong Match' :
    analysis.finalMatchScore >= 55 ? 'Moderate Match' : 'Developing Match';
  const matchColor = analysis.finalMatchScore >= 75 ? '#10b981' :
    analysis.finalMatchScore >= 55 ? '#6366f1' : '#f59e0b';

  const barData = analysis.quizByTopic.map(t => ({
    topic: t.topic.length > 12 ? t.topic.slice(0, 12) + '…' : t.topic,
    score: Math.round((t.correct / t.total) * 100),
    correct: t.correct,
    total: t.total,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-start justify-start p-4 md:p-8 py-12">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <p className="text-indigo-300/60 text-sm mb-2 tracking-widest uppercase">Assessment Complete</p>
          <h1 className="text-white mb-1">Your Career Match Report</h1>
          <p className="text-white/40 text-sm">
            <span className="capitalize">{profile.level}</span> · {profile.jobTitle} · {profile.detectedSkills.length} skills detected
          </p>
        </motion.div>

        {/* Score summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-wrap items-center justify-around gap-6">
            <ScoreRing
              score={analysis.finalMatchScore}
              label="Final Match Score"
              color={matchColor}
              size={130}
            />
            <ScoreRing
              score={profile.matchScore}
              label="Resume Match"
              color="#6366f1"
              size={100}
            />
            <ScoreRing
              score={analysis.quizPercentage}
              label={`Quiz Score (${analysis.quizScore}/${10})`}
              color="#8b5cf6"
              size={100}
            />
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border ${consCfg.bg} mb-2`}>
                <ConsIcon className={`w-4 h-4 ${consCfg.color}`} />
                <span className={`text-sm ${consCfg.color}`}>{consCfg.label}</span>
              </div>
              <div className={`inline-block px-3 py-1.5 rounded-full text-xs bg-gradient-to-r ${cfg.gradient} text-white mt-1`}>
                {matchLabel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Consistency note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`border rounded-xl px-5 py-3 mb-6 flex items-start gap-3 ${consCfg.bg}`}
        >
          <ConsIcon className={`w-4 h-4 ${consCfg.color} mt-0.5 shrink-0`} />
          <p className="text-white/70 text-sm">{analysis.consistencyNote}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-indigo-400" />
              <h3 className="text-white">Skill Coverage Radar</h3>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={analysis.skillCoverage}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
                <Radar
                  name="Skills"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Quiz by topic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-violet-400" />
              <h3 className="text-white">Quiz Performance by Topic</h3>
            </div>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="topic" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={index} fill={entry.score >= 80 ? '#10b981' : entry.score >= 50 ? '#6366f1' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-white/30 text-sm mt-8 text-center">No topic data available</p>
            )}
          </motion.div>
        </div>

        {/* Top Strengths + Critical Gaps */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-white">Top Strengths</h3>
            </div>
            <ul className="space-y-3">
              {analysis.topStrengths.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-white/70 text-sm">{s}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              <h3 className="text-white">Critical Gaps to Address</h3>
            </div>
            {analysis.criticalGaps.length === 0 ? (
              <p className="text-emerald-400/80 text-sm">No critical gaps — excellent coverage for this role!</p>
            ) : (
              <ul className="space-y-3">
                {analysis.criticalGaps.map((g, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <AlertCircle className="w-3 h-3 text-amber-400" />
                    </div>
                    <span className="text-white/70 text-sm">{g}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        {/* Improvement Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <h3 className="text-white">Improvement Suggestions</h3>
          </div>
          <div className="space-y-3">
            {analysis.improvements.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
              >
                <span className={`w-6 h-6 rounded-lg text-xs flex items-center justify-center shrink-0 mt-0.5 bg-gradient-to-br ${cfg.gradient} text-white`}>
                  {i + 1}
                </span>
                <p className="text-white/60 text-sm leading-relaxed">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Improvement Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Map className="w-4 h-4 text-indigo-400" />
            <h3 className="text-white">Your 3-Month Improvement Roadmap</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {analysis.improvementPlan.map((phase, i) => {
              const PlanIcon = PLAN_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  style={{ borderTopColor: phase.color, borderTopWidth: 2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: phase.color + '25' }}>
                      <PlanIcon className="w-4 h-4" style={{ color: phase.color }} />
                    </div>
                    <div>
                      <p className="text-white text-xs">{phase.title}</p>
                      <p className="text-white/30 text-xs">{phase.duration}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-white/40 text-xs mb-1.5 uppercase tracking-wide">Goals</p>
                    <ul className="space-y-1.5">
                      {phase.goals.map((g, j) => (
                        <li key={j} className="flex items-start gap-1.5">
                          <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: phase.color }} />
                          <span className="text-white/60 text-xs leading-relaxed">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-white/40 text-xs mb-1.5 uppercase tracking-wide">Resources</p>
                    <ul className="space-y-1">
                      {phase.resources.map((r, j) => (
                        <li key={j} className="text-xs px-2 py-1 bg-white/5 rounded-lg text-white/50">{r}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Overall Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className={`border rounded-2xl p-6 mb-6 ${cfg.bg} ${cfg.border}`}
        >
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${cfg.gradient}`}>
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white mb-2">Overall Conclusion</h3>
              <p className="text-white/70 text-sm leading-relaxed">{analysis.overallConclusion}</p>
            </div>
          </div>
        </motion.div>

        {/* Restart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="text-center"
        >
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/60 hover:text-white transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Start a New Analysis
          </button>
          <p className="text-white/20 text-xs mt-3">Analyze a different resume or target role</p>
        </motion.div>
      </div>
    </div>
  );
}
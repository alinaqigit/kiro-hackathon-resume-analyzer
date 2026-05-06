import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, XCircle, ChevronRight, Brain } from 'lucide-react';
import type { Question } from '../utils/quizData';
import type { UserProfile } from '../utils/analyzer';

interface QuizStepProps {
  questions: Question[];
  profile: UserProfile;
  onComplete: (answers: (number | null)[]) => void;
}

const QUESTION_TIME = 10; // seconds

const LEVEL_COLORS = {
  beginner: 'from-sky-500 to-blue-600',
  intermediate: 'from-emerald-500 to-teal-600',
  advanced: 'from-violet-500 to-purple-600',
  expert: 'from-amber-400 to-orange-500',
};

export function QuizStep({ questions, profile, onComplete }: QuizStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const gradientColor = LEVEL_COLORS[profile.level];

  const advanceQuestion = useCallback((chosenAnswer: number | null) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const newAnswers = [...answers];
    newAnswers[currentIndex] = chosenAnswer;
    setAnswers(newAnswers);

    setShowFeedback(true);

    setTimeout(() => {
      if (currentIndex + 1 >= questions.length) {
        onComplete(newAnswers);
      } else {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setTimeLeft(QUESTION_TIME);
        setIsTransitioning(false);
      }
    }, 800);
  }, [answers, currentIndex, isTransitioning, onComplete, questions.length]);

  // Timer
  useEffect(() => {
    if (showFeedback) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    setTimeLeft(QUESTION_TIME);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          advanceQuestion(null); // timeout = no answer
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentIndex, showFeedback]);

  const handleOptionClick = (optionIndex: number) => {
    if (showFeedback || isTransitioning) return;
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedAnswer(optionIndex);
    advanceQuestion(optionIndex);
  };

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const timerPercent = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft <= 3 ? '#ef4444' : timeLeft <= 5 ? '#f59e0b' : '#6366f1';

  const getOptionState = (index: number) => {
    if (!showFeedback) {
      return selectedAnswer === index ? 'selected' : 'idle';
    }
    if (index === question.correctIndex) return 'correct';
    if (index === selectedAnswer && selectedAnswer !== question.correctIndex) return 'wrong';
    return 'dimmed';
  };

  const optionStyles: Record<string, string> = {
    idle: 'border-white/10 bg-white/5 text-white/80 hover:border-indigo-400/50 hover:bg-indigo-500/10 cursor-pointer',
    selected: 'border-indigo-400 bg-indigo-500/20 text-white',
    correct: 'border-emerald-400 bg-emerald-500/15 text-emerald-300',
    wrong: 'border-red-400 bg-red-500/15 text-red-300',
    dimmed: 'border-white/5 bg-white/3 text-white/30 cursor-default',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-violet-500/8 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradientColor} flex items-center justify-center`}>
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm">Question {currentIndex + 1} of {questions.length}</p>
              <p className="text-white/30 text-xs capitalize">{question.topic} · {question.difficulty}</p>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle
                  cx="20" cy="20" r="16" fill="none"
                  stroke={timerColor}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  strokeDashoffset={`${2 * Math.PI * 16 * (1 - timerPercent / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs" style={{ color: timerColor }}>{timeLeft}</span>
              </div>
            </div>
            <Clock className="w-4 h-4 text-white/30" />
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${gradientColor} rounded-full`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4"
          >
            <p className="text-white leading-relaxed mb-6 text-sm md:text-base">{question.text}</p>

            <div className="space-y-3">
              {question.options.map((option, i) => {
                const state = getOptionState(i);
                return (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(i)}
                    disabled={showFeedback || isTransitioning}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm flex items-center gap-3 ${optionStyles[state]}`}
                  >
                    <span className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 text-xs ${
                      state === 'correct' ? 'bg-emerald-500/30 border-emerald-400 text-emerald-300' :
                      state === 'wrong' ? 'bg-red-500/30 border-red-400 text-red-300' :
                      state === 'selected' ? 'bg-indigo-500/30 border-indigo-400 text-indigo-300' :
                      'bg-white/5 border-white/20 text-white/40'
                    }`}>
                      {state === 'correct' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                       state === 'wrong' ? <XCircle className="w-3.5 h-3.5" /> :
                       String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 overflow-hidden"
                >
                  <div className={`rounded-xl p-3 text-xs leading-relaxed ${
                    selectedAnswer === question.correctIndex
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
                      : selectedAnswer === null
                      ? 'bg-amber-500/10 border border-amber-500/20 text-amber-300'
                      : 'bg-red-500/10 border border-red-500/20 text-red-300'
                  }`}>
                    <span className="font-semibold">
                      {selectedAnswer === question.correctIndex ? '✓ Correct! ' :
                       selectedAnswer === null ? '⏱ Time\'s up! ' : '✗ Incorrect. '}
                    </span>
                    {question.explanation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5">
          {questions.map((_, i) => {
            const isAnswered = i < currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <div
                key={i}
                className={`rounded-full transition-all ${
                  isCurrent ? `w-6 h-2 bg-gradient-to-r ${gradientColor}` :
                  isAnswered ? 'w-2 h-2 bg-white/30' :
                  'w-2 h-2 bg-white/10'
                }`}
              />
            );
          })}
        </div>

        {/* Skip button */}
        {!showFeedback && (
          <div className="text-center mt-4">
            <button
              onClick={() => advanceQuestion(null)}
              className="text-white/20 hover:text-white/40 text-xs transition-colors inline-flex items-center gap-1"
            >
              Skip <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

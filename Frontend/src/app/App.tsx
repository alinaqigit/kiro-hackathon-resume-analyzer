import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { UploadStep } from './components/UploadStep';
import { AnalyzingStep } from './components/AnalyzingStep';
import { ProfileStep } from './components/ProfileStep';
import { QuizStep } from './components/QuizStep';
import { ResultsStep } from './components/ResultsStep';
import {
  analyzeResume,
  analyzeResults,
  generateQuiz,
  type UserProfile,
  type ResultAnalysis,
} from './utils/analyzer';
import type { Question } from './utils/quizData';

type Step = 'upload' | 'analyzing' | 'profile' | 'quiz' | 'results';

export default function App() {
  const [step, setStep] = useState<Step>('upload');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [analysis, setAnalysis] = useState<ResultAnalysis | null>(null);

  const handleUploadSubmit = useCallback((resumeText: string, jobDescription: string) => {
    // Run analysis (synchronous) and store results, then show analyzing animation
    const userProfile = analyzeResume(resumeText, jobDescription);
    const quiz = generateQuiz(userProfile);
    setProfile(userProfile);
    setQuestions(quiz);
    setStep('analyzing');
  }, []);

  const handleAnalyzingComplete = useCallback(() => {
    setStep('profile');
  }, []);

  const handleStartQuiz = useCallback(() => {
    setStep('quiz');
  }, []);

  const handleQuizComplete = useCallback((answers: (number | null)[]) => {
    if (!profile || !questions.length) return;
    const result = analyzeResults(profile, questions, answers);
    setAnalysis(result);
    setStep('results');
  }, [profile, questions]);

  const handleRestart = useCallback(() => {
    setProfile(null);
    setQuestions([]);
    setAnalysis(null);
    setStep('upload');
  }, []);

  return (
    <div className="size-full">
      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <UploadStep onSubmit={handleUploadSubmit} />
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AnalyzingStep onComplete={handleAnalyzingComplete} />
          </motion.div>
        )}

        {step === 'profile' && profile && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfileStep profile={profile} onStartQuiz={handleStartQuiz} />
          </motion.div>
        )}

        {step === 'quiz' && profile && questions.length > 0 && (
          <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QuizStep questions={questions} profile={profile} onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {step === 'results' && profile && analysis && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsStep profile={profile} analysis={analysis} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

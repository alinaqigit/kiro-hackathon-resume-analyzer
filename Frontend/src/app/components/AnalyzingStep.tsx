import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Search, Cpu, CheckCircle2, Zap } from 'lucide-react';

interface AnalyzingStepProps {
  onComplete: () => void;
}

const STEPS = [
  { icon: Search, label: 'Parsing resume content…', detail: 'Extracting skills, experience & education' },
  { icon: Brain, label: 'Profiling expertise level…', detail: 'Calibrating to beginner / intermediate / advanced / expert' },
  { icon: Cpu, label: 'Detecting skill gaps…', detail: 'Comparing against job requirements' },
  { icon: Zap, label: 'Generating adaptive quiz…', detail: 'Crafting 10 personalized MCQs' },
  { icon: CheckCircle2, label: 'Analysis complete!', detail: 'Your profile is ready' },
];

export function AnalyzingStep({ onComplete }: AnalyzingStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = 3200; // ms
    const stepDuration = totalDuration / STEPS.length;

    const progressInterval = setInterval(() => {
      setProgress(p => Math.min(100, p + 1));
    }, totalDuration / 100);

    const stepIntervals = STEPS.map((_, i) =>
      setTimeout(() => setCurrentStep(i), i * stepDuration)
    );

    const finishTimer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setTimeout(onComplete, 400);
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      stepIntervals.forEach(clearTimeout);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex items-center justify-center p-6">
      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md text-center"
      >
        {/* Pulsing brain icon */}
        <div className="relative inline-flex items-center justify-center mb-8">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-2 rounded-full bg-indigo-500/10 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
            <Brain className="w-12 h-12 text-white" />
          </div>
        </div>

        <h2 className="text-white mb-2">Analyzing Your Profile</h2>
        <p className="text-indigo-200/60 mb-8 text-sm">This takes just a moment…</p>

        {/* Progress bar */}
        <div className="w-full bg-white/5 rounded-full h-2 mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'linear' }}
          />
        </div>

        {/* Steps list */}
        <div className="space-y-3 text-left">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === currentStep;
            const isDone = i < currentStep;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: i <= currentStep ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                  isActive ? 'bg-indigo-500/15 border border-indigo-500/30' :
                  isDone ? 'bg-white/5' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  isDone ? 'bg-green-500/20' :
                  isActive ? 'bg-indigo-500/30' : 'bg-white/5'
                }`}>
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                  ) : isActive ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Icon className="w-4 h-4 text-indigo-400" />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4 text-white/30" />
                  )}
                </div>
                <div>
                  <p className={`text-sm ${isDone ? 'text-green-400' : isActive ? 'text-white' : 'text-white/30'}`}>
                    {step.label}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-indigo-300/60 text-xs mt-0.5"
                      >
                        {step.detail}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {isActive && (
                  <div className="ml-auto flex gap-0.5 items-center pt-1">
                    {[0, 1, 2].map(dot => (
                      <motion.div
                        key={dot}
                        className="w-1 h-1 bg-indigo-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-white/20 text-xs mt-6">{Math.round(progress)}% complete</p>
      </motion.div>
    </div>
  );
}

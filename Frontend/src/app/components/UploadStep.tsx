import { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  Upload, FileText, Briefcase, Sparkles, AlertCircle, X, ChevronRight
} from 'lucide-react';
import { extractTextFromFile } from '../utils/pdfParser';

interface UploadStepProps {
  onSubmit: (resumeText: string, jobDescription: string) => void;
}

export function UploadStep({ onSubmit }: UploadStepProps) {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isParsingPDF, setIsParsingPDF] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file) return;
    const allowed = ['application/pdf', 'text/plain', 'application/msword'];
    const isAllowed = allowed.includes(file.type) || file.name.endsWith('.pdf') || file.name.endsWith('.txt');
    if (!isAllowed) {
      setError('Only PDF and TXT files are supported.');
      return;
    }
    setError('');
    setIsParsingPDF(true);
    setFileName(file.name);
    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
    } catch (e: any) {
      setError(e.message || 'Failed to read file. Please paste your resume text manually.');
    } finally {
      setIsParsingPDF(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleSubmit = () => {
    if (!resumeText.trim()) { setError('Please provide your resume content.'); return; }
    if (!jobDescription.trim()) { setError('Please describe the job or category.'); return; }
    if (resumeText.trim().length < 50) { setError('Resume text seems too short. Please provide more details.'); return; }
    setError('');
    onSubmit(resumeText.trim(), jobDescription.trim());
  };

  const canSubmit = resumeText.trim().length >= 50 && jobDescription.trim().length >= 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4 shadow-lg shadow-indigo-500/30"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-white mb-2">ResumeIQ</h1>
          <p className="text-indigo-200/70 max-w-md mx-auto">
            AI-powered resume analysis, skill assessment, and personalized career roadmap
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Resume Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h2 className="text-white">Your Resume</h2>
            </div>

            {/* Drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all mb-4
                ${isDragging ? 'border-indigo-400 bg-indigo-400/10' : 'border-white/20 hover:border-indigo-400/50 hover:bg-white/5'}
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
              {isParsingPDF ? (
                <div className="flex flex-col items-center gap-2 py-2">
                  <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-indigo-300 text-sm">Parsing PDF…</p>
                </div>
              ) : fileName ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">{fileName}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFileName(''); setResumeText(''); }}
                    className="ml-1 text-white/40 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="py-2">
                  <Upload className="w-6 h-6 text-white/40 mx-auto mb-1" />
                  <p className="text-white/60 text-sm">Drop PDF / TXT or click to browse</p>
                </div>
              )}
            </div>

            <div className="relative mb-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-transparent px-2 text-white/40">or paste directly</span>
              </div>
            </div>

            <textarea
              value={resumeText}
              onChange={(e) => { setResumeText(e.target.value); setError(''); }}
              placeholder="Paste your resume text here... Include your skills, experience, education, and projects for the best analysis."
              className="w-full h-52 bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 placeholder-white/25 text-sm resize-none focus:outline-none focus:border-indigo-400/60 transition-colors"
            />
            <p className="text-white/30 text-xs mt-1">{resumeText.length} characters</p>
          </motion.div>

          {/* Job Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-violet-400" />
              <h2 className="text-white">Target Role / Job Description</h2>
            </div>

            <textarea
              value={jobDescription}
              onChange={(e) => { setJobDescription(e.target.value); setError(''); }}
              placeholder="Describe the job or category you're targeting...&#10;&#10;Examples:&#10;• Senior Frontend Developer at a fintech startup&#10;• Machine Learning Engineer working on NLP models&#10;• Full Stack Developer (React + Node.js)&#10;• DevOps Engineer — AWS, Kubernetes, CI/CD&#10;&#10;Tip: Paste an actual job description for the most accurate matching!"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white/80 placeholder-white/25 text-sm resize-none focus:outline-none focus:border-violet-400/60 transition-colors min-h-[220px]"
            />
            <p className="text-white/30 text-xs mt-1">{jobDescription.length} characters</p>

            {/* Quick-fill examples */}
            <div className="mt-4">
              <p className="text-white/40 text-xs mb-2">Quick fill:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Senior React Frontend Developer',
                  'Backend Python/Django Engineer',
                  'Machine Learning Engineer (NLP)',
                  'DevOps / Cloud Engineer (AWS)',
                  'React Native Mobile Developer',
                ].map((example) => (
                  <button
                    key={example}
                    onClick={() => setJobDescription(example)}
                    className="text-xs px-2 py-1 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/40 text-white/50 hover:text-indigo-300 rounded-lg transition-all"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`
              inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all
              ${canSubmit
                ? 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
              }
            `}
          >
            <Sparkles className="w-5 h-5" />
            Analyze My Resume
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-white/30 text-xs mt-3">
            Analyzes skills → generates a tailored quiz → produces a detailed match report
          </p>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {[
            '🎯 Skill Profiling',
            '🧠 Adaptive Quiz',
            '📊 Match Score',
            '🗺️ Improvement Plan',
          ].map(f => (
            <span key={f} className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 text-white/50 rounded-full">
              {f}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

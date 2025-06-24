"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Bot, Lightbulb, FileText } from "lucide-react";

export default function ResumeAnalysisSection({ resumeInsights }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#0a0f1c] via-[#0d1219] to-[#0f141b] rounded-2xl border border-blue-500/30 overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-blue-800/20"></div>
        <div className="relative p-6 border-b border-blue-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <FileText size={24} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Resume Analysis</h2>
              <p className="text-blue-200/70 text-sm mt-1">
                AI-powered insights from your background
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Identified Skills */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-400" />
            Identified Skills & Strengths
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {resumeInsights.identifiedSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-300 text-sm font-medium">
                    {skill}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Analysis & Suggestions */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
            <Bot size={18} className="text-blue-400" />
            AI Analysis & Recommendations
          </h3>
          <div className="space-y-4">
            {resumeInsights.analysisAndSuggestions.map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-full mt-1">
                    <Lightbulb size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-200/90">{suggestion}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resume Score */}
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              Resume Readiness Score
            </h3>
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg
                className="w-32 h-32 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeDasharray="75, 100"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-cyan-400">75%</span>
              </div>
            </div>
            <p className="text-blue-200/70 text-sm">
              Your resume shows strong foundational skills. Complete this
              roadmap to boost your score to 95%!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

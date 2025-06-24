"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Award, Plus, Sparkles } from "lucide-react";

export default function PostRoadmapAnalysis({ postAnalysis }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-[#0a0f1c] via-[#0d1219] to-[#0f141b] rounded-2xl border border-green-500/30 overflow-hidden shadow-xl"
    >
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-500/10 to-green-800/20"></div>
        <div className="relative p-6 border-b border-green-500/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-xl border border-green-500/30">
              <Award size={24} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Post-Roadmap Analysis
              </h2>
              <p className="text-green-200/70 text-sm mt-1">
                Your achievements and next steps
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills Mastered */}
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-400" />
              Skills You'll Master
            </h3>
            <div className="space-y-3">
              {postAnalysis.skillsLearned.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <div className="p-1.5 bg-green-500/20 rounded-full">
                    <Plus size={14} className="text-green-400" />
                  </div>
                  <span className="text-green-200 font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div>
            <h3 className="text-lg font-semibold text-green-300 mb-4 flex items-center gap-2">
              <ArrowRight size={18} className="text-blue-400" />
              Recommended Next Steps
            </h3>
            <div className="space-y-3">
              {postAnalysis.recommendedNext.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors group cursor-pointer"
                >
                  <div className="p-1.5 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                    <ArrowRight size={14} className="text-blue-400" />
                  </div>
                  <span className="text-blue-200 font-medium group-hover:text-blue-100 transition-colors">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Outcomes */}
        <div className="mt-8 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-300 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-yellow-400" />
            Potential Career Outcomes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                $45-65K
              </div>
              <div className="text-sm text-yellow-200/80">
                Entry-level Salary
              </div>
            </div>
            <div className="text-center p-4 bg-orange-500/5 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400 mb-1">85%</div>
              <div className="text-sm text-orange-200/80">Job Market Fit</div>
            </div>
            <div className="text-center p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-1">
                6-12mo
              </div>
              <div className="text-sm text-green-200/80">Time to Hire</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

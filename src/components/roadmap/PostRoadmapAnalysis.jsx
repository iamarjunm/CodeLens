"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Award, Plus } from "lucide-react";

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
      </div>
    </motion.div>
  );
}

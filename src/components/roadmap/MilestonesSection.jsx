"use client";
import { motion } from "framer-motion";
import { Award, Sparkles } from "lucide-react";

export default function MilestonesSection({ milestones }) {
  if (milestones.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <Award size={24} className="text-yellow-400" />
        Project Milestones
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <milestone.icon size={24} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {milestone.title}
                </h3>
                <p className="text-sm text-yellow-300">Week {milestone.week}</p>
              </div>
              <div className="ml-auto">
                <Sparkles size={20} className="text-yellow-400" />
              </div>
            </div>
            <p className="text-neutral-300 text-sm mb-4">
              {milestone.description}
            </p>

            {milestone.project && (
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-yellow-400 uppercase tracking-wider mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {milestone.project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-yellow-500/10 text-yellow-300 rounded-full border border-yellow-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

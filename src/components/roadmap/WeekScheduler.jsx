"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import SchedulerCard from "./SchedulerCard";

export default function WeekScheduler({
  week,
  tasks,
  onToggleTask,
  onAddNote,
  expanded,
  onToggle,
}) {
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progressPercentage =
    tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#0a0f1c] via-[#0d1219] to-[#0f141b] rounded-2xl border border-neutral-800/60 overflow-hidden shadow-xl"
    >
      {/* Week header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-cyan-500/5 to-blue-800/10"></div>
        <button
          onClick={onToggle}
          className="relative w-full flex items-center justify-between p-6 hover:bg-blue-500/5 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                <span className="text-blue-300 font-bold">W{week}</span>
              </div>
              {progressPercentage === 100 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={10} className="text-white" />
                </div>
              )}
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                Week {week} Schedule
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm text-neutral-400">Progress</div>
              <div className="text-lg font-bold text-white">
                {Math.round(progressPercentage)}%
              </div>
            </div>
            <div className="w-16 h-2 bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <ChevronDown
              size={20}
              className={`text-neutral-500 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Tasks grid */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {tasks.map((task, taskIndex) => (
                  <SchedulerCard
                    key={taskIndex}
                    task={task}
                    onToggle={() => onToggleTask(taskIndex)}
                    onAddNote={(note) => onAddNote(taskIndex, note)}
                    index={taskIndex}
                    isHighlighted={taskIndex === 0 && !task.completed} // Highlight first incomplete task
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

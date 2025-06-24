"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Target, Award, Sparkles } from "lucide-react";
import RefineRoadmapModal from "@/components/dashboard/RefineRoadmapModal";
import WeekScheduler from "@/components/roadmap/WeekScheduler";
import AnalyticsDashboard from "@/components/roadmap/AnalyticsDashboard";
import MilestonesSection from "@/components/roadmap/MilestonesSection";
import mockRoadmap from "@/lib/mockRoadmap";

export default function RoadmapDetailPage() {
  const [roadmap, setRoadmap] = useState(mockRoadmap);
  const [isRefineModalOpen, setRefineModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState([1]); // Start with first week expanded
  const [activeView, setActiveView] = useState("schedule"); // 'schedule' or 'analytics'

  const toggleTaskCompletion = (weekIndex, taskIndex) => {
    const newRoadmap = { ...roadmap };
    newRoadmap.timeline[weekIndex].tasks[taskIndex].completed =
      !newRoadmap.timeline[weekIndex].tasks[taskIndex].completed;
    setRoadmap(newRoadmap);
  };

  const addNoteToTask = (weekIndex, taskIndex, note) => {
    const newRoadmap = { ...roadmap };
    newRoadmap.timeline[weekIndex].tasks[taskIndex].note = note;
    setRoadmap(newRoadmap);
  };

  const toggleWeekExpansion = (week) => {
    setExpandedWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week],
    );
  };

  const modules = roadmap.timeline.filter((item) => item.type === "module");
  const milestones = roadmap.timeline.filter(
    (item) => item.type === "milestone",
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0d1117] to-[#161b22]">
        {/* Header */}
        <div className="border-b border-neutral-800/60 bg-[#161b22]/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  {roadmap.title}
                </h1>
                <p className="text-neutral-400 mt-2">{roadmap.goalSummary}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveView("schedule")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === "schedule"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  }`}
                >
                  Schedule View
                </button>
                <button
                  onClick={() => setActiveView("analytics")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeView === "analytics"
                      ? "bg-green-500/20 text-green-300 border border-green-500/40"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  }`}
                >
                  Analytics
                </button>
                <motion.button
                  onClick={() => setRefineModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                >
                  <Sparkles size={16} />
                  Refine
                </motion.button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Clock size={14} />
                <span>7 weeks total</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Target size={14} />
                <span>6 hours/week</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Award size={14} />
                <span>{milestones.length} milestones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-8 py-8">
          {activeView === "schedule" ? (
            <div className="space-y-8">
              {modules.map((module, index) => (
                <WeekScheduler
                  key={module.week}
                  week={module.week}
                  tasks={module.tasks}
                  onToggleTask={(taskIndex) =>
                    toggleTaskCompletion(index, taskIndex)
                  }
                  onAddNote={(taskIndex, note) =>
                    addNoteToTask(index, taskIndex, note)
                  }
                  expanded={expandedWeeks.includes(module.week)}
                  onToggle={() => toggleWeekExpansion(module.week)}
                />
              ))}

              {/* Milestones section */}
              <MilestonesSection milestones={milestones} />
            </div>
          ) : (
            <AnalyticsDashboard roadmap={roadmap} />
          )}
        </div>
      </div>

      <RefineRoadmapModal
        isOpen={isRefineModalOpen}
        onClose={() => setRefineModalOpen(false)}
      />
    </>
  );
}

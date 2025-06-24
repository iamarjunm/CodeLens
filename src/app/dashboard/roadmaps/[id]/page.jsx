"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Book,
  Youtube,
  Lightbulb,
  FolderKanban,
  Calendar,
  Clock,
  BarChartHorizontal,
  Sparkles,
  HelpCircle,
  Target,
  Bot,
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  X,
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
  MoreHorizontal,
  Timer,
  Users,
  Award,
  Zap,
  Layers,
  Filter,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import Link from "next/link";
import RefineRoadmapModal from "@/components/dashboard/RefineRoadmapModal";
import mockRoadmap from "@/lib/mockRoadmap";

const getIcon = (type) => {
  switch (type) {
    case "course":
      return <Book size={18} className="text-blue-400" />;
    case "video":
      return <Youtube size={18} className="text-red-400" />;
    case "article":
      return <Lightbulb size={18} className="text-yellow-400" />;
    case "project":
      return <FolderKanban size={18} className="text-green-400" />;
    default:
      return <Circle size={18} className="text-neutral-500" />;
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 border-red-500/30 text-red-300";
    case "medium":
      return "bg-yellow-500/10 border-yellow-500/30 text-yellow-300";
    case "low":
      return "bg-green-500/10 border-green-500/30 text-green-300";
    default:
      return "bg-blue-500/10 border-blue-500/30 text-blue-300";
  }
};

const StatusBadge = ({ status, className = "" }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-300 border-green-500/40";
      case "in-progress":
        return "bg-blue-500/20 text-blue-300 border-blue-500/40";
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/40";
      case "blocked":
        return "bg-red-500/20 text-red-300 border-red-500/40";
      default:
        return "bg-neutral-500/20 text-neutral-300 border-neutral-500/40";
    }
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full border ${getStatusStyles(status)} ${className}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const SchedulerCard = ({
  task,
  onToggle,
  onAddNote,
  index,
  isHighlighted = false,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpent, setTimeSpent] = useState(task.timeSpent || 0);

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: index * 0.1, duration: 0.4, ease: "easeOut" },
    },
    hover: {
      y: -2,
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-300
        ${
          isHighlighted
            ? "bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-orange-500/10 border-yellow-500/40 shadow-lg shadow-yellow-500/10"
            : "bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] border-neutral-800/60 hover:border-blue-500/40"
        }
        hover:shadow-xl hover:shadow-blue-500/10 group
      `}
    >
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800/50">
        <motion.div
          className={`h-full ${task.completed ? "bg-green-500" : "bg-blue-500"}`}
          initial={{ width: 0 }}
          animate={{
            width: task.completed
              ? "100%"
              : `${(timeSpent / parseInt(task.time)) * 100}%`,
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <button
              onClick={onToggle}
              className={`flex-shrink-0 mt-1 transition-all duration-200 ${
                task.completed
                  ? "text-green-500 hover:text-green-400"
                  : "text-neutral-500 hover:text-blue-400"
              }`}
            >
              {task.completed ? (
                <CheckCircle2 size={24} />
              ) : (
                <Circle size={24} />
              )}
            </button>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-3 mb-2">
                {getIcon(task.type)}
                <StatusBadge
                  status={
                    task.completed
                      ? "completed"
                      : timeSpent > 0
                        ? "in-progress"
                        : "pending"
                  }
                />
                {task.priority && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(task.priority)}`}
                  >
                    {task.priority} priority
                  </span>
                )}
              </div>

              {task.type === "course" && task.url ? (
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg font-semibold flex items-center gap-2 hover:text-blue-300 transition-colors group/link ${
                    task.completed
                      ? "line-through text-neutral-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                  <ExternalLink
                    size={16}
                    className="opacity-0 group-hover/link:opacity-70 transition-opacity"
                  />
                </a>
              ) : (
                <h3
                  className={`text-lg font-semibold ${task.completed ? "line-through text-neutral-500" : "text-white"}`}
                >
                  {task.title}
                </h3>
              )}

              <div className="flex items-center gap-4 mt-3 text-sm text-neutral-400">
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{task.time} estimated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer size={14} />
                  <span>{timeSpent}h spent</span>
                </div>
                {task.difficulty && (
                  <div className="flex items-center gap-2">
                    <Layers size={14} />
                    <span>{task.difficulty}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
              title={isPlaying ? "Pause timer" : "Start timer"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 rounded-lg bg-neutral-700/50 text-neutral-400 hover:bg-neutral-600/50 hover:text-white transition-all"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Quick actions bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                showDetails
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-neutral-700/50 text-neutral-400 hover:text-blue-400"
              }`}
            >
              {showDetails ? "Hide" : "Show"} Details
            </button>
            {task.reason && (
              <div className="flex items-center gap-1 text-xs text-blue-400">
                <Bot size={12} />
                <span>AI Recommended</span>
              </div>
            )}
          </div>

          <button
            onClick={() => onAddNote("")}
            className="text-xs text-neutral-400 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <FileText size={12} />
            Add Note
          </button>
        </div>

        {/* Expandable details section */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="border-t border-neutral-700/50 pt-4"
            >
              {task.reason && (
                <div className="mb-4 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-2 text-sm">
                    <Bot
                      size={14}
                      className="flex-shrink-0 mt-0.5 text-blue-400"
                    />
                    <div>
                      <p className="text-blue-200/90 font-medium mb-1">
                        Why this task?
                      </p>
                      <p className="text-blue-200/70">{task.reason}</p>
                    </div>
                  </div>
                </div>
              )}

              {task.resources && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-neutral-300">
                    Additional Resources:
                  </h4>
                  {task.resources.map((resource, i) => (
                    <a
                      key={i}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {getIcon(resource.type)}
                      <span>{resource.title}</span>
                      <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Highlighted card accent */}
      {isHighlighted && (
        <div className="absolute top-2 right-2">
          <div className="p-1.5 bg-yellow-500/20 rounded-full">
            <Sparkles size={14} className="text-yellow-400" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const WeekScheduler = ({
  week,
  tasks,
  onToggleTask,
  onAddNote,
  expanded,
  onToggle,
}) => {
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
};

const ResumeAnalysisSection = ({ resumeInsights }) => {
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
};

const PostRoadmapAnalysis = ({ postAnalysis }) => {
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
};

const AnalyticsDashboard = ({ roadmap }) => {
  const allTasks = roadmap.timeline
    .filter((i) => i.type === "module")
    .flatMap((m) => m.tasks);
  const completedTasks = allTasks.filter((t) => t.completed);
  const progress =
    allTasks.length > 0
      ? Math.round((completedTasks.length / allTasks.length) * 100)
      : 0;

  const weeklyProgress = roadmap.timeline
    .filter((item) => item.type === "module")
    .map((module) => {
      const completed = module.tasks.filter((t) => t.completed).length;
      const total = module.tasks.length;
      return {
        week: `W${module.week}`,
        progress: total > 0 ? Math.round((completed / total) * 100) : 0,
        completed,
        total,
      };
    });

  const chartData = [
    { name: "Completed", value: progress, color: "#22d3ee" },
    { name: "Remaining", value: 100 - progress, color: "#374151" },
  ];

  return (
    <div className="space-y-8">
      {/* Resume Analysis */}
      <ResumeAnalysisSection resumeInsights={roadmap.resumeInsights} />

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] p-6 rounded-xl border border-neutral-800/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BarChartHorizontal size={20} className="text-blue-400" />
            Progress Analytics
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-neutral-400">Overall Progress</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Circular Progress */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-white">
                    {progress}%
                  </span>
                  <p className="text-xs text-neutral-400 mt-1">Complete</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-400">
                  {completedTasks.length}
                </div>
                <div className="text-sm text-neutral-400">Tasks Done</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">
                  {allTasks.length - completedTasks.length}
                </div>
                <div className="text-sm text-neutral-400">Remaining</div>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">7</div>
                <div className="text-sm text-neutral-400">Weeks</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">6h</div>
                <div className="text-sm text-neutral-400">Per Week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] p-6 rounded-xl border border-neutral-800/60">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Calendar size={18} className="text-green-400" />
          Weekly Breakdown
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyProgress}>
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Bar dataKey="progress" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Post Roadmap Analysis */}
      {roadmap.postAnalysis && (
        <PostRoadmapAnalysis postAnalysis={roadmap.postAnalysis} />
      )}

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#161b22] via-[#1a2028] to-[#1e242c] p-6 rounded-xl border border-neutral-800/60">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Zap size={18} className="text-yellow-400" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-left hover:bg-blue-500/20 transition-colors group">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-blue-400" />
              <div>
                <div className="font-medium text-white group-hover:text-blue-300">
                  Schedule Study
                </div>
                <div className="text-xs text-neutral-400">Set reminders</div>
              </div>
            </div>
          </button>
          <button className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-left hover:bg-green-500/20 transition-colors group">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-green-400" />
              <div>
                <div className="font-medium text-white group-hover:text-green-300">
                  Find Study Group
                </div>
                <div className="text-xs text-neutral-400">
                  Connect with peers
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

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
              {milestones.length > 0 && (
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
                            <milestone.icon
                              size={24}
                              className="text-yellow-400"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">
                              {milestone.title}
                            </h3>
                            <p className="text-sm text-yellow-300">
                              Week {milestone.week}
                            </p>
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
              )}
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

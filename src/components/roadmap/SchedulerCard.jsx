"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Book,
  Youtube,
  Lightbulb,
  FolderKanban,
  Clock,
  Bot,
  FileText,
  Play,
  Pause,
  MoreHorizontal,
  Timer,
  Layers,
  ExternalLink,
} from "lucide-react";

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

export default function SchedulerCard({
  task,
  onToggle,
  onAddNote,
  index,
  isHighlighted = false,
}) {
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
            <Lightbulb size={14} className="text-yellow-400" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

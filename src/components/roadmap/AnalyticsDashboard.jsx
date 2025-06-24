"use client";
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
import { BarChartHorizontal, Calendar, Zap, Users } from "lucide-react";
import ResumeAnalysisSection from "./ResumeAnalysisSection";
import PostRoadmapAnalysis from "./PostRoadmapAnalysis";

export default function AnalyticsDashboard({ roadmap }) {
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
    </div>
  );
}

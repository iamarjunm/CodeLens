'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Book, Youtube, Lightbulb, FolderKanban, Calendar, Clock, BarChartHorizontal, Sparkles, HelpCircle, Target, Bot, FileText, ChevronDown, ChevronUp, Plus, X, ArrowRight, ExternalLink } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import RefineRoadmapModal from '@/components/dashboard/RefineRoadmapModal';
import mockRoadmap from '@/lib/mockRoadmap';

const getIcon = (type) => {
  switch(type) {
    case 'course': return <Book size={18} className="text-blue-400" />;
    case 'video': return <Youtube size={18} className="text-red-400" />;
    case 'article': return <Lightbulb size={18} className="text-yellow-400" />;
    case 'project': return <FolderKanban size={18} className="text-green-400" />;
    default: return <Circle size={18} className="text-neutral-500" />;
  }
}

const TaskItem = ({ task, onToggle, onAddNote }) => {
  const [showReason, setShowReason] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState(task.note || '');
  
  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-gradient-to-r from-[#161b22] to-[#1a2028] p-4 rounded-xl border border-neutral-800 shadow-lg hover:shadow-blue-500/10 transition-shadow"
    >
      <div className="flex items-start gap-4">
        <button 
          onClick={onToggle} 
          className={`flex-shrink-0 mt-1 transition-all ${task.completed ? 'text-green-500 hover:text-green-400' : 'text-neutral-500 hover:text-blue-400'}`}
        >
          {task.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
        </button>
        
        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              {task.type === 'course' && task.url ? (
                <a 
                  href={task.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium ${task.completed ? 'line-through text-neutral-500' : ''}`}
                >
                  {task.title} <ExternalLink size={14} className="opacity-70" />
                </a>
              ) : (
                <p className={`text-white ${task.completed ? 'line-through text-neutral-500' : ''}`}>{task.title}</p>
              )}
              
              <div className="flex items-center gap-4 text-xs text-neutral-400 mt-1">
                <div className="flex items-center gap-2">
                  {getIcon(task.type)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={12} />
                  <span className="bg-neutral-800/50 px-2 py-0.5 rounded-md">{task.time}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowReason(!showReason)} 
                className={`p-1.5 rounded-full ${showReason ? 'bg-blue-500/20 text-blue-400' : 'text-neutral-500 hover:text-blue-400 hover:bg-blue-500/10'}`}
              >
                <HelpCircle size={16} />
              </button>
              <button 
                onClick={() => setShowNoteModal(true)} 
                className={`p-1.5 rounded-full ${note ? 'text-green-400 bg-green-500/10' : 'text-neutral-500 hover:text-green-400 hover:bg-green-500/10'}`}
                title="Add Note"
              >
                <FileText size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showReason && (
          <motion.div 
            initial={{ opacity: 0, height: 0, marginTop: 0 }} 
            animate={{ opacity: 1, height: 'auto', marginTop: '12px' }} 
            exit={{ opacity: 0, height: 0, marginTop: 0 }} 
            className="pl-10 text-sm text-blue-200/80 border-l-2 border-blue-500/30 ml-2"
          >
            <div className="flex items-start gap-2">
              <Bot size={14} className="flex-shrink-0 mt-0.5 text-blue-400" />
              <p className="pl-1">{task.reason}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {note && (
        <div className="mt-3 pl-10 text-green-300 text-xs italic flex items-start gap-2">
          <FileText size={14} className="flex-shrink-0 mt-0.5 opacity-70" />
          <span>{note}</span>
        </div>
      )}
      
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowNoteModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#161b22] p-6 rounded-xl border border-neutral-800 w-full max-w-md shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Add Note</h3>
              <button 
                onClick={() => setShowNoteModal(false)} 
                className="p-1 rounded-full hover:bg-neutral-700 text-neutral-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={4}
              className="w-full p-3 bg-[#0d1117] border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
              placeholder="Type your note here..."
              autoFocus
            />
            
            <div className="flex justify-end mt-4 gap-2">
              <button 
                onClick={() => setShowNoteModal(false)} 
                className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setShowNoteModal(false); onAddNote(note); }} 
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white transition-all shadow-md hover:shadow-green-500/30"
              >
                Save Note
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

const MilestoneCard = ({ milestone }) => {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className="relative">
      <div className="absolute -left-1 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
      
      <div className="ml-4">
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="flex items-center gap-3 w-full text-left mb-2 group"
        >
          <div className={`p-2 rounded-lg ${expanded ? 'bg-blue-500/20' : 'bg-neutral-800/50'} group-hover:bg-blue-500/20 transition-colors`}>
            <milestone.icon className="text-blue-400" size={20}/>
          </div>
          <div className="flex-grow">
            <h3 className="font-bold text-blue-300">{milestone.title}</h3>
            <p className="text-sm text-neutral-400">Week {milestone.week}</p>
          </div>
          <div className="p-1 rounded-full text-neutral-500 group-hover:text-blue-400">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>
        
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-5 rounded-xl border border-blue-500/30 mb-6">
                <p className="text-neutral-300 text-sm mb-4">{milestone.description}</p>
                
                {milestone.project && (
                  <div className="bg-[#10151c] border border-blue-700/30 rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {milestone.project.techStack.map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs bg-blue-500/10 text-blue-300 rounded-full">{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Requirements</h4>
                      <ul className="space-y-2">
                        {milestone.project.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-neutral-200">
                            <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0 text-blue-400" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Next Steps</h4>
                      <ul className="space-y-2">
                        {milestone.project.nextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-neutral-200">
                            <ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-blue-400" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const RoadmapHeader = ({ title, goalSummary, resumeInsights }) => {
  const [activeTab, setActiveTab] = useState('goal');
  
  return (
    <div className="mb-12">
      <div className="flex justify-between items-start mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full flex items-center gap-1">
            <Clock size={12} /> 7 weeks
          </span>
          <span className="px-3 py-1 text-xs bg-green-500/20 text-green-300 rounded-full flex items-center gap-1">
            <FolderKanban size={12} /> 3 projects
          </span>
        </div>
      </div>
      
      <div className="bg-[#161b22] rounded-xl border border-neutral-800 overflow-hidden">
        <div className="flex border-b border-neutral-800">
          <button
            onClick={() => setActiveTab('goal')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === 'goal' ? 'text-blue-400 border-b-2 border-blue-500' : 'text-neutral-400 hover:text-neutral-200'}`}
          >
            <Target size={16} />
            Your Goal
          </button>
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-6 py-3 font-medium text-sm flex items-center gap-2 ${activeTab === 'insights' ? 'text-green-400 border-b-2 border-green-500' : 'text-neutral-400 hover:text-neutral-200'}`}
          >
            <FileText size={16} />
            Resume Insights
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'goal' ? (
            <div className="space-y-4">
              <p className="text-neutral-300">{goalSummary}</p>
              <div className="flex items-center gap-3 text-sm text-neutral-400">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Weekly commitment: 6 hours</span>
                </div>
                <div className="w-px h-4 bg-neutral-700"></div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Estimated completion: 7 weeks</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-neutral-400 mb-3">Key skills we've identified:</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeInsights.identifiedSkills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 text-xs bg-green-500/20 text-green-300 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={12} /> {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold text-neutral-400 mb-3">Analysis & Suggestions:</h4>
                <ul className="space-y-3">
                  {resumeInsights.analysisAndSuggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="p-1 bg-blue-500/20 rounded-full mt-0.5">
                        <Lightbulb size={14} className="text-blue-400" />
                      </div>
                      <p className="text-neutral-300 text-sm">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProgressChart = ({ progress }) => {
  const chartData = [
    { name: 'Completed', value: progress },
    { name: 'Remaining', value: 100 - progress }
  ];
  
  const COLORS = ['#22d3ee', '#374151']; // Adjusted colors for a blueish theme
  
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <span className="text-3xl font-bold text-white">{progress}%</span>
          <p className="text-xs text-neutral-400 mt-1">Completed</p>
        </div>
      </div>
      
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default function RoadmapDetailPage() {
  const [roadmap, setRoadmap] = useState(mockRoadmap);
  const [isRefineModalOpen, setRefineModalOpen] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState(roadmap.timeline.map(item => item.week));

  const toggleTaskCompletion = (weekIndex, taskIndex) => {
    const newRoadmap = { ...roadmap };
    newRoadmap.timeline[weekIndex].tasks[taskIndex].completed = !newRoadmap.timeline[weekIndex].tasks[taskIndex].completed;
    setRoadmap(newRoadmap);
  };
  
  const addNoteToTask = (weekIndex, taskIndex, note) => {
    const newRoadmap = { ...roadmap };
    newRoadmap.timeline[weekIndex].tasks[taskIndex].note = note;
    setRoadmap(newRoadmap);
  };
  
  const toggleWeekExpansion = (week) => {
    setExpandedWeeks(prev => 
      prev.includes(week) 
        ? prev.filter(w => w !== week) 
        : [...prev, week]
    );
  };
  
  const allTasks = roadmap.timeline.filter(i => i.type === 'module').flatMap(m => m.tasks);
  const completedTasks = allTasks.filter(t => t.completed);
  const progress = allTasks.length > 0 ? Math.round((completedTasks.length / allTasks.length) * 100) : 0;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="lg:col-span-2"
        >
          <RoadmapHeader 
            title={roadmap.title} 
            goalSummary={roadmap.goalSummary} 
            resumeInsights={roadmap.resumeInsights}
          />
          
          <div className="space-y-8">
            {roadmap.timeline.map((item, index) => {
              if (item.type === 'module') {
                const isExpanded = expandedWeeks.includes(item.week);
                
                return (
                  <div key={index} className="bg-[#161b22] rounded-xl border border-neutral-800 overflow-hidden">
                    <button 
                      onClick={() => toggleWeekExpansion(item.week)}
                      className="w-full flex items-center justify-between p-5 hover:bg-neutral-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
                          Week {item.week}
                        </div>
                        <h2 className="text-xl font-semibold text-left">{item.title}</h2>
                      </div>
                      <div className="text-neutral-500">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 space-y-3">
                            {item.tasks.map((task, taskIndex) => (
                              <TaskItem 
                                key={taskIndex} 
                                task={task} 
                                onToggle={() => toggleTaskCompletion(index, taskIndex)} 
                                onAddNote={(note) => addNoteToTask(index, taskIndex, note)} 
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }
              
              if (item.type === 'milestone') {
                return <MilestoneCard key={index} milestone={item} />
              }
            })}
          </div>
          
          {roadmap.postAnalysis && (
            <div className="mt-12 bg-[#161b22] border border-neutral-800 rounded-xl p-8 relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div className="absolute -left-20 -bottom-20 w-40 h-40 rounded-full bg-green-500/10 blur-3xl"></div>
              
              <h2 className="text-2xl font-bold mb-6 relative z-10 flex items-center gap-3">
                <BarChartHorizontal className="text-green-400" size={24} />
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Post-Roadmap Analysis
                </span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-neutral-200">
                    <CheckCircle2 size={18} className="text-green-400" />
                    Skills You've Learned
                  </h3>
                  <ul className="space-y-3">
                    {roadmap.postAnalysis.skillsLearned.map((skill, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="p-1 bg-green-500/20 rounded-full">
                          <Plus size={14} className="text-green-400" />
                        </div>
                        <span className="text-neutral-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-neutral-200">
                    <Sparkles size={18} className="text-yellow-400" />
                    What You Can Do Next
                  </h3>
                  <ul className="space-y-3">
                    {roadmap.postAnalysis.recommendedNext.map((rec, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="p-1 bg-blue-500/20 rounded-full">
                          <ArrowRight size={14} className="text-blue-400" />
                        </div>
                        <span className="text-neutral-300">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="lg:col-span-1 space-y-6 sticky top-8"
        >
          <div className="bg-[#161b22] p-6 rounded-xl border border-neutral-800">
            <h3 className="text-xl font-bold mb-6 text-center">Your Progress</h3>
            <ProgressChart progress={progress} />
            
            <div className="mt-8 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Completed</span>
                <span className="font-semibold">{completedTasks.length} / {allTasks.length} tasks</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Weekly Goal</span>
                <span className="font-semibold">{roadmap.weeklyCommitment}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Timeline</span>
                <span className="font-semibold">7 weeks</span>
              </div>
            </div>
          </div>
          
          <motion.button 
            onClick={() => setRefineModalOpen(true)} 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-center p-4 rounded-xl bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold shadow-lg hover:shadow-blue-500/30 transition-all"
          >
            <div className='flex items-center justify-center gap-3'>
              <Sparkles size={18} />
              Refine My Roadmap
            </div>
          </motion.button>
          
          <div className="bg-[#161b22] p-6 rounded-xl border border-neutral-800">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FolderKanban size={20} className="text-green-400" />
              Upcoming Milestones
            </h3>
            
            <div className="space-y-4">
              {roadmap.timeline
                .filter(item => item.type === 'milestone')
                .map((milestone, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 hover:bg-neutral-800/50 rounded-lg transition-colors">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <milestone.icon size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{milestone.title}</h4>
                      <p className="text-xs text-neutral-400">Week {milestone.week}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
      
      <RefineRoadmapModal isOpen={isRefineModalOpen} onClose={() => setRefineModalOpen(false)} />
    </>
  );
}
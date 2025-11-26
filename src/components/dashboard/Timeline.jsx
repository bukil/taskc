import React from 'react';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';

export const Timeline = ({ data }) => {
    // Sort milestones by date
    const sortedMilestones = [...data.milestones].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Find next upcoming milestone
    const today = new Date();
    const nextMilestoneIndex = sortedMilestones.findIndex(m => new Date(m.date) > today);
    const nextMilestone = sortedMilestones[nextMilestoneIndex] || sortedMilestones[sortedMilestones.length - 1];

    return (
        <div className="glass-panel p-8 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="text-indigo-400" size={24} />
                        Project Roadmap
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-sm">
                        <span className="text-gray-400">Next Milestone:</span>
                        <span className="text-white font-medium bg-indigo-500/20 px-2 py-0.5 rounded border border-indigo-500/30">
                            {nextMilestone?.title}
                        </span>
                        <span className="text-gray-500">({nextMilestone?.date})</span>
                    </div>
                </div>

                <div className="flex gap-8 text-sm">
                    <div className="text-center">
                        <div className="text-gray-400 mb-1">Start</div>
                        <div className="font-mono text-white">{data.startDate}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-gray-400 mb-1">Launch</div>
                        <div className="font-mono text-white">{data.endDate}</div>
                    </div>
                </div>
            </div>

            {/* Clean Step-based Timeline */}
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-700 -z-10"></div>

                <div className="flex justify-between w-full">
                    {/* Start Node */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-900 shadow-lg shadow-emerald-500/20">
                            <CheckCircle2 size={18} />
                        </div>
                        <span className="text-xs font-medium text-emerald-400">Kickoff</span>
                    </div>

                    {/* Milestones Nodes */}
                    {sortedMilestones.map((milestone, index) => {
                        const isCompleted = new Date(milestone.date) < today;
                        const isNext = index === nextMilestoneIndex;

                        return (
                            <div key={milestone.id} className="flex flex-col items-center gap-3 relative">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center border-4 transition-all duration-300 z-10 ${isCompleted
                                        ? 'bg-emerald-500 border-emerald-500 text-slate-900'
                                        : isNext
                                            ? 'bg-slate-900 border-indigo-500 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-110'
                                            : 'bg-slate-900 border-slate-600 text-gray-600'
                                        }`}
                                >
                                    {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={14} fill={isNext ? "currentColor" : "none"} />}
                                </div>

                                <div className="flex flex-col items-center text-center absolute top-10 w-32">
                                    <span className={`text-sm font-bold mb-0.5 ${isCompleted ? 'text-emerald-400' : isNext ? 'text-white' : 'text-gray-500'
                                        }`}>
                                        {milestone.title}
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-mono">{milestone.date}</span>
                                </div>
                            </div>
                        );
                    })}

                    {/* End Node */}
                    <div className="flex flex-col items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 ${new Date(data.endDate) < today
                            ? 'bg-emerald-500 border-emerald-500'
                            : 'bg-slate-900 border-slate-600 text-gray-600'
                            }`}>
                            <CheckCircle2 size={18} />
                        </div>
                        <span className="text-xs font-medium text-gray-500">Launch</span>
                    </div>
                </div>
            </div>

            {/* Spacing for labels */}
            <div className="h-12"></div>
        </div>
    );
};

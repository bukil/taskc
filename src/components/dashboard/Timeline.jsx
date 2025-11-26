import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export const Timeline = ({ data }) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    const totalDuration = endDate - startDate;
    const today = new Date();

    // Calculate progress percentage
    const progress = Math.min(100, Math.max(0, ((today - startDate) / totalDuration) * 100));

    // Sort milestones by date
    const sortedMilestones = [...data.milestones].sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="glass-panel p-8 mb-6">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Calendar className="text-indigo-400" size={24} />
                        Project Timeline
                    </h3>
                    <p className="text-gray-400 mt-1">
                        <span className="text-indigo-300 font-medium">{data.daysLeft} days</span> remaining until launch
                    </p>
                </div>
                <div className="text-right hidden md:block">
                    <div className="text-sm text-gray-400">Target Launch</div>
                    <div className="text-lg font-mono text-white">{data.endDate}</div>
                </div>
            </div>

            {/* Simplified Linear Timeline */}
            <div className="relative px-4 py-6">
                {/* Background Track */}
                <div className="absolute top-1/2 left-0 right-0 h-3 bg-slate-700/50 rounded-full -translate-y-1/2"></div>

                {/* Progress Fill */}
                <div
                    className="absolute top-1/2 left-0 h-3 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full -translate-y-1/2 transition-all duration-1000 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                    style={{ width: `${progress}% ` }}
                >
                    {/* Current Day Marker */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center">
                        <div className="w-6 h-6 bg-white rounded-full border-4 border-indigo-600 shadow-lg z-20"></div>
                        <div className="absolute top-8 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                            Today
                        </div>
                    </div>
                </div>

                {/* Start Marker */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group">
                    <div className="w-4 h-4 bg-slate-800 border-2 border-indigo-400 rounded-full z-10"></div>
                    <div className="absolute top-8 text-xs text-gray-500 font-medium">Start</div>
                </div>

                {/* End Marker */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center group">
                    <div className="w-4 h-4 bg-slate-800 border-2 border-slate-400 rounded-full z-10"></div>
                    <div className="absolute top-8 text-xs text-gray-500 font-medium">End</div>
                </div>

                {/* Milestones */}
                {sortedMilestones.map((milestone) => {
                    const mDate = new Date(milestone.date);
                    const mPos = ((mDate - startDate) / totalDuration) * 100;
                    const isPassed = mPos <= progress;

                    return (
                        <div
                            key={milestone.id}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center group"
                            style={{ left: `${mPos}% ` }}
                        >
                            {/* Milestone Dot */}
                            <div
                                className={`w - 5 h - 5 rounded - full border - 2 z - 10 transition - colors duration - 300 ${isPassed
                                    ? 'bg-emerald-500 border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                                    : 'bg-slate-800 border-gray-500'
                                    } `}
                            ></div>

                            {/* Milestone Label (Alternating top/bottom to avoid collision could be complex, sticking to bottom for simplicity) */}
                            <div className="absolute -top-10 opacity-100 transition-opacity bg-slate-800/90 backdrop-blur px-3 py-1.5 rounded border border-white/10 text-center min-w-[100px]">
                                <div className={`text - xs font - bold ${isPassed ? 'text-emerald-400' : 'text-gray-300'} `}>
                                    {milestone.title}
                                </div>
                                <div className="text-[10px] text-gray-500">{milestone.date}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

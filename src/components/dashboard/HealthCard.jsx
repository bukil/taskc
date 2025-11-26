import React from 'react';
import { Activity, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';

export const HealthCard = ({ data }) => {
    const getStatusColor = (status) => {
        if (status === 'On Track') return 'text-emerald-400';
        if (status === 'At Risk') return 'text-amber-400';
        return 'text-rose-400';
    };

    return (
        <div className="glass-panel p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
                <div className={`p-4 rounded-full bg-white/5 ${getStatusColor(data.status)}`}>
                    <Activity size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">{data.name}</h2>
                    <div className="flex items-center gap-2 text-gray-400">
                        <span className={`font-semibold ${getStatusColor(data.status)}`}>{data.status}</span>
                        <span>•</span>
                        <span>{data.daysLeft} days remaining</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 w-full md:max-w-md">
                <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-white font-mono">{data.progress}%</span>
                </div>

                {/* Segmented Progress Bar */}
                <div className="flex gap-1">
                    {[...Array(6)].map((_, i) => {
                        const isActive = (i / 6) * 100 < data.progress;
                        const isLastActive = isActive && (((i + 1) / 6) * 100 >= data.progress);
                        const isBlocked = data.blockers && data.blockers.length > 0;
                        
                        let barColor = 'bg-transparent border-gray-500';
                        let tooltipContent = null;

                        // Mock data for tooltips based on segment index
                        const teamMembers = data.team || [];
                        const approver = teamMembers[i % teamMembers.length] || { name: 'Unknown', role: 'Team' };
                        
                        if (isActive) {
                            if (isLastActive && isBlocked) {
                                barColor = 'bg-rose-500 border-gray-500 shadow-[0_0_8px_rgba(225,29,72,0.6)]';
                                const blocker = data.blockers[0] || { title: 'Unknown Issue', owner: 'Unknown' };
                                tooltipContent = (
                                    <div className="text-left">
                                        <div className="font-bold text-rose-500 mb-1">Blocked: {blocker.title}</div>
                                        <div className="text-xs text-slate-700">Responsible: <span className="font-semibold">{blocker.owner}</span></div>
                                        <div className="text-xs text-slate-500">Dept: Engineering</div>
                                    </div>
                                );
                            } else {
                                barColor = 'bg-green-400 border-gray-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]';
                                tooltipContent = (
                                    <div className="text-left">
                                        <div className="font-bold text-emerald-600 mb-1">Approved</div>
                                        <div className="text-xs text-slate-700">By: <span className="font-semibold">{approver.name}</span></div>
                                        <div className="text-xs text-slate-500">Dept: {approver.role}</div>
                                    </div>
                                );
                            }
                        } else {
                             tooltipContent = (
                                <div className="text-left">
                                    <div className="font-bold text-slate-500 mb-1">Pending</div>
                                    <div className="text-xs text-slate-700">Owner: <span className="font-semibold">{approver.name}</span></div>
                                    <div className="text-xs text-slate-500">Dept: {approver.role}</div>
                                </div>
                            );
                        }

                        // Determine tooltip position classes based on index
                        let tooltipPositionClass = "left-1/2 transform -translate-x-1/2";
                        let arrowPositionClass = "left-1/2 transform -translate-x-1/2";
                        
                        if (i === 0) {
                            tooltipPositionClass = "left-0";
                            arrowPositionClass = "left-4";
                        } else if (i === 5) {
                            tooltipPositionClass = "right-0";
                            arrowPositionClass = "right-4";
                        }

                        return (
                            <div
                                key={i}
                                className={`h-3 flex-1 rounded-md border transition-all duration-500 ${barColor} relative group cursor-help`}
                            >
                                {/* Frost Glass Tooltip */}
                                <div className={`absolute bottom-full ${tooltipPositionClass} mb-6 w-64 p-4 rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out pointer-events-none z-50`}
                                     style={{
                                         background: 'rgba(255, 255, 255, 0.8)',
                                         backdropFilter: 'blur(12px)',
                                         WebkitBackdropFilter: 'blur(12px)',
                                         border: '1px solid rgba(255, 255, 255, 0.9)',
                                         boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                                         zIndex: 9999
                                     }}>
                                    {tooltipContent}
                                    {/* Arrow */}
                                    <div className={`absolute top-full ${arrowPositionClass} border-8 border-transparent border-t-white/80`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-center px-4 border-l border-white/10">
                    <div className="text-2xl font-bold text-white">{data.blockers.length}</div>
                    <div className="text-xs text-rose-400 uppercase tracking-wider font-semibold">Blockers</div>
                </div>
                <div className="text-center px-4 border-l border-white/10">
                    <div className="text-2xl font-bold text-white">{data.risks.length}</div>
                    <div className="text-xs text-amber-400 uppercase tracking-wider font-semibold">Risks</div>
                </div>
            </div>
        </div>
    );
};

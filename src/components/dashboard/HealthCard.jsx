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
                    {[...Array(10)].map((_, i) => {
                        const isActive = (i / 10) * 100 < data.progress;
                        const isLastActive = isActive && (((i + 1) / 10) * 100 >= data.progress);
                        const isBlocked = data.blockers && data.blockers.length > 0;
                        
                        let barColor = 'bg-slate-700/50 border-slate-600';
                        if (isActive) {
                            if (isLastActive && isBlocked) {
                                barColor = 'bg-rose-500 border-rose-400 shadow-[0_0_8px_rgba(225,29,72,0.6)]';
                            } else {
                                barColor = 'bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]';
                            }
                        }

                        return (
                            <div
                                key={i}
                                className={`h-3 flex-1 rounded-sm border transition-all duration-500 ${barColor}`}
                            />
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

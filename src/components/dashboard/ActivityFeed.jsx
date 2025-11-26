import React from 'react';
import { MessageSquare, GitCommit } from 'lucide-react';

export const ActivityFeed = ({ activities }) => {
    return (
        <div className="glass-panel p-6 h-full">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-400" />
                Context & Updates
            </h3>

            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                {activities.map((act) => (
                    <div key={act.id} className="relative pl-8">
                        <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-800 border-2 border-indigo-500 z-10"></div>
                        <div className="flex justify-between items-baseline mb-1">
                            <span className="text-sm font-medium text-indigo-300">{act.user}</span>
                            <span className="text-xs text-gray-500">{act.time}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                            {act.action} <span className="text-white font-medium">{act.target}</span>
                        </p>
                        <div className="text-sm text-gray-400 italic bg-white/5 p-2 rounded border border-white/5">
                            "{act.message}"
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

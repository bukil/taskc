import React from 'react';
import { MessageSquare, GitCommit } from 'lucide-react';

export const ActivityFeed = ({ activities, team = [] }) => {
    const getUserRole = (userName) => {
        const member = team.find(m => m.name === userName);
        return member ? member.role : '';
    };

    return (
        <div className="glass-panel p-6 h-full">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-400" />
                Context & Updates
            </h3>

            <div className="space-y-6">
                {activities.map((act) => (
                    <div key={act.id} className="relative">
                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-indigo-300">{act.user}</span>
                                <span className="text-xxs text-slate-500 bg-slate-800/50 px-3.7 py-0.5 rounded-full border border-slate-700/50">
                                    {getUserRole(act.user)}
                                </span>
                            </div>
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

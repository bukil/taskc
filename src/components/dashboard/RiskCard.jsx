import React from 'react';
import { AlertTriangle, Calendar, User } from 'lucide-react';

export const RiskCard = ({ item }) => {
    return (
        <div className="glass-panel p-4 border-l-4 border-l-amber-500 hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                    <div className="text-amber-400">
                        <AlertTriangle size={20} />
                    </div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                </div>
                <span className="text-xs text-amber-400 font-mono">{item.dueDate}</span>
            </div>

            <p className="text-gray-400 text-sm pl-8 mb-3">
                Reason: <span className="text-gray-300">{item.reason}</span>
            </p>

            <div className="flex items-center gap-2 pl-8 text-xs text-gray-500">
                <User size={12} />
                <span>{item.owner}</span>
            </div>
        </div>
    );
};

import React from 'react';
import { AlertCircle, Clock, User, ArrowRight } from 'lucide-react';

export const BlockerCard = ({ item }) => {
    return (
        <div className="glass-panel p-4 border-l-4 border-l-rose-500 hover:bg-white/5 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-rose-400">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-white text-lg">{item.title}</h4>
                        <p className="text-rose-300 text-sm font-medium mt-1">
                            Blocked by: {item.blockedBy}
                        </p>
                    </div>
                </div>
                <span className="px-2 py-1 rounded text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {item.daysBlocked}d stalled
                </span>
            </div>

            <div className="flex items-center justify-between mt-4 pl-8">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{item.owner}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Impact: {item.impact}</span>
                    </div>
                </div>

                <button className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                    Resolve <ArrowRight size={14} />
                </button>
            </div>
        </div>
    );
};

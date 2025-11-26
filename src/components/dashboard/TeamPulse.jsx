import React, { useState, useEffect } from 'react';
import { Users, Clock } from 'lucide-react';

export const TeamPulse = ({ team }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const getLocalTime = (timezone) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: timezone,
                hour12: true
            }).format(time);
        } catch {
            return '--:--';
        }
    };

    return (
        <div className="glass-panel p-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Users size={18} className="text-blue-400" />
                Team Pulse & Availability
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
                {team.map((member) => (
                    <div key={member.id} className="flex flex-col items-center min-w-[100px] p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-700 border border-white/50 mb-2 relative shadow-sm">
                            {member.avatar}
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.id === 2 ? 'bg-rose-500' : 'bg-emerald-500'
                                }`}></div>
                        </div>
                        <span className="text-xs text-gray-700 font-bold">{member.name}</span>
                        <span className="text-[10px] text-gray-500 mb-1">{member.role}</span>

                        <div className="flex items-center gap-1 bg-slate-200/50 px-2 py-1 rounded-full mt-1">
                            <Clock size={10} className="text-blue-500" />
                            <span className="text-[10px] font-mono text-blue-700 font-semibold">
                                {getLocalTime(member.timezone)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

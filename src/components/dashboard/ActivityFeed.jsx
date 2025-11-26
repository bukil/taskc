import React, { useState } from 'react';
import { MessageSquare, GitCommit } from 'lucide-react';


// Helper to get unique countries and timezones from team
const getCountryTabs = (team) => {
    // For demo, map timezones to country names
    const tzToCountry = {
        'America/New_York': 'USA',
        'Europe/London': 'UK',
        'Asia/Tokyo': 'Japan',
        'Australia/Sydney': 'Australia',
    };
    const unique = [];
    team.forEach(member => {
        if (!unique.find(u => u.timezone === member.timezone)) {
            unique.push({
                country: tzToCountry[member.timezone] || member.timezone,
                timezone: member.timezone
            });
        }
    });
    return unique;
};

function formatTimeToZone(iso, tz) {
    try {
        return new Date(iso).toLocaleString('en-US', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
        return iso;
    }
}

export const ActivityFeed = ({ activities, team = [] }) => {
    const [selectedTz, setSelectedTz] = useState(team[0]?.timezone || 'UTC');
    const countryTabs = getCountryTabs(team);

    // For dropdown
    const handleTzChange = (e) => {
        setSelectedTz(e.target.value);
    };
    const getUserRole = (userName) => {
        const member = team.find(m => m.name === userName);
        return member ? member.role : '';
    };

    return (
        <div className="glass-panel p-6 h-full">

            {/* Country Dropdown */}
            <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="tz-select" className="text-xs text-gray-400">Country:</label>
                    <select
                        id="tz-select"
                        value={selectedTz}
                        onChange={handleTzChange}
                        className="text-xs rounded-md border border-slate-700/40 bg-slate-800/60 text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        {countryTabs.map(tab => (
                            <option key={tab.timezone} value={tab.timezone}>{tab.country}</option>
                        ))}
                    </select>
                </div>
                <div className="text-xs text-gray-400 font-mono whitespace-nowrap max-w-full overflow-x-auto">
                    Timezone: <span className="font-semibold text-white">{selectedTz}</span>
                </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-indigo-400" />
                Context & Updates
            </h3>

            <div className="space-y-6">
                {activities.map((act, idx) => (
                    <div key={act.id} className="relative">
                        <div className="flex justify-between items-baseline mb-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-indigo-300">{act.user}</span>
                                <span className="text-xxs text-slate-500 bg-slate-800/50 px-3.7 py-0.5 rounded-full border border-slate-700/50">
                                    {getUserRole(act.user)}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">{formatTimeToZone(act.time, selectedTz)}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">
                            {act.action} <span className="text-white font-medium">{act.target}</span>
                        </p>
                        <div className="text-sm text-gray-400 italic bg-white/5 p-2 rounded border border-white/5">
                            "{act.message}"
                        </div>
                    </div>
                ))}
                {/* Additional demo comments */}
                <div className="relative">
                    <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-indigo-300">Jessica L.</span>
                            <span className="text-xxs text-slate-500 bg-slate-800/50 px-3.7 py-0.5 rounded-full border border-slate-700/50">Design</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeToZone('2025-11-26T13:45:00Z', selectedTz)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">
                        commented on <span className="text-white font-medium">Onboarding Assets</span>
                    </p>
                    <div className="text-sm text-gray-400 italic bg-white/5 p-2 rounded border border-white/5">
                        "Waiting for copy from marketing."
                    </div>
                </div>
                <div className="relative">
                    <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-indigo-300">Mike R.</span>
                            <span className="text-xxs text-slate-500 bg-slate-800/50 px-3.7 py-0.5 rounded-full border border-slate-700/50">Eng Lead</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeToZone('2025-11-26T15:10:00Z', selectedTz)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">
                        updated <span className="text-white font-medium">User Auth API</span>
                    </p>
                    <div className="text-sm text-gray-400 italic bg-white/5 p-2 rounded border border-white/5">
                        "Security review scheduled for tomorrow."
                    </div>
                </div>
                <div className="relative">
                    <div className="flex justify-between items-baseline mb-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-indigo-300">David B.</span>
                            <span className="text-xxs text-slate-500 bg-slate-800/50 px-3.7 py-0.5 rounded-full border border-slate-700/50">Marketing</span>
                        </div>
                        <span className="text-xs text-gray-500">{formatTimeToZone('2025-11-26T17:20:00Z', selectedTz)}</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">
                        commented on <span className="text-white font-medium">Launch Plan</span>
                    </p>
                    <div className="text-sm text-gray-400 italic bg-white/5 p-2 rounded border border-white/5">
                        "Marketing assets will be ready by Friday."
                    </div>
                </div>
            </div>
        </div>
    );
};

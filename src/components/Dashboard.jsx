import { projectData } from '../data/mockData';
import { HealthCard } from './dashboard/HealthCard';
import { UnifiedGantt } from './dashboard/GanttTimeline';
import { BlockerCard } from './dashboard/BlockerCard';
import { RiskCard } from './dashboard/RiskCard';
import { ActivityFeed } from './dashboard/ActivityFeed';
import { TeamPulse } from './dashboard/TeamPulse';
import { GanttStages } from './dashboard/GanttStages';

const Dashboard = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 animate-fade-in">
            <header className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-1">Project Name</h1>
                    <p className="text-gray-400">Type project</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 text-sm font-medium transition-colors shadow-sm rounded-md">
                        Generate Report
                    </button>
                </div>
            </header>

            <HealthCard data={projectData} />

            <div className="mb-6">
                <UnifiedGantt />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Critical Attention */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Gantt Chart with Project Stages */}
                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            Project Stages (Gantt Chart)
                        </h3>
                        <div className="mb-6">
                            <GanttStages />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                            Critical Blockers
                        </h3>
                        <div className="space-y-4">
                            {projectData.blockers.map(item => (
                                <BlockerCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            At Risk / Delayed
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {projectData.risks.map(item => (
                                <RiskCard key={item.id} item={item} />
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Context & Team */}
                <div className="space-y-6 mt-10">
                    <ActivityFeed activities={projectData.activity} team={projectData.team} />
                    <TeamPulse team={projectData.team} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

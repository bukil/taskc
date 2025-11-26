import React from 'react';
import { MoreHorizontal, Flame, Pin, RotateCcw } from 'lucide-react';

export const GanttTimeline = () => {
    // Mock data specifically for this view
    const ganttData = {
        dateRange: "1-14 January (14 Workdays)",
        weeks: [
            { id: 1, label: "WEEK 1", range: "1-5 JAN" },
            { id: 2, label: "WEEK 2", range: "1-5 JAN" } // Keeping mock simple as per image
        ],
        days: [1, 2, 3, 4, 5], // Repeated for each week
        tasks: [
            {
                id: 1,
                title: "Homepage Flow",
                detail: "Short detail",
                status: "REVISION",
                statusColor: "bg-rose-100 text-rose-600",
                icon: "👷",
                startDay: 1, // Relative to the grid (1-10)
                duration: 2,
                row: 1
            },
            {
                id: 2,
                title: "Homepage Flow",
                detail: "Short detail",
                status: "ON GOING",
                statusColor: "bg-amber-100 text-amber-600",
                icon: <Flame size={14} className="text-amber-500" />,
                startDay: 2,
                duration: 3,
                row: 2
            },
            {
                id: 3,
                title: "Homepage Flow",
                detail: "Short detail",
                status: "BACK LOG",
                statusColor: "bg-gray-200 text-gray-600",
                icon: <Pin size={14} className="text-rose-500" />,
                startDay: 4,
                duration: 2,
                row: 3
            },
            {
                id: 4,
                title: "Homepage Flow",
                detail: "Short detail",
                status: "BACK LOG",
                statusColor: "bg-gray-200 text-gray-600",
                icon: <Pin size={14} className="text-rose-500" />,
                startDay: 4,
                duration: 2,
                row: 4
            },
            {
                id: 5,
                title: "Homepage Flow",
                detail: "Short detail",
                status: "BACK LOG",
                statusColor: "bg-gray-200 text-gray-600",
                icon: <RotateCcw size={14} className="text-rose-500" />,
                startDay: 7, // Week 2, Day 2
                duration: 2,
                row: 3
            }
        ]
    };

    return (
        <div className="bg-white border border-gray-200 shadow-sm mb-8 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 border-b border-gray-200 p-4">
                <h3 className="text-sm font-bold text-slate-700">{ganttData.dateRange}</h3>
            </div>

            <div className="grid grid-cols-2 divide-x divide-gray-200">
                {ganttData.weeks.map((week, weekIndex) => (
                    <div key={week.id} className="flex flex-col">
                        {/* Week Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
                            <span className="font-bold text-xs text-slate-800">{week.label}</span>
                            <span className="text-xs text-gray-400">{week.range}</span>
                        </div>

                        {/* Days Header */}
                        <div className="grid grid-cols-5 divide-x divide-gray-200 border-b border-gray-200 bg-slate-50/50">
                            {ganttData.days.map((day) => (
                                <div key={day} className="py-3 text-center text-xs font-medium text-slate-600">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Grid Body (Placeholder for rows) */}
                        <div className="relative h-[300px] bg-white">
                            {/* Vertical Grid Lines */}
                            <div className="absolute inset-0 grid grid-cols-5 divide-x divide-gray-100 pointer-events-none">
                                {[...Array(5)].map((_, i) => <div key={i} className="h-full"></div>)}
                            </div>

                            {/* Weekend/Non-working area shading (Last column of week 1 and 2 roughly) */}
                            {weekIndex === 0 && (
                                <div className="absolute top-0 bottom-0 left-0 w-[20%] bg-gray-50/50 -z-10" style={{ left: '0%' }}></div>
                            )}
                            {weekIndex === 1 && (
                                <div className="absolute top-0 bottom-0 right-0 w-[20%] bg-gray-50/50 -z-10"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Tasks Overlay - Absolute positioning over the entire grid area would be complex with two separate week cols. 
          Instead, let's render tasks within the week containers or use a unified grid. 
          For simplicity and exact visual match, I'll use a unified grid approach below.
      */}
        </div>
    );
};

// Re-implementing with a unified grid for easier task spanning
export const UnifiedGantt = () => {
    const tasks = [
        { id: 1, title: "Homepage Flow", detail: "Short detail", status: "REVISION", statusBg: "bg-rose-100", statusText: "text-rose-600", icon: "👷", start: 0, span: 2, row: 0 },
        { id: 2, title: "Homepage Flow", detail: "Short detail", status: "ON GOING", statusBg: "bg-amber-100", statusText: "text-amber-700", icon: <Flame size={12} className="text-amber-500" />, start: 1, span: 3, row: 1 },
        { id: 3, title: "Homepage Flow", detail: "Short detail", status: "BACK LOG", statusBg: "bg-gray-100", statusText: "text-gray-600", icon: <Pin size={12} className="text-rose-500" />, start: 3, span: 2, row: 2 },
        { id: 4, title: "Homepage Flow", detail: "Short detail", status: "BACK LOG", statusBg: "bg-gray-100", statusText: "text-gray-600", icon: <Pin size={12} className="text-rose-500" />, start: 3, span: 2, row: 3 },
        { id: 5, title: "Homepage Flow", detail: "Short detail", status: "BACK LOG", statusBg: "bg-gray-100", statusText: "text-gray-600", icon: <RotateCcw size={12} className="text-rose-500" />, start: 6, span: 2, row: 2 },
    ];

    return (
        <div className="bg-white border border-gray-200 shadow-sm mb-8 w-full">
            {/* Responsive Scroll Container */}
            <div className="w-full">
                <div className="w-full"> {/* Minimum width to maintain layout integrity */}
                    <div className="flex divide-x divide-gray-200">
                        {/* Week 1 */}
                        <div className="flex-1">
                        </div>

                        {/* Week 2 */}
                        <div className="flex-1">
                        </div>
                    </div>

                    {/* Task Grid Area */}
                    <div className="relative h-[320px] bg-white">
                        {/* Background Columns */}
                        <div className="absolute inset-0 grid grid-cols-10 divide-x divide-gray-50 pointer-events-none">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className={`h-full ${i === 0 || i === 9 ? 'bg-gray-50/30' : ''}`}></div>
                            ))}
                        </div>

                        {/* Tasks */}
                        <div className="absolute inset-0 py-4">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="absolute h-14 px-1 transition-all hover:z-10"
                                    style={{
                                        left: `${(task.start / 10) * 100}%`,
                                        width: `${(task.span / 10) * 100}%`,
                                        top: `${task.row * 70 + 20}px`
                                    }}
                                >
                                    <div className="h-full bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-2 md:p-3 flex flex-col justify-center gap-1 group cursor-pointer overflow-hidden">
                                        <div className="flex justify-between items-start gap-2">
                                            <div className="min-w-0">
                                            </div>
                                            <span className={`text-[9px] font-bold px-1.5 py-0.5 border ${task.statusBg} ${task.statusText} border-transparent bg-opacity-50 whitespace-nowrap flex-shrink-0`}>
                                                {task.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

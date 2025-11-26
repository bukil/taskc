export const projectData = {
    name: "Q4 Mobile App Launch",
    health: 78, // 0-100
    status: "At Risk",
    progress: 65,
    daysLeft: 12,
    startDate: "2025-11-01",
    endDate: "2025-12-15",
    team: [
        { id: 1, name: "Amit Sharma", role: "Product", avatar: "AS", timezone: "Asia/Kolkata" },
        { id: 2, name: "Priya Singh", role: "Eng Lead", avatar: "PS", timezone: "Asia/Kolkata" },
        { id: 3, name: "Rohit Verma", role: "Design", avatar: "RV", timezone: "Asia/Kolkata" },
        { id: 4, name: "Neha Patel", role: "Marketing", avatar: "NP", timezone: "Asia/Kolkata" },
    ],
    blockers: [
        {
            id: 101,
            title: "User Auth API",
            owner: "Priya Singh",
            blockedBy: "Pending Security Review",
            daysBlocked: 2,
            impact: "High",
            type: "technical",
            date: "2025-11-24"
        },
        {
            id: 102,
            title: "Onboarding Assets",
            owner: "Rohit Verma",
            blockedBy: "Waiting for Copy",
            daysBlocked: 1,
            impact: "Medium",
            type: "design",
            date: "2025-11-25"
        }
    ],
    risks: [
        {
            id: 201,
            title: "Push Notifications",
            owner: "Priya Singh",
            reason: "Scope creep",
            status: "Delayed",
            dueDate: "2025-11-28"
        }
    ],
    milestones: [
        { id: 401, title: "Beta Release", date: "2025-11-30", status: "Pending" },
        { id: 402, title: "Code Freeze", date: "2025-12-05", status: "Pending" },
        { id: 403, title: "Global Launch", date: "2025-12-15", status: "Pending" }
    ],
    activity: [
        {
            id: 301,
            user: "Amit Sharma",
            action: "commented on",
            target: "User Auth API",
            time: "2025-11-26T10:30:00Z",
            message: "Security team said they need 24h more."
        },
        {
            id: 302,
            user: "Neha Patel",
            action: "updated",
            target: "Launch Plan",
            time: "2025-11-26T08:15:00Z",
            message: "Moved launch date to Dec 15 tentative."
        },
        {
            id: 303,
            user: "Rohit Verma",
            action: "commented on",
            target: "Onboarding Assets",
            time: "2025-11-26T13:45:00Z",
            message: "Waiting for copy from marketing."
        },
        {
            id: 304,
            user: "Priya Singh",
            action: "updated",
            target: "User Auth API",
            time: "2025-11-26T15:10:00Z",
            message: "Security review scheduled for tomorrow."
        },
        {
            id: 305,
            user: "Neha Patel",
            action: "commented on",
            target: "Launch Plan",
            time: "2025-11-26T17:20:00Z",
            message: "Marketing assets will be ready by Friday."
        }
    ]
};

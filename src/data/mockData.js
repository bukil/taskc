export const projectData = {
    name: "Q4 Mobile App Launch",
    health: 78, // 0-100
    status: "At Risk",
    progress: 65,
    daysLeft: 12,
    startDate: "2025-11-01",
    endDate: "2025-12-15",
    team: [
        { id: 1, name: "Sarah K.", role: "Product", avatar: "SK", timezone: "America/New_York" },
        { id: 2, name: "Mike R.", role: "Eng Lead", avatar: "MR", timezone: "Europe/London" },
        { id: 3, name: "Jessica L.", role: "Design", avatar: "JL", timezone: "Asia/Tokyo" },
        { id: 4, name: "David B.", role: "Marketing", avatar: "DB", timezone: "Australia/Sydney" },
    ],
    blockers: [
        {
            id: 101,
            title: "User Auth API",
            owner: "Mike R.",
            blockedBy: "Pending Security Review",
            daysBlocked: 2,
            impact: "High",
            type: "technical",
            date: "2025-11-24"
        },
        {
            id: 102,
            title: "Onboarding Assets",
            owner: "Jessica L.",
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
            owner: "Mike R.",
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
            user: "Sarah K.",
            action: "commented on",
            target: "User Auth API",
            time: "2025-11-26T10:30:00Z",
            message: "Security team said they need 24h more."
        },
        {
            id: 302,
            user: "David B.",
            action: "updated",
            target: "Launch Plan",
            time: "2025-11-26T08:15:00Z",
            message: "Moved launch date to Dec 15 tentative."
        }
    ]
};

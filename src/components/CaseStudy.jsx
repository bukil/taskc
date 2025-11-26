import React from 'react';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <div className="text-gray-300 leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

const CaseStudy = () => {
  return (
    <div className="glass-panel p-8 max-w-4xl mx-auto my-12 animate-fade-in">
      <header className="mb-10 border-b border-white/10 pb-6">
        <h1 className="text-4xl font-bold mb-2 text-gradient">CollabSpace</h1>
        <h2 className="text-xl text-gray-400">Unified Project Health View</h2>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Section title="The Problem">
            <p>
              Distributed teams struggle to identify the root cause of delays because critical project data (tasks, timelines, conversations) is fragmented across multiple disconnected screens.
            </p>
          </Section>

          <Section title="Target Audience">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Project Leads/Managers:</strong> Need a high-level overview to unblock the team.</li>
              <li><strong>Individual Contributors:</strong> Need to know if they are blocking others or why they are waiting.</li>
              <li><strong>Stakeholders:</strong> Want a quick "health check" without digging into details.</li>
            </ul>
          </Section>

          <Section title="Assumptions & Hypotheses">
              <ul className="list-disc pl-5 space-y-1">
                <li>A unified view of project health will reduce the need to jump between multiple screens.</li>
                <li>Teams want immediate visibility into blockers, delays, and ownership without relying on project leads.</li>
                <li>Clear contextual information (why something is blocked, who is involved, what changed) will reduce friction in remote communication.</li>
                <li>Lightweight visual cues and summaries can help users understand the overall state of the project faster than reading activity logs.</li>
                <li>Providing a single screen for critical status information improves team alignment during asynchronous work.</li>
              </ul>
          </Section>
        </div>

        <div>
          <Section title="Research Insights">
            <p className="mb-2"><strong>Primary:</strong> User interviews reveal frustration with "context switching" between the timeline view and chat to find out why a task is red.</p>
            <p><strong>Secondary:</strong> Competitor analysis shows that tools like Jira or Asana often bury "blockers" in task details rather than surfacing them at a project level.</p>
          </Section>

          <Section title="User Journey">
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Trigger:</strong> User notices a project deadline is approaching or feels "out of the loop".</li>
              <li><strong>Action:</strong> Opens the "Project Pulse" (Unified View).</li>
              <li><strong>Insight:</strong> Immediately sees 3 "At Risk" items and identifies that Design is waiting on Copy.</li>
              <li><strong>Resolution:</strong> Clicks "Nudge" on the Copy task or opens a direct chat context from the dashboard.</li>
            </ol>
          </Section>
        </div>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-xl font-semibold mb-3 text-white">Why This Solution Works</h3>
        <p className="text-gray-300">
          By aggregating "Blockers" and "Risks" into a dedicated top-level view, we remove the need to hunt for information. 
          The design focuses on <strong>actionability</strong> (who is stuck, why, and what to do) rather than just status reporting.
        </p>
      </div>
    </div>
  );
};

export default CaseStudy;

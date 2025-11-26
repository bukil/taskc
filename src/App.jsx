import { useState } from 'react';
import CaseStudy from './components/CaseStudy';
import Dashboard from './components/Dashboard';
import { Layout, MonitorPlay } from 'lucide-react';

function App() {
  const [view, setView] = useState('dashboard'); // Default to dashboard to wow the user first

  return (
    <div className="min-h-screen bg-[#f1f5f9] relative overflow-hidden">
      {/* Background Orbs for Professional Light Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-200/40 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-sky-200/40 blur-[120px]"></div>
      <div className="absolute top-[30%] right-[20%] w-[400px] h-[400px] rounded-full bg-purple-200/30 blur-[80px] animate-pulse" style={{ animationDuration: '6s' }}></div>

      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 glass-panel border-t-0 border-x-0 rounded-none px-6 py-4 mb-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center text-white font-bold">C</div>
            <span className="text-xl font-bold text-white tracking-tight">CollabSpace</span>
          </div>

          <div className="flex bg-slate-800/50 p-1 rounded-lg border border-white/5">
            <button
              onClick={() => setView('case-study')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'case-study'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Layout size={16} />
              Case Study
            </button>
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <MonitorPlay size={16} />
              Live Solution
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pb-12">
        {view === 'case-study' ? <CaseStudy /> : <Dashboard />}
      </main>
    </div>
  );
}

export default App;

import { ReactNode } from 'react';
import Link from 'next/link';
import { Activity, LayoutDashboard, Settings, LogOut, Bell, Search } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800/50 bg-zinc-950/50 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800/50">
          <Link href="/" className="flex items-center gap-2" aria-label="EVTracker Pro Home" tabIndex={0}>
            <Activity className="w-6 h-6 text-blue-500" aria-hidden="true" />
            <span className="text-lg font-bold tracking-tight">EVTracker<span className="text-blue-500">Pro</span></span>
          </Link>
        </div>
        <div className="flex-1 py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg font-medium" aria-label="Live Dashboard" tabIndex={0}>
            <LayoutDashboard className="w-5 h-5" aria-hidden="true" />
            Live Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50 rounded-lg font-medium transition-colors" aria-label="Settings" tabIndex={0}>
            <Settings className="w-5 h-5" aria-hidden="true" />
            Settings
          </Link>
        </div>
        <div className="p-4 border-t border-zinc-800/50">
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50 mb-4">
            <div className="text-sm font-medium mb-1">Trial Active</div>
            <div className="text-xs text-zinc-400 mb-2">7 days remaining</div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg font-medium transition-colors" aria-label="Exit Dashboard" tabIndex={0}>
            <LogOut className="w-5 h-5" aria-hidden="true" />
            Exit Dashboard
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search matches..." 
                className="pl-9 pr-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all w-64"
                aria-label="Search matches"
                tabIndex={0}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-zinc-50 transition-colors" aria-label="Notifications" tabIndex={0}>
              <Bell className="w-5 h-5" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold shadow-lg">
              U
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

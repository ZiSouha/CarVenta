import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/owner/Sidebar'
import NavbarOwner from '../../components/owner/NavbarOwner'
import { useAppContext } from '../../context/AppContext'
import { ShieldCheck, Lock, Sparkles } from 'lucide-react'

const Layout = () => {
  const { isSuperAdmin, user } = useAppContext()

  return (
    <div className='flex min-h-screen bg-[var(--color-bg-light)]'>
      <Sidebar />
      <div className='flex-1 flex flex-col ml-20 md:ml-64 transition-all'>
        {/* Mode Status Banner */}
        {isSuperAdmin ? (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-6 py-2 flex items-center justify-between text-xs shadow-sm">
            <div className="flex items-center gap-2 font-bold tracking-wide">
              <ShieldCheck size={16} className="text-emerald-200" />
              <span>SUPER ADMIN CONSOLE: Welcome back, Ziane Souhayl (Full System Control & Real Data Access)</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={11} /> Unrestricted Access
            </span>
          </div>
        ) : (
          <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan-500/10 border-b border-amber-200/60 px-6 py-2.5 flex items-center justify-between text-xs text-amber-900 shadow-sm">
            <div className="flex items-center gap-2.5 font-medium">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="font-extrabold uppercase tracking-wider text-[11px] text-amber-800">
                Visitor Preview Mode:
              </span>
              <span>
                You are viewing the operational terminal in read-only mode. Live modifications are restricted exclusively to Super Admin <strong>Ziane Souhayl</strong>.
              </span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase tracking-wider border border-amber-200">
              <Lock size={12} /> Read Only
            </span>
          </div>
        )}

        <NavbarOwner />
        <main className='flex-1 flex flex-col overflow-hidden'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
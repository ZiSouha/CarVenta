import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Bell, Search, ChevronRight, User, Command } from 'lucide-react';
import NotificationCenter from '../NotificationCenter';

const NavbarOwner = () => {
  const { user, navigate, unreadCount } = useAppContext()
  const location = useLocation()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Generate Breadcrumbs from path
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/owner/manage-cars?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <div className='flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-40 transition-all duration-300'>

      {/* Left Section: Contextual Breadcrumbs */}
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider'>
          <span onClick={() => navigate('/owner')} className='hover:text-slate-900 cursor-pointer transition-colors'>Admin</span>
          {pathnames.map((name, index) => (
            <React.Fragment key={index}>
              <ChevronRight size={12} className='text-slate-300' />
              <span className={index === pathnames.length - 1 ? 'text-slate-900 font-bold' : 'hover:text-slate-900 transition-colors'}>
                {name.replace(/-/g, ' ')}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Middle Section: Integrated Search */}
      <div className='hidden lg:flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl group focus-within:ring-2 ring-[#0891b2]/10 focus-within:border-[#0891b2]/50 transition-all w-[400px]'>
        <Search size={16} className='text-slate-400' />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search fleet, bookings..."
          className='bg-transparent outline-none text-sm w-full placeholder-slate-400 text-slate-600 font-medium'
        />
        <div className='flex items-center gap-1 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-black shadow-sm'>
          <Command size={10} /> K
        </div>
      </div>

      {/* Right Section: Notifications & User Profile */}
      <div className='flex items-center gap-5'>

        <button
          onClick={() => setIsNotificationsOpen(true)}
          className='relative p-2.5 text-slate-500 hover:text-[#0891b2] bg-slate-50 border border-slate-100 rounded-xl transition-all hover:bg-white hover:shadow-sm group'
        >
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          {unreadCount > 0 && (
            <span className='absolute top-2 right-2 w-2 h-2 bg-[#0891b2] rounded-full border-2 border-white ring-2 ring-cyan-100'></span>
          )}
        </button>

        <div className='h-8 w-px bg-slate-100 mx-1 hidden sm:block'></div>

        <Link to="/my-profile" className='flex items-center gap-4 group px-2 py-1.5 rounded-2xl hover:bg-slate-50 transition-all'>
          <div className='text-right hidden sm:block'>
            <p className='text-xs font-black text-slate-900 leading-tight'>{user?.name || "Admin"}</p>
            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>{user?.role?.replace('-', ' ') || "Admin"}</p>
          </div>

          <div className='w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#0891b2]/30 transition-all shadow-sm'>
            <img
              src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'Admin')}&background=0891b2&color=fff&bold=true`}
              alt={user?.name || "Profile"}
              className='w-full h-full object-cover'
              onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'Admin')}&background=0891b2&color=fff&bold=true` }}
            />
          </div>
        </Link>
      </div>

      <NotificationCenter
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  )
}

export default NavbarOwner

import React, { useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { LayoutDashboard, PlusCircle, Car, ListOrdered, TrendingUp, Settings, Users, Home, LogOut, Activity, Layout, AlertTriangle, MessageCircle, Github, Linkedin, Camera, Loader2 } from 'lucide-react';
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const { user, setToken, setUser, navigate, isSuperAdmin, axios, fetchUser } = useAppContext()
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleLogout = () => {
    setToken('')
    setUser(null)
    localStorage.removeItem('token')
    navigate('/')
    toast.success("Successfully logged out.")
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      return toast.error("Please upload a valid image file")
    }

    if (file.size > 5 * 1024 * 1024) {
      return toast.error("Image size must be under 5MB")
    }

    const formData = new FormData()
    formData.append('image', file)

    setIsUploading(true)
    const toastId = toast.loading("Updating profile picture...")

    try {
      const { data } = await axios.post('/api/owner/update-image', formData)
      if (data.success) {
        setUser(prev => ({ ...prev, image: data.image }))
        toast.success("Profile photo updated!", { id: toastId })
        if (fetchUser) fetchUser()
      } else {
        toast.error(data.message || "Failed to update image", { id: toastId })
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || err.message || "Upload failed", { id: toastId })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=0891b2&color=fff&bold=true`
  const avatarUrl = user?.image || defaultAvatar

  const menuItems = [
    { name: "Dashboard", path: "/owner", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Cars", path: "/owner/manage-cars", icon: <Car size={20} /> },
    { name: "Add New Car", path: "/owner/add-car", icon: <PlusCircle size={20} /> },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: <ListOrdered size={20} /> },
    { name: "Analytics", path: "/owner/analytics", icon: <TrendingUp size={20} /> },
    { name: "Damage Reports", path: "/owner/damage-reports", icon: <AlertTriangle size={20} /> },
    { name: "Live Chat", path: "/owner/live-chat", icon: <MessageCircle size={20} /> },
    { name: "Users", path: "/owner/manage-users", icon: <Users size={20} /> },
    { name: "Activity Logs", path: "/owner/activity-logs", icon: <Activity size={20} /> },
    { name: "Homepage CMS", path: "/owner/cms", icon: <Layout size={20} /> },
    { name: "Settings", path: "/owner/settings", icon: <Settings size={20} /> },
  ]

  return (
    <div className='w-20 md:w-64 border-r border-gray-200 bg-white min-h-screen flex flex-col fixed left-0 top-0 z-50 transition-all'>
      {/* Brand */}
      <div className='h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-gray-200'>
        <div className='md:hidden'>
          <img src={assets.logo} alt="logo" className='h-8 w-8 object-contain' />
        </div>
        <img src={assets.logo} alt="logo" className='h-8 hidden md:block' />
      </div>

      {/* User Profile Summary */}
      <div className='p-4 md:p-6 flex flex-col items-center border-b border-gray-200'>
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
        />

        {/* Avatar Container with Hover Upload Badge */}
        <div className='relative group mb-3'>
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className='w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm cursor-pointer relative group-hover:border-[#0891b2] transition-all'
            title="Click to change profile picture"
          >
            <img
              src={avatarUrl}
              alt={user?.name || "Profile"}
              className='w-full h-full object-cover transition-transform group-hover:scale-105'
              onError={(e) => { e.currentTarget.src = defaultAvatar }}
            />

            {/* Hover overlay */}
            <div className='absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all'>
              <Camera size={18} className='text-white drop-shadow' />
            </div>

            {/* Uploading Spinner */}
            {isUploading && (
              <div className='absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10'>
                <Loader2 size={20} className='text-white animate-spin' />
              </div>
            )}
          </div>

          {/* Mini Camera Badge */}
          <button
            type="button"
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className='absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#0891b2] text-white flex items-center justify-center shadow-md hover:bg-cyan-700 transition-all border-2 border-white'
            title="Upload new photo"
          >
            <Camera size={11} />
          </button>
        </div>

        <div className='text-center hidden md:block'>
          <h3
            onClick={() => navigate('/owner/settings')}
            className='text-sm font-bold text-gray-900 truncate max-w-[170px] hover:text-[#0891b2] transition-colors cursor-pointer'
            title={user?.name || user?.email || "User"}
          >
            {user?.name || user?.email || "Guest Explorer"}
          </h3>
          <p className={`text-[10px] font-extrabold uppercase tracking-wider mt-1 px-2.5 py-0.5 rounded-full inline-block ${isSuperAdmin ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
            {isSuperAdmin ? '👑 Super Admin' : '🔒 Read-Only Preview'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className='flex-1 py-4 px-3 space-y-1 overflow-y-auto'>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/owner'}
            className={({ isActive }) => `
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                ${isActive
                ? 'bg-cyan-50 text-[#0891b2] font-bold shadow-sm border border-cyan-100'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <div className='shrink-0'>
              {item.icon}
            </div>
            <span className='text-sm hidden md:block'>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer Controls */}
      <div className='p-3 border-t border-gray-200 space-y-2'>
        {/* Creator Attribution */}
        <div className='hidden md:block px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200'>
          <p className='text-[10px] font-bold text-gray-400 uppercase tracking-wider'>Project Architect</p>
          <p className='text-xs font-extrabold text-gray-900'>Ziane Souhayl</p>
          <div className='flex items-center gap-2 mt-1.5'>
            <a 
              href="https://github.com/ZiSouha" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-gray-400 hover:text-black transition-colors' 
              title="GitHub"
            >
              <Github size={13} />
            </a>
            <a 
              href="https://www.linkedin.com/in/ziane-souhayl" 
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-gray-400 hover:text-[#0077b5] transition-colors' 
              title="LinkedIn"
            >
              <Linkedin size={13} />
            </a>
            <a 
              href="mailto:zianesouhayl@gmail.com" 
              className='text-[10px] text-cyan-600 font-semibold hover:underline ml-auto'
            >
              Contact
            </a>
          </div>
        </div>

        <NavLink
          to="/"
          className='w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-sm'
        >
          <Home size={18} />
          <span className='hidden md:block'>Back to Site</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className='w-full flex items-center justify-center md:justify-start gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all text-sm'
        >
          <LogOut size={18} />
          <span className='hidden md:block'>Log out</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar

import { assets, menuLinks } from "../assets/assets"
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"
import { motion, AnimatePresence } from 'motion/react'
import { Search, User, LogOut, LayoutDashboard, ChevronDown, Menu, X, Heart, Bell, Gift, Shield, FileText, UserCheck, CreditCard, Sparkles, Clock } from 'lucide-react'
import NotificationCenter from "./NotificationCenter"

const Navbar = () => {
    const { setShowLogin, user, logout, isOwner, axios, setIsOwner, cars, unreadCount, isSuperAdmin } = useAppContext()
    const location = useLocation()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const notificationRef = React.useRef(null)
    const userMenuRef = React.useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        if (searchQuery.trim().length > 0) {
            const lowerQuery = searchQuery.toLowerCase()
            const matches = cars.filter(car =>
                car.brand.toLowerCase().includes(lowerQuery) ||
                car.model.toLowerCase().includes(lowerQuery)
            ).slice(0, 5)
            setSuggestions(matches)
        } else {
            setSuggestions([])
        }
    }, [searchQuery, cars])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/cars?search=${encodeURIComponent(searchQuery)}`)
            setIsSearchFocused(false)
        }
    }

    const changeRole = async () => {
        try {
            const { data } = await axios.post('/api/owner/change-role')
            if (data.success) {
                setIsOwner(true)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white border-gray-200 shadow-sm' : 'bg-white/95 backdrop-blur-md border-transparent'}`}>
            <div className="max-w-7xl mx-auto px-6 h-[80px] flex items-center justify-between gap-4">

                {/* Left Section: Brand Logo & Desktop Navigation */}
                <div className="flex items-center gap-8 xl:gap-10 shrink-0">
                    <Link to='/' className="flex items-center gap-2 shrink-0">
                        <img
                            src={assets.logo}
                            alt="logo"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {menuLinks.map((link, index) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className={`text-[15px] font-medium transition-colors duration-200 whitespace-nowrap
                                        ${isActive ? 'text-[var(--color-primary)] font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Desktop Actions */}
                <div className='hidden lg:flex items-center gap-3 xl:gap-5 shrink-0'>

                    {/* Notification Bell */}
                    {user && (
                        <div className="relative shrink-0" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className={`relative p-2 transition-colors ${showNotifications ? 'text-slate-900 bg-slate-100/80 rounded-full' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                                <Bell size={22} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
                                )}
                            </button>
                            {/* Notification Center */}
                            <NotificationCenter
                                isOpen={showNotifications}
                                onClose={() => setShowNotifications(false)}
                            />
                        </div>
                    )}

                    {/* Search Bar */}
                    <div className="relative">
                        <form onSubmit={handleSearch} className="relative w-36 lg:w-44 xl:w-56 transition-all">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                className="w-full h-10 pl-10 pr-4 bg-gray-100 border border-transparent rounded-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all"
                                placeholder="Search..."
                            />
                            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </form>

                        {/* Search Suggestions */}
                        <AnimatePresence>
                            {isSearchFocused && suggestions.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden py-1"
                                >
                                    {suggestions.map((car) => (
                                        <Link
                                            key={car._id}
                                            to={`/car-details/${car._id}`}
                                            className="block px-4 py-2 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium text-gray-800">{car.brand} {car.model}</span>
                                                <span className="text-xs text-gray-500">${car.pricePerDay}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="h-6 w-px bg-gray-200"></div>

                    <div className="flex items-center gap-4">
                        {!user ? (
                            <>
                                <button
                                    onClick={() => changeRole()}
                                    className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    List your car
                                </button>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="px-5 py-2.5 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-lg hover:bg-cyan-700 transition-colors shadow-sm"
                                >
                                    Sign In
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center gap-2.5 xl:gap-3 shrink-0">
                                {/* Sleek Admin Portal Button - Only visible when logged in */}
                                <button
                                    onClick={() => navigate('/owner')}
                                    className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0891b2] px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shrink-0"
                                    title="Go to Admin Section"
                                >
                                    <LayoutDashboard size={14} className="text-[#0891b2]" />
                                    <span>Admin Portal</span>
                                    {isSuperAdmin && (
                                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                                            Super Admin
                                        </span>
                                    )}
                                </button>

                                <div className='relative shrink-0' ref={userMenuRef}>
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-full transition-colors border ${showUserMenu ? 'bg-slate-50 border-gray-200' : 'hover:bg-gray-50 border-transparent hover:border-gray-200'}`}
                                >
                                    <div className='w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center border border-gray-200 shrink-0'>
                                        <img
                                            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=0891b2&color=fff&bold=true`}
                                            alt=""
                                            className='w-full h-full object-cover'
                                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=0891b2&color=fff&bold=true` }}
                                        />
                                    </div>
                                    <span className='text-sm font-semibold text-gray-700 max-w-[110px] truncate' title={user.name || user.email}>
                                        {user.name?.includes('@') ? user.name.split('@')[0] : (user.name ? user.name.split(' ')[0] : (user.email?.split('@')[0] || 'Account'))}
                                    </span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>

                                {/* User Menu */}
                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.1 }}
                                            className='absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1 origin-top-right z-50'
                                        >
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>

                                            <button
                                                onClick={() => { navigate('/owner'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center justify-between font-medium group transition-colors'
                                            >
                                                <div className='flex items-center gap-2'>
                                                    <LayoutDashboard size={16} className="text-[#0891b2]" />
                                                    <span>Admin Portal</span>
                                                </div>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isSuperAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                                                    {isSuperAdmin ? 'Super Admin' : 'Preview'}
                                                </span>
                                            </button>

                                            <button
                                                onClick={() => { navigate('/my-profile'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <User size={16} className="text-gray-400" />
                                                Profile
                                            </button>

                                            <button
                                                onClick={() => { navigate('/my-bookings'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <Clock size={16} className="text-blue-500" />
                                                My Bookings
                                            </button>

                                            <button
                                                onClick={() => { navigate('/membership'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <Sparkles size={16} className="text-amber-500" />
                                                Membership
                                            </button>

                                            <button
                                                onClick={() => { navigate('/verification'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <UserCheck size={16} className="text-blue-400" />
                                                Verification
                                            </button>

                                            <button
                                                onClick={() => { navigate('/referral'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <Gift size={16} className="text-purple-400" />
                                                Referral Code
                                            </button>

                                            <button
                                                onClick={() => { navigate('/documents'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <FileText size={16} className="text-slate-400" />
                                                My Documents
                                            </button>

                                            <button
                                                onClick={() => { navigate('/insurance'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <Shield size={16} className="text-emerald-400" />
                                                Insurance
                                            </button>

                                            <button
                                                onClick={() => { navigate('/favorites'); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <Heart size={16} className="text-red-400" />
                                                Favorites
                                            </button>

                                            <div className="border-t border-gray-100 my-1"></div>

                                            <button
                                                onClick={() => { logout(); setShowUserMenu(false); }}
                                                className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2'
                                            >
                                                <LogOut size={16} />
                                                Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className='lg:hidden p-2.5 text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-full transition-all active:scale-95'
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[998] lg:hidden"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white/95 backdrop-blur-2xl z-[999] lg:hidden flex flex-col shadow-2xl border-l border-white/20"
                        >
                            <div className="p-6 flex items-center justify-between">
                                <img src={assets.logo} alt="logo" className="h-8 w-auto" />
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 text-slate-500 hover:text-slate-900 bg-slate-100/80 rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <motion.div
                                className="flex-1 overflow-y-auto py-4 px-6 space-y-8 scrollbar-hide"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                {/* Search Bar (Mobile) */}
                                <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="relative">
                                    <form onSubmit={(e) => { e.preventDefault(); navigate(`/cars?search=${encodeURIComponent(e.target.search.value)}`); setOpen(false); }} className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
                                        </div>
                                        <input
                                            name="search"
                                            type="text"
                                            placeholder="Find your drive..."
                                            className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all shadow-sm"
                                        />
                                    </form>
                                </motion.div>

                                {/* Nav Links */}
                                <div className="space-y-2">
                                    <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 pl-1">Menu</motion.p>
                                    {menuLinks.map((link, index) => (
                                        <motion.div
                                            key={index}
                                            variants={{ hidden: { x: 20, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
                                        >
                                            <Link
                                                to={link.path}
                                                onClick={() => setOpen(false)}
                                                className={`flex items-center justify-between p-3.5 rounded-xl transition-all ${location.pathname === link.path ? 'bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-bold' : 'text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900'}`}
                                            >
                                                {link.name}
                                                <ChevronDown size={16} className={`text-slate-300 -rotate-90 transition-colors ${location.pathname === link.path ? 'text-[var(--color-primary)]' : ''}`} />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* User Actions */}
                                <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }} className="space-y-4 pt-4 border-t border-slate-100">
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Account</p>

                                    {!user ? (
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <button
                                                    onClick={() => { setShowLogin(true); setOpen(false); }}
                                                    className="w-full py-3.5 bg-[var(--color-primary)] text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-900/10 active:scale-95 transition-all"
                                                >
                                                    Sign In
                                                </button>
                                                <button
                                                    onClick={() => { changeRole(); setOpen(false); }}
                                                    className="w-full py-3.5 bg-white border border-slate-200 text-slate-900 font-bold text-sm rounded-xl hover:bg-slate-50 active:scale-95 transition-all"
                                                >
                                                    List Car
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link
                                                to="/my-profile"
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-4 p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-2xl shadow-sm"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 ring-2 ring-white shadow-md">
                                                    <img
                                                        src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=0891b2&color=fff&bold=true`}
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=0891b2&color=fff&bold=true` }}
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-slate-900 truncate">{user.name}</p>
                                                    <p className="text-xs text-slate-500 truncate font-medium">{user.email}</p>
                                                </div>
                                            </Link>

                                            <div className="grid grid-cols-2 gap-2">
                                                <button onClick={() => { navigate('/owner'); setOpen(false); }} className="p-3 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-xl font-bold text-xs flex flex-col items-center gap-2 hover:bg-[var(--color-primary)]/20 transition-colors">
                                                    <LayoutDashboard size={18} /> Admin {isSuperAdmin ? '' : '(Preview)'}
                                                </button>
                                                <button onClick={() => { navigate('/favorites'); setOpen(false); }} className="p-3 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs flex flex-col items-center gap-2 hover:bg-rose-100 transition-colors">
                                                    <Heart size={18} /> Favorites
                                                </button>
                                                <button onClick={() => { navigate('/my-bookings'); setOpen(false); }} className="p-3 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs flex flex-col items-center gap-2 hover:bg-blue-100 transition-colors">
                                                    <Clock size={18} /> Bookings
                                                </button>
                                                <button onClick={() => { logout(); setOpen(false); }} className="p-3 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs flex flex-col items-center gap-2 col-span-2 hover:bg-slate-200 transition-colors">
                                                    <LogOut size={18} /> Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>

                            <div className="p-6 border-t border-slate-100/50 bg-slate-50/50 backdrop-blur-sm text-center space-y-1">
                                <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">
                                    Engineered by Ziane Souhayl
                                </p>
                                <div className="flex items-center justify-center gap-3 pt-1 text-slate-400 text-xs">
                                    <a href="https://github.com/ZiSouha" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 font-medium transition-colors">GitHub</a>
                                    <span>•</span>
                                    <a href="https://www.linkedin.com/in/ziane-souhayl" target="_blank" rel="noopener noreferrer" className="hover:text-[#0077b5] font-medium transition-colors">LinkedIn</a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {/* Notification Center */}
            <NotificationCenter
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
            />
        </nav>
    )
}

export default Navbar

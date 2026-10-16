import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { Upload, User, Mail, Save, Camera, CheckCircle, AlertCircle, Calendar, Shield, ShieldCheck, Activity, Key, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import toast from 'react-hot-toast'

const MyProfile = () => {
    const { user, axios, fetchUser, setToken, navigate } = useAppContext()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setPreview(user.image)
        }
    }, [user])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setPreview(URL.createObjectURL(file))
            setIsEditing(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // 1. Update Profile (Name)
            if (name !== user.name) {
                const { data } = await axios.post('/api/user/update-profile', { name, email })
                if (!data.success) {
                    throw new Error(data.message)
                }
            }

            // 2. Update Image (if changed)
            if (image) {
                const formData = new FormData()
                formData.append('image', image)
                const { data } = await axios.post('/api/owner/update-image', formData)
                if (!data.success) {
                    throw new Error(data.message)
                }
                if (data.image) {
                    setUser(prev => ({ ...prev, image: data.image }))
                }
            }

            toast.success('Profile updated successfully!', {
                style: { background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
            })
            setIsEditing(false)
            if (fetchUser) await fetchUser() // Refresh global state

        } catch (error) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = () => {
        setToken('')
        localStorage.removeItem('token')
        navigate('/')
        toast.success("Identity Disconnected", {
            style: { background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
        })
    }

    if (!user) return <div className="h-screen flex justify-center items-center bg-white font-black text-[#0891b2] tracking-widest">INITIALIZING...</div>

    return (
        <div className="bg-white min-h-screen pt-40 pb-20 px-6">
            <div className="max-w-5xl mx-auto space-y-12">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200'>
                    <div className='space-y-3'>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-[#0891b2]" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Personnel Identity Ledger</span>
                        </div>
                        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Profile <span className='text-[#0891b2]'>Settings.</span></h1>
                        <p className='text-slate-500 text-sm font-medium'>Control over institutional credentials and network presence.</p>
                    </div>

                    <div className='flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                        <button onClick={handleLogout} className='flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-md text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-red-50 transition-all'>
                            <LogOut size={14} /> Disconnect Identity
                        </button>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                    {/* Left: Avatar & Security Module */}
                    <div className='lg:col-span-4 space-y-6'>
                        <div className='bg-white rounded-xl border border-slate-200 p-8 flex flex-col items-center space-y-6 shadow-sm overflow-hidden relative'>
                            <div className='relative group'>
                                <div className='w-32 h-32 rounded-lg border-2 border-slate-100 shadow-sm overflow-hidden bg-slate-50 relative z-10'>
                                    <img
                                        src={preview || user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=0891b2&color=fff&bold=true`}
                                        alt="Profile"
                                        className='w-full h-full object-cover'
                                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=0891b2&color=fff&bold=true` }}
                                    />
                                </div>
                                <label className='absolute -bottom-2 -right-2 z-20 p-2.5 bg-slate-900 text-white rounded-lg hover:bg-[#0891b2] transition-all cursor-pointer shadow-lg active:scale-95'>
                                    <Camera size={16} />
                                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                                </label>
                            </div>

                            <div className='text-center space-y-1 relative z-10'>
                                <h2 className='text-lg font-bold text-slate-900'>{user.name}</h2>
                                <p className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>{user.role} Status Verified</p>
                            </div>

                            <div className="w-full pt-6 border-t border-slate-50 space-y-4 relative z-10">
                                <div className='flex items-center justify-between text-[10px] font-bold uppercase tracking-widest'>
                                    <span className='text-slate-400'>Registry ID:</span>
                                    <span className='text-slate-900'>#{user._id.slice(-8).toUpperCase()}</span>
                                </div>
                                <div className='flex items-center justify-between text-[10px] font-bold uppercase tracking-widest'>
                                    <span className='text-slate-400'>Clearance:</span>
                                    <span className='text-[#0891b2]'>Level 1</span>
                                </div>
                            </div>

                            {/* Decoration Skew */}
                            <div className="absolute right-0 bottom-0 w-24 h-24 bg-slate-50 -z-0 skew-x-12 translate-x-10 translate-y-10" />
                        </div>

                        <div className='bg-slate-900 rounded-xl p-6 border border-slate-800 space-y-4'>
                            <h3 className='text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2'>
                                <ShieldCheck size={14} className='text-[#0891b2]' /> Security Protocols
                            </h3>
                            <button className='w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group'>
                                <span className='text-[10px] font-bold text-slate-300 uppercase tracking-widest'>Encryption Key</span>
                                <Key size={14} className='text-slate-500 group-hover:text-[#0891b2]' />
                            </button>
                            <button className='w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all group'>
                                <span className='text-[10px] font-bold text-slate-300 uppercase tracking-widest'>Registry Log</span>
                                <Activity size={14} className='text-slate-500 group-hover:text-[#0891b2]' />
                            </button>
                        </div>
                    </div>

                    {/* Right: Data Modification Portal */}
                    <div className='lg:col-span-8'>
                        <div className='bg-white rounded-xl border border-slate-200 p-10 space-y-12 shadow-sm'>
                            <div className='space-y-1'>
                                <h3 className='text-xl font-bold text-slate-900'>Identification Data</h3>
                                <p className='text-xs text-slate-400 font-bold uppercase tracking-widest'>Modify Registry Credentials</p>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-8'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                    <div className='space-y-2'>
                                        <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Operator Identity</label>
                                        <div className='relative'>
                                            <User size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value); setIsEditing(true) }}
                                                className='w-full bg-slate-50 border border-slate-200 rounded-lg pl-11 pr-4 py-4 text-xs font-bold text-slate-900 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all'
                                                placeholder="Legal Name"
                                            />
                                        </div>
                                    </div>

                                    <div className='space-y-2'>
                                        <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Communication Node</label>
                                        <div className='relative'>
                                            <Mail size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-300' />
                                            <input
                                                type="email"
                                                value={email}
                                                readOnly
                                                className='w-full bg-slate-50/50 border border-slate-200 rounded-lg pl-11 pr-4 py-4 text-xs font-bold text-slate-400 outline-none cursor-not-allowed'
                                            />
                                        </div>
                                        <p className='text-[9px] text-slate-400 font-medium flex items-center gap-1.5'>
                                            <AlertCircle size={10} /> Immutable Network ID
                                        </p>
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Creation Timestamp</label>
                                    <div className='w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 text-xs font-bold text-slate-900 flex items-center justify-between'>
                                        <span className='opacity-60'>Registry Initiated:</span>
                                        <span className='uppercase tracking-tighter'>{new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}</span>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {(isEditing || image) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className='pt-4'
                                        >
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className='w-full py-4 bg-[#0891b2] text-white rounded-lg font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#0e7490] transition-all shadow-lg shadow-cyan-500/10 flex items-center justify-center gap-3 disabled:opacity-70 active:scale-[0.98]'
                                            >
                                                {isLoading ? 'SYNCING DATA...' : 'COMMIT CHANGES'}
                                                {!isLoading && <Save size={16} />}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>

                        <div className='mt-8 p-6 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4'>
                            <div className='w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0891b2] shadow-sm'>
                                <Shield size={18} />
                            </div>
                            <p className='text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed'>
                                All identity modifications are logged and verified against the <span className='text-slate-900 px-1'>Master Security Protocol 2026.</span>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyProfile

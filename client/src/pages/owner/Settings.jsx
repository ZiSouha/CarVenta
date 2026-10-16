import React, { useState, useEffect, useRef } from 'react'
import { User, Mail, Phone, Lock, Bell, Globe, Shield, ChevronRight, Camera, Trash2, Upload, Loader2, CheckCircle2 } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'
import AdminHeader from '../../components/owner/AdminHeader'

const Settings = () => {
    const { user, axios, setUser, fetchUser } = useAppContext()
    const [activeTab, setActiveTab] = useState('Profile')
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const fileInputRef = useRef(null)
    const [userData, setUserData] = useState({
        name: '',
        email: ''
    })

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || '',
                email: user.email || ''
            })
        }
    }, [user])

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || user?.email || 'User')}&background=0891b2&color=fff&bold=true`
    const avatarUrl = user?.image || defaultAvatar

    const handleImageChange = async (e) => {
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

        setIsUploadingImage(true)
        const toastId = toast.loading("Uploading profile photo...")

        try {
            const { data } = await axios.post('/api/owner/update-image', formData)
            if (data.success) {
                setUser(prev => ({ ...prev, image: data.image }))
                toast.success("Profile photo updated!", { id: toastId })
                if (fetchUser) fetchUser()
            } else {
                toast.error(data.message || "Failed to update photo", { id: toastId })
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message || "Upload failed", { id: toastId })
        } finally {
            setIsUploadingImage(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleRemoveImage = async () => {
        if (!window.confirm("Are you sure you want to remove your profile photo and reset to initials avatar?")) {
            return
        }

        const toastId = toast.loading("Removing profile photo...")
        try {
            const { data } = await axios.post('/api/owner/remove-image')
            if (data.success) {
                setUser(prev => ({ ...prev, image: '' }))
                toast.success("Profile photo removed!", { id: toastId })
                if (fetchUser) fetchUser()
            } else {
                toast.error(data.message || "Failed to remove photo", { id: toastId })
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || error.message || "Failed to remove photo", { id: toastId })
        }
    }

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    })

    const handleUpdateProfile = async () => {
        try {
            const { data } = await axios.post('/api/user/update-profile', userData)
            if (data.success) {
                toast.success(data.message)
                setUser(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleUpdatePassword = async () => {
        try {
            if (!passwordData.currentPassword || !passwordData.newPassword) {
                return toast.error("Please fill all password fields")
            }
            const { data } = await axios.post('/api/user/update-password', passwordData)
            if (data.success) {
                toast.success(data.message)
                setPasswordData({ currentPassword: '', newPassword: '' })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
            <AdminHeader
                title="Settings"
                subtitle="Manage your account preferences and security"
            />

            <div className='grid grid-cols-1 xl:grid-cols-12 gap-8'>

                {/* Navigation Sidebar for Settings */}
                <div className='xl:col-span-3 space-y-2'>
                    {[
                        { label: "Profile", icon: <User size={20} /> },
                        { label: "Security", icon: <Shield size={20} /> },
                        { label: "Notifications", icon: <Bell size={20} /> },
                        { label: "Region", icon: <Globe size={20} /> },
                        { label: "Privacy & Data", icon: <Shield size={20} className="text-emerald-500" /> },
                    ].map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.label)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.label
                                ? 'bg-gray-50 text-gray-900 border border-gray-200'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent'}`}
                        >
                            <div className='text-gray-400'>
                                {item.icon}
                            </div>
                            <span className='text-sm font-semibold'>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className='xl:col-span-9'>
                    <AnimatePresence mode='wait'>
                        {activeTab === 'Profile' && (
                            <div className='space-y-6'>
                                {/* Profile Photo Section */}
                                <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center'>
                                            <Camera size={20} />
                                        </div>
                                        <div>
                                            <h2 className='text-lg font-bold text-gray-900'>Profile Photo</h2>
                                            <p className='text-xs text-gray-500'>This image represents your identity across the platform</p>
                                        </div>
                                    </div>

                                    <div className='flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-2'>
                                        {/* Avatar Preview with Click to Upload */}
                                        <div className='relative group'>
                                            <div
                                                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                                                className='w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-md cursor-pointer relative group-hover:border-[#0891b2] transition-all'
                                                title="Click to choose a photo"
                                            >
                                                <img
                                                    src={avatarUrl}
                                                    alt={user?.name || "Avatar"}
                                                    className='w-full h-full object-cover transition-transform group-hover:scale-105'
                                                    onError={(e) => { e.currentTarget.src = defaultAvatar }}
                                                />
                                                <div className='absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all'>
                                                    <Camera size={24} className='text-white drop-shadow' />
                                                </div>

                                                {isUploadingImage && (
                                                    <div className='absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10'>
                                                        <Loader2 size={24} className='text-white animate-spin' />
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                                                className='absolute bottom-0 right-0 p-2 bg-[#0891b2] text-white rounded-full shadow-lg hover:bg-cyan-700 transition-all border-2 border-white'
                                                title="Upload new image"
                                            >
                                                <Camera size={14} />
                                            </button>
                                        </div>

                                        {/* Upload Controls & Info */}
                                        <div className='flex-1 space-y-3 text-center sm:text-left'>
                                            <div className='flex items-center justify-center sm:justify-start gap-2'>
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${user?.image ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                                                    {user?.image ? (
                                                        <>
                                                            <CheckCircle2 size={13} className='text-emerald-600' />
                                                            Custom Photo Active
                                                        </>
                                                    ) : (
                                                        'Default Initials Avatar'
                                                    )}
                                                </span>
                                            </div>

                                            <p className='text-xs text-gray-500'>
                                                Upload a clear, square photo. JPG, PNG or WEBP accepted. Maximum file size 5MB.
                                            </p>

                                            <div className='flex items-center justify-center sm:justify-start gap-3 pt-1'>
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageChange}
                                                />

                                                <button
                                                    type="button"
                                                    disabled={isUploadingImage}
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className='inline-flex items-center gap-2 px-4 py-2.5 bg-[#0891b2] text-white rounded-lg font-semibold text-xs hover:bg-cyan-700 transition-all shadow-sm disabled:opacity-50'
                                                >
                                                    {isUploadingImage ? <Loader2 size={14} className='animate-spin' /> : <Upload size={14} />}
                                                    <span>{user?.image ? 'Change Photo' : 'Upload Photo'}</span>
                                                </button>

                                                {user?.image && (
                                                    <button
                                                        type="button"
                                                        disabled={isUploadingImage}
                                                        onClick={handleRemoveImage}
                                                        className='inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-red-200 transition-all'
                                                    >
                                                        <Trash2 size={14} />
                                                        <span>Remove</span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Information Card */}
                                <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center'>
                                            <User size={20} />
                                        </div>
                                        <h2 className='text-lg font-bold text-gray-900'>Account Information</h2>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Full Name</label>
                                            <div className='relative'>
                                                <User size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                                <input
                                                    type="text"
                                                    value={userData.name}
                                                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                                                    className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all'
                                                />
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Email Address</label>
                                            <div className='relative'>
                                                <Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                                <input
                                                    type="email"
                                                    value={userData.email}
                                                    disabled
                                                    className='w-full bg-gray-100 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-500 font-medium outline-none cursor-not-allowed'
                                                />
                                            </div>
                                            <p className='text-xs text-gray-500 mt-1'>Email cannot be changed for security reasons</p>
                                        </div>
                                    </div>

                                    <div className='flex justify-end pt-4 border-t border-gray-100'>
                                        <button
                                            onClick={handleUpdateProfile}
                                            className='px-6 py-3 bg-[#0891b2] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all'
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Security' && (
                            <div className='space-y-6'>
                                <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center'>
                                            <Shield size={20} />
                                        </div>
                                        <h2 className='text-lg font-bold text-gray-900'>Password & Security</h2>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Current Password</label>
                                            <div className='relative'>
                                                <Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                                <input
                                                    type="password"
                                                    value={passwordData.currentPassword}
                                                    onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                    placeholder="••••••••"
                                                    className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all'
                                                />
                                            </div>
                                        </div>
                                        <div className='space-y-2'>
                                            <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>New Password</label>
                                            <div className='relative'>
                                                <Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                                                <input
                                                    type="password"
                                                    value={passwordData.newPassword}
                                                    onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                    placeholder="••••••••"
                                                    className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex justify-end pt-4 border-t border-gray-100'>
                                        <button
                                            onClick={handleUpdatePassword}
                                            className='px-6 py-3 bg-[#0891b2] text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-all'
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Notifications' && (
                            <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center'>
                                        <Bell size={20} />
                                    </div>
                                    <h2 className='text-lg font-bold text-gray-900'>Notification Preferences</h2>
                                </div>
                                <div className='py-16 text-center space-y-4'>
                                    <div className='w-16 h-16 bg-gray-50 rounded-full border border-gray-200 mx-auto flex items-center justify-center text-gray-300'>
                                        <Bell size={28} />
                                    </div>
                                    <div className='space-y-1'>
                                        <p className='text-sm font-semibold text-gray-900'>No Custom Preferences</p>
                                        <p className='text-xs text-gray-500'>Standard notifications are enabled</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Region' && (
                            <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center'>
                                        <Globe size={20} />
                                    </div>
                                    <h2 className='text-lg font-bold text-gray-900'>Regional Settings</h2>
                                </div>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                    <div className='p-6 rounded-lg border border-gray-200 bg-gray-50 space-y-3'>
                                        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Region</p>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-2xl'>🇺🇸</span>
                                            <span className='font-bold text-gray-900'>United States</span>
                                        </div>
                                    </div>
                                    <div className='p-6 rounded-lg border border-gray-200 bg-gray-50 space-y-3'>
                                        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Currency</p>
                                        <div className='flex items-center gap-3'>
                                            <span className='text-2xl'>💵</span>
                                            <span className='font-bold text-gray-900'>USD</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'Privacy & Data' && (
                            <div className='space-y-6'>
                                <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center'>
                                            <Shield size={20} />
                                        </div>
                                        <h2 className='text-lg font-bold text-gray-900'>Privacy & Data Protection</h2>
                                    </div>

                                    <div className='space-y-6'>
                                        <div className='p-6 rounded-xl border border-gray-100 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                                            <div className='space-y-1'>
                                                <h4 className='font-bold text-gray-900 text-sm'>Download Your Data</h4>
                                                <p className='text-xs text-gray-500'>Get a copy of all your profile information and booking history in JSON format.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const data = JSON.stringify({ user, timestamp: new Date() }, null, 2);
                                                    const blob = new Blob([data], { type: 'application/json' });
                                                    const url = URL.createObjectURL(blob);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = `carventa-data-${user._id}.json`;
                                                    a.click();
                                                    toast.success("Data export started");
                                                }}
                                                className='px-4 py-2 bg-white border border-gray-200 text-gray-700 font-bold text-xs rounded-lg hover:bg-gray-50 transition-all'
                                            >
                                                Download JSON
                                            </button>
                                        </div>

                                        <div className='p-6 rounded-xl border border-rose-100 bg-rose-50 flex flex-col md:flex-row md:items-center justify-between gap-4'>
                                            <div className='space-y-1'>
                                                <h4 className='font-bold text-rose-900 text-sm'>Delete Account</h4>
                                                <p className='text-xs text-rose-600/70'>Permanently remove your account and all associated data. This action cannot be undone.</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm("ARE YOU ABSOLUTELY SURE? This will permanently delete your account and all bookings. This action cannot be undone.")) {
                                                        toast.error("Account deletion is a sensitive operation. Please contact support to complete this request for security verification.");
                                                    }
                                                }}
                                                className='px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-lg hover:bg-rose-700 transition-all shadow-sm'
                                            >
                                                Delete Permanently
                                            </button>
                                        </div>
                                    </div>

                                    <div className='pt-6 border-t border-gray-100'>
                                        <div className='flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest'>
                                            <Shield size={12} />
                                            GDPR & CCPA Compliant
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Settings

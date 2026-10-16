import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'motion/react'
import { Layout, Save, Info, Link as LinkIcon, Phone, Mail, Facebook, Twitter, Instagram, Plus, X, Star, Github, Linkedin } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminHeader from '../../components/owner/AdminHeader'

const HomeCMS = () => {
    const { axios, isOwner, cars, isSuperAdmin, checkSuperAdminAction } = useAppContext()
    const [config, setConfig] = useState({
        heroTitle: "",
        heroSubtitle: "",
        heroImage: "",
        contactEmail: "",
        contactPhone: "",
        socialLinks: { github: "https://github.com/ZiSouha", linkedin: "https://www.linkedin.com/in/ziane-souhayl", facebook: "", twitter: "", instagram: "" },
        featuredCarIds: []
    })
    const [loading, setLoading] = useState(true)

    const fetchConfig = async () => {
        try {
            const { data } = await axios.get('/api/owner/site-config')
            if (data.success && data.config) {
                setConfig(data.config)
            }
        } catch (error) {
            // Keep current config
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!checkSuperAdminAction()) return
        try {
            const { data } = await axios.post('/api/owner/update-site-config', config)
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const toggleFeatured = (carId) => {
        setConfig(prev => ({
            ...prev,
            featuredCarIds: prev.featuredCarIds.includes(carId)
                ? prev.featuredCarIds.filter(id => id !== carId)
                : [...prev.featuredCarIds, carId]
        }))
    }

    useEffect(() => {
        fetchConfig()
    }, [])

    return (
        <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
            <AdminHeader
                title="Content Management"
                subtitle="Edit your homepage content and settings dynamically"
            >
                <button
                    onClick={handleSave}
                    className='flex items-center gap-2 px-6 py-3 bg-[#0891b2] text-white rounded-xl font-bold hover:bg-[#0e7490] transition-all shadow-lg active:scale-95'
                >
                    <Save size={18} />
                    Save Changes
                </button>
            </AdminHeader>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12'>
                {/* Hero Section */}
                <div className='space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200'>
                    <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                        <Star className='text-yellow-500' size={20} />
                        Hero Section
                    </h3>
                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest'>Headline</label>
                            <input
                                value={config.heroTitle}
                                onChange={e => setConfig({ ...config, heroTitle: e.target.value })}
                                className='w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all'
                                placeholder="Main title of your website"
                            />
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest'>Subheadline</label>
                            <textarea
                                rows={3}
                                value={config.heroSubtitle}
                                onChange={e => setConfig({ ...config, heroSubtitle: e.target.value })}
                                className='w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all resize-none'
                                placeholder="A brief description appearing under the headline"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className='space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200'>
                    <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                        <Info className='text-blue-500' size={20} />
                        Contact & Support
                    </h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest'>Email Address</label>
                            <div className='relative'>
                                <Mail size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
                                <input
                                    value={config.contactEmail}
                                    onChange={e => setConfig({ ...config, contactEmail: e.target.value })}
                                    className='w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all'
                                />
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <label className='text-xs font-bold text-slate-500 uppercase tracking-widest'>Phone Number</label>
                            <div className='relative'>
                                <Phone size={16} className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400' />
                                <input
                                    value={config.contactPhone}
                                    onChange={e => setConfig({ ...config, contactPhone: e.target.value })}
                                    className='w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className='space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200'>
                    <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                        <LinkIcon className='text-indigo-500' size={20} />
                        Social Presence
                    </h3>
                    <div className='space-y-4'>
                        {[
                            { id: 'github', icon: <Github size={18} />, label: 'GitHub URL' },
                            { id: 'linkedin', icon: <Linkedin size={18} />, label: 'LinkedIn URL' },
                            { id: 'facebook', icon: <Facebook size={18} />, label: 'Facebook URL' },
                            { id: 'twitter', icon: <Twitter size={18} />, label: 'Twitter URL' },
                            { id: 'instagram', icon: <Instagram size={18} />, label: 'Instagram URL' },
                        ].map(item => (
                            <div key={item.id} className='space-y-2'>
                                <label className='text-xs font-bold text-slate-500 uppercase tracking-widest'>{item.label}</label>
                                <div className='relative'>
                                    <div className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'>{item.icon}</div>
                                    <input
                                        value={config.socialLinks?.[item.id] || ''}
                                        onChange={e => setConfig({
                                            ...config,
                                            socialLinks: { ...(config.socialLinks || {}), [item.id]: e.target.value }
                                        })}
                                        className='w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Cars Selector */}
                <div className='space-y-6 bg-slate-50 p-8 rounded-2xl border border-slate-200'>
                    <h3 className='text-lg font-bold text-slate-900 flex items-center gap-2'>
                        <Plus className='text-orange-500' size={20} />
                        Featured Vehicles
                    </h3>
                    <p className='text-sm text-slate-500'>Select vehicles to highlight on the homepage.</p>

                    <div className='max-h-[300px] overflow-y-auto space-y-2 pr-2'>
                        {cars.map(car => (
                            <div
                                key={car._id}
                                onClick={() => toggleFeatured(car._id)}
                                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${config.featuredCarIds.includes(car._id)
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                    : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300'
                                    }`}
                            >
                                <div className='w-12 h-8 rounded bg-slate-100 overflow-hidden shrink-0'>
                                    <img src={car.image} alt="" className='w-full h-full object-cover' />
                                </div>
                                <div className='flex-1'>
                                    <p className='text-sm font-bold'>{car.brand} {car.model}</p>
                                    <p className={`text-[10px] font-bold uppercase tracking-wider ${config.featuredCarIds.includes(car._id) ? 'text-blue-100' : 'text-slate-400'}`}>
                                        {car.location} • ${car.pricePerDay}/day
                                    </p>
                                </div>
                                {config.featuredCarIds.includes(car._id) ? <X size={16} /> : <Plus size={16} />}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeCMS

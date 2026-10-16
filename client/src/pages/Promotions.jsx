import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Ticket, Gift, Zap, Calendar, ArrowRight, Star, Copy, Check, Sparkles, LayoutGrid, Clock, Tag } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Promotions = () => {
    const { user } = useAppContext()
    const [copiedCode, setCopiedCode] = useState(null)

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code)
        setCopiedCode(code)
        toast.success(`Code ${code} copied!`)
        setTimeout(() => setCopiedCode(null), 2000)
    }

    const featuredOffers = [
        {
            id: 1,
            title: "Winter Escape Sale",
            desc: "Secure absolute performance for your mountain traverse. Valid for elite SUV rentals over 3 days.",
            code: "WINTER20",
            expiry: "Ends Jan 31, 2026",
            badge: "Limited Expedition",
            image: "https://images.unsplash.com/photo-1511068797325-6083f0f872b1?q=80&w=2070",
            color: "blue"
        },
        {
            id: 2,
            title: "The Induction Credit",
            desc: "Begin your journey with distinctions. New members receive $50 introductory credit.",
            code: "WELCOME50",
            expiry: "Permanent",
            badge: "Member Induction",
            image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070",
            color: "amber"
        }
    ]

    const allOffers = [
        { title: "Weekend Odyssey", desc: "15% reduction on Friday-Monday bookings", code: "ODYSSEY15", icon: <Star className="text-amber-500" /> },
        { title: "Executive Fleet", desc: "Corporate rates for pre-verified business accounts", code: "EXECVIP", icon: <Zap className="text-blue-500" /> },
        { title: "Extended Residency", desc: "Rent for 10+ days, receive 3 days complimentary", code: "GRANDTOUR", icon: <Clock className="text-purple-500" /> },
        { title: "Electric Protocol", desc: "10% sustainability credit on all EV rentals", icon: <Sparkles className="text-emerald-500" />, code: "VOLT10" },
    ]

    return (
        <div className="pt-24 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="max-w-4xl mb-24 space-y-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">
                        <Tag size={12} className="text-amber-400" /> Promotional Governance
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                        Incentives for the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Extraordinary.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl">
                        Explore our seasonal incentives, membership credits, and exclusive fleet partnerships. All rewards are instantly redeemable within our secure booking console.
                    </p>
                </div>

                {/* Featured Splash */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-32">
                    {featuredOffers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative group rounded-[4rem] overflow-hidden min-h-[500px] flex items-end shadow-2xl shadow-slate-200/50"
                        >
                            <img src={offer.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                            <div className="relative z-10 p-12 space-y-8 w-full">
                                <span className="px-5 py-2 bg-white/20 backdrop-blur-xl rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                                    {offer.badge}
                                </span>
                                <div className="space-y-3">
                                    <h3 className="text-4xl font-black text-white leading-tight">{offer.title}</h3>
                                    <p className="text-slate-300 text-lg font-medium max-w-sm leading-relaxed">{offer.desc}</p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                                    <div className="w-full sm:w-auto px-8 py-5 bg-white rounded-2xl flex items-center justify-between gap-12 group/btn cursor-pointer" onClick={() => handleCopy(offer.code)}>
                                        <span className="font-black text-slate-900 tracking-[0.2em] text-sm">{offer.code}</span>
                                        <div className="text-slate-300 group-hover/btn:text-blue-600 transition-colors">
                                            {copiedCode === offer.code ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-white/50 font-black uppercase tracking-[0.2rem] flex items-center gap-2">
                                        <Clock size={14} /> {offer.expiry}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Grid Archives */}
                <div className="space-y-16">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Access Directory</h2>
                        <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <LayoutGrid size={16} /> All Active Credits
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {allOffers.map((offer, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:border-blue-500/20 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                                        {offer.icon}
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-4">{offer.title}</h4>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">{offer.desc}</p>
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                    <span className="font-black text-slate-900 text-sm tracking-widest">{offer.code}</span>
                                    <button
                                        onClick={() => handleCopy(offer.code)}
                                        className="text-slate-300 hover:text-blue-600 transition-colors"
                                    >
                                        {copiedCode === offer.code ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Platinum Upsell */}
                <div className="mt-40 bg-slate-900 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000">
                        <img src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=2070" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-blue-600/5 -z-0"></div>

                    <div className="relative z-10 max-w-xl space-y-10">
                        <div className="space-y-4">
                            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Institutional Membership</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">
                                Native Rewards. <br /> <span className="text-blue-500">Zero Codes.</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                Elite and Platinum members bypass the search for credits. Benefits are integrated directly into your profile for effortless distinction.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                Explore Memberships <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Promotions

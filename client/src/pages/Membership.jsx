import React from 'react'
import { motion } from 'motion/react'
import { Crown, Star, Shield, Zap, Check, ArrowRight, Sparkles, Diamond, Gem, ShieldCheck, Activity, Info, CheckCircle2 } from 'lucide-react'

const Membership = () => {

    const tiers = [
        {
            name: "Standard",
            price: "Free",
            tagline: "Network Entry",
            icon: <Shield size={20} />,
            color: "slate",
            benefits: ["Member-only rates", "Standard support", "Digital key access"]
        },
        {
            name: "Elite",
            price: "$199",
            period: "/year",
            tagline: "Priority Access",
            icon: <Gem size={20} />,
            color: "cyan",
            popular: true,
            benefits: ["5% off every rental", "Free collision waiver", "Priority support", "Silver status badge"]
        },
        {
            name: "Premier",
            price: "$499",
            period: "/year",
            tagline: "Executive Tier",
            icon: <Crown size={20} />,
            color: "slate",
            benefits: ["15% off every rental", "Premium insurance included", "Airport concierge delivery", "Access to Elite fleet"]
        },
        {
            name: "Sovereign",
            price: "$999",
            period: "/year",
            tagline: "Absolute Distinction",
            icon: <Diamond size={20} />,
            color: "slate",
            benefits: ["25% off every rental", "Zero deductible protection", "Unlimited mileage", "Invitation-only events"]
        }
    ]

    return (
        <div className="pt-40 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-16">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200'>
                    <div className='space-y-2'>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                            <span className="flex h-2 w-2 rounded-full bg-[#0891b2]" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Institutional Membership Registry</span>
                        </div>
                        <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none'>
                            Status <span className='text-[#0891b2]'>Tiers.</span>
                        </h1>
                        <p className='text-slate-500 font-medium text-lg max-w-xl'>
                            Formal classification levels within the CarVenta network, unlocking prioritized logistics and asset access.
                        </p>
                    </div>

                    <div className='flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                        <div className='flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md'>
                            <Activity size={14} className='text-[#0891b2]' />
                            <span className='text-[10px] font-bold text-slate-900 uppercase tracking-widest'>Registry Active</span>
                        </div>
                        <div className='h-6 w-px bg-slate-200'></div>
                        <div className='text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3'>Updated: Jan 2026</div>
                    </div>
                </div>

                {/* Tiers Grid - Admin Card Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative bg-white rounded-xl p-8 border border-slate-200 flex flex-col justify-between group hover:border-[#0891b2]/30 transition-all duration-300 shadow-sm ${tier.popular ? "border-[#0891b2]/20 ring-1 ring-[#0891b2]/10" : ""}`}
                        >
                            {tier.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0891b2] text-white text-[9px] font-black px-4 py-1.5 rounded-md uppercase tracking-[0.2em] shadow-lg">
                                    Primary Selection
                                </div>
                            )}

                            <div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-8 border border-slate-100 shadow-sm ${tier.color === 'cyan' ? "bg-cyan-50 text-[#0891b2]" : "bg-slate-50 text-slate-400"}`}>
                                    {tier.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-1">{tier.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10">{tier.tagline}</p>

                                <div className="mb-10 pb-8 border-b border-slate-100 flex items-baseline gap-1">
                                    <span className="text-3xl font-black text-slate-900">{tier.price}</span>
                                    {tier.period && <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">{tier.period}</span>}
                                </div>

                                <ul className="space-y-4 mb-12">
                                    {tier.benefits.map((benefit, b) => (
                                        <li key={b} className="flex items-start gap-3 text-xs font-bold text-slate-600 leading-tight">
                                            <div className="mt-0.5 shrink-0 text-[#0891b2]">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${tier.popular ? "bg-[#0891b2] text-white hover:bg-[#0e7490] shadow-lg shadow-cyan-500/10" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50"}`}>
                                Initialize {tier.name} Tier
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Enterprise/Bespoke Section - High Utility Administrative Look */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                    <div className="p-12 md:p-20 relative flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl space-y-6 relative z-10">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                                <Info size={24} className="text-[#0891b2]" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">Institutional <span className='text-[#0891b2]'>Customization.</span></h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                We offer customized fleet logistics for corporate entities and specialized organizations requiring absolute mobility control and high-volume asset utilization.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-300">Volume Discounts</span>
                                <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-300">Logistics Priority</span>
                                <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-300">Dedicated Node</span>
                            </div>
                        </div>
                        <button className="relative z-10 whitespace-nowrap px-10 py-5 bg-white text-slate-900 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95 shadow-2xl">
                            Initialize Corporate Inquiry <ArrowRight size={18} />
                        </button>

                        {/* Decorative Detail */}
                        <div className="absolute right-0 top-0 w-1/3 h-full bg-[#0891b2] opacity-[0.03] skew-x-12 translate-x-1/2" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Membership

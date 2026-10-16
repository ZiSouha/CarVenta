import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Shield, Check, AlertCircle, ShieldCheck, ShieldAlert, Zap, Globe, Clock, Info, CheckCircle2, ChevronDown, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Insurance = () => {
    const navigate = useNavigate()
    const [billing, setBilling] = useState('daily')

    const plans = [
        {
            id: 'basic',
            name: "Standard",
            price: 0,
            tagline: "Regulatory Core",
            icon: <Shield size={20} />,
            description: "Essential protection covering mandatory state liability and 24/7 roadside assistance.",
            features: [
                { text: "State Minimum Liability", included: true },
                { text: "24/7 Roadside Assistance", included: true },
                { text: "Damage Cover (Up to $30k)", included: true },
                { text: "Zero Deductible", included: false }
            ],
            color: "slate",
            buttonText: "Standard Included"
        },
        {
            id: 'essential',
            name: "Premium",
            price: 15,
            weeklyPrice: 90,
            tagline: "Total Confidence",
            icon: <ShieldCheck size={20} />,
            description: "Our most popular choice. Full damage waiver and theft protection for ultimate security.",
            features: [
                { text: "Enhanced Liability ($100k)", included: true },
                { text: "Damage Waiver (CDW)", included: true },
                { text: "Theft Protection", included: true },
                { text: "Glass & Tire Protection", included: true }
            ],
            color: "cyan",
            popular: true,
            buttonText: "Select Premium"
        },
        {
            id: 'platinum',
            name: "Platinum",
            price: 35,
            weeklyPrice: 210,
            tagline: "Absolute Immunity",
            icon: <Zap size={20} />,
            description: "Zero liability. Zero deductible. The highest level of protection for the most discerning drivers.",
            features: [
                { text: "Maximum Liability ($1M)", included: true },
                { text: "Zero Deductible", included: true },
                { text: "Personal Accident Cover", included: true },
                { text: "International Add-on", included: true }
            ],
            color: "indigo",
            buttonText: "Experience Platinum"
        }
    ]

    return (
        <div className="pt-24 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Insurance & Protection</h1>
                        <p className='text-slate-500 text-sm'>Institutional-grade security protocols for your journey.</p>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                        <button
                            onClick={() => setBilling('daily')}
                            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${billing === 'daily'
                                ? 'bg-white text-[#0891b2] shadow-sm border border-slate-200'
                                : 'text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            Daily Rate
                        </button>
                        <div className='h-6 w-px bg-slate-200 hidden sm:block'></div>
                        <button
                            onClick={() => setBilling('weekly')}
                            className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${billing === 'weekly'
                                ? 'bg-white text-[#0891b2] shadow-sm border border-slate-200'
                                : 'text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            Weekly Savings
                        </button>
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-xl bg-white border border-slate-200 p-10 flex flex-col justify-between hover:border-[#0891b2]/30 transition-all duration-300 group shadow-sm ${plan.popular ? "border-[#0891b2]/20 ring-1 ring-[#0891b2]/10" : ""}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0891b2] text-white text-[10px] font-black px-4 py-1.5 rounded-md uppercase tracking-widest shadow-lg">
                                    Highest Recommended
                                </div>
                            )}

                            <div>
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-8 border border-slate-100 shadow-sm ${plan.color === 'cyan' ? "bg-cyan-50 text-[#0891b2]" :
                                    plan.color === 'indigo' ? "bg-slate-50 text-slate-900" : "bg-slate-50 text-slate-400"
                                    }`}>
                                    {plan.icon}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8">{plan.tagline}</p>

                                <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-slate-100">
                                    <span className="text-4xl font-bold text-slate-900">
                                        ${billing === 'daily' ? plan.price : plan.weeklyPrice}
                                    </span>
                                    <span className="text-slate-400 font-bold text-xs tracking-widest uppercase">/ {billing === 'daily' ? 'day' : 'week'}</span>
                                </div>

                                <ul className="space-y-4 mb-10">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className={`flex items-start gap-3 text-xs font-bold ${feat.included ? "text-slate-600" : "text-slate-300"}`}>
                                            <div className={`mt-0.5 shrink-0 ${feat.included ? "text-[#0891b2]" : "text-slate-200"}`}>
                                                <CheckCircle2 size={14} />
                                            </div>
                                            {feat.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className={`w-full py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95 ${plan.color === 'cyan' ? "bg-[#0891b2] text-white hover:bg-[#0e7490]" :
                                plan.color === 'indigo' ? "bg-slate-900 text-white hover:bg-black" :
                                    "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                                }`}>
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section - Matching Registry Style */}
                <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Ledger</h2>
                            <p className="text-slate-500 font-medium text-sm">Formal responses to security and protection inquiries.</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { q: "When does activated coverage begin?", a: "Instantly upon digital completion of the vehicle handover procedure within the app." },
                                { q: "Are secondary drivers covered?", a: "Yes, provided they meet our verification criteria and are added to the booking profile." },
                                { q: "What is my maximum out-of-pocket?", a: "With Platinum protection, your deductible is zero. Others vary by vehicle class." }
                            ].map((faq, i) => (
                                <details key={i} className="group bg-white rounded-lg border border-slate-200 p-6 overflow-hidden transition-all hover:bg-slate-50/50">
                                    <summary className="list-none flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm">
                                        {faq.q}
                                        <ChevronDown size={14} className="text-slate-400 group-open:rotate-180 transition-transform" />
                                    </summary>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed mt-4 pt-4 border-t border-slate-100">
                                        {faq.a}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-xl p-10 text-white relative overflow-hidden flex flex-col gap-6 border border-slate-800">
                        <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                            <Info size={24} className="text-cyan-400" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold">Official Governance Registry</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                All protection protocols are backed by global underwriters to ensure seamless claims processing and institutional-grade compliance.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                                Global Underwriting
                            </span>
                            <span className="px-3 py-1 bg-white/5 rounded-md border border-white/10 text-[9px] font-bold uppercase tracking-widest text-slate-300">
                                24/7 Response Node
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Insurance

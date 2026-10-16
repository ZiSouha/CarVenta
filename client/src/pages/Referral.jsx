import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Gift, Users, Share2, Copy, Check, Star, ArrowRight, Sparkles, Trophy, Wallet, Zap, UserCheck, Search, ChevronDown, Activity, Globe } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const Referral = () => {
    const { user } = useAppContext()
    const [copied, setCopied] = useState(false)
    const referralCode = user?.name?.split(' ')[0].toUpperCase() + "50" || "CARVENTA50"
    const referralLink = `https://carventa.com/join/${referralCode}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink)
        setCopied(true)
        toast.success("Registry link copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const stats = [
        { label: "Successful Nodes", value: "12", icon: <Users size={18} /> },
        { label: "Pending Credits", value: "$250", icon: <Wallet size={18} /> },
        { label: "Current Registry Rank", value: "Elite Tier", icon: <Trophy size={18} /> }
    ]

    return (
        <div className="pt-24 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Referral Registry</h1>
                        <p className='text-slate-500 text-sm'>Institutional growth protocols and network credit analysis.</p>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                        <div className='flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md'>
                            <Activity size={14} className='text-[#0891b2]' />
                            <span className='text-[10px] font-bold text-slate-900 uppercase tracking-widest'>Network Sync: Active</span>
                        </div>
                        <div className='h-6 w-px bg-slate-200 hidden sm:block'></div>
                        <div className='text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3'>24H Growth: +4.2%</div>
                    </div>
                </div>

                {/* Dashboard / Share Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Share Link - Matching Industrial Filter/Search Look */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-10 rounded-xl border border-slate-200 bg-white shadow-sm space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900">Unique Identity Link</h3>
                                <p className="text-slate-500 text-sm font-medium">Broadcast your signature registry link to initialize network rewards.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch gap-4">
                                <div className="flex-1 flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-200 rounded-lg group focus-within:ring-2 ring-cyan-500/10 focus-within:border-[#0891b2] transition-all">
                                    <Globe size={16} className="text-slate-400" />
                                    <input
                                        readOnly
                                        type="text"
                                        value={referralLink}
                                        className="bg-transparent outline-none text-xs font-bold text-slate-900 w-full"
                                    />
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className={`px-8 py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${copied ? "bg-emerald-500 text-white" : "bg-[#0891b2] text-white hover:bg-[#0e7490] active:scale-95 shadow-lg shadow-[#0891b2]/20"}`}
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? "Link Copied" : "Copy Registry Link"}
                                </button>
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-8 h-8 rounded-full border-2 border-white grayscale-[0.5]" alt="" />
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-900 text-white flex items-center justify-center text-[8px] font-bold">+42</div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">5,000+ Institutional Nodes Active</p>
                            </div>
                        </div>

                        {/* How it Works - Table Style */}
                        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Step</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Requirement</th>
                                        <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Output</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[
                                        { step: "01. Distribution", req: "Share Signature Link", out: "Node Registered" },
                                        { step: "02. Verification", req: "Referral Sign-up", out: "Account Validated" },
                                        { step: "03. Execution", req: "Completed Journey", out: "$50 Credit Issued" }
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-8 py-6 text-xs font-bold text-slate-900">{row.step}</td>
                                            <td className="px-8 py-6 text-xs font-medium text-slate-500">{row.req}</td>
                                            <td className="px-8 py-6">
                                                <span className="px-3 py-1 bg-cyan-50 text-[#0891b2] rounded-md text-[9px] font-bold uppercase tracking-widest border border-cyan-100 italic">
                                                    {row.out}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right: Portfolio Stats - Admin Card Style */}
                    <div className="space-y-6">
                        <div className="p-8 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-10 relative overflow-hidden">
                            <div className="relative z-10 flex items-center justify-between">
                                <h3 className="text-lg font-bold">Incentive Portfolio</h3>
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10 text-cyan-400">
                                    <Activity size={20} />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-8">
                                {stats.map((stat, i) => (
                                    <div key={i} className="space-y-2">
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                                            <div className="text-cyan-400 opacity-50">{stat.icon}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="relative z-10 pt-8 border-t border-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Tier Progress: 65%</span>
                                    <span className="text-[9px] font-bold text-cyan-400">Next Bonus: $500</span>
                                </div>
                                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5 }} className="h-full bg-[#0891b2]" />
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 w-1/2 h-full bg-[#0891b2] opacity-[0.02] -skew-x-12 translate-x-1/2" />
                        </div>

                        <div className="p-8 rounded-xl border border-slate-200 bg-white space-y-4 shadow-sm">
                            <div className="flex items-center gap-3 text-[#0891b2]">
                                <Activity size={18} />
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight">System Notification</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                                Credits are issued as CarVenta Registry Points and retain liquidity for all fleet reservations. Points expire 24 months after issuance.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Referral

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Gavel, ShieldCheck, FileText, AlertTriangle, Scale, ArrowLeft, Download, Search, CheckCircle2, ChevronRight, Bookmark, ScrollText, ShieldAlert, Scale as ScaleIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Terms = () => {
    const navigate = useNavigate()

    const protocols = [
        {
            id: '01',
            title: 'Driver Eligibility',
            tagline: 'Personnel Verification',
            icon: <ShieldCheck size={20} />,
            desc: 'Mandatory status requirements and identity verification standards for all network operators.',
            highlights: ['Age Threshold: 21+', 'Valid Global License', 'Biometric Authentication']
        },
        {
            id: '02',
            title: 'Booking & Payments',
            tagline: 'Fiscal Governance',
            icon: <ScaleIcon size={20} />,
            desc: 'Real-time billing protocols, security deposits, and multi-currency transaction standards.',
            highlights: ['Post-Paid Tolls', 'Insurance Deductibles', 'Instant Confirmation']
        },
        {
            id: '03',
            title: 'Usage Policies',
            tagline: 'Operational Control',
            icon: <FileText size={20} />,
            desc: 'Geographic restrictions, mileage allocations, and prohibited vehicle activities.',
            highlights: ['No-Smoking Mandate', 'Domestic Boundaries', 'Fuel Restoration']
        },
        {
            id: '04',
            title: 'Liability Framework',
            tagline: 'Legal Protection',
            icon: <ShieldAlert size={20} />,
            desc: 'Comprehensive responsibility assignments for damage, theft, and third-party incidents.',
            highlights: ['Asset Protection', 'Indemnity Clauses', 'Incident Reporting']
        }
    ]

    return (
        <div className="pt-24 min-h-screen bg-white pb-32">
            <div className="max-w-7xl mx-auto px-6 space-y-16">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Protocols of Service</h1>
                        <p className='text-slate-500 text-sm'>Institutional governance and legal framework for the CarVenta network.</p>
                    </div>

                    <div className='flex items-center gap-3'>
                        <button className='px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all flex items-center gap-2'>
                            <Download size={14} /> PDF Registry
                        </button>
                        <div className='h-6 w-px bg-slate-200'></div>
                        <div className='text-[10px] font-bold text-[#0891b2] uppercase tracking-[0.2em]'>Version 2026.01</div>
                    </div>
                </div>

                {/* Protocol Grid - Membership Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {protocols.map((protocol, i) => (
                        <motion.div
                            key={protocol.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-xl border border-slate-200 bg-white hover:border-[#0891b2]/30 transition-all duration-300 shadow-sm flex flex-col group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0891b2] mb-8 group-hover:bg-[#0891b2] group-hover:text-white transition-all">
                                {protocol.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{protocol.title}</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{protocol.tagline}</p>

                            <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8 flex-1">
                                {protocol.desc}
                            </p>

                            <ul className="space-y-3 pt-6 border-t border-slate-50">
                                {protocol.highlights.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                                        <div className="w-1 h-1 rounded-full bg-[#0891b2]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Analysis Section */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-cyan-50 text-[#0891b2] rounded-md">
                                <ScrollText size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Legal Narrative Analysis</h3>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md">
                            <Search size={14} className="text-slate-400" />
                            <input type="text" placeholder="Search clauses..." className="bg-transparent outline-none text-[10px] font-bold text-slate-900 placeholder-slate-400 w-32" />
                        </div>
                    </div>

                    <div className="p-10 space-y-12">
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Section 01: Eligibility Verification</h4>
                            <p className="text-sm text-slate-500 font-medium leading-[1.8] max-w-4xl">
                                All operators must undergo a standardized biometric verification protocol. CarVenta reserves the right to terminate access to the network if identity parameters do not match official registry documents. Periodic re-verification may be required for elite fleet access and long-duration occupancy.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center justify-between">
                                    <span>Global License Recognition</span>
                                    <CheckCircle2 size={16} className="text-[#0891b2]" />
                                </div>
                                <div className="p-5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center justify-between">
                                    <span>Insurance Compliance Check</span>
                                    <CheckCircle2 size={16} className="text-[#0891b2]" />
                                </div>
                                <div className="p-5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center justify-between">
                                    <span>Behavioral Analysis Registry</span>
                                    <CheckCircle2 size={16} className="text-[#0891b2]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dispute Resolution Footer */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 p-12 bg-slate-900 rounded-xl text-white border border-slate-800 relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <h3 className="text-2xl font-bold">Governance & Dispute Registry</h3>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
                            All operational conflicts are resolved via institutional arbitration protocols defined in the 2026 Master Policy Framework.
                        </p>
                    </div>
                    <button className="relative z-10 px-8 py-4 bg-white text-slate-900 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all active:scale-95">
                        Contact Ethical Review Board
                    </button>
                    <div className="absolute right-0 top-0 w-1/3 h-full bg-[#0891b2] opacity-[0.03] skew-x-12 translate-x-1/2" />
                </div>

            </div>
        </div>
    )
}

export default Terms

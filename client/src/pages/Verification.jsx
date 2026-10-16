import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ShieldCheck, FileText, Upload, CheckCircle2, AlertCircle, Clock, Smartphone, UserCheck, Lock, ChevronRight, ArrowLeft, Globe, Search, Activity, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Verification = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(1) // 1: Select Type, 2: Upload, 3: Processing
    const [docType, setDocType] = useState('')
    const [loading, setLoading] = useState(false)

    const handleNext = () => {
        if (step === 1 && docType) setStep(2)
        if (step === 2) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                setStep(3)
            }, 3000)
        }
    }

    return (
        <div className="pt-24 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Member Verification</h1>
                        <p className='text-slate-500 text-sm'>Institutional-grade identity authentication protocols.</p>
                    </div>

                    <div className='flex items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all ${step === s ? "bg-white border border-slate-200 shadow-sm" : "opacity-40"}`}>
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${step === s ? "bg-[#0891b2] text-white" : "bg-slate-200 text-slate-500"}`}>
                                    {step > s ? <CheckCircle2 size={12} /> : s}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest ${step === s ? "text-slate-900" : "text-slate-400"}`}>
                                    {s === 1 ? "Protocol" : s === 2 ? "Submission" : "Analysis"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area - Industrial Module */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden relative">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-10 md:p-16 space-y-12"
                                >
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold text-slate-900">Step 01: Identification Selection</h2>
                                        <p className="text-slate-500 font-medium text-sm">Choose the official regulatory document for your identity registry.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {['Driver’s License', 'Passport', 'Residence Permit', 'State ID'].map((type) => (
                                            <button
                                                key={type}
                                                onClick={() => setDocType(type)}
                                                className={`p-8 rounded-xl border text-left transition-all group relative overflow-hidden ${docType === type ? "bg-cyan-50 border-[#0891b2]/30 shadow-inner" : "bg-slate-50 border-slate-100 hover:bg-white hover:border-[#0891b2]/20"}`}
                                            >
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 transition-all border ${docType === type ? "bg-white text-[#0891b2] border-[#0891b2]/10" : "bg-white text-slate-400 border-slate-100 shadow-sm"}`}>
                                                    {type === 'Passport' ? <Globe size={18} /> : <FileText size={18} />}
                                                </div>
                                                <span className={`font-bold text-sm tracking-tight ${docType === type ? "text-slate-900" : "text-slate-600"}`}>{type}</span>
                                                {docType === type && <div className="absolute right-4 top-4 text-[#0891b2]"><CheckCircle2 size={18} /></div>}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        disabled={!docType}
                                        onClick={handleNext}
                                        className="w-full py-5 bg-[#0891b2] text-white rounded-lg font-bold text-[11px] uppercase tracking-widest transition-all disabled:opacity-50 hover:bg-[#0e7490] shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                                    >
                                        Proceed to Protocol Execution
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="p-10 md:p-16 space-y-12"
                                >
                                    <div className="space-y-3">
                                        <h2 className="text-2xl font-bold text-slate-900">Step 02: Document Submission</h2>
                                        <p className="text-slate-500 font-medium text-sm">Upload high-resolution captures of your {docType}.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {['Front Perspective', 'Rear Perspective'].map((side) => (
                                            <div key={side} className="group cursor-pointer aspect-[16/10] rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center gap-4 transition-all hover:border-[#0891b2] hover:bg-cyan-50/30">
                                                <div className="w-12 h-12 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0891b2] shadow-sm transition-all group-hover:scale-110">
                                                    <Upload size={20} />
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-[#0891b2]">{side}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-1/3 py-5 bg-slate-50 text-slate-500 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-slate-100 border border-slate-200"
                                        >
                                            Modify Protocol
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="flex-1 py-5 bg-[#0891b2] text-white rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-[#0e7490] shadow-lg shadow-cyan-500/20 relative overflow-hidden active:scale-[0.98]"
                                        >
                                            {loading && <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-white/20 skew-x-12"></motion.div>}
                                            {loading ? "Transmitting Encrypted Data..." : "Execute Submission"}
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-10 md:p-16 text-center space-y-12"
                                >
                                    <div className="w-20 h-20 bg-cyan-50 border border-cyan-100 text-[#0891b2] rounded-xl flex items-center justify-center mx-auto shadow-inner relative">
                                        <Activity size={32} className="animate-pulse" />
                                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md">
                                            <Shield size={14} className="text-[#0891b2]" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System analysis <br /> implemented.</h2>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-sm mx-auto">
                                            Our security engine is currently validating your identity parameters. This protocol typically concludes within 60 minutes.
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 space-y-4 max-w-md mx-auto">
                                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            <span>Current Process</span>
                                            <span className="text-[#0891b2]">Validating Biometrics</span>
                                        </div>
                                        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: '75%' }}
                                                transition={{ duration: 4 }}
                                                className="h-full bg-[#0891b2]"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate('/')}
                                        className="w-full py-5 bg-slate-900 text-white rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all hover:bg-black active:scale-[0.98]"
                                    >
                                        Return to Dashboard
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Industrial Decorative Skew */}
                        <div className="absolute right-0 top-0 w-1/4 h-full bg-slate-50 skew-x-6 translate-x-1/2 -z-0 opacity-50" />
                    </div>
                </div>

                {/* Technical Pillars */}
                <div className="flex flex-wrap justify-center gap-12 pt-12">
                    {[
                        { icon: <Lock size={16} />, label: "Bank-Level Encryption" },
                        { icon: <ShieldCheck size={16} />, label: "GDPR Compliant Node" },
                        { icon: <UserCheck size={16} />, label: "Institutional ID Vault" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 font-bold text-[10px] text-slate-400 uppercase tracking-[0.2em]">
                            <span className="text-[#0891b2]">{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Verification

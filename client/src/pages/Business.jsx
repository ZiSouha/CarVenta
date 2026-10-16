import React from 'react'
import { motion } from 'motion/react'
import { Building2, Users, Briefcase, ChevronRight, BarChart3, Globe, ShieldCheck, Zap, ArrowRight, Star, ScrollText, MapPin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Business = () => {
    const navigate = useNavigate()

    const features = [
        {
            title: "Centralized Ledger",
            desc: "One consolidated monthly invoice for your entire team. Eliminate individual expense reports and manual reconciliations.",
            icon: <BarChart3 size={20} />,
        },
        {
            title: "Enterprise Oversight",
            desc: "Granular administrative dashboard to add members, set spending caps, and define approved geographic boundaries.",
            icon: <ShieldCheck size={20} />,
        },
        {
            title: "Protocol Priority",
            desc: "Guaranteed access to our executive fleet for last-minute airport transfers or high-stakes client meetings.",
            icon: <Briefcase size={20} />,
        }
    ]

    return (
        <div className="bg-white min-h-screen">

            {/* Hero Section - Industrial Architecture */}
            <section className="relative pt-40 pb-32 overflow-hidden border-b border-slate-100">
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none opacity-40">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-3/5 space-y-10"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-200 shadow-sm">
                                <span className="flex h-2 w-2 rounded-full bg-[#0891b2] animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Enterprise Protocol v2.6</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
                                Infinite Mobility for <br />
                                <span className="text-[#0891b2]">Modern Firms.</span>
                            </h1>

                            <p className="text-slate-500 font-medium text-lg md:text-xl leading-relaxed max-w-2xl">
                                Systematically replace depreciating corporate assets and inefficient ride-shares with the world's most flexible institutional fleet management platform.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <button className="px-10 py-5 bg-[#0891b2] text-white font-bold rounded-lg hover:bg-[#0e7490] transition-all shadow-lg shadow-[#0891b2]/20 flex items-center justify-center gap-2 active:scale-95 text-sm uppercase tracking-widest">
                                    Initialize Corporate Account <ArrowRight size={18} />
                                </button>
                                <button className="px-10 py-5 bg-white border border-slate-200 text-slate-600 font-bold rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                                    Technical Whitepaper
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="w-full lg:w-2/5 relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-100">
                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" className="w-full h-auto grayscale-[0.3]" alt="Corporate Architecture" />
                                <div className="absolute inset-0 bg-[#0891b2]/5"></div>
                                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-xl border border-white/20 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fleet Status</p>
                                        <span className="text-[10px] font-black text-[#0891b2] uppercase tracking-widest">Optimized</span>
                                    </div>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#0891b2] w-3/4" />
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Bento Grid - Industrial Minimal */}
            <section className="py-32 px-6 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20 text-center md:text-left">
                        <div className="max-w-xl space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Infrastructure Capabilities</p>
                            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Built for logistical precision.</h2>
                            <p className="text-slate-500 font-medium">Technical infrastructure designed to manage corporate mobility with absolute visibility and zero operational friction.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0891b2]/30 transition-all group"
                            >
                                <div className="w-12 h-12 bg-cyan-50 text-[#0891b2] rounded-lg flex items-center justify-center mb-8 border border-cyan-100 transition-all group-hover:bg-[#0891b2] group-hover:text-white">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & ROI Section */}
            <section className="py-32 px-6 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
                    <div className="lg:w-1/2 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">Zero Capital Liability. <br /> Total Operational Efficiency.</h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                Traditional corporate fleets are capital-intensive anchors. CarVenta Business enables high-performing firms to scale mobility based on real-time institutional demand.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-12">
                            {[
                                { val: "40%", label: "Capital Reduction", icon: <BarChart3 size={16} /> },
                                { val: "100%", label: "Compliance Rate", icon: <ShieldCheck size={16} /> },
                                { val: "24/7", label: "Registry Access", icon: <Globe size={16} /> },
                                { val: "0.4ms", label: "Dispatch Latency", icon: <Zap size={16} /> }
                            ].map((stat, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center gap-2 text-[#0891b2]">
                                        {stat.icon}
                                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
                                    </div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <button className="flex items-center gap-3 text-xs font-black text-slate-900 hover:text-[#0891b2] transition-colors uppercase tracking-[0.2em] border-b border-slate-200 hover:border-[#0891b2] pb-1">
                                Review Industrial Case Studies <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="lg:w-1/2 w-full">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl border border-slate-200">
                            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074" className="w-full h-full object-cover grayscale-[0.2]" alt="Corporate Strategy" />
                            <div className="absolute inset-0 bg-[#0891b2]/5"></div>
                            {/* ROI Detail Badge */}
                            <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl max-w-[200px] space-y-3">
                                <div className="p-2 bg-cyan-50 rounded-md inline-block">
                                    <ScrollText size={20} className="text-[#0891b2]" />
                                </div>
                                <p className="text-xs font-bold text-slate-900">Quarterly ROI Analysis</p>
                                <p className="text-[10px] text-slate-500 font-medium">94% of enterprise partners report positive fiscal impact within 90 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Business

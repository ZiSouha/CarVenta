import React from 'react'
import { motion } from 'motion/react'
import { TrendingUp, Users, Car, Globe, ShieldCheck, Zap, ArrowRight, Star, BarChart3, Activity, PieChart, LayoutGrid } from 'lucide-react'
import { Link } from 'react-router-dom'

const Analytics = () => {
    const stats = [
        { label: "Active Rentals", value: "1,200+", icon: <Car className="text-blue-500" /> },
        { label: "Verified Members", value: "50k+", icon: <Users className="text-emerald-500" /> },
        { label: "Operational Hubs", value: "50+", icon: <Globe className="text-indigo-500" /> },
        { label: "User Satisfaction", value: "4.9/5", icon: <Star className="text-amber-500" /> }
    ]

    return (
        <div className="pt-24 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6">

                {/* Hero Section */}
                <div className="max-w-4xl mb-24 space-y-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em]">
                        <Activity size={12} className="text-blue-400" /> Operational Transparency
                    </span>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                        Real-time Data. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Absolute Insight.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl">
                        Explore the performance metrics that power CarVenta. We believe in total transparency across our fleet metrics, user growth, and operational efficiency.
                    </p>
                </div>

                {/* Metrics Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-slate-50 rounded-[4rem] p-12 md:p-16 border border-slate-100 flex flex-col justify-between group overflow-hidden relative"
                    >
                        <div className="relative z-10">
                            <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-4 block">Fleet Performance</span>
                            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Rapid Expansion <br /> Global Consistency.</h3>
                            <p className="text-slate-500 font-medium max-w-md mb-12 italic">Our fleet has grown by 40% year-over-year while maintaining a 99.8% safety inspection rating.</p>
                        </div>

                        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="text-slate-400">{stat.icon}</div>
                                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block grayscale opacity-10 group-hover:opacity-20 transition-all duration-1000">
                            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200" className="w-full h-full object-cover" alt="" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-[4rem] p-12 text-white flex flex-col justify-between"
                    >
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="text-3xl font-black leading-tight tracking-tight">Certified <br /> Security.</h3>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                Every transaction and ID verification is handled within our proprietary 'Secure Vault' encrypted architecture.
                            </p>
                        </div>
                        <div className="pt-8 border-t border-white/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Index</span>
                                <span className="text-[10px] font-black text-blue-400">100%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} transition={{ duration: 2 }} className="h-full bg-blue-600" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Secondary Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: "Revenue Velocity", desc: "Corporate accounts now account for 35% of premium bookings.", icon: <TrendingUp size={24} /> },
                        { title: "Electric Protocol", desc: "45% of our 2026 fleet will be fully electric zero-emission vehicles.", icon: <Zap size={24} /> },
                        { title: "Market Archetype", desc: "Operating as the dominant premium provider in major global hubs.", icon: <LayoutGrid size={24} /> },
                        { title: "Logistics Flow", desc: "Average delivery time reduced to 12 minutes for elite members.", icon: <BarChart3 size={24} /> }
                    ].map((feature, i) => (
                        <div key={i} className="p-10 rounded-[3rem] border border-slate-100 hover:border-blue-500/20 hover:shadow-2xl transition-all duration-500 group">
                            <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-black text-slate-900 mb-4">{feature.title}</h4>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Dark CTA */}
                <div className="mt-40 bg-slate-900 rounded-[4rem] p-12 lg:p-24 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/3 h-full hidden lg:block grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000">
                        <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070" className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-blue-600/5 -z-0"></div>

                    <div className="relative z-10 max-w-xl space-y-10">
                        <div className="space-y-4">
                            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Institutional Partners</span>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter">
                                Drive the <br /> <span className="text-blue-500">Infrastructure.</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                Join our institutional network or explore our business integration protocols for large-scale fleet mobility.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/contact" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-center flex items-center justify-center gap-2">
                                Request Full Audit <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Analytics

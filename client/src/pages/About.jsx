import React from 'react'
import { motion } from 'motion/react'
import {
    Users,
    Globe,
    Award,
    Trophy,
    Shield,
    Leaf,
    UserCheck,
    ArrowRight,
    MapPin,
    Target,
    Github,
    Linkedin,
    Mail,
    Sparkles,
    ExternalLink
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const About = () => {
    const stats = [
        { label: "Active Drivers", value: "50k+", icon: <Users size={18} /> },
        { label: "Institutional Hubs", value: "50+", icon: <Globe size={18} /> },
        { label: "Active Fleet", value: "1,200+", icon: <Award size={18} /> },
        { label: "Service Rating", value: "4.9/5", icon: <Trophy size={18} /> }
    ]

    return (
        <div className="bg-white min-h-screen">
            <PageHeader
                title={<span>The Architecture of <br /><span className="text-[#0891b2]">Modern Mobility.</span></span>}
                subtitle="CarVenta was established to eliminate the systemic friction in vehicle logistics. Our mission is to provide an institutional-grade mobility platform where technology and executive service converge."
                breadcrumbs={[{ label: 'About', path: '/about' }]}
            />

            {/* Industrial Stats Section */}
            <section className="py-20 bg-slate-50/50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
                        {stats.map((stat, i) => (
                            <div key={i} className="space-y-4">
                                <div className="text-[#0891b2]">
                                    {stat.icon}
                                </div>
                                <div>
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Values / Protocol Pillars */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-24 items-start">
                        <div className="lg:w-1/3 space-y-8">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-[#0891b2] uppercase tracking-[0.3em]">Our Principles</p>
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">Driven by <br /> Absolute Standards.</h2>
                            </div>
                            <p className="text-slate-500 font-medium leading-relaxed">
                                Our operational code is built on three fundamental pillars that define every interaction within the CarVenta network.
                            </p>
                            <Link to="/cars" className="inline-flex items-center gap-2 text-xs font-black text-slate-900 hover:text-[#0891b2] uppercase tracking-[0.2em] transition-colors pt-4 border-b border-slate-200 hover:border-[#0891b2] pb-1">
                                Review Fleet Capabilities <ArrowRight size={14} />
                            </Link>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                { title: "Technical Transparency", desc: "Institutional clarity across all fee structures and data points. No solicitation, no hidden layers.", icon: <Shield size={20} /> },
                                { title: "Precision Maintenance", desc: "Every vehicle undergoes a standardized 200-point registry check before every deployment.", icon: <UserCheck size={20} /> },
                                { title: "Sustainable Logistics", desc: "Targeting a 0% carbon operation by 2030 through systematic fleet electrification.", icon: <Leaf size={20} /> },
                                { title: "Strategic Expansion", desc: "Operational hubs deployed in over 50 global business centers with 24/7 technical support.", icon: <Globe size={20} /> }
                            ].map((pill, i) => (
                                <div key={i} className="p-10 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0891b2]/30 transition-all">
                                    <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 rounded-lg flex items-center justify-center text-[#0891b2] mb-8">
                                        {pill.icon}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4">{pill.title}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{pill.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Architectural Leadership / Founder Section */}
            <section className="py-24 bg-slate-50/70 border-y border-slate-200/80 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-14 shadow-xl shadow-slate-100 flex flex-col lg:flex-row items-center gap-12">
                        {/* Avatar & Visual */}
                        <div className="relative shrink-0">
                            <div className="w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-gradient-to-tr from-cyan-600 to-[#0891b2] p-1 shadow-xl">
                                <div className="w-full h-full bg-slate-900 rounded-[14px] flex flex-col items-center justify-center text-white p-4 text-center">
                                    <span className="text-3xl md:text-5xl font-black tracking-tight text-white">ZS</span>
                                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mt-1">CarVenta Architect</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                Founder
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-4 text-center lg:text-left">
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-[#0891b2] text-xs font-bold uppercase tracking-wider">
                                    <Sparkles size={13} />
                                    <span>Engineering & Architectural Leadership</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                    Ziane Souhayl
                                </h2>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Founder & Full-Stack Platform Architect
                                </p>
                            </div>

                            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl">
                                CarVenta was conceived, engineered, and deployed end-to-end by <strong className="text-slate-900">Ziane Souhayl</strong>. 
                                Designed as a modern, high-concurrency car rental ecosystem, the platform integrates real-time telemetry, 
                                secure multi-tier authentication, dynamic booking orchestration, and an institutional fleet dashboard.
                            </p>

                            {/* Social & Contact Actions */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                                <a
                                    href="https://github.com/ZiSouha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-[1.02]"
                                >
                                    <Github size={15} />
                                    <span>GitHub Profile</span>
                                    <ExternalLink size={12} className="opacity-70" />
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/ziane-souhayl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 rounded-lg bg-[#0077b5] text-white hover:bg-[#006097] transition-all text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-[1.02]"
                                >
                                    <Linkedin size={15} />
                                    <span>LinkedIn Network</span>
                                    <ExternalLink size={12} className="opacity-70" />
                                </a>

                                <a
                                    href="mailto:zianesouhayl@gmail.com"
                                    className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-[#0891b2] hover:text-[#0891b2] transition-all text-xs font-bold flex items-center gap-2 shadow-sm hover:scale-[1.02]"
                                >
                                    <Mail size={15} className="text-[#ea4335]" />
                                    <span>zianesouhayl@gmail.com</span>
                                </a>

                                <Link
                                    to="/owner"
                                    className="px-4 py-2.5 rounded-lg bg-cyan-50 border border-cyan-200 text-[#0891b2] hover:bg-cyan-100 transition-all text-xs font-bold flex items-center gap-2"
                                >
                                    <span>Platform Terminal</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industrial Imagery Section */}
            <section className="pb-32 px-6 pt-16">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden aspect-[21/9] shadow-2xl border border-slate-200 bg-slate-100">
                        <img
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069"
                            className="w-full h-full object-cover grayscale-[0.4]"
                            alt="Institutional Hub"
                        />
                        <div className="absolute inset-0 bg-[#0891b2]/5" />
                        <div className="absolute bottom-10 left-10 p-8 bg-white/95 backdrop-blur-md rounded-xl border border-white/20 shadow-xl max-w-sm hidden md:block">
                            <p className="text-xs font-bold text-[#0891b2] uppercase tracking-[0.2em] mb-2">Global Operations</p>
                            <p className="text-sm font-bold text-slate-900 leading-relaxed">
                                Headquartered in Silicon Valley with operational logistics centers across London, Dubai, and Singapore.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Registry Section */}
            <section className="py-24 px-6 border-t border-slate-100">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900 rounded-2xl p-12 md:p-20 text-center space-y-10 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[#0891b2]/5 pointer-events-none" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Ready to Initialize?</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
                                Join the institutional car rental network and experience the new standard of vehicle logistics.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 relative z-10">
                            <Link to="/cars" className="px-10 py-4 bg-[#0891b2] text-white font-bold rounded-lg hover:bg-[#0e7490] transition-all shadow-lg shadow-[#0891b2]/20 text-sm uppercase tracking-widest active:scale-95">
                                Initialize Registry
                            </Link>
                            <Link to="/contact" className="px-10 py-4 bg-transparent text-white font-bold rounded-lg hover:bg-white/5 transition-all border border-slate-700 text-sm uppercase tracking-widest">
                                Contact Terminal
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About

import React from 'react'
import { motion } from 'motion/react'
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Globe,
    Instagram,
    Twitter,
    Facebook,
    Send,
    ArrowRight,
    Github,
    Linkedin,
    Sparkles
} from 'lucide-react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import PageHeader from '../components/PageHeader'

const Contact = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <PageHeader
                title={<span>Initialize <br /><span className="text-[#0891b2]">Direct Contact.</span></span>}
                subtitle="Our technical support agents and fleet managers are available via high-priority channels for immediate logistical assistance."
                breadcrumbs={[{ label: 'Contact', path: '/contact' }]}
            />

            {/* Split Contact Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">

                    {/* Left: Contact Info - Industrial Sidebar */}
                    <div className="w-full lg:w-1/3 space-y-12">
                        {/* Direct Architect / Founder Card */}
                        <div className="p-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl space-y-4 border border-slate-700">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider border border-cyan-500/30">
                                    <Sparkles size={11} /> Project Architect & Creator
                                </span>
                            </div>
                            <div>
                                <h4 className="text-xl font-black text-white">Ziane Souhayl</h4>
                                <a 
                                    href="mailto:zianesouhayl@gmail.com" 
                                    className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold block mt-1 transition-colors"
                                >
                                    zianesouhayl@gmail.com
                                </a>
                            </div>
                            <div className="flex gap-2 pt-1">
                                <a
                                    href="https://github.com/ZiSouha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <Github size={14} /> GitHub
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ziane-souhayl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2 px-3 rounded-lg bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                                >
                                    <Linkedin size={14} /> LinkedIn
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                { icon: <Mail size={18} />, label: "Technical Support", val: "ops@carventa.com" },
                                { icon: <Phone size={18} />, label: "Direct Line", val: "+1 (888) 400-OPS" },
                                { icon: <MapPin size={18} />, label: "Global HQ", val: "San Francisco, CA" },
                                { icon: <Clock size={18} />, label: "Availability", val: "24/7 Priority Support" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-8 rounded-lg bg-slate-50 border border-slate-200 group hover:border-[#0891b2]/30 transition-all"
                                >
                                    <div className="text-[#0891b2] mb-6">{item.icon}</div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{item.label}</p>
                                    <p className="text-lg font-bold text-slate-900 leading-tight">{item.val}</p>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="pt-2 space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Connect & Networks</p>
                            <div className="flex flex-wrap gap-3">
                                {/* Creator Socials */}
                                <a
                                    href="https://github.com/ZiSouha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ziane Souhayl on GitHub"
                                    className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all shadow-sm"
                                >
                                    <Github size={16} />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/ziane-souhayl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ziane Souhayl on LinkedIn"
                                    className="w-10 h-10 rounded-lg bg-[#0077b5] text-white flex items-center justify-center hover:bg-[#006097] transition-all shadow-sm"
                                >
                                    <Linkedin size={16} />
                                </a>
                                <a
                                    href="mailto:zianesouhayl@gmail.com"
                                    title="Email Ziane Souhayl"
                                    className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Mail size={16} />
                                </a>

                                {/* Other Social Media -> Take user to Dashboard */}
                                <Link
                                    to="/owner"
                                    title="Platform Dashboard (Instagram)"
                                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0891b2] hover:border-[#0891b2] transition-all"
                                >
                                    <Instagram size={16} />
                                </Link>
                                <Link
                                    to="/owner"
                                    title="Platform Dashboard (Twitter / X)"
                                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0891b2] hover:border-[#0891b2] transition-all"
                                >
                                    <Twitter size={16} />
                                </Link>
                                <Link
                                    to="/owner"
                                    title="Platform Dashboard (Facebook)"
                                    className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#0891b2] hover:border-[#0891b2] transition-all"
                                >
                                    <Facebook size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form - Executive Suite */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-white border border-slate-200 p-10 md:p-16 rounded-xl shadow-xl shadow-slate-200/40 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Service Inquiry Registry</h3>
                                <p className="text-slate-500 font-medium mb-12">Complete the formal request protocol for institutional response within 60 minutes.</p>

                                <form className="space-y-8" onSubmit={(e) => {
                                    e.preventDefault();
                                    toast.success("Registry update confirmed. Case ID: #" + Math.floor(Math.random() * 900000 + 100000));
                                    e.target.reset();
                                }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Formal Name</label>
                                            <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all font-bold text-slate-900 text-sm" placeholder="Johnathan Doe" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Email</label>
                                            <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all font-bold text-slate-900 text-sm" placeholder="j.doe@enterprise.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Registry Subject</label>
                                        <div className="relative">
                                            <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all appearance-none cursor-pointer font-bold text-slate-900 text-sm">
                                                <option>General Operational Inquiry</option>
                                                <option>Fleet Reservation Assistance</option>
                                                <option>Enterprise Account Setup</option>
                                                <option>Logistical Feedback</option>
                                            </select>
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <ArrowRight size={16} className="rotate-90" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical Narrative</label>
                                        <textarea required rows={6} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all font-bold text-slate-900 text-sm resize-none" placeholder="Provide detailed logistical requirements..."></textarea>
                                    </div>
                                    <button type="submit" className="w-full py-5 bg-[#0891b2] text-white font-black rounded-lg shadow-lg shadow-[#0891b2]/20 hover:bg-[#0e7490] transition-all flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] active:scale-[0.98]">
                                        Initialize Transmission <Send size={18} />
                                    </button>
                                </form>
                            </div>
                            {/* Industrial BG Decor */}
                            <div className="absolute right-0 top-0 w-1/4 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-0" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Reach Section */}
            <section className="py-24 px-6 border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-[#0891b2] uppercase tracking-[0.3em]">Network Topology</p>
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">Global Presence. <br /> Institutional Reliability.</h2>
                            </div>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                Our logistics centers are strategically positioned across 50+ global hubs, ensuring priority fleet access regardless of your coordinates.
                            </p>
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-3xl font-black text-slate-900">50+</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Cities</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-black text-slate-900">24/7</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Technical OPS</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden aspect-[16/9] border border-slate-200 shadow-2xl bg-white flex items-center justify-center">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />
                            <div className="relative z-10 flex flex-col items-center text-center p-8">
                                <div className="w-16 h-16 bg-cyan-50 border border-cyan-100 rounded-full flex items-center justify-center text-[#0891b2] mb-6 shadow-sm">
                                    <Globe size={32} />
                                </div>
                                <p className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] mb-2">Live Node Map</p>
                                <p className="text-xs text-slate-400 font-bold mb-6">Access restricted to authorized partners.</p>
                                <button className="px-6 py-3 bg-white border border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-widest rounded-md hover:bg-slate-50 transition-all cursor-not-allowed">
                                    Request Access
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contact

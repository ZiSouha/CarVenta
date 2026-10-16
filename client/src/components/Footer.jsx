import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Linkedin, Globe, Github, Mail, Sparkles } from 'lucide-react'

const Footer = () => {
    return (
        <footer className='bg-white text-gray-600 pt-20 pb-10 border-t border-gray-200'>
            <div className='max-w-7xl mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 border-b border-gray-100 pb-16'>

                    {/* Brand Column (2 cols wide) */}
                    <div className='lg:col-span-2 space-y-6'>
                        <Link to="/" className="inline-block">
                            <img src={assets.logo} alt="logo" className='h-8' />
                        </Link>
                        <p className='text-gray-500 text-sm leading-relaxed max-w-sm'>
                            The modern way to rent. Experience a seamless booking process, premium fleet, and 24/7 support designed for the new era of mobility.
                        </p>

                        {/* Developer & Architect Card */}
                        <div className='p-4 rounded-xl bg-slate-50 border border-slate-200 max-w-sm'>
                            <div className='flex items-center justify-between mb-1.5'>
                                <span className='text-[10px] font-black uppercase tracking-wider text-[#0891b2] flex items-center gap-1'>
                                    <Sparkles size={12} /> Lead Architect & Creator
                                </span>
                                <a
                                    href="mailto:zianesouhayl@gmail.com"
                                    className='text-xs font-semibold text-slate-500 hover:text-[#0891b2] transition-colors flex items-center gap-1'
                                    title="Email Ziane Souhayl"
                                >
                                    <Mail size={13} />
                                </a>
                            </div>
                            <p className='text-sm font-extrabold text-slate-900'>Ziane Souhayl</p>
                            <p className='text-xs text-slate-400 mt-0.5'>zianesouhayl@gmail.com</p>
                        </div>

                        {/* Social Links */}
                        <div className='space-y-2'>
                            <p className='text-[11px] font-bold text-gray-400 uppercase tracking-wider'>Connect With Creator & Platform</p>
                            <div className='flex items-center gap-2.5 pt-1'>
                                {/* Personal GitHub */}
                                <a
                                    href="https://github.com/ZiSouha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ziane Souhayl - GitHub"
                                    className='w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-sm hover:scale-105'
                                >
                                    <Github size={18} />
                                </a>

                                {/* Personal LinkedIn */}
                                <a
                                    href="https://www.linkedin.com/in/ziane-souhayl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Ziane Souhayl - LinkedIn"
                                    className='w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm hover:scale-105'
                                >
                                    <Linkedin size={18} />
                                </a>

                                {/* Personal Gmail */}
                                <a
                                    href="mailto:zianesouhayl@gmail.com"
                                    title="Email Ziane Souhayl"
                                    className='w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-[#ea4335] hover:text-white transition-all shadow-sm hover:scale-105'
                                >
                                    <Mail size={18} />
                                </a>

                                {/* Other Social Media -> Routes to Platform Dashboard */}
                                <Link
                                    to="/owner"
                                    title="Platform Dashboard (Twitter / X)"
                                    className='w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm hover:scale-105'
                                >
                                    <Twitter size={18} />
                                </Link>
                                <Link
                                    to="/owner"
                                    title="Platform Dashboard (Facebook)"
                                    className='w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white transition-all shadow-sm hover:scale-105'
                                >
                                    <Facebook size={18} />
                                </Link>
                                <Link
                                    to="/owner"
                                    title="Platform Dashboard (Instagram)"
                                    className='w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#E4405F] hover:text-white transition-all shadow-sm hover:scale-105'
                                >
                                    <Instagram size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Columns */}
                    <div>
                        <h3 className='text-sm font-bold text-gray-900 tracking-wide mb-6'>Product</h3>
                        <ul className='space-y-4 text-sm text-gray-500'>
                            <li><Link to="/cars" className='hover:text-[var(--color-primary)] transition-colors'>Browse Fleet</Link></li>
                            <li><Link to="/how-it-works" className='hover:text-[var(--color-primary)] transition-colors'>How it Works</Link></li>
                            <li><Link to="/business" className='hover:text-[var(--color-primary)] transition-colors'>Business</Link></li>
                            <li><Link to="/insurance" className='hover:text-[var(--color-primary)] transition-colors'>Insurance & Protection</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-bold text-gray-900 tracking-wide mb-6'>Company</h3>
                        <ul className='space-y-4 text-sm text-gray-500'>
                            <li><Link to="/about" className='hover:text-[var(--color-primary)] transition-colors'>About</Link></li>
                            <li><Link to="/careers" className='hover:text-[var(--color-primary)] transition-colors'>Careers</Link></li>
                            <li><Link to="/press" className='hover:text-[var(--color-primary)] transition-colors'>Press</Link></li>
                            <li><Link to="/contact" className='hover:text-[var(--color-primary)] transition-colors'>Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-bold text-gray-900 tracking-wide mb-6'>Resources</h3>
                        <ul className='space-y-4 text-sm text-gray-500'>
                            <li><Link to="/help" className='hover:text-[var(--color-primary)] transition-colors'>Help Center</Link></li>
                            <li><Link to="/safety" className='hover:text-[var(--color-primary)] transition-colors'>Safety & Security</Link></li>
                            <li><Link to="/guidelines" className='hover:text-[var(--color-primary)] transition-colors'>Community Guidelines</Link></li>
                            <li><Link to="/status" className='hover:text-[var(--color-primary)] transition-colors'>System Status</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-sm font-bold text-gray-900 tracking-wide mb-6'>Legal</h3>
                        <ul className='space-y-4 text-sm text-gray-500'>
                            <li><Link to="/privacy" className='hover:text-[var(--color-primary)] transition-colors'>Privacy Policy</Link></li>
                            <li><Link to="/terms" className='hover:text-[var(--color-primary)] transition-colors'>Terms of Service</Link></li>
                            <li><Link to="/cookies" className='hover:text-[var(--color-primary)] transition-colors'>Cookie Policy</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className='flex flex-col sm:flex-row items-center gap-2 text-xs text-gray-500 text-center sm:text-left'>
                        <span>© {new Date().getFullYear()} CarVenta Inc. All rights reserved.</span>
                        <span className='hidden sm:inline text-gray-300'>•</span>
                        <span>
                            Engineered & Built with excellence by{' '}
                            <a
                                href="https://github.com/ZiSouha"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='font-bold text-gray-900 hover:text-[#0891b2] transition-colors underline decoration-cyan-500/30 underline-offset-4'
                            >
                                Ziane Souhayl
                            </a>
                        </span>
                    </div>
                    <div className='flex items-center gap-6'>
                        <button className='flex items-center gap-2 text-xs text-gray-500 hover:text-gray-900 transition-colors'>
                            <Globe size={16} />
                            <span>English (US)</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

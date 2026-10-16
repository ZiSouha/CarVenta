import React, { useState } from 'react'
import { motion } from 'motion/react'
import { FileText, Search, Download, ExternalLink, Calendar, Shield, CreditCard, Filter, ArrowRight, MoreVertical, Hash, Box } from 'lucide-react'

const Documents = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const docs = [
        { id: 'CV-1001', name: 'Master Rental Agreement', type: 'Agreement', date: '2026-01-15', size: '1.2 MB', category: 'Legal' },
        { id: 'CV-4410', name: 'Booking Confirmation #CV4410', type: 'Receipt', date: '2026-01-18', size: '450 KB', category: 'Financial' },
        { id: 'CV-9921', name: 'Platinum Insurance Certificate', type: 'Insurance', date: '2026-01-18', size: '890 KB', category: 'Protection' },
        { id: 'CV-0412', name: 'Vehicle Damage Report - Porsche 911', type: 'Report', date: '2025-12-10', size: '2.4 MB', category: 'Incident' },
        { id: 'CV-3320', name: 'Annual Membership Certificate', type: 'Certificate', date: '2026-01-01', size: '560 KB', category: 'Member' },
    ]

    const filteredDocs = docs.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="pt-24 min-h-screen bg-white pb-20">
            <div className="max-w-7xl mx-auto px-6 space-y-12">

                {/* Header - Matching Manage Bookings Style */}
                <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200'>
                    <div className='space-y-1'>
                        <h1 className='text-3xl font-bold text-slate-900 tracking-tight'>Document Repository</h1>
                        <p className='text-slate-500 text-sm'>Institutional archival system for legal and financial registries.</p>
                    </div>

                    <div className='flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-1.5 rounded-lg border border-slate-200'>
                        <div className='flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-md focus-within:ring-2 ring-cyan-500/10 focus-within:border-[#0891b2]/50 transition-all'>
                            <Search size={16} className='text-slate-400' />
                            <input
                                type="text"
                                placeholder="Search ID, title..."
                                className='bg-transparent outline-none text-xs font-semibold text-slate-900 placeholder-slate-400 w-40'
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className='h-6 w-px bg-slate-200 hidden sm:block'></div>
                        <button className='px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest'>
                            Export All
                        </button>
                    </div>
                </div>

                {/* Stats Summary - Matching Admin Style */}
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                    {[
                        { label: "Legal Agreements", value: "03", icon: <FileText size={20} />, color: "text-[#0891b2]", bg: "bg-cyan-50" },
                        { label: "Financial Records", value: "12", icon: <CreditCard size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Active Policies", value: "01", icon: <Shield size={20} />, color: "text-indigo-600", bg: "bg-indigo-50" }
                    ].map((stat, i) => (
                        <div key={i} className='p-6 rounded-lg bg-white border border-slate-200 flex items-center justify-between shadow-sm hover:border-[#0891b2]/30 transition-all'>
                            <div>
                                <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1'>{stat.label}</p>
                                <p className='text-2xl font-black text-slate-900'>{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center border border-slate-100 shadow-inner`}>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Table Container - Matching Admin Style */}
                <div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
                    <div className='overflow-x-auto'>
                        <table className='w-full text-left whitespace-nowrap'>
                            <thead>
                                <tr className='bg-slate-50 border-b border-slate-200'>
                                    <th className='px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>Document Entry</th>
                                    <th className='px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell'>Classification</th>
                                    <th className='px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>Modified</th>
                                    <th className='px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right'>System Action</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-100'>
                                {filteredDocs.map((doc, index) => (
                                    <tr key={index} className='hover:bg-slate-50 transition-colors group'>
                                        <td className='px-8 py-6'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0891b2] transition-colors'>
                                                    <FileText size={18} />
                                                </div>
                                                <div>
                                                    <h4 className='font-bold text-slate-900 text-sm group-hover:text-[#0891b2] transition-colors'>{doc.name}</h4>
                                                    <div className='flex items-center gap-2 mt-1'>
                                                        <Hash size={10} className='text-slate-300' />
                                                        <span className='text-[9px] font-bold text-slate-400 uppercase tracking-widest'>{doc.id} • {doc.size} PDF</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-8 py-6 hidden md:table-cell'>
                                            <span className={`px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border ${doc.category === 'Financial' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                                doc.category === 'Legal' ? "bg-cyan-50 text-[#0891b2] border-cyan-100" :
                                                    doc.category === 'Protection' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                                        "bg-slate-50 text-slate-400 border-slate-200"
                                                }`}>
                                                {doc.category}
                                            </span>
                                        </td>
                                        <td className='px-8 py-6'>
                                            <p className='text-xs font-bold text-slate-500'>
                                                {new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </td>
                                        <td className='px-8 py-6'>
                                            <div className='flex justify-end gap-2'>
                                                <button className='w-8 h-8 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0891b2] hover:bg-cyan-50 transition-all'>
                                                    <Download size={14} />
                                                </button>
                                                <button className='w-8 h-8 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all'>
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {filteredDocs.length === 0 && (
                        <div className='flex flex-col items-center justify-center py-20 space-y-4'>
                            <div className='w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300'>
                                <Box size={24} />
                            </div>
                            <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>No documents found in repository</p>
                        </div>
                    )}
                </div>

                {/* Footer Insight */}
                <div className='p-8 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6'>
                    <div className='flex items-center gap-4'>
                        <div className='w-10 h-10 bg-[#0891b2] text-white rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20'>
                            <Shield size={20} />
                        </div>
                        <div>
                            <p className='text-xs font-bold text-slate-900'>Institutional Vault Security</p>
                            <p className='text-[10px] text-slate-400 font-medium'>All documents are encrypted with AES-256 standards and stored within isolated server nodes.</p>
                        </div>
                    </div>
                    <button className='px-6 py-2 bg-white border border-slate-200 text-slate-900 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all'>
                        Review Security Protocol
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Documents

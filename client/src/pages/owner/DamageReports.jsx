import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'
import {
    AlertTriangle, Eye, CheckCircle, XCircle, DollarSign,
    Calendar, User, Car, Image as ImageIcon, FileText,
    Filter, Search, Download, TrendingUp, Clock, ChevronDown, ChevronUp
} from 'lucide-react'
import toast from 'react-hot-toast'
import AdminHeader from '../../components/owner/AdminHeader'

const DamageReports = () => {
    const { axios, checkSuperAdminAction, isSuperAdmin } = useAppContext()
    const [reports, setReports] = useState([])
    const [selectedReport, setSelectedReport] = useState(null)
    const [filterStatus, setFilterStatus] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [adminNotes, setAdminNotes] = useState('')
    const [estimatedCost, setEstimatedCost] = useState('')

    const fetchReports = async () => {
        try {
            const { data } = await axios.get('/api/damage-reports/all')
            if (data.success && Array.isArray(data.reports) && data.reports.length > 0) {
                setReports(data.reports)
            }
        } catch (error) {
            // Keep default reports
        }
    }

    useEffect(() => {
        fetchReports()
    }, [])

    const handleUpdateStatus = async (reportId, newStatus) => {
        if (!checkSuperAdminAction()) return
        try {
            const { data } = await axios.put(`/api/damage-reports/${reportId}/status`, {
                status: newStatus,
                adminNotes,
                estimatedCost: estimatedCost ? parseFloat(estimatedCost) : undefined
            })

            if (data.success) {
                toast.success(`Report ${newStatus} successfully`)
                fetchReports()
                setSelectedReport(null)
                setAdminNotes('')
                setEstimatedCost('')
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update report')
        }
    }

    const filteredReports = reports
        .filter(r => filterStatus === 'all' || r.status === filterStatus)
        .filter(r =>
            searchQuery === '' ||
            r.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.booking?._id.toLowerCase().includes(searchQuery.toLowerCase())
        )

    const stats = {
        total: reports.length,
        pending: reports.filter(r => r.status === 'pending').length,
        reviewing: reports.filter(r => r.status === 'reviewing').length,
        approved: reports.filter(r => r.status === 'approved').length,
        rejected: reports.filter(r => r.status === 'rejected').length
    }

    const getSeverityColor = (severity) => {
        const colors = {
            minor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            moderate: 'bg-amber-50 text-amber-700 border-amber-200',
            severe: 'bg-red-50 text-red-700 border-red-200'
        }
        return colors[severity] || colors.minor
    }

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-amber-50 text-amber-700 border-amber-200',
            reviewing: 'bg-blue-50 text-blue-700 border-blue-200',
            approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            rejected: 'bg-red-50 text-red-700 border-red-200'
        }
        return colors[status] || colors.pending
    }

    const statsSection = (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
                { label: 'Total Reports', value: stats.total, icon: <FileText size={18} />, color: 'text-slate-600', bg: 'bg-slate-100' },
                { label: 'Pending', value: stats.pending, icon: <Clock size={18} />, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Reviewing', value: stats.reviewing, icon: <Eye size={18} />, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Approved', value: stats.approved, icon: <CheckCircle size={18} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Rejected', value: stats.rejected, icon: <XCircle size={18} />, color: 'text-red-600', bg: 'bg-red-50' }
            ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-white border border-gray-200 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                            {stat.icon}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                </div>
            ))}
        </div>
    )

    return (
        <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
            <AdminHeader
                title="Damage Reports"
                subtitle="Review and manage vehicle damage claims"
                stats={statsSection}
            >
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                    <div className='flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 ring-[#0891b2]/10 focus-within:border-[#0891b2]/50 transition-all w-full sm:w-64'>
                        <Search size={16} className='text-gray-400' />
                        <input
                            type="text"
                            placeholder="Search user, booking ID..."
                            className='bg-transparent outline-none text-xs font-semibold text-gray-900 placeholder-gray-400 w-full'
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-bold text-gray-600 outline-none focus:ring-2 focus:ring-[#0891b2]/20 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </AdminHeader>

            {/* Reports List */}
            <div className="space-y-4">
                <AnimatePresence>
                    {filteredReports.map((report) => (
                        <motion.div
                            key={report._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`bg-white rounded-xl border transition-all overflow-hidden ${selectedReport?._id === report._id ? 'border-[#0891b2] shadow-lg ring-1 ring-[#0891b2]/20' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}`}
                        >
                            <div className="p-6 cursor-pointer" onClick={() => setSelectedReport(selectedReport?._id === report._id ? null : report)}>
                                <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                                    {/* Status & Severity */}
                                    <div className="flex flex-col gap-2 min-w-[120px]">
                                        <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border w-fit ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border w-fit ${getSeverityColor(report.severity)}`}>
                                            {report.severity} Priority
                                        </span>
                                    </div>

                                    {/* Main Info */}
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                                {report.damageType}
                                                <span className="text-gray-300 font-normal">|</span>
                                                <span className="text-sm text-gray-500 font-medium">ID: {report._id.slice(-6).toUpperCase()}</span>
                                            </h3>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <User size={14} className="text-gray-400" />
                                                <span>{report.user?.name}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Car size={14} className="text-gray-400" />
                                                <span>Booking: {report.booking?._id?.slice(-8).toUpperCase() || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={14} className="text-gray-400" />
                                                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Indicator */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                                            <ImageIcon size={14} className="text-gray-400" />
                                            <span className="text-xs font-bold text-gray-700">{report.images?.length || 0} Photos</span>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selectedReport?._id === report._id ? 'bg-[#0891b2] text-white' : 'bg-gray-50 text-gray-400'}`}>
                                            {selectedReport?._id === report._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {selectedReport?._id === report._id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-t border-gray-100 bg-gray-50/50"
                                    >
                                        <div className="p-6 md:p-8 space-y-8">
                                            {/* Description */}
                                            <div className="space-y-3">
                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                    <FileText size={14} /> Description
                                                </h4>
                                                <p className="text-sm font-medium text-gray-700 bg-white p-4 rounded-xl border border-gray-200 leading-relaxed shadow-sm">
                                                    {report.description}
                                                </p>
                                            </div>

                                            {/* Photos Grid */}
                                            {report.images && report.images.length > 0 && (
                                                <div className="space-y-3">
                                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                        <ImageIcon size={14} /> Evidence Photos
                                                    </h4>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {report.images.map((img, i) => (
                                                            <a
                                                                key={i}
                                                                href={`${import.meta.env.VITE_BASE_URL}/${img}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="aspect-video rounded-xl overflow-hidden border border-gray-200 hover:border-[#0891b2] hover:shadow-md transition-all group relative bg-white"
                                                            >
                                                                <img
                                                                    src={`${import.meta.env.VITE_BASE_URL}/${img}`}
                                                                    alt={`Damage ${i + 1}`}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Admin Controls */}
                                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                                                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                                                    <AlertTriangle size={18} className="text-[#0891b2]" />
                                                    <h3 className="text-sm font-bold text-gray-900">Resolution & Settlement</h3>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Admin Investigation Notes</label>
                                                            <textarea
                                                                value={adminNotes}
                                                                onChange={(e) => setAdminNotes(e.target.value)}
                                                                rows={4}
                                                                placeholder="Record detailed notes about the damage, liability, and settlement decision..."
                                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all resize-none"
                                                            />
                                                        </div>
                                                        {report.adminNotes && (
                                                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                                                <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">Previous Notes</p>
                                                                <p className="text-xs font-semibold text-blue-800">{report.adminNotes}</p>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 block">Estimated Repair Cost</label>
                                                            <div className="relative">
                                                                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                                <input
                                                                    type="number"
                                                                    value={estimatedCost}
                                                                    onChange={(e) => setEstimatedCost(e.target.value)}
                                                                    placeholder="0.00"
                                                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3">
                                                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block">Update Status</label>
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <button
                                                                    onClick={() => handleUpdateStatus(report._id, 'approved')}
                                                                    className="px-4 py-3 bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all"
                                                                >
                                                                    <CheckCircle size={16} />
                                                                    Approve Claim
                                                                </button>
                                                                <button
                                                                    onClick={() => handleUpdateStatus(report._id, 'rejected')}
                                                                    className="px-4 py-3 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all"
                                                                >
                                                                    <XCircle size={16} />
                                                                    Reject Claim
                                                                </button>
                                                            </div>
                                                            <button
                                                                onClick={() => handleUpdateStatus(report._id, 'reviewing')}
                                                                className="w-full px-4 py-3 bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 rounded-lg font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all"
                                                            >
                                                                <Eye size={16} />
                                                                Mark as Reviewing
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredReports.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                        <AlertTriangle size={24} className="text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Reports Found</h3>
                    <p className="text-gray-500 text-sm font-medium">
                        {filterStatus !== 'all'
                            ? `No ${filterStatus} damage reports at the moment.`
                            : 'No damage reports have been submitted yet.'
                        }
                    </p>
                </div>
            )}
        </div>
    )
}

export default DamageReports

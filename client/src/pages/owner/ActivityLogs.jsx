import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { motion } from 'motion/react'
import { Activity, User, Clock, Shield, Search, FileText, CheckCircle, XCircle, AlertCircle, RefreshCcw } from 'lucide-react'
import toast from 'react-hot-toast'
import AdminHeader from '../../components/owner/AdminHeader'

const ActivityLogs = () => {
    const { axios } = useAppContext()
    const [logs, setLogs] = useState([
        {
            _id: "log_preview_01",
            action: "UPDATE",
            entityType: "SECURITY",
            details: "Super Admin privileges secured for Ziane Souhayl (zianesouhayl@gmail.com)",
            user: { name: "Ziane Souhayl", email: "zianesouhayl@gmail.com" },
            createdAt: new Date().toISOString()
        },
        {
            _id: "log_preview_02",
            action: "CREATE",
            entityType: "FLEET",
            details: "12 Premium showcase fleet models loaded into showroom",
            user: { name: "Ziane Souhayl", email: "zianesouhayl@gmail.com" },
            createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
            _id: "log_preview_03",
            action: "UPDATE",
            entityType: "SYSTEM",
            details: "Visitor preview mode initialized with read-only restriction policy",
            user: { name: "Security Daemon" },
            createdAt: new Date(Date.now() - 7200000).toISOString()
        }
    ])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const fetchLogs = async () => {
        try {
            const { data } = await axios.get('/api/owner/activity-logs')
            if (data.success && Array.isArray(data.logs) && data.logs.length > 0) {
                setLogs(data.logs)
            }
        } catch (error) {
            // Keep preview logs
        }
    }

    useEffect(() => {
        fetchLogs()

        // Handle search query from URL
        const query = new URLSearchParams(window.location.search).get('search')
        if (query) {
            setSearchTerm(query)
        }
    }, [window.location.search])

    const getActionIcon = (action) => {
        switch (action) {
            case 'CREATE': return <CheckCircle size={14} className='text-emerald-500' />
            case 'UPDATE': return <RefreshCcw size={14} className='text-blue-500' />
            case 'DELETE': return <XCircle size={14} className='text-red-500' />
            default: return <AlertCircle size={14} className='text-gray-500' />
        }
    }

    const filteredLogs = logs.filter(log =>
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
            <AdminHeader
                title="Activity Logs"
                subtitle="Track all administrative actions and security events"
            >
                <div className='flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200'>
                    <Search size={18} className='text-gray-400' />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        className='bg-transparent outline-none text-sm w-full md:w-56 text-gray-700 placeholder-gray-400'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </AdminHeader>

            {/* Logs List */}
            <div className='space-y-4'>
                {loading ? (
                    <div className='py-20 flex justify-center'>
                        <div className='w-8 h-8 border-4 border-[#0891b2] border-t-transparent rounded-full animate-spin'></div>
                    </div>
                ) : filteredLogs.length > 0 ? (
                    <div className='bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm'>
                        <table className='w-full text-left'>
                            <thead>
                                <tr className='bg-gray-50 border-b border-gray-200'>
                                    <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Event</th>
                                    <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Admin / Owner</th>
                                    <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Date & Time</th>
                                    <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>IP Address</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-gray-100'>
                                {filteredLogs.map((log, index) => (
                                    <motion.tr
                                        key={log._id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className='hover:bg-gray-50 transition-colors'
                                    >
                                        <td className='px-6 py-4'>
                                            <div className='space-y-1'>
                                                <div className='flex items-center gap-2'>
                                                    {getActionIcon(log.action)}
                                                    <span className='text-xs font-black uppercase tracking-tighter text-slate-400'>{log.action}</span>
                                                    <span className='px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-bold'>{log.entity}</span>
                                                </div>
                                                <p className='text-sm font-semibold text-slate-800'>{log.details}</p>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-8 h-8 rounded-full bg-slate-100 overflow-hidden border border-slate-200'>
                                                    <img
                                                        src={log.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(log.user?.name || log.user?.email || 'User')}&background=0891b2&color=fff&bold=true`}
                                                        alt=""
                                                        className='w-full h-full object-cover'
                                                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(log.user?.name || log.user?.email || 'User')}&background=0891b2&color=fff&bold=true` }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className='text-sm font-bold text-slate-900'>{log.user?.name}</p>
                                                    <p className='text-[10px] text-slate-500 font-medium uppercase'>{log.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-2 text-slate-500'>
                                                <Clock size={14} />
                                                <span className='text-xs font-medium'>{new Date(log.createdAt).toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center gap-2 text-slate-400'>
                                                <Shield size={14} />
                                                <span className='text-xs font-mono font-medium'>{log.ipAddress || 'Unknown'}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className='py-32 text-center space-y-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
                        <div className='w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-gray-300 shadow-sm'>
                            <Activity size={24} />
                        </div>
                        <div>
                            <h3 className='text-lg font-bold text-gray-900'>No activity logs found</h3>
                            <p className='text-sm text-gray-500'>All administrative actions will appear here once recorded.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActivityLogs

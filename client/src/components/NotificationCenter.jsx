import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Bell, X, Check, Trash2, Calendar, Gift, Info, AlertCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const NotificationCenter = ({ isOpen, onClose }) => {
    const { notifications, unreadCount, markAsRead, removeNotification } = useAppContext()

    // Helper to add icons for display
    const displayNotifications = notifications.map(n => ({
        ...n,
        icon: n.type === 'booking' ? <Calendar className="text-blue-600" /> : <Info className="text-slate-600" />
    }))

    return (
        <AnimatePresence>
            {isOpen && (
                <>

                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.98 }}
                        className="fixed top-20 right-8 w-full max-w-sm bg-white rounded-lg shadow-xl shadow-slate-200/50 z-[70] flex flex-col overflow-hidden border border-slate-200"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <h2 className="text-base font-bold text-slate-900">Notifications</h2>
                                {unreadCount > 0 && (
                                    <span className="px-2 py-0.5 bg-[#0891b2] text-white text-[9px] font-bold rounded uppercase tracking-wider">
                                        {unreadCount} New
                                    </span>
                                )}
                            </div>
                            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded transition-all">
                                <X size={18} />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[450px]">
                            {displayNotifications.length > 0 ? (
                                displayNotifications.map((notif) => (
                                    <motion.div
                                        key={notif.id}
                                        layout
                                        className={`p-4 rounded-md border transition-all ${notif.read ? "bg-white border-transparent" : "bg-cyan-50/30 border-cyan-100"
                                            }`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="w-9 h-9 rounded bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                                                {notif.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className="text-xs font-bold text-slate-900 truncate">{notif.title}</h3>
                                                    <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap uppercase tracking-tighter">{notif.time}</span>
                                                </div>
                                                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
                                                    {notif.message}
                                                </p>
                                                <div className="flex items-center gap-3 mt-3">
                                                    {!notif.read && (
                                                        <button
                                                            onClick={() => markAsRead(notif.id)}
                                                            className="text-[10px] font-bold text-[#0891b2] hover:text-[#0e7490] hover:underline uppercase tracking-widest"
                                                        >
                                                            Mark Read
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => removeNotification(notif.id)}
                                                        className="text-[10px] font-bold text-slate-400 hover:text-red-600 uppercase tracking-widest"
                                                    >
                                                        Dismiss
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="py-12 flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                                        <Bell size={24} />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-900">All clear</h3>
                                    <p className="text-xs text-slate-400 font-medium mt-1">
                                        You have no new notifications.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                            <Link
                                to="/my-profile?tab=settings"
                                className="w-full py-3 bg-white border border-slate-200 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all shadow-sm"
                                onClick={onClose}
                            >
                                Notification Settings <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default NotificationCenter

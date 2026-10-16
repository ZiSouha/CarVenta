import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { MapPin, Navigation, Clock, Activity, Phone, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const GPSTracker = ({ bookingId, carDetails }) => {
    const { axios, socket } = useAppContext()
    const [location, setLocation] = useState(null)
    const [isTracking, setIsTracking] = useState(false)
    const [speed, setSpeed] = useState(0)
    const [lastUpdate, setLastUpdate] = useState(null)

    useEffect(() => {
        if (socket && bookingId) {
            // Listen for GPS updates
            socket.on('GPS_UPDATE', (data) => {
                if (data.bookingId === bookingId) {
                    setLocation(data.location)
                    setSpeed(data.speed || 0)
                    setLastUpdate(new Date())
                }
            })

            // Request initial location
            socket.emit('REQUEST_GPS', { bookingId })

            return () => {
                socket.off('GPS_UPDATE')
            }
        }
    }, [socket, bookingId])

    const handleEmergency = () => {
        if (window.confirm('Contact emergency services?')) {
            toast.success('Emergency services have been notified')
            // In production, this would trigger actual emergency protocols
        }
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#0891b2]/10 rounded-lg flex items-center justify-center">
                            <Navigation size={20} className="text-[#0891b2]" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Live GPS Tracking</h3>
                            <p className="text-[10px] text-slate-500 font-medium">Real-time vehicle location</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-lg">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Active</span>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative h-[400px] bg-slate-100">
                {/* Placeholder for actual map integration (Google Maps, Mapbox, etc.) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                            <MapPin size={32} className="text-[#0891b2]" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Map Integration Ready</p>
                            <p className="text-xs text-slate-500 mt-1">Connect Google Maps or Mapbox API</p>
                        </div>
                        {location && (
                            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 inline-block">
                                <p className="text-xs font-bold text-slate-900">
                                    Lat: {location.lat?.toFixed(6)}, Lng: {location.lng?.toFixed(6)}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 border-t border-slate-200">
                <div className="text-center space-y-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto border border-slate-200">
                        <Activity size={16} className="text-[#0891b2]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Speed</p>
                        <p className="text-lg font-black text-slate-900">{speed} <span className="text-xs text-slate-500">km/h</span></p>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto border border-slate-200">
                        <Clock size={16} className="text-[#0891b2]" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Update</p>
                        <p className="text-xs font-bold text-slate-900">
                            {lastUpdate ? lastUpdate.toLocaleTimeString() : 'N/A'}
                        </p>
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mx-auto border border-slate-200">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                        <p className="text-xs font-bold text-emerald-600">On Route</p>
                    </div>
                </div>
            </div>

            {/* Emergency Button */}
            <div className="p-6 border-t border-slate-200">
                <button
                    onClick={handleEmergency}
                    className="w-full py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                >
                    <AlertCircle size={16} />
                    Emergency Assistance
                </button>
            </div>
        </div>
    )
}

export default GPSTracker

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'motion/react'
import {
  Calendar, MapPin, Clock, Car, Activity, ShieldCheck, Box, ExternalLink,
  ChevronDown, Filter, Download, TrendingUp, CheckCircle, XCircle,
  AlertCircle, Navigation2, FileText, Star
} from 'lucide-react'
import { Link } from 'react-router-dom'
import GPSTracker from '../components/GPSTracker'
import DamageReport from '../components/DamageReport'

const MyBookings = () => {
  const { axios, user, socket } = useAppContext()
  const [bookings, setBookings] = useState([])
  const [expandedBooking, setExpandedBooking] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('recent')

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user')
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return
    try {
      const { data } = await axios.post('/api/bookings/cancel', { bookingId })
      if (data.success) {
        toast.success("Booking cancelled successfully")
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    user && fetchMyBookings()

    if (socket) {
      socket.on('BOOKING_STATUS_UPDATED', (updatedBooking) => {
        setBookings(prev => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b))
        toast.success(`Booking ${updatedBooking._id.slice(-6).toUpperCase()} updated: ${updatedBooking.status}`)
      })

      socket.on('BOOKING_CANCELLED', (bookingId) => {
        setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b))
      })
    }

    return () => {
      if (socket) {
        socket.off('BOOKING_STATUS_UPDATED')
        socket.off('BOOKING_CANCELLED')
      }
    }
  }, [user, socket])

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter(b => filterStatus === 'all' || b.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt)
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'price-low') return a.price - b.price
      return 0
    })

  // Calculate stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    pending: bookings.filter(b => b.status === 'pending').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    totalSpent: bookings.reduce((sum, b) => sum + (b.price || 0), 0)
  }

  const getStatusConfig = (status) => {
    const configs = {
      confirmed: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', icon: CheckCircle },
      pending: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', icon: AlertCircle },
      cancelled: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-100', icon: XCircle }
    }
    return configs[status] || configs.pending
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-8">

        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-6'
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className='space-y-3'>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#0891b2] animate-pulse" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Live Dashboard</span>
              </div>
              <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tight'>
                My <span className='text-[#0891b2]'>Bookings</span>
              </h1>
              <p className='text-slate-500 text-base font-medium'>Track and manage all your vehicle reservations</p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Total', value: stats.total, icon: FileText, color: 'slate' },
                { label: 'Active', value: stats.confirmed, icon: CheckCircle, color: 'emerald' },
                { label: 'Pending', value: stats.pending, icon: Clock, color: 'amber' },
                { label: 'Spent', value: `$${stats.totalSpent}`, icon: TrendingUp, color: 'cyan' }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 bg-white rounded-xl border border-${stat.color}-100 shadow-sm hover:shadow-md transition-all`}
                >
                  <div className={`w-8 h-8 rounded-lg bg-${stat.color}-50 flex items-center justify-center mb-2`}>
                    <stat.icon size={16} className={`text-${stat.color}-600`} />
                  </div>
                  <p className={`text-2xl font-black text-${stat.color}-900`}>{stat.value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 flex-1">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
              >
                <option value="all">All Bookings</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1">
              <TrendingUp size={16} className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </motion.div>

        {/* Bookings Grid */}
        <div className='space-y-4'>
          {filteredBookings.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map((booking, index) => {
                const statusConfig = getStatusConfig(booking.status)
                const StatusIcon = statusConfig.icon

                return (
                  <motion.div
                    key={booking._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className='bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#0891b2]/30 transition-all shadow-sm hover:shadow-xl group'
                  >
                    <div className='flex flex-col lg:flex-row'>
                      {/* Car Image */}
                      <div className='lg:w-80 w-full h-64 lg:h-auto bg-gradient-to-br from-slate-100 to-slate-50 relative overflow-hidden'>
                        <div className='absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(8,145,178,0.03)_25%,rgba(8,145,178,0.03)_50%,transparent_50%,transparent_75%,rgba(8,145,178,0.03)_75%)] bg-[length:20px_20px]' />
                        <img
                          src={booking.car.image}
                          alt={`${booking.car.brand} ${booking.car.model}`}
                          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        />

                        {/* Status Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-lg backdrop-blur-sm ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} flex items-center gap-2`}>
                            <StatusIcon size={12} />
                            {booking.status}
                          </span>
                        </div>

                        {/* Price Tag */}
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-slate-200">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                          <p className="text-2xl font-black text-slate-900">${booking.price}</p>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className='flex-1 p-6 lg:p-8 space-y-6'>
                        {/* Header */}
                        <div className='space-y-2'>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className='text-2xl font-black text-slate-900 mb-1'>
                                {booking.car.brand} <span className="text-[#0891b2]">{booking.car.model}</span>
                              </h3>
                              <p className='text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2'>
                                <Box size={12} />
                                {booking.car.category} • ID: {booking._id.slice(-8).toUpperCase()}
                              </p>
                            </div>

                            {booking.car.averageRating && (
                              <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-100">
                                <Star size={14} className="text-amber-500 fill-amber-500" />
                                <span className="text-sm font-black text-amber-900">{booking.car.averageRating}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Info Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                          <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100'>
                            <div className='w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0'>
                              <Calendar size={18} className='text-[#0891b2]' />
                            </div>
                            <div className='min-w-0'>
                              <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5'>Duration</p>
                              <p className='text-xs font-black text-slate-900 truncate'>
                                {new Date(booking.pickupDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.returnDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>

                          <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100'>
                            <div className='w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0'>
                              <MapPin size={18} className='text-[#0891b2]' />
                            </div>
                            <div className='min-w-0'>
                              <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5'>Location</p>
                              <p className='text-xs font-black text-slate-900 truncate'>{booking.car.location}</p>
                            </div>
                          </div>

                          <div className='flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100'>
                            <div className='w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0'>
                              <Clock size={18} className='text-[#0891b2]' />
                            </div>
                            <div className='min-w-0'>
                              <p className='text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5'>Booked On</p>
                              <p className='text-xs font-black text-slate-900 truncate'>
                                {new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap gap-2 pt-4 border-t border-slate-100'>
                          {booking.status === 'confirmed' && (
                            <>
                              <button
                                onClick={() => setExpandedBooking(expandedBooking === booking._id ? null : booking._id)}
                                className='px-4 py-2.5 bg-[#0891b2] text-white hover:bg-[#0e7490] transition-all text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-2 shadow-lg shadow-cyan-500/20'
                              >
                                <Navigation2 size={14} />
                                Track Vehicle
                                <ChevronDown size={14} className={`transition-transform ${expandedBooking === booking._id ? 'rotate-180' : ''}`} />
                              </button>
                              <DamageReport bookingId={booking._id} carDetails={booking.car} />
                            </>
                          )}

                          {booking.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(booking._id)}
                              className='px-4 py-2.5 bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-all text-xs font-bold uppercase tracking-widest rounded-xl'
                            >
                              Cancel Booking
                            </button>
                          )}

                          <Link
                            to={`/car-details/${booking.car._id}`}
                            className='px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all text-xs font-bold uppercase tracking-widest rounded-xl flex items-center gap-2'
                          >
                            View Details
                            <ExternalLink size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Expanded GPS Section */}
                    <AnimatePresence>
                      {expandedBooking === booking._id && booking.status === 'confirmed' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-slate-200 overflow-hidden bg-slate-50"
                        >
                          <div className="p-6">
                            <GPSTracker bookingId={booking._id} carDetails={booking.car} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className='py-20 text-center space-y-6 bg-white rounded-2xl border-2 border-dashed border-slate-200'
            >
              <div className='w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto border border-slate-200 shadow-sm'>
                <Car size={40} className="text-slate-300" />
              </div>
              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-slate-900'>No Bookings Found</h2>
                <p className='text-slate-500 text-sm font-medium max-w-sm mx-auto'>
                  {filterStatus !== 'all'
                    ? `You don't have any ${filterStatus} bookings yet.`
                    : "You haven't made any bookings yet. Start exploring our fleet!"
                  }
                </p>
              </div>
              <Link
                to='/cars'
                className='inline-flex px-8 py-4 bg-[#0891b2] text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#0e7490] transition-all shadow-lg shadow-cyan-500/20 active:scale-95'
              >
                Browse Vehicles
              </Link>
            </motion.div>
          )}
        </div>

        {/* Protection Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='p-6 rounded-2xl bg-gradient-to-r from-[#0891b2]/5 to-cyan-50 border border-[#0891b2]/20 flex flex-col md:flex-row items-center justify-between gap-6'
        >
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-[#0891b2] text-white rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30'>
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className='text-sm font-black text-slate-900'>Protected Bookings</p>
              <p className='text-xs text-slate-600 font-medium mt-0.5'>All reservations include comprehensive insurance coverage</p>
            </div>
          </div>
          <Link
            to="/insurance"
            className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border border-slate-200 shadow-sm"
          >
            Learn More
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

export default MyBookings

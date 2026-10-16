import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Calendar, CreditCard, ChevronDown, CheckCircle, XCircle, Clock, Box, User, Hash, Search } from 'lucide-react'
import { motion } from 'motion/react'
import AdminHeader from '../../components/owner/AdminHeader'

const ManageBookings = () => {
  const { axios, socket, isSuperAdmin, checkSuperAdminAction } = useAppContext()
  const [bookings, setBookings] = useState([
    {
      _id: "bk_demo_01",
      car: { brand: "Porsche", model: "911 GT3 RS", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600" },
      user: { name: "Alexander Vance", email: "a.vance@enterprise.com" },
      pickupDate: new Date().toISOString(),
      returnDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      price: 1440,
      status: "confirmed",
      createdAt: new Date().toISOString()
    }
  ])
  const [filterStatus, setFilterStatus] = useState('all')

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner')
      if (data.success && Array.isArray(data.bookings) && data.bookings.length > 0) {
        setBookings(data.bookings)
      }
    } catch (error) {
      // Keep sample preview
    }
  }

  const changeBookingStatus = async (bookingId, status) => {
    if (!checkSuperAdminAction()) return
    try {
      const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerBookings()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchOwnerBookings()

    // Handle search query from URL
    const query = new URLSearchParams(window.location.search).get('search')
    if (query) {
      setSearchTerm(query)
    }

    if (socket) {
      socket.on('BOOKING_CREATED', (newBooking) => {
        setBookings(prev => [newBooking, ...prev])
        toast.success('New booking received!', { icon: '🔔' })
      })

      socket.on('BOOKING_UPDATED', (updatedBooking) => {
        setBookings(prev => prev.map(b => b._id === updatedBooking._id ? updatedBooking : b))
      })
    }

    return () => {
      if (socket) {
        socket.off('BOOKING_CREATED')
        socket.off('BOOKING_UPDATED')
      }
    }
  }, [socket, window.location.search])

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = b.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b._id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  })

  const statsSection = (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
      {[
        { label: "Pending", value: bookings.filter(b => b.status === 'pending').length, icon: <Clock size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "Confirmed", value: bookings.filter(b => b.status === 'confirmed').length, icon: <CheckCircle size={20} />, color: "text-green-600", bg: "bg-green-50" },
        { label: "Total Revenue", value: `$${bookings.reduce((acc, b) => acc + b.price, 0).toLocaleString()}`, icon: <CreditCard size={20} />, color: "text-blue-600", bg: "bg-blue-50" }
      ].map((stat, i) => (
        <div key={i} className='p-6 rounded-lg bg-white border border-gray-200 flex items-center justify-between'>
          <div>
            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>{stat.label}</p>
            <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
          </div>
          <div className={`w-12 h-12 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
      <AdminHeader
        title="Manage Bookings"
        subtitle="Monitor and manage rental reservations"
        stats={statsSection}
      >
        <div className='flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-1.5 rounded-lg border border-gray-200'>
          <div className='flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-md focus-within:ring-2 ring-[#0891b2]/10 focus-within:border-[#0891b2]/50 transition-all'>
            <Search size={16} className='text-gray-400' />
            <input
              type="text"
              placeholder="Search ID, model..."
              className='bg-transparent outline-none text-xs font-semibold text-gray-900 placeholder-gray-400 w-40'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className='h-6 w-px bg-gray-200 hidden sm:block'></div>
          <div className='flex items-center gap-1'>
            {['all', 'pending', 'confirmed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wide transition-all ${filterStatus === status
                  ? 'bg-cyan-50 text-[#0891b2] shadow-sm border border-cyan-100 font-bold'
                  : 'text-gray-500 hover:text-gray-900'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </AdminHeader>

      {/* Table Container */}
      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left whitespace-nowrap'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide'>Booking Details</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell'>Timeline</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide'>Amount</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredBookings.map((booking, index) => (
                <tr key={index} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-16 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden'>
                        <img src={booking.car.image} alt="" className='w-full h-full object-cover' />
                      </div>
                      <div>
                        <h4 className='font-bold text-gray-900 text-sm'>{booking.car.brand} {booking.car.model}</h4>
                        <div className='flex items-center gap-3 mt-1 text-gray-500'>
                          <div className='flex items-center gap-1.5'>
                            <Hash size={12} />
                            <span className='text-[10px] font-semibold uppercase tracking-wide'>{booking._id.slice(-6).toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 hidden md:table-cell'>
                    <div className='space-y-1'>
                      <div className='flex items-center gap-2 text-gray-900 font-semibold text-xs'>
                        <span className='w-14 text-gray-400'>Pickup:</span>
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </div>
                      <div className='flex items-center gap-2 text-gray-900 font-semibold text-xs'>
                        <span className='w-14 text-gray-400'>Return:</span>
                        {new Date(booking.returnDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-lg font-bold text-gray-900'>${booking.price.toLocaleString()}</p>
                    <p className='text-[10px] font-medium text-gray-400 uppercase tracking-wide'>Total</p>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex justify-end'>
                      {booking.status === 'pending' ? (
                        <div className='relative group/dropdown'>
                          <button className='flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5 hover:border-gray-300 transition-colors'>
                            <span className='text-xs font-bold uppercase tracking-wide text-gray-700 min-w-[60px] text-left'>{booking.status}</span>
                            <ChevronDown size={14} className='text-gray-400' />
                          </button>

                          <div className='absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-20 hidden group-hover/dropdown:block'>
                            {['pending', 'confirmed', 'cancelled'].map((status) => (
                              <button
                                key={status}
                                onClick={() => changeBookingStatus(booking._id, status)}
                                className={`w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wide hover:bg-gray-50 flex items-center justify-between group/item
                                  ${booking.status === status ? 'text-[#0891b2]' : 'text-gray-600'}
                                `}
                              >
                                {status === 'confirmed' ? 'Approve' : status === 'cancelled' ? 'Decline' : status}
                                {booking.status === status && <CheckCircle size={12} />}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wide border ${booking.status === 'confirmed'
                          ? 'bg-green-50 border-green-200 text-green-700'
                          : 'bg-red-50 border-red-200 text-red-600'
                          }`}>
                          {booking.status === 'confirmed' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                          {booking.status}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredBookings.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 space-y-4'>
            <div className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300'>
              <Box size={24} />
            </div>
            <p className='text-sm font-medium text-gray-500'>No bookings in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageBookings

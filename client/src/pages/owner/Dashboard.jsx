import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'
import { Car, ShoppingBag, Clock, CheckCircle, TrendingUp, ChevronRight, ArrowUpRight, ArrowDownRight, Activity, Wallet, ShieldCheck, Database, Globe } from 'lucide-react'
import AdminHeader from '../../components/owner/AdminHeader'

const Dashboard = () => {
  const { axios, isOwner, navigate, socket, isSuperAdmin } = useAppContext()
  const previewData = {
    totalCars: 12,
    totalBookings: 148,
    activeTrips: 8,
    utilization: 84.6,
    totalRevenue: 128450,
    recentBookings: [
      {
        _id: "bk_preview_01",
        car: { brand: "Porsche", model: "911 GT3 RS", image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=600" },
        user: { name: "Alexander Vance", email: "a.vance@enterprise.com" },
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        price: 1440,
        status: "confirmed"
      },
      {
        _id: "bk_preview_02",
        car: { brand: "Ferrari", model: "F8 Tributo", image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=600" },
        user: { name: "Elena Rostova", email: "elena.r@luxurydrive.com" },
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 2).toISOString(),
        price: 1780,
        status: "confirmed"
      },
      {
        _id: "bk_preview_03",
        car: { brand: "Mercedes-AMG", model: "G63", image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=600" },
        user: { name: "Marcus Sterling", email: "m.sterling@capital.io" },
        pickupDate: new Date().toISOString(),
        returnDate: new Date(Date.now() + 86400000 * 5).toISOString(),
        price: 3250,
        status: "pending"
      }
    ],
  }

  const [data, setData] = useState(previewData)

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/owner/dashboard')
      if (data.success && data.dashboardData) {
        setData(data.dashboardData)
      }
    } catch (error) {
      // Keep rich preview data
    }
  }

  useEffect(() => {
    fetchDashboardData()

    if (socket) {
      socket.on('BOOKING_CREATED', () => {
        fetchDashboardData()
        toast.success('New booking received!', {
          icon: '✨',
          style: { background: '#0f172a', color: '#fff', fontSize: '12px', fontWeight: 'bold' }
        })
      })

      socket.on('BOOKING_UPDATED', () => {
        fetchDashboardData()
      })

      socket.on('CAR_ADDED', () => fetchDashboardData())
      socket.on('CAR_UPDATED', () => fetchDashboardData())
      socket.on('CAR_DELETED', () => fetchDashboardData())
    }

    return () => {
      if (socket) {
        socket.off('BOOKING_CREATED')
        socket.off('BOOKING_UPDATED')
        socket.off('CAR_ADDED')
        socket.off('CAR_UPDATED')
        socket.off('CAR_DELETED')
      }
    }
  }, [isOwner, socket])

  const statsCards = [
    { title: "Total Fleet", value: data.totalCars, icon: <Car size={18} />, desc: "Registered Assets" },
    { title: "Network Volume", value: data.totalBookings, icon: <ShoppingBag size={18} />, desc: "Lifetime Protocols" },
    { title: "Active Deployments", value: data.activeTrips, icon: <Clock size={18} />, desc: "Real-time Occupancy" },
    { title: "Node Utilization", value: data.utilization + "%", icon: <CheckCircle size={18} />, desc: "Fleet Optimization" },
  ]

  return (
    <div className='p-8 md:p-12 bg-white flex-1 space-y-12 overflow-y-auto h-screen'>

      <AdminHeader
        title={<span>Control <span className='text-[#0891b2]'>Nexus.</span></span>}
        subtitle="Operational overview of global fleet performance and logistical data."
      >
        <div className='flex items-center gap-6 bg-slate-50 px-6 py-4 rounded-xl border border-slate-200 shadow-sm'>
          <div className='w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0891b2]'>
            <Wallet size={20} />
          </div>
          <div className='space-y-0.5'>
            <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Total Credit Volume</p>
            <p className='text-2xl font-black text-slate-900'>${data.totalRevenue ? data.totalRevenue.toLocaleString() : 0}</p>
          </div>
        </div>
      </AdminHeader>

      {/* Metrics Grid - Industrial Style */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statsCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className='p-8 rounded-xl bg-white border border-slate-200 hover:border-[#0891b2]/30 transition-all shadow-sm flex flex-col justify-between space-y-4 group'
          >
            <div className='flex items-center justify-between'>
              <div className='w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#0891b2] transition-colors'>
                {card.icon}
              </div>
              <Activity size={12} className='text-slate-200' />
            </div>
            <div>
              <h2 className='text-3xl font-black text-slate-900 mb-1'>{card.value}</h2>
              <p className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>{card.title}</p>
            </div>
            <div className='pt-2 border-t border-slate-50'>
              <p className='text-[9px] font-bold text-slate-300 uppercase tracking-tighter'>{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-3 gap-10'>
        {/* Recent Activity Ledger */}
        <div className='xl:col-span-2 space-y-6'>
          <div className='flex items-center justify-between pb-2'>
            <div className='space-y-1'>
              <h2 className='text-lg font-bold text-slate-900'>Recent Protocol Logs</h2>
              <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Latest network transactions</p>
            </div>
            <button onClick={() => navigate('/owner/manage-bookings')} className='px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-[#0891b2] transition-all flex items-center gap-2'>
              Full Ledger <ChevronRight size={14} />
            </button>
          </div>

          <div className='bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm'>
            <div className='divide-y divide-slate-100'>
              {data.recentBookings.length > 0 ? data.recentBookings.map((booking, index) => (
                <div key={index} className='p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group'>
                  <div className='flex items-center gap-5'>
                    <div className='w-20 h-14 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden grayscale-[0.5] group-hover:grayscale-0 transition-all'>
                      <img src={booking.car.image} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='space-y-1.5'>
                      <h4 className='font-bold text-slate-900 text-sm'>{booking.car.brand} {booking.car.model}</h4>
                      <div className='flex items-center gap-4'>
                        <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>NODE ID: {booking._id.slice(-6).toUpperCase()}</span>
                        <div className='w-1 h-1 rounded-full bg-slate-200' />
                        <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>{new Date(booking.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-8'>
                    <div className='text-right hidden sm:block'>
                      <p className='text-sm font-black text-slate-900'>${booking.price}</p>
                      <p className='text-[10px] font-bold text-slate-300 uppercase tracking-widest'>Gross Revenue</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-[0.2em] border shadow-sm ${booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      booking.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-red-50 text-red-600 border-red-100'
                      }`}>
                      {booking.status}
                    </div>
                  </div>
                </div>
              )) : (
                <div className='p-20 text-center flex flex-col items-center gap-4'>
                  <div className='w-16 h-16 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-300'>
                    <Database size={24} />
                  </div>
                  <p className='text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]'>Null Registry Identified</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Analytics Column */}
        <div className='space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-lg font-bold text-slate-900'>System Analysis</h2>

            <div className='p-8 rounded-xl bg-slate-900 border border-slate-800 space-y-8 relative overflow-hidden'>
              <div className='space-y-2 relative z-10'>
                <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Net Proceeds</p>
                <h3 className='text-4xl font-black text-white tracking-tighter'>${data.totalRevenue ? data.totalRevenue.toLocaleString() : 0}</h3>
              </div>

              <div className='space-y-4 relative z-10'>
                <div className='flex items-center justify-between'>
                  <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Performance Index</span>
                  <span className='text-[10px] font-black text-[#0891b2] tracking-widest'>{data.utilization}%</span>
                </div>
                <div className='h-1 bg-white/5 rounded-full overflow-hidden'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data.utilization}%` }}
                    transition={{ duration: 1.5 }}
                    className='h-full bg-[#0891b2]'
                  />
                </div>
              </div>

              <button onClick={() => navigate('/owner/analytics')} className='w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest transition-all relative z-10'>
                Deep Analytics Link
              </button>

              {/* Decoration Skew */}
              <div className="absolute right-0 bottom-0 w-1/3 h-full bg-[#0891b2] opacity-[0.05] skew-x-12 translate-x-1/2 -z-0" />
            </div>
          </div>

          <div className='p-8 rounded-xl border border-slate-200 bg-white space-y-6 shadow-sm'>
            <div className='flex items-center justify-between'>
              <h4 className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Network Health</h4>
              <ShieldCheck size={18} className='text-[#0891b2]' />
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20' />
                <span className='text-xs font-bold text-slate-700 uppercase tracking-tight'>Global Node Status: Stable</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/20' />
                <span className='text-xs font-bold text-slate-700 uppercase tracking-tight'>Data Replication: 100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

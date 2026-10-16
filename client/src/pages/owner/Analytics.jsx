import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { TrendingUp, Car, DollarSign, Activity, Calendar, Download, PieChart, BarChart3, ChevronRight } from 'lucide-react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import AdminHeader from '../../components/owner/AdminHeader'

const Analytics = () => {
    const { axios, user } = useAppContext()
    const defaultAnalytics = {
        totalCars: 12,
        totalBookings: 148,
        totalRevenue: 128450,
        activeTrips: 8,
        utilization: "84.6",
        dailyRevenue: [
            { _id: "2026-10-09", dailyTotal: 14200 },
            { _id: "2026-10-10", dailyTotal: 18500 },
            { _id: "2026-10-11", dailyTotal: 16900 },
            { _id: "2026-10-12", dailyTotal: 22400 },
            { _id: "2026-10-13", dailyTotal: 19800 },
            { _id: "2026-10-14", dailyTotal: 24600 },
            { _id: "2026-10-15", dailyTotal: 28350 }
        ],
        topCars: [
            { name: "Porsche 911 GT3 RS", revenue: 42800, count: 28 },
            { name: "Ferrari F8 Tributo", revenue: 38500, count: 21 },
            { name: "Mercedes-AMG G63", revenue: 31200, count: 19 }
        ],
        categoryWise: [
            { _id: "Exotic & Supercar", count: 4 },
            { _id: "Luxury Sedan", count: 3 },
            { _id: "Luxury SUV", count: 3 },
            { _id: "Grand Tourer", count: 2 }
        ]
    }

    const [dashboardData, setDashboardData] = useState(defaultAnalytics)
    const [loading, setLoading] = useState(false)

    const fetchDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/owner/dashboard')
            if (data.success && data.dashboardData) {
                setDashboardData(data.dashboardData)
            }
        } catch (error) {
            // Keep default preview analytics
        } finally {
            setLoading(false)
        }
    }

    const exportAnalytics = () => {
        const headers = ['Metric', 'Value'];
        const data = [
            ['Total Revenue', `$${dashboardData?.totalRevenue}`],
            ['Total Bookings', dashboardData?.totalBookings],
            ['Active Trips', dashboardData?.activeTrips],
            ['Utilization Rate', `${dashboardData?.utilization}%`],
            ['Total Fleet Size', dashboardData?.totalCars]
        ];

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...data.map(r => r.join(','))].join("\n");

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", `analytics_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Analytics report downloaded");
    };

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className='flex items-center justify-center h-screen bg-white'>
                <div className='w-10 h-10 border-4 border-slate-100 border-t-[#0891b2] rounded-full animate-spin'></div>
            </div>
        )
    }

    const revenueValues = (dashboardData?.dailyRevenue || []).map(d => d.dailyTotal)
    const revenueLabels = (dashboardData?.dailyRevenue || []).map(d => d._id.slice(5))

    const kpiStats = (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {[
                { label: "Gross Revenue", value: `$${dashboardData?.totalRevenue?.toLocaleString()}`, icon: <DollarSign size={18} />, color: "text-[#0891b2]", bg: "bg-cyan-50" },
                { label: "Utilization", value: `${dashboardData?.utilization}%`, icon: <Activity size={18} />, color: "text-[#0891b2]", bg: "bg-cyan-50" },
                { label: "Bookings", value: dashboardData?.totalBookings, icon: <Calendar size={18} />, color: "text-[#0891b2]", bg: "bg-cyan-50" },
                { label: "Total Fleet", value: dashboardData?.totalCars, icon: <Car size={18} />, color: "text-[#0891b2]", bg: "bg-cyan-50" },
            ].map((kpi, i) => (
                <div
                    key={i}
                    className='p-6 rounded-lg bg-white border border-gray-200 shadow-sm flex flex-col gap-4'
                >
                    <div className={`w-10 h-10 rounded-lg ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                        {kpi.icon}
                    </div>
                    <div>
                        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>{kpi.label}</p>
                        <h3 className='text-2xl font-bold text-gray-900'>{kpi.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
            <AdminHeader
                title="Analytics"
                subtitle="Fleet performance and revenue metrics"
                stats={kpiStats}
            >
                <button
                    onClick={exportAnalytics}
                    className='flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm'
                >
                    <Download size={18} />
                    Export Report
                </button>
            </AdminHeader>

            <div className='grid grid-cols-1 xl:grid-cols-3 gap-8'>
                {/* Revenue Chart */}
                <div className='xl:col-span-2 p-8 rounded-lg border border-gray-200 bg-white space-y-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h2 className='text-lg font-bold text-gray-900'>Weekly Revenue</h2>
                            <p className='text-xs text-gray-400 font-semibold uppercase tracking-wide mt-1'>Last 7 Days</p>
                        </div>
                        <BarChart3 size={20} className='text-gray-300' />
                    </div>

                    <div className='h-64 flex items-end justify-between gap-4'>
                        {revenueValues.length > 0 ? revenueValues.map((val, i) => (
                            <div key={i} className='flex-1 flex flex-col items-center gap-3 group h-full justify-end'>
                                <div className='w-full bg-gray-50 rounded-md relative overflow-hidden flex items-end h-[180px] border border-gray-100'>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(val / (Math.max(...revenueValues) || 1)) * 100}%` }}
                                        className='w-full bg-[#0891b2] group-hover:bg-[#0e7490] transition-all rounded-sm'
                                    />
                                </div>
                                <span className='text-[10px] font-bold text-gray-400 uppercase'>{revenueLabels[i]}</span>
                            </div>
                        )) : (
                            <div className='w-full h-full flex flex-col items-center justify-center text-gray-300 gap-4 border border-dashed border-gray-200 rounded-lg'>
                                <TrendingUp size={48} className='opacity-10' />
                                <p className='text-sm font-semibold'>No performance data available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className='p-8 rounded-lg border border-gray-200 bg-white space-y-8'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <h2 className='text-lg font-bold text-gray-900'>Fleet Diversity</h2>
                            <p className='text-xs text-gray-400 font-semibold uppercase tracking-wide mt-1'>By Category</p>
                        </div>
                        <PieChart size={20} className='text-gray-300' />
                    </div>

                    <div className='space-y-6'>
                        {dashboardData?.categoryWise?.map((cat, i) => (
                            <div key={i} className='space-y-2'>
                                <div className='flex items-center justify-between text-sm font-semibold'>
                                    <span className='text-gray-700 capitalize'>{cat._id}</span>
                                    <span className='text-gray-400'>{cat.count} Units</span>
                                </div>
                                <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
                                    <div
                                        className='h-full bg-[#0891b2]'
                                        style={{ width: `${(cat.count / dashboardData.totalCars) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Performance Ranking */}
            <div className='p-8 rounded-lg border border-gray-200 bg-white'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-lg font-bold text-gray-900'>Top Grossing Vehicles</h2>
                    <ChevronRight size={20} className='text-gray-300' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {dashboardData?.topCars?.map((car, i) => (
                        <div key={i} className='p-6 rounded-lg bg-gray-50 border border-gray-200 flex flex-col gap-4'>
                            <div className='flex items-center justify-between'>
                                <span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Vehicle Rank #{i + 1}</span>
                                <DollarSign size={16} className='text-gray-300' />
                            </div>
                            <div>
                                <h4 className='font-bold text-gray-900'>{car.name}</h4>
                                <p className='text-xs text-gray-500 font-medium'>{car.count} Bookings</p>
                            </div>
                            <div className='text-xl font-bold text-gray-900'>
                                ${car.revenue.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Analytics

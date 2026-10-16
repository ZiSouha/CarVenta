import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Trash2, Search, ExternalLink, CheckSquare, Square, Download, MoreHorizontal } from 'lucide-react'
import AdminHeader from '../../components/owner/AdminHeader'
import { dummyCars } from '../../assets/carsData'

const ManageCars = () => {
  const { isOwner, axios, socket, isSuperAdmin, checkSuperAdminAction } = useAppContext()
  const [cars, setCars] = useState(dummyCars)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success && Array.isArray(data.cars) && data.cars.length > 0) {
        setCars(data.cars)
      } else {
        setCars(dummyCars)
      }
    } catch (error) {
      setCars(dummyCars)
    }
  }

  const toggleAvailability = async (carId) => {
    if (!checkSuperAdminAction()) return
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const deleteCar = async (carId) => {
    if (!checkSuperAdminAction()) return
    try {
      const confirm = window.confirm('Are you sure you want to delete this car?')
      if (!confirm) return null
      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleBulkDelete = async () => {
    if (!checkSuperAdminAction()) return
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.length} cars?`)) return;
    try {
      const { data } = await axios.post('/api/owner/bulk-delete', { carIds: selectedIds });
      if (data.success) {
        toast.success(data.message);
        setSelectedIds([]);
        fetchOwnerCars();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleBulkAvailability = async (status) => {
    if (!checkSuperAdminAction()) return
    try {
      const { data } = await axios.post('/api/owner/bulk-availability', { carIds: selectedIds, status });
      if (data.success) {
        toast.success(data.message);
        setSelectedIds([]);
        fetchOwnerCars();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const exportToCSV = () => {
    const headers = ['Brand', 'Model', 'Year', 'Category', 'Price/Day', 'Location', 'Status'];
    const rows = cars.map(car => [
      car.brand,
      car.model,
      car.year,
      car.category,
      car.pricePerDay,
      car.location,
      car.isAvaliable ? 'Available' : 'Unavailable'
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(r => r.join(','))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `fleet_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Report downloaded");
  };

  useEffect(() => {
    fetchOwnerCars()

    // Handle search query from URL
    const query = new URLSearchParams(window.location.search).get('search')
    if (query) {
      setSearchTerm(query)
    }

    if (socket) {
      socket.on('CAR_ADDED', (newCar) => {
        setCars(prev => [...prev, newCar])
      })

      socket.on('CAR_UPDATED', (updatedCar) => {
        setCars(prev => prev.map(car => car._id === updatedCar._id ? updatedCar : car))
      })

      socket.on('CAR_DELETED', (carId) => {
        setCars(prev => prev.filter(car => car._id !== carId))
      })

      socket.on('BULK_CARS_DELETED', (carIds) => {
        setCars(prev => prev.filter(car => !carIds.includes(car._id)))
      })
    }

    return () => {
      if (socket) {
        socket.off('CAR_ADDED')
        socket.off('CAR_UPDATED')
        socket.off('CAR_DELETED')
        socket.off('BULK_CARS_DELETED')
      }
    }
  }, [isOwner, socket, window.location.search])

  const filteredCars = cars.filter(car =>
    car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const summaryStats = (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      <div className='p-6 rounded-lg bg-gray-50 border border-gray-200'>
        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Total Vehicles</p>
        <p className='text-2xl font-bold text-gray-900'>{cars.length}</p>
      </div>
      <div className='p-6 rounded-lg bg-gray-50 border border-gray-200'>
        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Available</p>
        <p className='text-2xl font-bold text-gray-900'>{cars.filter(c => c.isAvaliable).length}</p>
      </div>
      <div className='p-6 rounded-lg bg-gray-50 border border-gray-200'>
        <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Unavailable</p>
        <p className='text-2xl font-bold text-gray-900'>{cars.filter(c => !c.isAvaliable).length}</p>
      </div>
    </div>
  )

  return (
    <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen relative'>
      <AdminHeader
        title="Manage Cars"
        subtitle="View and manage your vehicle inventory"
        stats={summaryStats}
      >
        <div className='flex items-center gap-3'>
          <button
            onClick={exportToCSV}
            className='flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors'
          >
            <Download size={18} />
            Export CSV
          </button>
          <div className='flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-lg border border-gray-200'>
            <Search size={18} className='text-gray-400' />
            <input
              type="text"
              placeholder="Search vehicles..."
              className='bg-transparent outline-none text-sm w-full md:w-56 text-gray-700 placeholder-gray-400'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </AdminHeader>

      {/* Bulk Actions Toolbar */}
      {selectedIds.length > 0 && (
        <div className='sticky top-0 z-20 bg-[#0891b2] text-white px-6 py-4 rounded-xl shadow-lg flex items-center justify-between mb-8 animate-in slide-in-from-top duration-300'>
          <div className='flex items-center gap-4'>
            <span className='font-bold'>{selectedIds.length} Selected</span>
            <div className='h-4 w-px bg-white/20'></div>
            <button
              onClick={() => handleBulkAvailability(true)}
              className='text-sm font-semibold hover:underline flex items-center gap-2'
            >
              <Eye size={16} /> Make Available
            </button>
            <button
              onClick={() => handleBulkAvailability(false)}
              className='text-sm font-semibold hover:underline flex items-center gap-2'
            >
              <EyeOff size={16} /> Make Unavailable
            </button>
          </div>
          <button
            onClick={handleBulkDelete}
            className='px-4 py-2 bg-white text-red-600 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-50 transition-colors'
          >
            <Trash2 size={16} /> Delete All
          </button>
        </div>
      )}

      {/* Table */}
      <div className='bg-white rounded-lg border border-gray-200 overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-left whitespace-nowrap'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-200'>
                <th className='px-6 py-4 w-10'>
                  <button
                    onClick={() => setSelectedIds(selectedIds.length === filteredCars.length ? [] : filteredCars.map(c => c._id))}
                    className='text-gray-400 focus:outline-none'
                  >
                    {selectedIds.length === filteredCars.length ? <CheckSquare size={20} className='text-[#0891b2]' /> : <Square size={20} />}
                  </button>
                </th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide'>Vehicle</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell'>Location</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide'>Price/Day</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell'>Status</th>
                <th className='px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide text-right'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {filteredCars.map((car) => (
                <tr key={car._id} className={`hover:bg-gray-50 transition-colors ${selectedIds.includes(car._id) ? 'bg-cyan-50/50' : ''}`}>
                  <td className='px-6 py-4'>
                    <button
                      onClick={() => toggleSelect(car._id)}
                      className='text-gray-400 focus:outline-none'
                    >
                      {selectedIds.includes(car._id) ? <CheckSquare size={20} className='text-[#0891b2]' /> : <Square size={20} />}
                    </button>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-4'>
                      <div className='w-20 h-14 rounded-lg overflow-hidden border border-gray-200'>
                        <img src={car.image} alt="" className='w-full h-full object-cover' />
                      </div>
                      <div>
                        <h4 className='font-bold text-gray-900 text-sm'>{car.brand} {car.model}</h4>
                        <p className='text-xs text-gray-500 mt-0.5'>{car.transmission} • {car.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4 hidden md:table-cell'>
                    <p className='text-sm font-medium text-gray-900'>{car.location}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='font-bold text-gray-900'>${car.pricePerDay}</p>
                  </td>
                  <td className='px-6 py-4 hidden lg:table-cell'>
                    <button
                      onClick={() => toggleAvailability(car._id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${car.isAvaliable
                        ? 'bg-green-50 border-green-200 text-green-700'
                        : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${car.isAvaliable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      {car.isAvaliable ? "Available" : "Unavailable"}
                    </button>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center justify-end gap-2'>
                      <button
                        onClick={() => toggleAvailability(car._id)}
                        className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
                        title={car.isAvaliable ? "Mark Unavailable" : "Mark Available"}
                      >
                        {car.isAvaliable ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => deleteCar(car._id)}
                        className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <Link
                        to={`/car-details/${car._id}`}
                        className='p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-blue-50 rounded-lg transition-colors'
                        title="View Details"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCars.length === 0 && (
          <div className='flex flex-col items-center justify-center py-20 space-y-4 text-center'>
            <div className='w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300'>
              <Search size={24} />
            </div>
            <div>
              <h3 className='text-lg font-bold text-gray-900'>No vehicles found</h3>
              <p className='text-sm text-gray-500 mt-1'>Try adjusting your search or add a new vehicle</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageCars

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import CarCard from '../components/CarCard'
import { Search, Filter, Box, X, ChevronDown, ListFilter, MapPin, Calendar, Clock, Sparkles, SlidersHorizontal, DollarSign, Fuel, Zap, Activity } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const Cars = () => {
  const { cars } = useAppContext()
  const [searchParams] = useSearchParams()
  const [filteredCars, setFilteredCars] = useState([])
  const [category, setCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Advanced Filters
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [transmission, setTransmission] = useState('All')
  const [fuelType, setFuelType] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => {
    const query = searchParams.get('search')
    if (query) {
      setSearchTerm(query)
    }
  }, [searchParams])

  useEffect(() => {
    let result = [...cars]

    // Category filter
    if (category !== 'All') {
      result = result.filter(car => car.category === category)
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price range filter
    result = result.filter(car =>
      car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1]
    )

    // Transmission filter
    if (transmission !== 'All') {
      result = result.filter(car => car.transmission === transmission)
    }

    // Fuel type filter
    if (fuelType !== 'All') {
      result = result.filter(car => (car.fuel_type === fuelType || car.fuelType === fuelType))
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.pricePerDay - b.pricePerDay)
        break
      case 'price-high':
        result.sort((a, b) => b.pricePerDay - a.pricePerDay)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        break
    }

    setFilteredCars(result)
  }, [cars, category, searchTerm, priceRange, transmission, fuelType, sortBy])

  const categories = ['All', 'Sedan', 'SUV', 'Van', 'Sports']
  const transmissions = ['All', 'Automatic', 'Manual']
  const fuelTypes = ['All', 'Petrol', 'Diesel', 'Electric', 'Hybrid']

  const clearAllFilters = () => {
    setCategory('All')
    setSearchTerm('')
    setPriceRange([0, 1000])
    setTransmission('All')
    setFuelType('All')
    setSortBy('featured')
  }

  const hasActiveFilters = category !== 'All' || searchTerm || priceRange[0] > 0 || priceRange[1] < 1000 || transmission !== 'All' || fuelType !== 'All'

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        title={<span>Fleet <span className='text-[#0891b2]'>Registry.</span></span>}
        subtitle="Formal index of institutional-grade mobility assets maintained to absolute standards."
        breadcrumbs={[{ label: 'Cars', path: '/cars' }]}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">

        {/* Search & Filter Toolbar */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200'>
          <div className='flex items-center gap-2 w-full md:w-auto px-4 py-2 bg-white border border-slate-200 rounded-lg focus-within:ring-2 ring-cyan-500/10 focus-within:border-[#0891b2]/50 transition-all'>
            <Search size={16} className='text-slate-400' />
            <input
              type="text"
              placeholder="Search Brand, Model, Location..."
              className='bg-transparent outline-none text-sm font-medium text-slate-900 placeholder-slate-400 w-full md:w-64'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wide transition-all w-full md:w-auto justify-center ${isFilterOpen
              ? 'bg-slate-900 text-white shadow-lg'
              : 'text-slate-600 bg-white border border-slate-200 hover:border-slate-300'}`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {hasActiveFilters && <span className='w-2 h-2 rounded-full bg-[#0891b2] animate-pulse'></span>}
          </button>
        </div>

        {/* Expandable Advanced Filters - High Utility Style */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className='overflow-hidden bg-slate-50 rounded-xl border border-slate-200 p-8 shadow-inner space-y-10'
            >
              <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {/* Type Filter */}
                <div className='space-y-4'>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Box size={14} /> Category Classification
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${category === cat ? 'bg-[#0891b2] text-white border-[#0891b2]' : 'bg-white text-slate-500 border-slate-200 hover:border-[#0891b2]/50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Logic */}
                <div className='space-y-4'>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <DollarSign size={14} /> Fiscal Parameters
                  </p>
                  <div className='space-y-4'>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className='w-full accent-[#0891b2]'
                    />
                    <div className='flex items-center justify-between text-[11px] font-bold text-slate-900'>
                      <span>MIN: $0</span>
                      <span className="px-3 py-1 bg-white border border-slate-200 rounded-md">CAP: ${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Specs */}
                <div className='space-y-6'>
                  <div className='space-y-2'>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transmission Protocol</p>
                    <div className='flex gap-2'>
                      {transmissions.map((trans) => (
                        <button key={trans} onClick={() => setTransmission(trans)} className={`px-3 py-1.5 rounded-md text-[10px] font-bold border transition-all ${transmission === trans ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                          {trans}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Energy Source</p>
                    <div className='flex flex-wrap gap-2'>
                      {fuelTypes.map((fuel) => (
                        <button key={fuel} onClick={() => setFuelType(fuel)} className={`px-3 py-1.5 rounded-md text-[10px] font-bold border transition-all ${fuelType === fuel ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}>
                          {fuel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sub-Header Actions */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6'>
          <div className='flex items-center gap-4'>
            <p className='text-[11px] font-bold text-slate-400 uppercase tracking-widest'>
              Analysis: <span className='text-slate-900'>{filteredCars.length}</span> Objects Identified
            </p>
            {hasActiveFilters && (
              <button onClick={clearAllFilters} className='text-[10px] font-bold text-[#0891b2] uppercase tracking-widest hover:underline'>
                Purge All Filters
              </button>
            )}
          </div>

          <div className='flex items-center gap-3'>
            <span className='text-[10px] font-black text-slate-400 uppercase tracking-widest'>Sort Protocol:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='bg-white border border-slate-200 rounded-lg px-4 py-2 text-xs font-bold text-slate-900 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all cursor-pointer'
            >
              <option value="featured">Featured Status</option>
              <option value="price-low">Economic Ascending</option>
              <option value="price-high">Economic Descending</option>
              <option value="newest">Registry Age: Newest</option>
            </select>
          </div>
        </div>

        {/* Car Grid - Clean Layout */}
        {filteredCars.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
            {filteredCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-32 space-y-6 bg-slate-50 rounded-xl border border-slate-200 border-dashed'>
            <div className='w-16 h-16 bg-white rounded-lg flex items-center justify-center text-slate-300 shadow-sm'>
              <Search size={32} />
            </div>
            <div className='text-center space-y-2'>
              <h2 className='text-lg font-bold text-slate-900 uppercase tracking-tight'>Null Result Registry</h2>
              <p className='text-slate-500 text-sm font-medium'>No mobility assets match the current filtered parameters.</p>
              <button onClick={clearAllFilters} className='mt-4 px-6 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-[#0891b2] hover:bg-slate-50 transition-all'>
                Reset All Parameters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cars

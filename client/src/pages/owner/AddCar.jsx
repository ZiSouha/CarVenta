import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { Upload, Plus, CheckCircle, Info, DollarSign, Calendar, MapPin, Users, Settings, Fuel, Car, X, Image as ImageIcon, Gauge, Zap, DoorOpen, Palette, CreditCard, Hash, Check, Shield, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import AdminHeader from '../../components/owner/AdminHeader'

const FEATURES_LIST = [
  "Sunroof", "Leather Seats", "Bluetooth", "Backup Camera", "Heated Seats",
  "Navigation System", "Cruise Control", "Apple CarPlay", "Android Auto",
  "Premium Audio", "Parking Sensors", "Adaptive Cruise", "Blind Spot Monitor",
  "Third Row Seating", "Keyless Entry", "Remote Start", "LED Headlights"
]

const CustomSelect = ({ label, icon: Icon, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='space-y-2 relative'>
      <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>{label}</label>
      <div
        className='relative'
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        {Icon && <Icon size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />}
        <button
          type="button"
          className={`w-full bg-gray-50 border ${isOpen ? 'border-[#0891b2] ring-2 ring-[#0891b2]/10' : 'border-gray-200'} rounded-lg ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 text-left font-medium outline-none transition-all flex items-center justify-between group`}
        >
          <span className={value ? 'text-gray-900' : 'text-gray-400'}>
            {value || placeholder}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className='text-gray-400' />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.1 }}
              className='absolute top-full left-0 w-full mt-2 bg-white border border-gray-100 rounded-lg shadow-xl max-h-60 overflow-y-auto z-50 py-1'
            >
              {options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { onChange(opt); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-between ${value === opt ? 'text-[#0891b2] bg-blue-50/50' : 'text-gray-700'}`}
                >
                  {opt}
                  {value === opt && <Check size={14} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const AddCar = () => {
  const { axios, checkSuperAdminAction, isSuperAdmin } = useAppContext()
  const [mainImage, setMainImage] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 2025,
    pricePerDay: 100,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 4,
    location: '',
    description: '',
    // Advanced Details
    engine_size: '',
    horsepower: '',
    doors: 4,
    drive_type: '',
    color_exterior: '',
    color_interior: '',
    mileage: '',
    features: [],
    license_plate: '',
    vin: '',
    insurance_policy: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + galleryImages.length > 10) {
      return toast.error("You can upload a maximum of 10 gallery photos.")
    }
    setGalleryImages([...galleryImages, ...files])
  }

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index))
  }

  const toggleFeature = (feature) => {
    setCar(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault()
    if (!checkSuperAdminAction()) return
    if (!mainImage) return toast.error("Please upload a main vehicle photo.")
    if (isLoading) return null
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', mainImage)
      galleryImages.forEach(file => {
        formData.append('gallery', file)
      })
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('/api/owner/add-car', formData)

      if (data.success) {
        toast.success(data.message)
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setMainImage(null)
        setGalleryImages([])
        setCar({
          brand: '',
          model: '',
          year: 2025,
          pricePerDay: 100,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 4,
          location: '',
          description: '',
          engine_size: '',
          horsepower: '',
          doors: 4,
          drive_type: '',
          color_exterior: '',
          color_interior: '',
          mileage: '',
          features: [],
          license_plate: '',
          vin: '',
          insurance_policy: '',
        })
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-8 md:p-12 bg-white flex-1 space-y-8 overflow-y-auto h-screen'>
      <AdminHeader
        title="Add New Car"
        subtitle="List a new vehicle in your fleet"
      >
        <div className='hidden lg:flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-lg border border-gray-200'>
          <div className='w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#0891b2]'>
            <Car size={20} />
          </div>
          <div>
            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Status</p>
            <p className='text-sm font-bold text-gray-900'>Draft Listing</p>
          </div>
        </div>
      </AdminHeader>

      <form onSubmit={onsubmitHandler} className='grid grid-cols-1 xl:grid-cols-12 gap-8'>

        {/* Media Sidebar */}
        <div className='xl:col-span-4 space-y-6'>
          <div className='sticky top-0 space-y-6'>
            {/* Main Image */}
            <div className='p-6 rounded-lg border border-gray-200 bg-white space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-sm font-bold text-gray-900'>Main Photo</h2>
                <div className='w-2 h-2 rounded-full bg-green-500'></div>
              </div>

              <label htmlFor="car-image" className='group relative aspect-[4/3] w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:border-[#0891b2] transition-all overflow-hidden'>
                {mainImage ? (
                  <img src={URL.createObjectURL(mainImage)} alt="" className='w-full h-full object-cover' />
                ) : (
                  <div className='flex flex-col items-center gap-3 text-gray-400 text-center px-6'>
                    <div className='w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm border border-gray-100'>
                      <Upload size={20} />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-gray-700'>Upload Main Photo</p>
                      <p className='text-xs text-gray-500 mt-1'>Front 3/4 view recommended</p>
                    </div>
                  </div>
                )}
                <input type="file" id="car-image" accept="image/*" hidden onChange={e => setMainImage(e.target.files[0])} />

                {mainImage && (
                  <button type="button" onClick={(e) => { e.preventDefault(); setMainImage(null) }} className='absolute top-3 right-3 p-2 bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md z-10'>
                    <X size={16} />
                  </button>
                )}
              </label>
            </div>

            {/* Gallery */}
            <div className='p-6 rounded-lg border border-gray-200 bg-white space-y-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-sm font-bold text-gray-900'>Gallery Photos</h2>
                <span className='px-2 py-0.5 rounded text-xs font-semibold bg-gray-100 text-gray-600'>{galleryImages.length}/10</span>
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <AnimatePresence>
                  {galleryImages.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className='aspect-video rounded-lg overflow-hidden relative group border border-gray-200'
                    >
                      <img src={URL.createObjectURL(img)} alt="" className='w-full h-full object-cover' />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className='absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        <X size={20} className='text-white' />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {galleryImages.length < 10 && (
                  <label className='aspect-video rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#0891b2] hover:bg-blue-50 transition-all text-gray-400 hover:text-[#0891b2] gap-1'>
                    <Plus size={20} />
                    <span className='text-xs font-semibold'>Add Photo</span>
                    <input type="file" multiple accept="image/*" hidden onChange={handleGalleryChange} />
                  </label>
                )}
              </div>
            </div>

            <div className='p-5 rounded-lg bg-blue-50 border border-blue-100 space-y-3'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-lg bg-white flex items-center justify-center'>
                  <Info size={16} className='text-blue-600' />
                </div>
                <h4 className='text-sm font-bold text-blue-900'>Tip</h4>
              </div>
              <p className='text-xs text-blue-700 leading-relaxed'>
                Vehicles with 5+ quality images get 2x more bookings. Include exterior, interior, and detail shots.
              </p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className='xl:col-span-8 space-y-8'>

          {/* Basic Information */}
          <section className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
            <h2 className='text-lg font-bold text-gray-900'>Basic Information</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Brand</label>
                <div className='relative'>
                  <Car size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type="text" placeholder="e.g. Toyota, BMW" required className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.brand} onChange={e => setCar({ ...car, brand: e.target.value })} />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Model</label>
                <div className='relative'>
                  <Zap size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type="text" placeholder="e.g. Camry, X5" required className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.model} onChange={e => setCar({ ...car, model: e.target.value })} />
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Year</label>
                <div className='relative'>
                  <Calendar size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type="number" required className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.year} onChange={e => setCar({ ...car, year: e.target.value })} />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Price Per Day ($)</label>
                <div className='relative'>
                  <DollarSign size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type="number" required className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-bold outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.pricePerDay} onChange={e => setCar({ ...car, pricePerDay: e.target.value })} />
                </div>
              </div>
              <CustomSelect
                label="Category"
                placeholder="Select Category"
                value={car.category}
                onChange={(val) => setCar({ ...car, category: val })}
                options={["Sedan", "SUV", "Luxury", "Sports", "Electric", "Van"]}
              />
            </div>
          </section>

          {/* Technical Specifications */}
          <section className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
            <h2 className='text-lg font-bold text-gray-900'>Technical Specifications</h2>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Engine</label>
                <input type="text" placeholder="e.g. 2.0L Turbo" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.engine_size} onChange={e => setCar({ ...car, engine_size: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Horsepower</label>
                <input type="number" placeholder="300" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.horsepower} onChange={e => setCar({ ...car, horsepower: e.target.value })} />
              </div>
              <CustomSelect
                label="Transmission"
                placeholder="Select"
                value={car.transmission}
                onChange={(val) => setCar({ ...car, transmission: val })}
                options={["Automatic", "Manual"]}
              />
              <CustomSelect
                label="Fuel Type"
                placeholder="Select"
                value={car.fuel_type}
                onChange={(val) => setCar({ ...car, fuel_type: val })}
                options={["Petrol", "Diesel", "Electric", "Hybrid"]}
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Seats</label>
                <input type="number" required className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.seating_capacity} onChange={e => setCar({ ...car, seating_capacity: e.target.value })} />
              </div>
              <CustomSelect
                label="Drive Type"
                placeholder="Select"
                value={car.drive_type}
                onChange={(val) => setCar({ ...car, drive_type: val })}
                options={["AWD", "RWD", "FWD"]}
              />
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Doors</label>
                <input type="number" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.doors} onChange={e => setCar({ ...car, doors: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Mileage (km)</label>
                <input type="number" placeholder="10000" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.mileage} onChange={e => setCar({ ...car, mileage: e.target.value })} />
              </div>
            </div>
          </section>

          {/* Design & Colors */}
          <section className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
            <h2 className='text-lg font-bold text-gray-900'>Design & Colors</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Exterior Color</label>
                <input type="text" placeholder="e.g. Black, White, Silver" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.color_exterior} onChange={e => setCar({ ...car, color_exterior: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Interior Color</label>
                <input type="text" placeholder="e.g. Black Leather, Beige" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.color_interior} onChange={e => setCar({ ...car, color_interior: e.target.value })} />
              </div>
            </div>
          </section>

          {/* Features */}
          <section className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
            <h2 className='text-lg font-bold text-gray-900'>Features & Amenities</h2>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
              {FEATURES_LIST.map((feature, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all text-left ${car.features.includes(feature)
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center transition-colors ${car.features.includes(feature) ? 'bg-[#0891b2] text-white' : 'border-2 border-gray-300'}`}>
                    {car.features.includes(feature) && <Check size={10} />}
                  </div>
                  <span className='text-xs font-semibold'>{feature}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Location & Details */}
          <section className='p-8 rounded-lg border border-gray-200 bg-white space-y-6'>
            <h2 className='text-lg font-bold text-gray-900'>Location & Details</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>License Plate</label>
                <input type="text" placeholder="ABC-1234" className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold uppercase outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.license_plate} onChange={e => setCar({ ...car, license_plate: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>VIN</label>
                <input type="text" placeholder="WBA123..." className='w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold uppercase outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.vin} onChange={e => setCar({ ...car, vin: e.target.value })} />
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Insurance Policy</label>
                <div className='relative'>
                  <Shield size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input type="text" placeholder="Policy #12345" className='w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-gray-900 font-semibold uppercase outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all' value={car.insurance_policy} onChange={e => setCar({ ...car, insurance_policy: e.target.value })} />
                </div>
              </div>
              <CustomSelect
                label="Location"
                placeholder="Select City"
                value={car.location}
                onChange={(val) => setCar({ ...car, location: val })}
                options={["New York", "Los Angeles", "London", "Paris", "Dubai", "Tokyo", "Houston"]}
              />
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-semibold text-gray-500 uppercase tracking-wide'>Description</label>
              <textarea rows={5} placeholder="Describe the vehicle's condition, features, and any special notes..." required className='w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 font-medium leading-relaxed outline-none focus:ring-2 focus:ring-[#0891b2]/10 focus:border-[#0891b2] transition-all resize-none' value={car.description} onChange={e => setCar({ ...car, description: e.target.value })}></textarea>
            </div>
          </section>

          {/* Submit Button */}
          <div className='flex items-center justify-end gap-4 pt-4 pb-16'>
            {!isSuperAdmin && (
              <span className='text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5'>
                <Shield size={14} className="text-amber-600" />
                Read-Only Preview Mode (Live Addition Restricted to Super Admin)
              </span>
            )}
            <button disabled={isLoading} className={`flex items-center justify-center gap-2 px-8 py-4 ${isSuperAdmin ? 'bg-[#0891b2] hover:opacity-90 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'} rounded-lg font-semibold transition-all disabled:opacity-50 shadow-sm`}>
              <span>{isLoading ? 'Adding Car...' : isSuperAdmin ? 'Add to Fleet' : 'Test Add (Demo Mode)'}</span>
              {!isLoading && <Plus size={20} />}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddCar

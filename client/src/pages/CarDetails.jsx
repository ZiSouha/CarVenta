import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import {
  Users,
  Fuel,
  Settings,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Star,
  Activity,
  User,
  Headset,
  ArrowRight,
  Gauge,
  Zap,
  DoorOpen,
  Palette,
  Check,
  Lock,
  Clock,
  Info,
  Shield,
  CreditCard,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'
import CarCard from '../components/CarCard'

const CarDetails = () => {
  const { id } = useParams()
  const { cars, axios, pickupDate, setPickupDate, returnDate, setReturnDate, token, setShowLogin } = useAppContext()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [reviews, setReviews] = useState([])

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/car/${id}`)
      if (data.success) {
        setReviews(data.reviews)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Simple Lightbox Component
  const Lightbox = ({ open, close, image }) => {
    if (!open) return null
    return (
      <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={close}>
        <button className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors">
          <X size={32} />
        </button>
        <img
          src={image}
          alt="Full screen"
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      setShowLogin(true)
      return toast.error("Please sign in to book a vehicle.")
    }

    try {
      // 1. Initiate Stripe Checkout
      const { data } = await axios.post('/api/payment/create-checkout-session', {
        carId: id,
        pickupDate,
        returnDate
      })

      if (data.success) {
        // 2. Redirect to Stripe
        window.location.href = data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const foundCar = cars.find(car => car._id === id)
    if (foundCar) {
      setCar(foundCar)
      window.scrollTo(0, 0)
      fetchReviews()
    }
  }, [cars, id])

  const relatedCars = cars.filter(c => c._id !== id && c.category === car?.category).slice(0, 3)

  return car ? (
    <div className='bg-white min-h-screen pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-6 space-y-12'>

        {/* Technical Header - Matching Manage Bookings Style */}
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200'>
          <div className='space-y-3'>
            <button
              onClick={() => navigate('/cars')}
              className='flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest'
            >
              <ArrowLeft size={14} /> Back to Registry
            </button>
            <h1 className='text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-none'>
              {car.brand} <span className='text-[#0891b2]'>{car.model}</span>
            </h1>
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-bold text-slate-500 uppercase tracking-widest'>
                <Activity size={12} className='text-[#0891b2]' /> Status: Active
              </div>
              <div className='flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest'>
                <MapPin size={12} /> {car.location}
              </div>
            </div>
          </div>

          <div className='bg-slate-50 p-6 rounded-lg border border-slate-200 min-w-[200px] text-right'>
            <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1'>Asset Allocation Rate</p>
            <p className='text-3xl font-black text-slate-900'>${car.pricePerDay}<span className='text-slate-400 text-xs font-bold uppercase ml-1 tracking-widest'>/day</span></p>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>

          {/* Left Column: Technical Dossier */}
          <div className='lg:col-span-8 space-y-12'>

            {/* Main Visual Component */}
            <div className='space-y-4'>
              <div className='bg-slate-50 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group'>
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20' />
                <div
                  className='relative aspect-[16/9] cursor-pointer'
                  onClick={() => { setSelectedImage(car.image); setIsLightboxOpen(true); }}
                >
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className='w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700'
                  />
                  <div className='absolute top-6 left-6'>
                    <span className='bg-white px-3 py-1.5 rounded-md text-[10px] font-bold shadow-md flex items-center gap-2 text-[#0891b2] border border-slate-100 uppercase tracking-widest'>
                      <div className='w-1.5 h-1.5 rounded-full bg-[#0891b2]'></div>
                      Asset Available
                    </span>
                  </div>
                </div>
              </div>

              {/* Gallery Registry */}
              {car.gallery && car.gallery.length > 0 && (
                <div className='grid grid-cols-5 gap-3'>
                  {car.gallery.map((img, i) => (
                    <div
                      key={i}
                      className='aspect-video rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-[#0891b2] transition-all bg-slate-50'
                      onClick={() => { setSelectedImage(img); setIsLightboxOpen(true); }}
                    >
                      <img src={img} alt={`Gallery ${i}`} className='w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity' />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Core Spec Grid - Industrial Style */}
            <div className='bg-white rounded-xl border border-slate-200 p-8 space-y-10 shadow-sm'>
              <div className='flex items-center justify-between pb-6 border-b border-slate-100'>
                <h3 className='text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-3'>
                  <Settings size={18} className='text-[#0891b2]' /> Asset Specifications
                </h3>
                <div className='flex items-center gap-2'>
                  <Star size={14} className='text-[#0891b2] fill-[#0891b2]' />
                  <span className='text-xs font-black text-slate-900'>{car.averageRating || "N/A"}</span>
                  <span className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>({car.totalReviews || 0} Logs)</span>
                </div>
              </div>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-10'>
                {[
                  { label: "Energy Source", val: car.fuel_type, icon: <Fuel size={18} /> },
                  { label: "Transmission", val: car.transmission, icon: <Zap size={18} /> },
                  { label: "Seating CAP", val: `${car.seating_capacity} PAX`, icon: <Users size={18} /> },
                  { label: "Portals", val: `${car.doors || 4} Doors`, icon: <DoorOpen size={18} /> },
                ].map((item, i) => (
                  <div key={i} className='space-y-3'>
                    <div className='w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 flex items-center justify-center transition-all group-hover:text-[#0891b2]'>
                      {item.icon}
                    </div>
                    <div>
                      <p className='text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1'>{item.label}</p>
                      <p className='text-sm font-black text-slate-900'>{item.val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Narrative */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-slate-50 rounded-xl p-8 border border-slate-200 space-y-6'>
                <h4 className='text-xs font-black text-slate-900 uppercase tracking-widest'>Mechanical Registry</h4>
                <div className='space-y-4'>
                  {[
                    { label: "Displacement", val: car.engine_size || "2.0L Turbo" },
                    { label: "Output Power", val: car.horsepower ? `${car.horsepower} HP` : "Standard" },
                    { label: "Drive Protocol", val: car.drive_type || "AWD" },
                    { label: "Operational Age", val: car.year || "2024" },
                  ].map((spec, i) => (
                    <div key={i} className='flex items-center justify-between py-2 border-b border-slate-200/50 last:border-0'>
                      <span className='text-[11px] font-bold text-slate-500 uppercase tracking-tight'>{spec.label}</span>
                      <span className='text-xs font-black text-slate-900'>{spec.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='bg-slate-50 rounded-xl p-8 border border-slate-200 space-y-6'>
                <h4 className='text-xs font-black text-slate-900 uppercase tracking-widest'>Asset Aesthetics</h4>
                <div className='space-y-4'>
                  <div className='p-4 rounded-lg bg-white border border-slate-200 space-y-3'>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Exterior Pigment</p>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 rounded-full bg-slate-400 border border-slate-200'></div>
                      <p className='text-xs font-black text-slate-900'>{car.color_exterior || "Metallic Steel"}</p>
                    </div>
                  </div>
                  <div className='p-4 rounded-lg bg-white border border-slate-200 space-y-3'>
                    <p className='text-[10px] font-bold text-slate-400 uppercase tracking-widest'>Interior Architecture</p>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 rounded-full bg-slate-900 border border-slate-800'></div>
                      <p className='text-xs font-black text-slate-900'>{car.color_interior || "Obsidian Leather"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Functional Description */}
            <div className='bg-white rounded-xl border border-slate-200 p-8 space-y-10'>
              <div className='space-y-4'>
                <h3 className='text-xl font-bold text-slate-900'>Institutional Overview</h3>
                <p className='text-slate-500 font-medium leading-[1.8] text-sm'>
                  {car.description}
                </p>
              </div>

              {car.features && car.features.length > 0 && (
                <div className='space-y-6 pt-6 border-t border-slate-100'>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Validated Features</h4>
                  <div className='grid grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8'>
                    {car.features.map((feature, i) => (
                      <div key={i} className='flex items-center gap-3'>
                        <div className='shrink-0 text-[#0891b2]'>
                          <CheckCircle2 size={14} />
                        </div>
                        <span className='text-[11px] font-bold text-slate-600 uppercase tracking-tight'>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Right Column: Execution Module */}
          <div className='lg:col-span-4 sticky top-32'>
            <div className='bg-white rounded-xl p-8 border border-slate-200 shadow-xl shadow-slate-200/40 space-y-8 relative overflow-hidden'>
              <div className='relative z-10 space-y-1'>
                <h3 className='text-xl font-bold text-slate-900'>Allocation Portal</h3>
                <p className='text-xs text-slate-400 font-bold uppercase tracking-widest'>Initialize Possession Protocol</p>
              </div>

              <form onSubmit={handleSubmit} className='relative z-10 space-y-8'>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Possession Date</label>
                    <div className='relative'>
                      <Calendar size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-300' />
                      <input
                        required
                        type="date"
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className='w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-xs font-bold text-slate-900 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <label className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Termination Date</label>
                    <div className='relative'>
                      <Calendar size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-300' />
                      <input
                        required
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className='w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-xs font-bold text-slate-900 outline-none focus:ring-2 ring-cyan-500/10 focus:border-[#0891b2] transition-all'
                      />
                    </div>
                  </div>
                </div>

                <div className='p-6 rounded-xl bg-gradient-to-br from-slate-50 to-white space-y-4 border border-slate-200 shadow-sm'>
                  <div className='flex justify-between items-center'>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>Daily Allocation</span>
                    <span className='text-xs font-bold text-slate-900'>${car.pricePerDay}</span>
                  </div>
                  <div className='flex justify-between items-center'>
                    <span className='text-[10px] font-bold uppercase tracking-widest text-slate-500'>Registry Protection</span>
                    <span className='text-[10px] font-bold text-[#0891b2] bg-[#0891b2]/10 px-2 py-0.5 rounded'>ACTIVE</span>
                  </div>
                  <div className='h-px bg-slate-100'></div>
                  <div className='flex justify-between items-center pt-2'>
                    <span className='text-xs font-bold uppercase tracking-[0.2em] text-slate-900'>TOTAL CREDIT</span>
                    <span className='text-3xl font-black text-[#0891b2] tracking-tighter'>${car.pricePerDay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <input
                    type="checkbox"
                    id="agreement"
                    className="mt-1 accent-[#0891b2] cursor-pointer"
                    required
                  />
                  <label htmlFor="agreement" className="text-[10px] font-bold text-slate-500 leading-relaxed cursor-pointer uppercase tracking-tight">
                    I accept the <Link to="/terms" className="text-[#0891b2] hover:underline">Master Protocols</Link> and verify operator eligibility.
                  </label>
                </div>

                <button
                  type="submit"
                  className='w-full bg-[#0891b2] text-white font-black py-5 rounded-lg text-[11px] uppercase tracking-[0.2em] hover:bg-[#0e7490] transition-all flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 active:scale-[0.98]'
                >
                  Execute Booking <ArrowRight size={18} />
                </button>

                <div className='flex items-center justify-center gap-3 pt-2 grayscale opacity-40'>
                  <ShieldCheck size={14} />
                  <p className='text-[9px] font-black uppercase tracking-widest'>Secure Transaction Node</p>
                </div>
              </form>

              {/* Decorative Skew */}
              <div className="absolute right-0 top-0 w-1/3 h-full bg-[#0891b2] opacity-[0.02] skew-x-12 translate-x-1/2 -z-0" />
            </div>

            <div className='mt-4 bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-4 shadow-sm'>
              <div className='w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0891b2]'>
                <Headset size={18} />
              </div>
              <div>
                <h4 className='text-xs font-black text-slate-900 uppercase'>Technical Support</h4>
                <button className='text-[10px] font-bold text-[#0891b2] uppercase tracking-widest hover:underline mt-1'>Initialize Uplink</button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Registry Entries */}
        {relatedCars.length > 0 && (
          <section className='mt-24 pt-16 border-t border-slate-200'>
            <div className='mb-12'>
              <h2 className='text-2xl font-bold text-slate-900'>Related Registry Entries</h2>
              <p className='text-slate-400 text-sm font-medium mt-1'>Complementary mobility assets in the same classification.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
              {relatedCars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </div>
          </section>
        )}

      </div>
      <Lightbox open={isLightboxOpen} close={() => setIsLightboxOpen(false)} image={selectedImage} />
    </div>
  ) : <Loader />
}

export default CarDetails

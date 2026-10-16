import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Camera, Upload, X, AlertTriangle, CheckCircle2, FileText, Send } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const DamageReport = ({ bookingId, carDetails }) => {
    const { axios, user } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)
    const [damageType, setDamageType] = useState('')
    const [description, setDescription] = useState('')
    const [severity, setSeverity] = useState('minor')
    const [images, setImages] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const damageTypes = [
        'Scratches',
        'Dents',
        'Broken Glass',
        'Tire Damage',
        'Interior Damage',
        'Mechanical Issue',
        'Other'
    ]

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files)
        if (files.length + images.length > 5) {
            toast.error('Maximum 5 images allowed')
            return
        }

        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Date.now() + Math.random()
        }))

        setImages(prev => [...prev, ...newImages])
    }

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('bookingId', bookingId)
            formData.append('damageType', damageType)
            formData.append('description', description)
            formData.append('severity', severity)

            images.forEach((img, index) => {
                formData.append('images', img.file)
            })

            const { data } = await axios.post('/api/damage-reports', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            if (data.success) {
                toast.success('Damage report submitted successfully')
                setIsOpen(false)
                // Reset form
                setDamageType('')
                setDescription('')
                setSeverity('minor')
                setImages([])
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit report')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-amber-100 transition-all flex items-center justify-center gap-2"
            >
                <AlertTriangle size={16} />
                Report Damage
            </button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle size={20} className="text-amber-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">Damage Report</h2>
                                        <p className="text-xs text-slate-500">Document any vehicle damage</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
                                {/* Vehicle Info */}
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Vehicle</p>
                                    <p className="text-sm font-bold text-slate-900">
                                        {carDetails?.brand} {carDetails?.model}
                                    </p>
                                    <p className="text-xs text-slate-500">Booking ID: {bookingId?.slice(-8).toUpperCase()}</p>
                                </div>

                                {/* Damage Type */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Damage Type *</label>
                                    <select
                                        required
                                        value={damageType}
                                        onChange={(e) => setDamageType(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
                                    >
                                        <option value="">Select damage type</option>
                                        {damageTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Severity */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Severity Level *</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['minor', 'moderate', 'severe'].map(level => (
                                            <button
                                                key={level}
                                                type="button"
                                                onClick={() => setSeverity(level)}
                                                className={`py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${severity === level
                                                        ? level === 'minor' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                                                            : level === 'moderate' ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                                                                : 'bg-red-100 text-red-700 border-2 border-red-300'
                                                        : 'bg-slate-50 text-slate-600 border-2 border-slate-200 hover:bg-slate-100'
                                                    }`}
                                            >
                                                {level}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description *</label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        placeholder="Provide detailed information about the damage..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all resize-none"
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Photos (Max 5)</label>

                                    {images.length < 5 && (
                                        <label className="block w-full p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-[#0891b2] transition-all cursor-pointer bg-slate-50 hover:bg-slate-100">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <div className="text-center space-y-2">
                                                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto border border-slate-200">
                                                    <Camera size={24} className="text-slate-400" />
                                                </div>
                                                <p className="text-sm font-bold text-slate-900">Upload Photos</p>
                                                <p className="text-xs text-slate-500">Click to select images</p>
                                            </div>
                                        </label>
                                    )}

                                    {/* Image Previews */}
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-3">
                                            {images.map(img => (
                                                <div key={img.id} className="relative group">
                                                    <img
                                                        src={img.preview}
                                                        alt="Damage"
                                                        className="w-full h-32 object-cover rounded-lg border border-slate-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(img.id)}
                                                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 py-3 bg-[#0891b2] text-white rounded-xl font-bold text-sm hover:bg-[#0e7490] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                                    >
                                        {isSubmitting ? (
                                            <>Processing...</>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Submit Report
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

export default DamageReport

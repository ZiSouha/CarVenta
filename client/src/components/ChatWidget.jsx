import React from 'react'
import { MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'

const ChatWidget = () => {
    const navigate = useNavigate()
    const [isHovered, setIsHovered] = React.useState(false)

    return (
        <div
            className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 10 }}
                        className='bg-white border border-[var(--color-border)] shadow-lg rounded-xl px-4 py-2 mb-2 hidden md:block'
                    >
                        <p className='text-[var(--color-text-main)] font-semibold text-xs whitespace-nowrap'>
                            Need help? Chat with us.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="w-14 h-14 bg-[var(--color-primary)] text-white rounded-full shadow-lg shadow-cyan-500/30 flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-all group relative"
            >
                <div className='absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full'></div>
                <MessageSquare size={24} className='group-hover:scale-110 transition-transform' />
            </motion.button>
        </div>
    )
}

export default ChatWidget

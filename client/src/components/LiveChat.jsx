import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MessageCircle, X, Send, Minimize2, Paperclip, Smile, User } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const LiveChat = () => {
    const { user, socket } = useAppContext()
    const [isOpen, setIsOpen] = useState(false)
    const [isMinimized, setIsMinimized] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const messagesEndRef = useRef(null)
    const chatRef = useRef(null)

    // Identity Management (User or Guest)
    const [chatUserId, setChatUserId] = useState(null)
    const [chatUserName, setChatUserName] = useState(null)

    useEffect(() => {
        if (user) {
            setChatUserId(user._id)
            setChatUserName(user.name)
        } else {
            // Check for existing guest ID
            let storedGuestId = localStorage.getItem('chat_guest_id')
            if (!storedGuestId) {
                storedGuestId = 'guest_' + Math.random().toString(36).substr(2, 9)
                localStorage.setItem('chat_guest_id', storedGuestId)
            }
            setChatUserId(storedGuestId)
            setChatUserName('Guest User')
        }
    }, [user])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen, isMinimized])

    // Click Outside Handling
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatRef.current && !chatRef.current.contains(event.target) && isOpen) {
                // Check if the click was on the toggle button (to avoid immediate reopening)
                // We handle this by checking if the click target is NOT the button
                // But since the button is unmounted when open (in this code), we are safe?
                // Wait, the button is "AnimatePresence !isOpen". So when Open, button is GONE.
                // So clicking outside is safe unless we click something else.
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    useEffect(() => {
        if (socket && chatUserId) {
            // Join chat room
            socket.emit('JOIN_CHAT', { userId: chatUserId })

            // Listen for history
            socket.on('CHAT_HISTORY', (history) => {
                setMessages(history)
            })

            // Listen for messages from admin
            socket.on('CHAT_MESSAGE', (message) => {
                // If it's a message from the admin OR our own message echoed back (though we usually add locally)
                // The server emits CHAT_MESSAGE to the room.
                // We just need to make sure we don't duplicate if we added it locally.
                // Our local add has ID. Server message has ID.
                setMessages(prev => {
                    const exists = prev.some(m => m.id === message.id)
                    if (exists) return prev
                    return [...prev, message]
                })

                if (message.sender !== 'user' && !isOpen) {
                    setUnreadCount(prev => prev + 1)
                }
            })

            socket.on('AGENT_TYPING', (data) => {
                setIsTyping(data.isTyping)
            })

            return () => {
                socket.off('CHAT_MESSAGE')
                socket.off('CHAT_HISTORY')
                socket.off('AGENT_TYPING')
            }
        }
    }, [socket, chatUserId, isOpen])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!inputMessage.trim() || !chatUserId) return

        const newMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date().toISOString(),
            userName: chatUserName
        }

        // Add message to local state immediately
        setMessages(prev => [...prev, newMessage])

        // Send to server
        if (socket) {
            socket.emit('SEND_CHAT_MESSAGE', {
                userId: chatUserId,
                message: inputMessage,
                userName: chatUserName
            })
        }

        setInputMessage('')
    }

    const handleOpen = () => {
        setIsOpen(true)
        setIsMinimized(false)
        setUnreadCount(0)
    }

    return (
        <>
            {/* Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={(e) => {
                            e.stopPropagation() // Prevent click from bubbling
                            handleOpen()
                        }}
                        className="fixed bottom-6 right-6 w-14 h-14 bg-[#0891b2] text-white rounded-full shadow-2xl shadow-cyan-500/30 flex items-center justify-center hover:bg-[#0e7490] transition-all z-50 group"
                    >
                        <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={chatRef}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`fixed bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 flex flex-col overflow-hidden ${isMinimized ? 'h-16' : 'h-[600px]'}`}
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                    >
                        {/* Header */}
                        <div
                            className="p-4 bg-gradient-to-r from-[#0891b2] to-[#0e7490] text-white flex items-center justify-between cursor-pointer"
                            onClick={() => setIsMinimized(!isMinimized)}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Support Chat</h3>
                                    <p className="text-[10px] text-white/80">We typically reply instantly</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsMinimized(!isMinimized)
                                    }}
                                    className="p-1.5 hover:bg-white/10 rounded transition-colors"
                                >
                                    <Minimize2 size={16} />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setIsOpen(false)
                                    }}
                                    className="p-1.5 hover:bg-white/10 rounded transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                                    {messages.length === 0 && (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                                <MessageCircle size={32} className="text-slate-300" />
                                            </div>
                                            <p className="text-sm font-bold text-slate-900">Start a conversation</p>
                                            <p className="text-xs text-slate-500 mt-1">Our team is here to help you 24/7</p>
                                        </div>
                                    )}

                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[75%] ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                                                <div className={`p-3 rounded-2xl ${msg.sender === 'user'
                                                    ? 'bg-[#0891b2] text-white'
                                                    : 'bg-white border border-slate-200'
                                                    }`}>
                                                    <p className="text-sm">{msg.text}</p>
                                                </div>
                                                <p className="text-[10px] text-slate-400 mt-1 px-2">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    {isTyping && (
                                        <div className="flex justify-start">
                                            <div className="bg-white border border-slate-200 p-3 rounded-2xl">
                                                <div className="flex gap-1">
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input */}
                                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={inputMessage}
                                            onChange={(e) => setInputMessage(e.target.value)}
                                            placeholder="Type your message..."
                                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!inputMessage.trim()}
                                            className="w-10 h-10 bg-[#0891b2] text-white rounded-xl flex items-center justify-center hover:bg-[#0e7490] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default LiveChat

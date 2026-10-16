import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from 'motion/react'
import {
    MessageCircle, Send, User, Clock, Search,
    CheckCheck, Circle, AlertCircle, X, Paperclip
} from 'lucide-react'
import toast from 'react-hot-toast'
import AdminHeader from '../../components/owner/AdminHeader'

const LiveChatAdmin = () => {
    const { socket, user } = useAppContext()
    const [chatRooms, setChatRooms] = useState([])
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [messages, setMessages] = useState([])
    const [inputMessage, setInputMessage] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (socket) {
            // Join admin chat room
            socket.emit('JOIN_ADMIN_CHAT')

            // Listen for new chat rooms
            socket.on('NEW_CHAT_ROOM', (room) => {
                setChatRooms(prev => {
                    const exists = prev.find(r => r.userId === room.userId)
                    if (exists) return prev
                    return [room, ...prev]
                })
                toast.success(`New chat from ${room.userName}`)
            })

            // Listen for messages
            socket.on('ADMIN_CHAT_MESSAGE', ({ roomId, message }) => {
                if (selectedRoom?.userId === roomId) {
                    setMessages(prev => [...prev, message])
                }

                // Update unread count
                setChatRooms(prev => prev.map(room =>
                    room.userId === roomId
                        ? { ...room, unreadCount: (room.unreadCount || 0) + 1, lastMessage: message }
                        : room
                ))
            })

            // Get existing chat rooms
            socket.emit('GET_CHAT_ROOMS')
            socket.on('CHAT_ROOMS_LIST', (rooms) => {
                setChatRooms(rooms)
            })

            return () => {
                socket.off('NEW_CHAT_ROOM')
                socket.off('ADMIN_CHAT_MESSAGE')
                socket.off('CHAT_ROOMS_LIST')
            }
        }
    }, [socket, selectedRoom])

    const handleSelectRoom = (room) => {
        setSelectedRoom(room)
        setMessages(room.messages || [])

        // Mark as read
        setChatRooms(prev => prev.map(r =>
            r.userId === room.userId ? { ...r, unreadCount: 0 } : r
        ))

        // Join specific room
        if (socket) {
            socket.emit('JOIN_CHAT_ROOM', { userId: room.userId })
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!inputMessage.trim() || !selectedRoom) return

        const newMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'admin',
            timestamp: new Date().toISOString(),
            userName: user?.name || 'Support Agent',
            read: false
        }

        setMessages(prev => [...prev, newMessage])

        if (socket) {
            socket.emit('SEND_ADMIN_MESSAGE', {
                userId: selectedRoom.userId,
                message: newMessage
            })
        }

        setInputMessage('')
    }

    const filteredRooms = chatRooms.filter(room =>
        searchQuery === '' ||
        room.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.userEmail?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const totalUnread = chatRooms.reduce((sum, room) => sum + (room.unreadCount || 0), 0)

    const stats = (
        <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-bold">Online</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
                <MessageCircle size={16} />
                <span className="font-bold text-sm">{chatRooms.length} Active Chats</span>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">

            <div className='px-8 pt-8 md:px-12 md:pt-12 pb-0'>
                <AdminHeader
                    title="Live Support"
                    subtitle="Real-time customer support console"
                    children={stats}
                />
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-6 px-8 pb-8 md:px-12 md:pb-12 min-h-0 overflow-hidden">
                {/* Chat Rooms List */}
                <div className="lg:w-96 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-sm h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 bg-gray-50/50">
                        {/* Search */}
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
                            />
                        </div>
                    </div>

                    {/* Rooms List */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredRooms.length > 0 ? (
                            filteredRooms.map((room) => (
                                <button
                                    key={room.userId}
                                    onClick={() => handleSelectRoom(room)}
                                    className={`w-full p-4 border-b border-slate-100 hover:bg-slate-50 transition-all text-left group ${selectedRoom?.userId === room.userId ? 'bg-blue-50/50 border-l-4 border-l-[#0891b2]' : 'border-l-4 border-l-transparent'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${selectedRoom?.userId === room.userId ? 'bg-[#0891b2] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-white group-hover:shadow-md'}`}>
                                            <User size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <p className={`font-bold text-sm truncate ${selectedRoom?.userId === room.userId ? 'text-[#0891b2]' : 'text-slate-900'}`}>{room.userName || 'Guest User'}</p>
                                                {room.unreadCount > 0 && (
                                                    <span className="px-2 py-0.5 bg-[#0891b2] text-white text-[10px] font-bold rounded-full shadow-sm shadow-cyan-500/30">
                                                        {room.unreadCount}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 truncate font-medium opacity-80">
                                                {room.lastMessage?.text || 'No messages yet'}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <Clock size={10} className="text-slate-400" />
                                                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                                                    {room.lastMessage?.timestamp
                                                        ? new Date(room.lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                        : 'Just now'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center p-8 text-center opacity-60">
                                <MessageCircle size={48} className="text-slate-300 mx-auto mb-3" />
                                <p className="text-sm font-bold text-slate-900 mb-1">No Active Chats</p>
                                <p className="text-xs text-slate-500 max-w-[200px]">Waiting for customers to start conversations</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Window */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden shadow-sm h-full relative">
                    {selectedRoom ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600">
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{selectedRoom.userName || 'Guest User'}</p>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Connected</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setSelectedRoom(null)}
                                    className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-all"
                                >
                                    <X size={20} className="text-slate-600" />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] ${msg.sender === 'admin' ? 'order-2' : 'order-1'}`}>
                                            <div className={`p-4 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${msg.sender === 'admin'
                                                ? 'bg-[#0891b2] text-white rounded-br-none'
                                                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                                                }`}>
                                                <p>{msg.text}</p>
                                            </div>
                                            <div className={`flex items-center gap-2 mt-1.5 px-1 ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                                {msg.sender === 'admin' && (
                                                    <CheckCheck size={12} className={msg.read ? 'text-[#0891b2]' : 'text-slate-300'} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        className="p-2.5 text-slate-400 hover:text-[#0891b2] hover:bg-cyan-50 rounded-xl transition-all"
                                    >
                                        <Paperclip size={20} />
                                    </button>
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-[#0891b2]/20 focus:border-[#0891b2] transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!inputMessage.trim()}
                                        className="w-12 h-12 bg-[#0891b2] text-white rounded-xl flex items-center justify-center hover:bg-[#0e7490] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20 active:scale-95 transform"
                                    >
                                        <Send size={20} />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/50">
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100">
                                <MessageCircle size={48} className="text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Support Console</h3>
                            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                                Select an active conversation from the list to start chatting with customers in real-time.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LiveChatAdmin

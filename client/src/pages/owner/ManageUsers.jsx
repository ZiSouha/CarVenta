import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { User, Shield, CheckCircle, XCircle, Search, Trash2 } from 'lucide-react'
import AdminHeader from '../../components/owner/AdminHeader'

const ManageUsers = () => {
    const { axios, user, socket, isSuperAdmin, checkSuperAdminAction } = useAppContext()
    const [users, setUsers] = useState([
        {
            _id: "usr_admin_default",
            name: "Ziane Souhayl",
            email: "zianesouhayl@gmail.com",
            role: "super-admin",
            createdAt: new Date().toISOString()
        }
    ])
    const [search, setSearch] = useState('')

    const fetchAllUsers = async () => {
        try {
            const { data } = await axios.get('/api/user/all-users')
            if (data.success && Array.isArray(data.users) && data.users.length > 0) {
                setUsers(data.users)
            }
        } catch (error) {
            // Keep preview data
        }
    }

    const handleRoleUpdate = async (userId, newRole) => {
        if (!checkSuperAdminAction()) return;
        if (!window.confirm(`Are you sure you want to make this user a ${newRole}?`)) return;

        try {
            const { data } = await axios.post('/api/user/update-role', { userId, newRole })
            if (data.success) {
                toast.success(data.message)
                fetchAllUsers()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleBlockUser = async (userId) => {
        if (!checkSuperAdminAction()) return;
        if (!window.confirm("Are you sure you want to block this user?")) return;
        try {
            const { data } = await axios.post('/api/user/block-user', { userId })
            if (data.success) {
                toast.success(data.message)
                fetchAllUsers()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleUnblockUser = async (userId) => {
        if (!checkSuperAdminAction()) return;
        if (!window.confirm("Are you sure you want to unblock this user?")) return;
        try {
            const { data } = await axios.post('/api/user/unblock-user', { userId })
            if (data.success) {
                toast.success(data.message)
                fetchAllUsers()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchAllUsers()

        // Handle search query from URL
        const query = new URLSearchParams(window.location.search).get('search')
        if (query) {
            setSearch(query)
        }

        if (socket) {
            socket.on('USER_UPDATED', (updatedUser) => {
                setUsers(prev => prev.map(u => u._id === updatedUser._id ? updatedUser : u))
            })
        }

        return () => {
            if (socket) {
                socket.off('USER_UPDATED')
            }
        }
    }, [socket, window.location.search])

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='p-8 md:p-12 bg-white flex-1 space-y-10 overflow-y-auto h-screen'>
            <AdminHeader
                title="User Management"
                subtitle="View and manage user roles and permissions."
            >
                <div className='flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 shadow-sm focus-within:ring-2 ring-[#0891b2]/20 transition-all w-full md:w-80'>
                    <Search size={18} className='text-gray-400' />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className='bg-transparent outline-none text-sm w-full placeholder-gray-400 text-gray-900'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            </AdminHeader>

            {/* Users Table */}
            <div className='bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left whitespace-nowrap'>
                        <thead>
                            <tr className='bg-gray-50 border-b border-gray-200'>
                                <th className='px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wide'>User</th>
                                <th className='px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wide'>Role</th>
                                <th className='px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wide hidden md:table-cell'>Joined</th>
                                <th className='px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-wide text-right'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200'>
                            {filteredUsers.map((u) => (
                                <tr key={u._id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='px-8 py-5'>
                                        <div className='flex items-center gap-4'>
                                            <div className='w-10 h-10 rounded-full bg-cyan-50 text-[#0891b2] flex items-center justify-center font-bold text-sm'>
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className='text-sm font-bold text-gray-900'>{u.name}</p>
                                                <p className='text-xs text-gray-500'>{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-8 py-5'>
                                        <div className='flex flex-col gap-1'>
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border w-max ${u.role === 'super-admin' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                u.role === 'admin' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                    'bg-slate-50 text-slate-500 border-slate-100'
                                                }`}>
                                                <Shield size={12} />
                                                {u.role}
                                            </div>
                                            {u.isBlocked && (
                                                <div className='inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border w-max bg-red-50 text-red-600 border-red-100'>
                                                    Blocked
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className='px-8 py-5 hidden md:table-cell'>
                                        <p className='text-xs font-medium text-gray-900'>{new Date(u.createdAt).toLocaleDateString()}</p>
                                    </td>
                                    <td className='px-8 py-5'>
                                        <div className='flex justify-end gap-2'>
                                            {['owner', 'admin', 'super-admin'].includes(user?.role) && u.role !== 'super-admin' && (
                                                <>
                                                    {u.role === 'user' ? (
                                                        <button
                                                            onClick={() => handleRoleUpdate(u._id, 'admin')}
                                                            className='px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold uppercase hover:bg-green-100 transition-colors'
                                                        >
                                                            Promote
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleRoleUpdate(u._id, 'user')}
                                                            className='px-3 py-1.5 bg-yellow-50 text-yellow-600 rounded-lg text-[10px] font-bold uppercase hover:bg-yellow-100 transition-colors'
                                                        >
                                                            Demote
                                                        </button>
                                                    )}

                                                    {u.isBlocked ? (
                                                        <button
                                                            onClick={() => handleUnblockUser(u._id)}
                                                            className='px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-bold uppercase hover:bg-gray-200 transition-colors'
                                                        >
                                                            Unblock
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleBlockUser(u._id)}
                                                            className='px-3 py-1.5 bg-red-50 text-red-500 rounded-lg text-[10px] font-bold uppercase hover:bg-red-100 transition-colors'
                                                        >
                                                            Block
                                                        </button>
                                                    )}
                                                </>
                                            )}
                                            {u.role === 'super-admin' && (
                                                <span className='text-[10px] font-bold text-gray-400 uppercase tracking-wide'>Protected</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageUsers

import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
import { dummyCars } from "../assets/carsData";

const getBaseUrl = () => {
    const envUrl = import.meta.env.VITE_BASE_URL;
    const isLocalhost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1'
    );
    if (envUrl) {
        if (!isLocalhost && (envUrl.includes('localhost') || envUrl.includes('127.0.0.1'))) {
            return '';
        }
        return envUrl;
    }
    return isLocalhost ? 'http://localhost:3000' : '';
};

axios.defaults.baseURL = getBaseUrl();

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY || '$'

    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')
    const [socket, setSocket] = useState(null)
    const [cars, setCars] = useState(dummyCars)
    const [siteConfig, setSiteConfig] = useState(null)

    const isSuperAdmin = Boolean(user && user.role === 'super-admin');

    const checkSuperAdminAction = () => {
        if (!isSuperAdmin) {
            toast.error("Action Restricted: Administrator privileges required.", {
                duration: 4500,
                icon: '🔒'
            });
            return false;
        }
        return true;
    };

    // Function to check if user is logged in
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data')
            if (data.success) {
                setUser(data.user)
                setIsOwner(Boolean(data.user && ['owner', 'admin', 'super-admin'].includes(data.user.role)))
            } else {
                localStorage.removeItem('token')
                setToken(null)
            }
        } catch (error) {
            console.error("Auth check notice:", error.message)
        }
    }

    const fetchSiteConfig = async () => {
        try {
            const { data } = await axios.get('/api/owner/site-config')
            if (data.success) {
                setSiteConfig(data.config)
            }
        } catch (error) {
            console.error("Failed to fetch site config")
        }
    }

    // Function to fetch all cars from the server
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars')
            if (data.success && Array.isArray(data.cars) && data.cars.length > 0) {
                setCars(data.cars)
            } else {
                setCars(dummyCars)
            }
        } catch (error) {
            // Keep dummyCars when server is offline or empty
            setCars(dummyCars)
        }
    }

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization'] = ''
        toast.success('You have been logged out')
    }

    // useEffect to retrieve the token from localStorage
    useEffect(() => {
        const token = localStorage.getItem('token')
        setToken(token)
        fetchCars()
        fetchSiteConfig()
    }, [])

    // useEffect to fetch user data when token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser()
        }
    }, [token])

    // Notifications State
    const [notifications, setNotifications] = useState([])

    const fetchNotifications = async () => {
        if (!user) return
        try {
            const { data } = await axios.get('/api/notifications/user')
            if (data.success) {
                setNotifications(data.notifications.map(n => ({
                    ...n,
                    id: n._id,
                    time: new Date(n.createdAt).toLocaleDateString(),
                })))
            }
        } catch (error) {
            console.error("Failed to fetch notifications", error)
        }
    }

    const markAsRead = async (id) => {
        try {
            await axios.post('/api/notifications/mark-read', { id })
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
        } catch (error) { console.error(error) }
    }

    const removeNotification = async (id) => {
        try {
            await axios.post('/api/notifications/delete', { id })
            setNotifications(prev => prev.filter(n => n.id !== id))
        } catch (error) { console.error(error) }
    }

    const unreadCount = notifications.filter(n => !n.read).length

    // Initialize Socket.io
    useEffect(() => {
        const isLocalhost = typeof window !== 'undefined' && (
            window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1'
        );
        const configuredUrl = import.meta.env.VITE_SERVER_URL || import.meta.env.VITE_BASE_URL;

        let socketTarget = null;
        if (configuredUrl && (!configuredUrl.includes('localhost') || isLocalhost)) {
            socketTarget = configuredUrl;
        } else if (isLocalhost) {
            socketTarget = 'http://localhost:3000';
        }

        if (!socketTarget) {
            console.warn("Socket.io: Remote server URL not configured. Real-time updates paused on production.");
            return;
        }

        // Vercel Serverless does not support persistent WebSockets or stateful socket polling
        if (socketTarget.includes('vercel.app')) {
            console.info("Socket.io: Vercel serverless environment detected. WebSockets disabled on Vercel; REST API active.");
            return;
        }

        const socketInstance = io(socketTarget, {
            autoConnect: true,
            reconnectionAttempts: 5,
            timeout: 10000,
        });
        setSocket(socketInstance);

        socketInstance.on('connect_error', (err) => {
            console.warn('Socket note:', err.message);
        });

        socketInstance.on('CAR_ADDED', (newCar) => {
            setCars(prev => [...prev, newCar]);
            toast.success('A new car has been added!', { icon: '🚗' });
        });

        socketInstance.on('CAR_UPDATED', (updatedCar) => {
            setCars(prev => prev.map(car => car._id === updatedCar._id ? updatedCar : car));
        });

        socketInstance.on('CAR_DELETED', (carId) => {
            setCars(prev => prev.filter(car => car._id !== carId));
        });

        socketInstance.on('BULK_CARS_DELETED', (carIds) => {
            setCars(prev => prev.filter(car => !carIds.includes(car._id)));
        });

        socketInstance.on('BOOKING_STATUS_UPDATED', (booking) => {
            toast.success(`Booking status updated to: ${booking.status}`, { icon: '📅' });
            fetchNotifications()
        });

        socketInstance.on('NEW_NOTIFICATION', (note) => {
            const newNote = {
                ...note,
                id: note._id,
                time: 'Just now',
                read: false
            }
            setNotifications(prev => [newNote, ...prev])
            toast('New Notification', { icon: '🔔' })
        });

        return () => socketInstance.disconnect();
    }, []);

    // Join private room when user is loaded
    useEffect(() => {
        if (socket && user?._id) {
            socket.emit('join', user._id);
        }
    }, [socket, user]);

    // Initial Fetch of Notifications when user loads
    useEffect(() => {
        if (user) {
            fetchNotifications()
        }
    }, [user])

    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin, logout, fetchCars, cars, setCars, pickupDate, setPickupDate, returnDate, setReturnDate, socket, siteConfig, setSiteConfig, fetchSiteConfig,
        notifications, unreadCount, markAsRead, removeNotification, fetchNotifications,
        isSuperAdmin, checkSuperAdminAction
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}
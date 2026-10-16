import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children, userId }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const isLocalhost = typeof window !== 'undefined' && (
            window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1'
        );
        const configuredUrl = import.meta.env.VITE_SERVER_URL || import.meta.env.VITE_BASE_URL;
        const targetUrl = configuredUrl || (isLocalhost ? 'http://localhost:3000' : null);

        if (!targetUrl || targetUrl.includes('vercel.app')) return;

        const newSocket = io(targetUrl, { reconnectionAttempts: 5 });
        setSocket(newSocket);

        if (userId) {
            newSocket.emit('join', userId);
        }

        return () => newSocket.close();
    }, [userId]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

import { Server } from "socket.io";

let io;

// Shared in-memory chat rooms across all socket connections
const chatRooms = new Map();

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust this in production
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("join", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined their private room`);
        });

        // Chat support events

        socket.on("JOIN_CHAT", ({ userId }) => {
            socket.join(`chat_${userId}`);
            console.log(`User ${userId} joined chat room`);

            // Create or update chat room
            if (!chatRooms.has(userId)) {
                chatRooms.set(userId, {
                    userId,
                    userName: 'User',
                    messages: [],
                    unreadCount: 0,
                    createdAt: new Date()
                });
                // Notify admins of new chat room
                io.to('admin_chat').emit('NEW_CHAT_ROOM', chatRooms.get(userId));
            } else {
                // Send existing history to the user
                const room = chatRooms.get(userId);
                socket.emit('CHAT_HISTORY', room.messages);
            }
        });

        socket.on("SEND_CHAT_MESSAGE", ({ userId, message, userName }) => {
            const chatMessage = {
                id: Date.now(),
                text: message,
                sender: 'user',
                timestamp: new Date().toISOString(),
                userName: userName || 'User'
            };

            // Update chat room
            if (chatRooms.has(userId)) {
                const room = chatRooms.get(userId);
                room.messages.push(chatMessage);
                room.userName = userName || room.userName;
                room.lastMessage = chatMessage;
                chatRooms.set(userId, room);
            }

            // Send to user
            io.to(`chat_${userId}`).emit("CHAT_MESSAGE", chatMessage);

            // Send to admin
            io.to('admin_chat').emit('ADMIN_CHAT_MESSAGE', {
                roomId: userId,
                message: chatMessage
            });
        });

        // Admin chat events
        socket.on("JOIN_ADMIN_CHAT", () => {
            socket.join('admin_chat');
            console.log('Admin joined chat management');
        });

        socket.on("GET_CHAT_ROOMS", () => {
            const rooms = Array.from(chatRooms.values());
            socket.emit('CHAT_ROOMS_LIST', rooms);
        });

        socket.on("JOIN_CHAT_ROOM", ({ userId }) => {
            socket.join(`admin_room_${userId}`);
            console.log(`Admin joined room for user ${userId}`);
        });

        socket.on("SEND_ADMIN_MESSAGE", ({ userId, message }) => {
            // Update chat room
            if (chatRooms.has(userId)) {
                const room = chatRooms.get(userId);
                room.messages.push(message);
                room.lastMessage = message;
                chatRooms.set(userId, room);
            }

            // Send to user
            io.to(`chat_${userId}`).emit("CHAT_MESSAGE", message);

            // Send back to admin for confirmation
            socket.emit("CHAT_MESSAGE", message);
        });

        // GPS tracking events
        socket.on("REQUEST_GPS", ({ bookingId }) => {
            socket.join(`gps_${bookingId}`);
            console.log(`GPS tracking requested for booking ${bookingId}`);

            // Simulate GPS data (in production, this would come from actual GPS device)
            const mockGPSData = {
                bookingId,
                location: {
                    lat: 40.7128 + (Math.random() - 0.5) * 0.01,
                    lng: -74.0060 + (Math.random() - 0.5) * 0.01
                },
                speed: Math.floor(Math.random() * 80),
                timestamp: new Date().toISOString()
            };

            socket.emit("GPS_UPDATE", mockGPSData);
        });

        socket.on("UPDATE_GPS", ({ bookingId, location, speed }) => {
            // Broadcast GPS update to all clients tracking this booking
            io.to(`gps_${bookingId}`).emit("GPS_UPDATE", {
                bookingId,
                location,
                speed,
                timestamp: new Date().toISOString()
            });
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

export const emitEvent = (event, data, room = null) => {
    if (io) {
        if (room) {
            io.to(room).emit(event, data);
        } else {
            io.emit(event, data);
        }
    }
};

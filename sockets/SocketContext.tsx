import { RootState } from '@/redux/store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user, token } = useSelector((state: RootState) => state.auth)
    useEffect(() => {
        if (user && token) {
            const newSocket = io('https://sham-truck-backend-1.onrender.com', {
                transports: ['websocket'],
                auth: {
                    token: token,
                },
            });

            newSocket.on('connect', () => {
                console.log('Connected to server');
                setIsConnected(true);


                if (user?.role === 'router') {
                    newSocket.emit('join-notification-room', user.id, user.role);
                    newSocket.emit('join-user-room', user.id);
                } else if (user?.role === 'driver') {
                    newSocket.emit('join-notification-room', user.id, user?.role);
                    newSocket.emit('join-driver-room', user.id);
                }
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from server');
                setIsConnected(false);
            });

            newSocket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [user, token]);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};
// src/SocketIOClient.tsx
import React, { useEffect } from 'react';
import io from 'socket.io-client';

const SocketIOClient: React.FC = () => {
    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Example: Send a message to server and receive a response
        socket.emit('chat_message', { message: 'Hello, server!' });

        socket.on('chat_response', (data: any) => {
            console.log('Server response:', data);
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Socket.IO Client</h1>
            <p>Open the browser console to see WebSocket events.</p>
        </div>
    );
};

export default SocketIOClient;

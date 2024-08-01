import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SocketIOClient: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    useEffect(() => {
        const socketInstance = io('http://localhost:5000');

        socketInstance.on('connect', () => {
            console.log('Connected to server');
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Listen for server response
        socketInstance.on('chat_response', (data: any) => {
            console.log('Server response:', data);
            setResponse(data.message);
        });

        setSocket(socketInstance);

        // Clean up on unmount
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    const handleSend = () => {
        if (socket) {
            socket.emit('chat_message', { message });
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Test.IO Client</h1>
            <p>Open the browser console to see WebSocket events.</p>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={handleSend}>Send</button>
            <div>
                <h2>Server Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
};

export default SocketIOClient;

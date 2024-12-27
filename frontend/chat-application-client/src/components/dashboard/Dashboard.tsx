import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import './Dashboard.css';
import '../layout.css';

interface User {
  id: number;
  username: string;
}

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]); // Initializing as empty array
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]); // Initializing as empty array
  const [messageContent, setMessageContent] = useState(''); // State for the new message content

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMessageClick = (userId: number) => {
    // Find the selected user from the user list
    const user = users.find((u) => u.id === userId);
    setSelectedUser(user || null);

    // Fetch messages with the selected user
    fetch(`http://localhost:8000/api/messages?userId=${userId}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.messages) {
          setMessages(data.messages); // Assuming your backend returns messages for the user
        } else {
          setMessages([]); // If no messages found, set to empty array
        }
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
        setMessages([]); // Handle errors by setting messages to an empty array
      });
  };

  const handleSendMessage = () => {
    if (!messageContent.trim()) return; // Don't send empty messages

    const senderId = 1; // Replace with the actual sender ID (you may need to get the logged-in user's ID)
    const receiverId = selectedUser?.id;

    if (receiverId) {
      const messageData = {
        sender_id: senderId,
        receiver_id: receiverId,
        content: messageContent,
      };

      // Send message to backend
      fetch('http://localhost:8000/api/messages/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            // Update messages state with the new message
            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: 'You', receiver: selectedUser.username, content: messageContent },
            ]);
            setMessageContent(''); // Clear the input field
          } else {
            console.error('Error sending message:', data.error);
          }
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/get_all_users/', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users); // Set users if the API returns the expected data
        } else {
          setUsers([]); // If no users found, set to empty array
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setUsers([]); // Handle errors by setting users to an empty array
      });
  }, []);

  return (
    <div className="dashboard">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        <div className={`sidebar-content ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          {isSidebarOpen ? (
            <>
              <h2>Sidebar</h2>
              <ul>
                <li>
                  <a href="/dashboard">
                    <FaHome /> Home
                  </a>
                </li>
                <li>
                  <a href="/profile">
                    <FaUser /> Profile
                  </a>
                </li>
                <li>
                  <a href="/settings">
                    <FaCog /> Settings
                  </a>
                </li>
                <li>
                  <a href="/login">
                    <FaSignOutAlt /> Logout
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <ul>
              <li>
                <a href="/dashboard">
                  <FaHome />
                </a>
              </li>
              <li>
                <a href="/profile">
                  <FaUser />
                </a>
              </li>
              <li>
                <a href="/settings">
                  <FaCog />
                </a>
              </li>
              <li>
                <a href="/login">
                  <FaSignOutAlt />
                </a>
              </li>
            </ul>
          )}
        </div>
      </aside>

      <div className="main-content">
        <header className="top-bar">
          <h1>Dashboard</h1>
        </header>
        <section className="content">
          <h2>Available Users</h2>
          <div className="user-list">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div key={user.id} className="user-item">
                  <span>{user.username}</span>
                  <button onClick={() => handleMessageClick(user.id)}>Message</button>
                </div>
              ))
            ) : (
              <p>No users available.</p>
            )}
          </div>

          {selectedUser && (
            <div className="messages">
              <h2>Messages with {selectedUser.username}</h2>
              <div className="message-list">
                {messages && messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div key={index} className="message-item">
                      <strong>{message.sender}:</strong> {message.content}
                    </div>
                  ))
                ) : (
                  <p>No messages found.</p>
                )}
              </div>
              <div className="send-message">
                <textarea
                  placeholder="Write a message..."
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

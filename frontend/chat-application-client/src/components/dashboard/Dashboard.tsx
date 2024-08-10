import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import './Dashboard.css'; // Import your CSS file for styling

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? '<<' : '>>'}
        </button>
        <div className={`sidebar-content ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          {isSidebarOpen ? (
            <>
              <h2>Sidebar</h2>
              <ul>
                <li><a href="/dashboard"><FaHome /> Home</a></li>
                <li><a href="#profile"><FaUser /> Profile</a></li>
                <li><a href="/settings"><FaCog /> Settings</a></li>
                <li><a href="#logout"><FaSignOutAlt /> Logout</a></li>
              </ul>
            </>
          ) : (
            <ul>
              <li><a href="/dashboard"><FaHome /></a></li>
              <li><a href="#profile"><FaUser /></a></li>
              <li><a href="/settings"><FaCog /></a></li>
              <li><a href="/login"><FaSignOutAlt /></a></li>
            </ul>
          )}
        </div>
      </aside>
      <div className="main-content">
        {/* <header className="top-bar">
          <h1>Dashboard</h1>
        </header> */}
        <section className="content">
          {/* Main content goes here */}
          <h2>Welcome to your dashboard!</h2>
          <p>This is where your main content will be displayed.</p>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

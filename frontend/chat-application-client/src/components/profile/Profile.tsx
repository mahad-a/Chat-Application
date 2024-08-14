import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'; 
import '../layout.css';
import './Profile.css';

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {/* {isSidebarOpen ? '<<' : '>>'} */}
          {isSidebarOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        <div className={`sidebar-content ${isSidebarOpen ? 'open' : 'collapsed'}`}>
          {isSidebarOpen ? (
            <>
              <h2>Sidebar</h2>
              <ul>
                <li><a href="/dashboard"><FaHome />  Home</a></li>
                <li><a href="/profile"><FaUser />  Profile</a></li>
                <li><a href="/settings"><FaCog />  Settings</a></li>
                <li><a href="/login"><FaSignOutAlt />  Logout</a></li>
              </ul>
            </>
          ) : (
            <ul>
              <li><a href="/dashboard"><FaHome /></a></li>
              <li><a href="/profile"><FaUser /></a></li>
              <li><a href="/settings"><FaCog /></a></li>
              <li><a href="/login"><FaSignOutAlt /></a></li>
            </ul>
          )}
        </div>
      </aside>

      {/* Top Bar */}
      <div className="top-bar">
        <h1>Profile</h1>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content">
          <h2>User Profile</h2>
          <div className="profile-details">
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Username:</strong> johndoe123</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Status:</strong> Private</p>
          </div>

          <h3>Edit Profile</h3>
          <form className="profile-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value="John Doe" />

            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value="johndoe123" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value="johndoe@example.com" />

            <label htmlFor="status">Status:</label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="status"
                name="status"
                onChange={(e) => {
                  const label = e.target.nextElementSibling?.nextElementSibling as HTMLElement;
                  label.innerText = e.target.checked ? "Public" : "Private";
                }}
                defaultChecked
              />
              <span className="slider"></span>
              <span className="toggle-label">Public</span>
            </div>

            <button type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

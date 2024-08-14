import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaHome, FaInfoCircle, FaTrashAlt, FaQuestionCircle, FaPhone } from 'react-icons/fa';
import { FaCog, FaSignOutAlt, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'; 
import './Settings.css';
import '../layout.css'
import '../dashboard/Dashboard.css'

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'personal' | 'refer' | 'delete' | 'faq' | 'support'>('personal');
  const [currentValue, setCurrentValue] = useState('');
  const [desiredValue1, setDesiredValue1] = useState('');
  const [desiredValue2, setDesiredValue2] = useState('');
  const [email, setEmail] = useState('');
  const [popupMessage, setPopupMessage] = useState('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navigate = useNavigate();

  const handlePersonalInfoChange = () => {
    setPopupMessage('Did it!');
  };

  const handleReferAFriend = () => {
    if (email) {
      console.log(`Sending referral email to: ${email}`);
      setPopupMessage('Referral email sent!');
    } else {
      setPopupMessage('Please enter an email address.');
    }
  };

  const handleTabChange = (tab: 'personal' | 'refer' | 'delete' | 'faq' | 'support') => {
    setSelectedTab(tab);
    setPopupMessage('');
  };

  const handleContactSupport = () => {
    window.open('mailto:your-email@example.com', '_blank');
    window.open('https://discord.com/app', '_blank');
  };

  const handleHome = () => {
    navigate('/dashboard');
  }

  return (
    <div className="dashboard">
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
      <header className="top-bar">
        <h1>Settings</h1>
        <div className="button-row">
          {/* <button onClick={handleHome}><FaHome /> Dashboard</button> */}
          <button onClick={() => handleTabChange('personal')}><FaUser /> Change Personal Information</button>
          <button onClick={() => handleTabChange('refer')}><FaEnvelope /> Refer a Friend</button>
          <button onClick={() => handleTabChange('delete')}><FaTrashAlt /> Delete Account</button>
          <button onClick={() => handleTabChange('faq')}><FaQuestionCircle /> FAQ</button>
          <button onClick={() => handleTabChange('support')}><FaPhone /> Contact Support</button>
          </div>
      </header>
      
      <main className="settings-content">
        {popupMessage && <div className="popup">{popupMessage}</div>}
        {selectedTab === 'personal' && (
          <div className="personal-info">
            <h2>Change Personal Information</h2>
            <div className="form-group">
              <label>Current Value:</label>
              <input type="text" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Desired Value (1):</label>
              <input type="text" value={desiredValue1} onChange={(e) => setDesiredValue1(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Desired Value (2):</label>
              <input type="text" value={desiredValue2} onChange={(e) => setDesiredValue2(e.target.value)} />
            </div>
            <button onClick={handlePersonalInfoChange}>Submit</button>
          </div>
        )}
        {selectedTab === 'refer' && (
          <div className="refer-friend">
            <h2>Refer a Friend</h2>
            <div className="form-group">
              <label>Email Address:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button onClick={handleReferAFriend}>Send Referral Email</button>
          </div>
        )}
        {selectedTab === 'delete' && (
          <div className="info">
            <h2>Delete Account</h2>
            <button onClick={() => setPopupMessage('Account deletion functionality is not yet implemented.')}>Delete Account</button>
          </div>
        )}
        {selectedTab === 'faq' && (
          <div className="info">
            <h2>FAQ</h2>
            <button onClick={() => setPopupMessage('FAQ functionality is not yet implemented.')}>FAQ</button>
          </div>
        )}
        {selectedTab === 'support' && (
          <div className="info">
            <h2>Contact Support</h2>
            <p>
              For support, please email me at{' '}
              <a href="mailto:your-email@example.com">your-email@example.com</a> or join my{' '}
              <a href="https://discord.gg/your-discord-server">Discord server</a>.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;

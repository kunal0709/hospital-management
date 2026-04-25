


import React, { useState, useEffect } from 'react';
import "../stylesheets/Navbar.css";

export default function Navbar() {
  const [time, setTime] = useState(new Date());

  // Live Clock update karne ke liye
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="glass-navbar">
      <div className="nav-left">
        <div className="brand-logo">
          <span className="logo-icon"></span>
          <h1 className="navbar-title">MediCore <span className="title-alt">OS</span></h1>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-stats">
          <span className="live-clock">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
          <span className="status-indicator">● System Active</span>
        </div>

        <div className="divider"></div>

        <div className="navbar-user-profile">
          <div className="user-info">
            <span className="user-name">Super Admin</span>
            <span className="user-role">Hospital Manager</span>
          </div>
          <div className="avatar-circle">AD</div>
        </div>
      </div>
    </nav>
  );
}
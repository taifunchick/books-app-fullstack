import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="container">
        <h1>📚 Book Manager</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">Add Book</Link>
          <span className="user-name">👤 {user?.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
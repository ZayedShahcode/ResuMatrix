import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: 'black',
    color: 'white',
    width: '100%'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 15px',
    fontWeight: 'bold',
  };

  const ulStyle = {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '20px'
  };

  const liStyle = {
    margin: 0,
    padding: 0
  };

  return (
    <nav style={navStyle}>
      <div style={{ fontSize: '1.8em' }}>
        <Link to="/" style={linkStyle}>ResuMatrix</Link>
      </div>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to='/' style={linkStyle}>Home</Link>
        </li>
        <li style={liStyle}>
          <Link to='/About' style={linkStyle}>About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
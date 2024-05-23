import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="https://sumeetbidhan.netlify.app/" target='blank' className="navbar-name">Sumeet Bidhan</a>
      </div>
      <div className="navbar-center">
        <a href="#home" className="navbar-button">Home</a>
        <div className="navbar-dropdown">
          <button className="navbar-button">Visulaizations!</button>
          <div className="dropdown-content">
            <a href="#project1">Indian Vaccine Dose</a>
            <a href="#project2">Annual Mean Temperature</a>
            <a href="#project3">Property Prices</a>
          </div>
        </div>
        <a href="https://sumeetbidhan.netlify.app/#contact" target='blank' className="navbar-button">Contact Me</a>
      </div>
      <div className="navbar-right">
        <a href="https://www.linkedin.com/in/sumeetbidhanwork/" target='blank' className="navbar-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" />
        </a>
        <a href="https://github.com/sumeetbidhan/" target='blank' className="navbar-icon">
          <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;

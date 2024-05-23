import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        © Sumeet Bidhan. All rights reserved.
      </div>
      <div className="footer-right">
        <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="footer-icon-li" />
        </a>
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png"  alt="GitHub" className="footer-icon-git"/>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

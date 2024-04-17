import React from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='footer-parent bg-dark'>
      <div className="footer-content">
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>123 Main Street, Cityville</p>
        </div>

        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/Orders">Orders</a></li>
            {/* Add more links as needed */}
          </ul>
        </div>


        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            {/* Add more social media icons and links as needed */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
        {/* Add additional copyright or disclaimer information */}
      </div>
    </footer>
  );
};

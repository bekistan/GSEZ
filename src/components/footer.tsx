// components/Footer.tsx
'use client'
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <div>
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://facebook.com" target="_blank" className="flex items-center hover:text-gray-400 transition duration-300">
                  <FaFacebook className="mr-2" /> Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" className="flex items-center hover:text-gray-400 transition duration-300">
                  <FaTwitter className="mr-2" /> Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" className="flex items-center hover:text-gray-400 transition duration-300">
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-gray-400 transition duration-300">Home</a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-400 transition duration-300">About</a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-400 transition duration-300">Services</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400 transition duration-300">Contact</a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <span>1234 Street Name</span>
              </li>
              <li>
                <span>City, State, 12345</span>
              </li>
              <li>
                <span>Email: info@example.com</span>
              </li>
              <li>
                <span>Phone: (123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <div className="bg-black text-white text-center py-4">
    <p>&copy; {new Date().getFullYear()} Gada Special Economy Zone. All rights reserved.</p>
  </div>
</div>

  );
};

export default Footer;

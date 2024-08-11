'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

const Navbar: React.FC = () => {
  const { user, role, logOut } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isInvolvedDropdownOpen, setIsInvolvedDropdownOpen] = useState(false);
  const [isResourceDropdownOpen, setIsResourceDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const involvedDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const resourceDropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const profileDropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle hover and click for profile dropdown
  const handleProfileDropdown = (open: boolean) => {
    clearTimeout(profileDropdownTimeout.current!);
    setIsProfileDropdownOpen(open);
  };

  // Handle hover and click for involved dropdown
  const handleInvolvedDropdown = (open: boolean) => {
    clearTimeout(involvedDropdownTimeout.current!);
    setIsInvolvedDropdownOpen(open);
  };

  // Handle hover and click for resource dropdown
  const handleResourceDropdown = (open: boolean) => {
    clearTimeout(resourceDropdownTimeout.current!);
    setIsResourceDropdownOpen(open);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !event.target?.closest('.profile-dropdown') &&
        !event.target?.closest('.involved-dropdown') &&
        !event.target?.closest('.resource-dropdown')
      ) {
        setIsProfileDropdownOpen(false);
        setIsInvolvedDropdownOpen(false);
        setIsResourceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20 bg-transparent text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div  style={{ fontFamily: 'var(--font-merriweather)'}}  className="text-lg font-bold ">
          <Link className='p-1 bg-gradient-to-r from-red-400 via-red-500 to-red-800 ' href="/">GSEZ</Link>
        </div>
        {/* Mobile Menu Button */}
        <button className="text-light-grey md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <AiOutlineClose className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
        <div style={{ fontFamily: 'var(--font-merriweather)'}} className={`md:flex md:space-x-4 flex-col md:flex-row items-center ${isMobileMenuOpen ? 'block' : 'hidden'} md:block mt-4 md:mt-0`}>
          <Link href="/" className="text-light-grey hover:text-white-500 block md:inline-block py-2 md:py-0 hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800 block p-1">HOME</Link>
          <Link href="/news" className="text-light-grey hover:text-white-500 block md:inline-block py-2 md:py-0 hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800 block p-1">BLOG</Link>
          <div
            className="relative group involved-dropdown block md:inline-block"
            onMouseEnter={() => handleInvolvedDropdown(true)}
            onMouseLeave={() => involvedDropdownTimeout.current = setTimeout(() => handleInvolvedDropdown(false), 200)}
          >
            <button
              className={`text-light-grey hover:text-red-500 focus:outline-none w-full md:w-auto text-left md:text-center py-2 md:py-0`}
              onClick={() => handleInvolvedDropdown(!isInvolvedDropdownOpen)}
            >
              GET INVOLVED
            </button>
            <div className={`absolute left-0 md:left-auto ${isInvolvedDropdownOpen ? 'block' : 'hidden'} bg-gradient-to-r from-red-400 via-red-500 to-red-800  mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20`}>
              <Link href="/invest" className="block px-4 py-2  hover:bg-red-800 hover:text-white">INVEST</Link>
              <Link href="/donation" className="block px-4 py-2 hover:bg-red-800 hover:text-white">DONATION</Link>
            </div>
          </div>
          <div
            className="relative group resource-dropdown block md:inline-block"
            onMouseEnter={() => handleResourceDropdown(true)}
            onMouseLeave={() => resourceDropdownTimeout.current = setTimeout(() => handleResourceDropdown(false), 200)}
          >
            <button
              className={`text-light-grey hover:text-red-500 focus:outline-none w-full md:w-auto text-left md:text-center py-2 md:py-0 `}
              onClick={() => handleResourceDropdown(!isResourceDropdownOpen)}
            >
              RESOURCES
            </button>
            <div className={`absolute left-0 md:left-auto ${isResourceDropdownOpen ? 'block' : 'hidden'} bg-gradient-to-r from-red-400 via-red-500 to-red-800  mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20`}>
              <Link href="/usefuldocs" className="block px-4 py-2 hover:bg-red-800 hover:text-white">USEFUL DOCUMENTS</Link>
              <Link href="/media" className="block px-4 py-2 hover:bg-red-800 hover:text-white">GALLERY</Link>
            </div>
          </div>
          <Link href="/about" className="p-1 text-light-grey hover:text-white-500 hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800 block md:inline-block py-2 md:py-0 hover:bg-cover">ABOUT</Link>
          <Link href="/contact" className="text-light-grey hover:text-white-500 block md:inline-block py-2 md:py-0 hover:bg-gradient-to-r from-red-400 via-red-500 to-red-800 block">CONTACT</Link>
          {user ? (
            <div
              className="relative group profile-dropdown block md:inline-block"
              onMouseEnter={() => handleProfileDropdown(true)}
              onMouseLeave={() => profileDropdownTimeout.current = setTimeout(() => handleProfileDropdown(false), 200)}
            >
              <button
                className={`text-light-grey hover:text-red-500 focus:outline-none flex items-center w-full md:w-auto text-left md:text-center py-2 md:py-0`}
                onClick={() => handleProfileDropdown(!isProfileDropdownOpen)}
              >
                <FaUserCircle className="text-2xl" />
              </button>
              <div className={`absolute right-0 ${isProfileDropdownOpen ? 'block' : 'hidden'} bg-gradient-to-r from-red-400 via-red-500 to-red-800  group-hover:block mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20`}>
                <Link href={role === 'admin' ? '/admindashboard' : '/userdashboard'} className="block px-4 py-2 hover:bg-red-800 hover:text-white">Dashboard</Link>
                <Link href="/userdashboard" className="block px-4 py-2 hover:bg-red-800 hover:text-white">Change Password</Link>
                <button onClick={logOut} className="block w-full text-left px-4 py-2 hover:bg-red-800 hover:text-white">Logout</button>
              </div>
            </div>
          ) : (
            <Link href="/login" className="block md:inline-block">
              <button className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold py-1 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
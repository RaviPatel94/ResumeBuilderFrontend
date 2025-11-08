"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { logoutUser } from '@/store/userSlice';

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, email } = useSelector((state: RootState) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsMenuOpen(false);
    router.push('/');
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full absolute top-0 z-[100] bg-white shadow-md">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl sm:text-2xl font-bold text-black">
          ResumeBuilder
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link 
            href="/" 
            className="text-black hover:text-[#10B981] transition cursor-pointer"
          >
            Home
          </Link>
          <Link 
            href="/templates" 
            className="text-black hover:text-[#10B981] transition cursor-pointer"
          >
            Templates
          </Link>
          
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 active:bg-red-700 transition cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#0F9A6B] active:bg-[#0D8A5C] transition cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close icon
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg 
              className="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            <Link 
              href="/" 
              onClick={handleLinkClick}
              className="block py-2 text-black hover:text-[#10B981] transition cursor-pointer"
            >
              Home
            </Link>
            <Link 
              href="/templates" 
              onClick={handleLinkClick}
              className="block py-2 text-black hover:text-[#10B981] transition cursor-pointer"
            >
              Templates
            </Link>
            
            <div className="pt-2">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 active:bg-red-700 transition cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-2 rounded-lg bg-[#10B981] text-white font-semibold hover:bg-[#0F9A6B] active:bg-[#0D8A5C] transition text-center cursor-pointer"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
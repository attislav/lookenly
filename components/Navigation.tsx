'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchBar from './SearchBar';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Beauty', href: '/category/beauty' },
    { name: 'Lifestyle', href: '/category/lifestyle' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold text-black tracking-wider hover:text-amber-900 transition-colors duration-300">
              Lookenly
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-montserrat text-sm tracking-widest uppercase text-neutral-700 hover:text-amber-900 transition-colors duration-300 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-900 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            {/* Search Bar */}
            <SearchBar />
          </div>

          {/* Mobile Menu Button & Search */}
          <div className="md:hidden flex items-center gap-2">
            <SearchBar />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-700 hover:text-amber-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-2 border-t border-neutral-200">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 px-4 font-montserrat text-sm tracking-widest uppercase text-neutral-700 hover:text-amber-900 hover:bg-neutral-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

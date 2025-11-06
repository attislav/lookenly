'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import { siteConfig } from '@/config/site.config';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  // Build menu items: combine header links with WordPress categories
  const menuItems = useMemo(() => {
    const items = [];

    // Add Home link first (if exists)
    const homeLink = siteConfig.navigation.header.find(item => item.href === '/');
    if (homeLink) {
      items.push(homeLink);
    }

    // Add WordPress categories from menuCategories (if any)
    if (siteConfig.navigation.menuCategories && siteConfig.navigation.menuCategories.length > 0) {
      const categoryLinks = siteConfig.navigation.menuCategories.map(cat => ({
        label: cat.name,
        href: `/category/${cat.slug}`,
        external: false
      }));
      items.push(...categoryLinks);
    }

    // Add other header links (excluding Home and category links)
    const otherLinks = siteConfig.navigation.header.filter(
      item => item.href !== '/' && !item.href.startsWith('/category/')
    );
    items.push(...otherLinks);

    return items;
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-secondary sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold text-gray-900 tracking-wider hover:text-primary transition-colors duration-300">
              {siteConfig.brand.logo?.text || siteConfig.site.name}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-montserrat text-sm tracking-widest uppercase text-neutral-700 hover:text-primary transition-colors duration-300 relative group"
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
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
              className="p-2 text-neutral-700 hover:text-primary"
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
          <div className="md:hidden pb-6 pt-2 border-t border-secondary">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 px-4 font-montserrat text-sm tracking-widest uppercase text-neutral-700 hover:text-primary hover:bg-secondary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

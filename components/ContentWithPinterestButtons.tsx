'use client';

import { useEffect } from 'react';

interface ContentWithPinterestButtonsProps {
  content: string;
  postUrl: string;
  postTitle: string;
  className?: string;
}

export default function ContentWithPinterestButtons({
  content,
  postUrl,
  postTitle,
  className = '',
}: ContentWithPinterestButtonsProps) {
  useEffect(() => {
    // Handle old anchor format in URL (#Capitalized-Text) and convert to WordPress format (#toc-lowercase-text)
    const handleAnchorRedirect = () => {
      const hash = window.location.hash;
      if (!hash || hash.startsWith('#toc-')) return; // Already correct format or no hash

      // Convert old format to new: #Belted-Coat... → #toc-belted-coat...
      const newHash = '#toc-' + hash.slice(1).toLowerCase();
      const targetElement = document.getElementById(newHash.slice(1));

      if (targetElement) {
        // Smooth scroll to element
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Update URL without reload
        window.history.replaceState(null, '', newHash);
      }
    };

    // Run on initial load
    handleAnchorRedirect();

    // Add IDs to all headings for anchor link functionality
    const addHeadingIds = () => {
      const headings = document.querySelectorAll('.blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4, .blog-content h5, .blog-content h6');

      headings.forEach((heading) => {
        // Skip if ID already exists (WordPress may have already set it)
        if (heading.id) {
          // Just add scroll margin if ID exists
          heading.style.scrollMarginTop = '100px';
          return;
        }

        // Generate ID matching WordPress TOC format: toc-lowercase-with-dashes
        const text = heading.textContent || '';
        const slug = text
          .toLowerCase()
          .trim()
          .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes with regular quotes
          .replace(/[\u201C\u201D]/g, '"') // Replace smart double quotes
          .replace(/\u2013/g, '-') // Replace en dash
          .replace(/\u2014/g, '-') // Replace em dash
          .replace(/[^\w\s-]/g, '') // Remove special characters
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-'); // Remove consecutive hyphens

        if (slug) {
          heading.id = `toc-${slug}`;
          // Also add scroll margin for smooth scroll with fixed header
          heading.style.scrollMarginTop = '100px';
        }
      });
    };

    // Run heading ID generation
    addHeadingIds();

    // Function to add Pinterest button to an image
    const addPinterestButton = (htmlImg: HTMLImageElement) => {
      // Skip if button already added
      if (htmlImg.parentElement?.classList.contains('pinterest-image-wrapper')) {
        return;
      }

      // Skip broken images
      if (htmlImg.naturalWidth === 0) {
        return;
      }

      // Skip small images (less than 300px in width or height)
      if (htmlImg.naturalWidth < 300 && htmlImg.naturalHeight < 300) {
        return;
      }

      // Set fixed max-width of 800px for content images
      const maxWidth = 800;

      // Set max-width on the image itself
      htmlImg.style.maxWidth = `${maxWidth}px`;
      htmlImg.style.height = 'auto';
      htmlImg.style.display = 'block';
      htmlImg.style.margin = '0 auto'; // Center the image

      // Also check if image is wrapped in .wp-block-image and set max-width there
      const wpBlockImage = htmlImg.closest('.wp-block-image');
      if (wpBlockImage) {
        (wpBlockImage as HTMLElement).style.maxWidth = `${maxWidth}px`;
        (wpBlockImage as HTMLElement).style.margin = '2.5rem auto'; // Center and keep vertical margin
      }

      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'pinterest-image-wrapper relative group';
      wrapper.style.maxWidth = `${maxWidth}px`;
      wrapper.style.margin = '0 auto'; // Center the wrapper

      // Wrap image
      htmlImg.parentNode?.insertBefore(wrapper, htmlImg);
      wrapper.appendChild(htmlImg);

      // Create Pinterest button
      const button = document.createElement('button');
      button.className =
        'absolute top-4 right-4 bg-[#E60023] hover:bg-[#AD081B] text-white px-4 py-2 rounded-full font-montserrat text-xs tracking-widest uppercase shadow-lg transition-all duration-300 flex items-center gap-2 z-10';
      button.innerHTML = `
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
        <span>Pin it!</span>
      `;

      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const imageUrl = htmlImg.src;
        const description = htmlImg.alt || postTitle;

        const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
          postUrl
        )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(description)}`;

        window.open(
          pinterestUrl,
          'pinterest-share',
          'width=750,height=550,resizable=yes,scrollbars=yes'
        );
      });

      wrapper.appendChild(button);
    };

    // Find all images in the content (exclude hero image in article header)
    const images = document.querySelectorAll('.blog-content img');

    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;

      // If image is already loaded, add button immediately
      if (htmlImg.complete && htmlImg.naturalWidth > 0) {
        addPinterestButton(htmlImg);
      } else {
        // Otherwise, wait for image to load
        htmlImg.addEventListener('load', () => {
          addPinterestButton(htmlImg);
        });

        // Also handle error case
        htmlImg.addEventListener('error', () => {
          console.warn('Image failed to load:', htmlImg.src);
        });
      }
    });
  }, [content, postUrl, postTitle]);

  return (
    <div
      className={`blog-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

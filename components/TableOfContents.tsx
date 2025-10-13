'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Parse HTML und finde alle H2
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2');

    const items: TocItem[] = [];
    headings.forEach((heading, index) => {
      const text = heading.textContent || '';
      // Erstelle slug aus Heading-Text
      const id = `toc-${text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')}`;

      // Setze ID im echten DOM
      const realHeadings = document.querySelectorAll('.blog-content h2');
      if (realHeadings[index]) {
        realHeadings[index].setAttribute('id', id);
      }

      items.push({
        id,
        text,
        level: 2,
      });
    });

    setTocItems(items);

    // Intersection Observer für aktives Highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
      }
    );

    // Beobachte alle H2
    setTimeout(() => {
      const h2Elements = document.querySelectorAll('.blog-content h2[id]');
      h2Elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // 100px Offset für Header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <nav className="bg-neutral-50 border border-neutral-200 rounded-none mb-12">
      {/* Header - Always Visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-neutral-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-amber-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          <span className="font-montserrat text-sm font-semibold text-neutral-900 tracking-wide uppercase">
            {tocItems.length} {tocItems.length === 1 ? 'Section' : 'Sections'}
          </span>
        </div>

        {/* Expand/Collapse Icon */}
        <svg
          className={`w-5 h-5 text-neutral-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* ToC Links - Collapsible */}
      {isExpanded && (
        <div className="px-5 pb-4">
          {/* 2 Columns on Desktop */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {tocItems.map((item, index) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToHeading(item.id)}
                  className={`text-left w-full font-montserrat text-xs transition-all duration-200 flex items-start gap-2 py-1 group ${
                    activeId === item.id
                      ? 'text-amber-900 font-semibold'
                      : 'text-neutral-600 hover:text-amber-900'
                  }`}
                >
                  {/* Numbered Indicator */}
                  <span
                    className={`mt-0.5 flex-shrink-0 font-semibold transition-all duration-200 ${
                      activeId === item.id
                        ? 'text-amber-900'
                        : 'text-neutral-400 group-hover:text-amber-900'
                    }`}
                  >
                    {index + 1}.
                  </span>

                  {/* Text */}
                  <span className="flex-1 leading-snug">
                    {item.text.replace(/<[^>]*>/g, '')} {/* Strip HTML */}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

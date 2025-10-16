'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optional: Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-custom flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <svg
            className="w-24 h-24 mx-auto text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Decorative Line */}
        <div className="w-24 h-px bg-primary mx-auto mb-8"></div>

        {/* Message */}
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Something Went Wrong
        </h1>

        <p className="font-montserrat text-base text-neutral-600 leading-relaxed mb-4 max-w-lg mx-auto">
          We encountered an unexpected error. Don't worry, our team has been notified
          and we're working on fixing it.
        </p>

        {/* Error Details (nur in Development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-secondary rounded text-left max-w-lg mx-auto">
            <p className="font-mono text-xs text-neutral-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
          <button
            onClick={reset}
            className="inline-block bg-primary text-white px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary transition-all duration-300"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-block border border-primary text-text-primary px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-16 pt-12 border-t border-secondary">
          <p className="font-montserrat text-xs tracking-widest uppercase text-neutral-500 mb-4">
            Need Help?
          </p>
          <p className="font-montserrat text-sm text-neutral-600">
            If this problem persists,{' '}
            <Link href="/about" className="text-primary hover:underline">
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

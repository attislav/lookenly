'use client';

import Image from 'next/image';
import { useState } from 'react';
import ImageSkeleton from './ImageSkeleton';

interface PinterestImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  aspectRatio?: string;
}

export default function PinterestImage({
  src,
  alt,
  width = 900,
  height = 600,
  className = '',
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw",
  quality = 85,
  aspectRatio = 'aspect-[3/2]',
}: PinterestImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton Loader */}
      {isLoading && <ImageSkeleton aspectRatio={aspectRatio} className="absolute inset-0" />}

      {/* Actual Image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover w-full h-full hover:scale-105 transition-all duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          priority={priority}
          sizes={sizes}
          quality={quality}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className={`${aspectRatio} bg-neutral-100 flex items-center justify-center`}>
          <div className="text-center text-neutral-400">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="font-montserrat text-xs">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
}

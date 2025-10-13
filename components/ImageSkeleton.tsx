interface ImageSkeletonProps {
  className?: string;
  aspectRatio?: string; // z.B. "aspect-[3/2]"
}

export default function ImageSkeleton({
  className = '',
  aspectRatio = 'aspect-[3/2]'
}: ImageSkeletonProps) {
  return (
    <div
      className={`relative ${aspectRatio} bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-pulse overflow-hidden ${className}`}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

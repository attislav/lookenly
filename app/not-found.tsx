import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-custom flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Number */}
        <h1 className="font-playfair text-9xl md:text-[12rem] font-bold text-neutral-200 leading-none mb-8">
          404
        </h1>

        {/* Decorative Line */}
        <div className="w-24 h-px bg-primary mx-auto mb-8"></div>

        {/* Message */}
        <h2 className="font-playfair text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Page Not Found
        </h2>

        <p className="font-montserrat text-base text-neutral-600 leading-relaxed mb-12 max-w-lg mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back to discovering beautiful content.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-block bg-primary text-white px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary transition-all duration-300"
          >
            Back to Home
          </Link>

          <Link
            href="/about"
            className="inline-block border border-primary text-gray-900 px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300"
          >
            About Us
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-12 border-t border-secondary">
          <p className="font-montserrat text-xs tracking-widest uppercase text-neutral-500 mb-6">
            Explore Categories
          </p>
          <div className="flex gap-8 justify-center text-sm">
            <Link
              href="/category/fashion"
              className="font-montserrat text-neutral-600 hover:text-primary transition-colors"
            >
              Fashion
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/category/beauty"
              className="font-montserrat text-neutral-600 hover:text-primary transition-colors"
            >
              Beauty
            </Link>
            <span className="text-neutral-300">|</span>
            <Link
              href="/category/lifestyle"
              className="font-montserrat text-neutral-600 hover:text-primary transition-colors"
            >
              Lifestyle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

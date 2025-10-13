import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6">
            About Lookenly
          </h1>
          <div className="w-16 h-px bg-amber-200 mx-auto mb-8"></div>
          <p className="font-montserrat text-lg tracking-wide text-neutral-300">
            The art of refined living
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-16">
            <div className="relative w-48 h-48 rounded-full border-2 border-amber-900 overflow-hidden">
              <Image
                src="/images/author-portrait.jpg"
                alt="Author Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-playfair text-4xl font-bold mb-6 text-neutral-900">
                Hi, I'm Sophia Laurent
              </h2>
              <p className="font-montserrat text-base text-neutral-600 leading-relaxed mb-6">
                Welcome to Lookenly—a space I created for those who believe that style
                is not about following trends, but about discovering what truly resonates
                with your soul.
              </p>
            </div>

            {/* Story Section */}
            <div className="max-w-3xl mx-auto space-y-8">
              <div>
                <h3 className="font-playfair text-2xl font-bold mb-4 text-neutral-900">
                  My Story
                </h3>
                <p className="font-montserrat text-base text-neutral-600 leading-relaxed mb-4">
                  I grew up in the bustling heart of Paris, surrounded by the effortless
                  elegance that defines French culture. My grandmother, a former couture
                  seamstress for Dior in the 1960s, taught me that true style isn't found
                  in price tags—it's in the way a garment makes you feel, the confidence
                  it gives you when you walk into a room.
                </p>
                <p className="font-montserrat text-base text-neutral-600 leading-relaxed mb-4">
                  After studying fashion journalism at the Institut Français de la Mode,
                  I spent nearly a decade working for international fashion magazines in
                  Paris, Milan, and New York. I attended countless runway shows, interviewed
                  legendary designers, and witnessed the industry's relentless pace firsthand.
                  But somewhere along the way, I felt disconnected from what fashion meant
                  to me personally.
                </p>
                <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                  In 2019, I made the decision to step away from the chaos and return to
                  what I truly loved: sharing the quiet beauty of thoughtful living. I moved
                  to a sun-drenched loft in Barcelona, and Lookenly was born—a digital haven
                  where elegance meets authenticity.
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <h3 className="font-playfair text-2xl font-bold mb-4 text-neutral-900">
                  Why I Write
                </h3>
                <p className="font-montserrat text-base text-neutral-600 leading-relaxed mb-4">
                  I write because I believe that in a world of endless noise, we all crave
                  spaces that feel calm, intentional, and real. Fashion shouldn't intimidate
                  you—it should inspire you. Beauty shouldn't be about perfection—it should
                  be about celebrating who you are.
                </p>
                <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                  Through Lookenly, I share the pieces, rituals, and ideas that have shaped
                  my own journey toward a more refined, meaningful life. Whether it's the
                  perfect linen blazer, a morning skincare routine, or simply the art of
                  savoring a quiet afternoon with a good book—this is where timeless meets
                  tangible.
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <h3 className="font-playfair text-2xl font-bold mb-4 text-neutral-900">
                  What Inspires Me
                </h3>
                <div className="space-y-3">
                  <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                    <span className="font-semibold text-neutral-900">Morning light</span> streaming
                    through linen curtains, the way it transforms an ordinary room into something sacred.
                  </p>
                  <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                    <span className="font-semibold text-neutral-900">Old Parisian cafés</span> where
                    time slows down, and people-watching becomes an art form.
                  </p>
                  <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                    <span className="font-semibold text-neutral-900">Vintage silk scarves</span> from
                    flea markets—each one with a story to tell.
                  </p>
                  <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                    <span className="font-semibold text-neutral-900">The Mediterranean coast</span>,
                    where simplicity and beauty coexist effortlessly.
                  </p>
                  <p className="font-montserrat text-base text-neutral-600 leading-relaxed">
                    <span className="font-semibold text-neutral-900">Women who own their presence</span>—not
                    through perfection, but through quiet confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <div className="border-t border-neutral-200 pt-12">
              <h3 className="font-playfair text-3xl font-bold mb-6 text-center text-neutral-900">
                Our Philosophy
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-px h-12 bg-amber-900"></div>
                  </div>
                  <h4 className="font-montserrat text-sm tracking-widest uppercase text-neutral-900 mb-3">
                    Timeless
                  </h4>
                  <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                    Beyond fleeting trends, we celebrate enduring elegance and
                    classic sophistication.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-px h-12 bg-amber-900"></div>
                  </div>
                  <h4 className="font-montserrat text-sm tracking-widest uppercase text-neutral-900 mb-3">
                    Refined
                  </h4>
                  <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                    Every detail matters. We curate with intention and
                    present with precision.
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <div className="w-px h-12 bg-amber-900"></div>
                  </div>
                  <h4 className="font-montserrat text-sm tracking-widest uppercase text-neutral-900 mb-3">
                    Inspiring
                  </h4>
                  <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                    We seek to inspire confident self-expression through
                    thoughtful content.
                  </p>
                </div>
              </div>
            </div>

            {/* What You'll Find */}
            <div className="border-t border-neutral-200 pt-12">
              <h3 className="font-playfair text-3xl font-bold mb-10 text-center text-neutral-900">
                What You'll Discover
              </h3>
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-1 h-1 bg-amber-900 mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-montserrat text-sm tracking-widest uppercase text-neutral-900 mb-2">
                      Fashion
                    </h4>
                    <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                      Curated looks, styling insights, and timeless wardrobe essentials
                      that transcend seasons.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-1 h-1 bg-amber-900 mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-montserrat text-sm tracking-widest uppercase text-neutral-900 mb-2">
                      Beauty
                    </h4>
                    <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                      Refined beauty rituals, sophisticated techniques, and
                      thoughtfully reviewed products.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-1 h-1 bg-amber-900 mt-2"></div>
                  </div>
                  <div>
                    <h4 className="font-montserrat text-sm tracking-widest uppercase text-neutral-900 mb-2">
                      Lifestyle
                    </h4>
                    <p className="font-montserrat text-sm text-neutral-600 leading-relaxed">
                      The art of living well—from interior inspiration to mindful
                      daily practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-4xl font-bold mb-6">
            Let's Connect
          </h3>
          <div className="w-16 h-px bg-amber-200 mx-auto mb-8"></div>
          <p className="font-montserrat text-base text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Follow along for daily inspiration and join a community
            that celebrates timeless style and refined living.
          </p>
          <div className="flex gap-8 justify-center">
            <a
              href="#"
              className="font-montserrat text-sm tracking-widest uppercase text-neutral-400 hover:text-amber-200 transition-colors"
            >
              Pinterest
            </a>
            <span className="text-neutral-700">|</span>
            <a
              href="#"
              className="font-montserrat text-sm tracking-widest uppercase text-neutral-400 hover:text-amber-200 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-4xl font-bold mb-6 text-neutral-900">
            Stay Inspired
          </h3>
          <p className="font-montserrat text-sm text-neutral-600 mb-10 tracking-wide">
            Subscribe to receive curated insights on fashion, beauty, and lifestyle.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 px-6 py-4 border border-neutral-300 font-montserrat text-sm focus:outline-none focus:border-amber-900 transition-colors"
            />
            <button
              type="submit"
              className="bg-black text-white px-10 py-4 font-montserrat text-sm tracking-widest uppercase hover:bg-amber-900 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

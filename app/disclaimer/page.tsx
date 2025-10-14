import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | Lookenly',
  description: 'Disclaimer for Lookenly - Important information about our content and recommendations.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Disclaimer
          </h1>
          <p className="text-neutral-600 text-lg">
            Last Updated: January 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-sm rounded-lg p-8 md:p-12 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-neutral-700 leading-relaxed mb-4">
              The information provided on Lookenly is for general informational and entertainment purposes only.
              All information on the site is provided in good faith, however we make no representation or
              warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability,
              availability, or completeness of any information on the site.
            </p>
          </section>

          {/* General Information */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              1. General Information Disclaimer
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              The content on Lookenly, including articles, blog posts, images, and recommendations, is intended
              for informational purposes only. While we strive to provide accurate and up-to-date information,
              we make no guarantees about the completeness, reliability, or accuracy of this information.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Any action you take based on the information found on this website is strictly at your own risk.
              We will not be liable for any losses or damages in connection with the use of our website.
            </p>
          </section>

          {/* Fashion and Beauty Advice */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              2. Fashion and Beauty Advice
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              The fashion, beauty, and lifestyle advice provided on Lookenly represents our opinions and
              experiences. What works for us may not work for you. We are not professional stylists,
              dermatologists, or medical professionals unless explicitly stated.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              <strong>Beauty Products and Skincare:</strong> Before using any beauty or skincare products
              mentioned on our site, please:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Check the ingredient list for potential allergens</li>
              <li>Perform a patch test before full application</li>
              <li>Consult with a dermatologist if you have sensitive skin or skin conditions</li>
              <li>Discontinue use if you experience any adverse reactions</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We are not responsible for any allergic reactions, skin irritations, or other adverse effects
              resulting from the use of products mentioned on our website.
            </p>
          </section>

          {/* Product Recommendations */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              3. Product Recommendations and Reviews
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Product recommendations and reviews on Lookenly are based on our personal experiences and opinions.
              Your experience with a product may differ. We recommend that you:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Research products independently before purchasing</li>
              <li>Read multiple reviews from various sources</li>
              <li>Consider your individual needs and preferences</li>
              <li>Check product specifications and return policies</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Product prices, availability, and specifications may change without notice. We are not responsible
              for any discrepancies between information on our site and actual product details.
            </p>
          </section>

          {/* Affiliate Links */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              4. Affiliate Links and Sponsored Content
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Lookenly may contain affiliate links to products and services. This means we may earn a commission
              if you make a purchase through these links at no additional cost to you.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We only recommend products and services that we genuinely believe in or have personally used.
              However, our participation in affiliate programs does not influence our editorial content. All
              opinions expressed are our own.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Sponsored content, if present, will be clearly marked as "Sponsored," "Advertisement," or "Paid Partnership."
            </p>
          </section>

          {/* External Links */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              5. External Links Disclaimer
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Our website may contain links to external websites that are not owned or controlled by Lookenly.
              We have no control over and assume no responsibility for the content, privacy policies, or
              practices of any third-party sites or services.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We strongly advise you to review the terms of service and privacy policies of any third-party
              sites you visit. The inclusion of any links does not imply a recommendation or endorsement of
              the views expressed within them.
            </p>
          </section>

          {/* Image and Copyright */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              6. Images and Copyright
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Images on Lookenly are either our own original content, licensed stock photos, or used with
              permission. We make every effort to properly attribute images and respect copyright laws.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you believe any content on our site infringes your copyright, please contact us at:{' '}
              <a href="mailto:hey@lookenly.com" className="text-amber-600 hover:text-amber-700 underline">
                hey@lookenly.com
              </a>
            </p>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              7. Testimonials and Reviews
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Any testimonials or reviews featured on Lookenly reflect the personal experiences of individuals
              and may not be representative of what others might experience. Individual results may vary.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We do not guarantee that you will achieve similar results or outcomes.
            </p>
          </section>

          {/* No Professional Advice */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              8. Not Professional Advice
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              The information on Lookenly is not intended to replace professional advice. We are not licensed
              professionals in any field unless explicitly stated. For specific concerns, please consult with
              appropriate professionals:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li><strong>Medical Issues:</strong> Consult a licensed healthcare provider or dermatologist</li>
              <li><strong>Legal Matters:</strong> Consult an attorney</li>
              <li><strong>Financial Decisions:</strong> Consult a financial advisor</li>
              <li><strong>Mental Health:</strong> Consult a licensed therapist or counselor</li>
            </ul>
          </section>

          {/* Errors and Omissions */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              9. Errors and Omissions
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              While we make every effort to ensure that information on Lookenly is accurate and current,
              errors and omissions may occur. We reserve the right to correct any errors, inaccuracies,
              or omissions and to change or update information at any time without prior notice.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We do not guarantee that the information on this website is complete, accurate, or up-to-date.
            </p>
          </section>

          {/* Fair Use */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              10. Fair Use Notice
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              This website may contain copyrighted material, the use of which may not have been specifically
              authorized by the copyright owner. We believe this constitutes "fair use" of any such copyrighted
              material as provided for in section 107 of the US Copyright Law.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you wish to use copyrighted material from this site for purposes that go beyond fair use,
              you must obtain permission from the copyright owner.
            </p>
          </section>

          {/* Changes to Disclaimer */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              11. Changes to This Disclaimer
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may update this Disclaimer from time to time. Changes will be posted on this page with an
              updated "Last Updated" date. We encourage you to review this Disclaimer periodically.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              12. Contact Us
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you have any questions about this Disclaimer, please contact us:
            </p>
            <div className="text-neutral-700 space-y-2 pl-4">
              <p>
                <strong>Company:</strong> Triple A Digital
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:hey@lookenly.com" className="text-amber-600 hover:text-amber-700 underline">
                  hey@lookenly.com
                </a>
              </p>
              <p><strong>Website:</strong> lookenly.com</p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>By using Lookenly, you acknowledge that you have read and understood this Disclaimer</p>
        </div>
      </div>
    </main>
  );
}

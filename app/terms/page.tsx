import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Lookenly',
  description: 'Terms of Service for Lookenly - Read our terms and conditions for using our website.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Terms of Service
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
              Welcome to Lookenly. These Terms of Service ("Terms") govern your access to and use of our
              website, content, and services. By accessing or using Lookenly, you agree to be bound by
              these Terms.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              If you do not agree to these Terms, please do not use our website.
            </p>
          </section>

          {/* Agreement to Terms */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              1. Agreement to Terms
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              By accessing Lookenly, you agree that you have read, understood, and agree to be bound by these
              Terms. We reserve the right to modify these Terms at any time. Changes will be effective
              immediately upon posting. Your continued use of the website after changes are posted constitutes
              your acceptance of the modified Terms.
            </p>
          </section>

          {/* Use of Website */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              2. Use of Website
            </h2>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              License to Use
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We grant you a limited, non-exclusive, non-transferable, and revocable license to access and
              use our website for personal, non-commercial purposes. This license does not include:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Resale or commercial use of our content or services</li>
              <li>Collection and use of product listings, descriptions, or prices</li>
              <li>Derivative use of our website or its contents</li>
              <li>Downloading or copying of account information</li>
              <li>Use of data mining, robots, or similar data gathering tools</li>
            </ul>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Prohibited Activities
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Use the website for any illegal purpose or in violation of any laws</li>
              <li>Violate or infringe upon the rights of others</li>
              <li>Transmit viruses, malware, or other harmful code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Impersonate any person or entity</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Scrape or copy content without permission</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              3. Intellectual Property Rights
            </h2>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Our Content
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              All content on Lookenly, including text, graphics, logos, images, videos, and software, is the
              property of Lookenly or its content suppliers and is protected by international copyright,
              trademark, and other intellectual property laws.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              You may not reproduce, distribute, modify, create derivative works, publicly display, publicly
              perform, republish, download, store, or transmit any content from our website without our prior
              written consent, except as follows:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Your computer may temporarily store copies in RAM</li>
              <li>You may store files automatically cached by your browser</li>
              <li>You may print or download one copy of a reasonable number of pages for personal use</li>
              <li>You may share content via social media sharing buttons provided on the site</li>
            </ul>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              User-Generated Content
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you submit comments, feedback, or other content to Lookenly, you grant us a worldwide,
              non-exclusive, royalty-free, perpetual license to use, reproduce, modify, adapt, publish,
              translate, distribute, and display such content.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              4. Third-Party Websites and Content
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Our website may contain links to third-party websites or services that are not owned or
              controlled by Lookenly. We have no control over and assume no responsibility for the content,
              privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              You acknowledge and agree that we shall not be responsible or liable for any damage or loss
              caused by your use of any third-party content, goods, or services.
            </p>
          </section>

          {/* Affiliate Links */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              5. Affiliate Links and Advertising
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Lookenly may contain affiliate links to products and services. If you click on an affiliate link
              and make a purchase, we may receive a commission at no additional cost to you. This helps support
              our website and allows us to continue providing content.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may also display advertisements from third-party advertising networks. These advertisers may
              use cookies and tracking technologies to collect information about your visits.
            </p>
          </section>

          {/* Disclaimer of Warranties */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              THE WEBSITE AND ALL CONTENT ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR
              A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We do not warrant that:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>The website will be available at all times or error-free</li>
              <li>Defects will be corrected</li>
              <li>The website or server is free of viruses or harmful components</li>
              <li>The content is accurate, complete, reliable, or current</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              TO THE FULLEST EXTENT PERMITTED BY LAW, LOOKENLY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
              DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL DAMAGES EXCEED $100 USD.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              8. Indemnification
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless Lookenly and its officers, directors, employees,
              and agents from any claims, liabilities, damages, losses, and expenses, including reasonable
              attorney's fees, arising out of or in any way connected with:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Your access to or use of the website</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another party</li>
            </ul>
          </section>

          {/* Termination */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              9. Termination
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We reserve the right to terminate or suspend your access to our website immediately, without
              prior notice or liability, for any reason, including if you breach these Terms.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Upon termination, your right to use the website will immediately cease.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              10. Governing Law and Jurisdiction
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Germany,
              without regard to its conflict of law provisions.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Any disputes arising from these Terms or your use of the website shall be resolved in the German courts.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              11. Severability
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If any provision of these Terms is found to be unenforceable or invalid, that provision will be
              limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain
              in full force and effect.
            </p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              12. Entire Agreement
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              These Terms constitute the entire agreement between you and Lookenly regarding your use of the
              website and supersede all prior agreements and understandings.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              13. Contact Us
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
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
          <p>By using Lookenly, you acknowledge that you have read and understood these Terms of Service</p>
        </div>
      </div>
    </main>
  );
}

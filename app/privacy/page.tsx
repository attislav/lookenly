import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.site.name}`,
  description: `Privacy Policy for ${siteConfig.site.name} - Learn how we collect, use, and protect your personal information.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg-custom">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Privacy Policy
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
              At {siteConfig.site.name}, we respect your privacy and are committed to protecting your personal information.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
              you visit our website.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy,
              please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              1. Information We Collect
            </h2>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Automatically Collected Information
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages visited and time spent on pages</li>
              <li>Date and time of visit</li>
            </ul>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Information You Provide
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may collect information that you voluntarily provide to us, such as:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Email address (if you subscribe to our newsletter)</li>
              <li>Name and contact information (if you contact us)</li>
              <li>Comments or feedback you provide</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li>Operate and maintain our website</li>
              <li>Improve and optimize our website</li>
              <li>Understand how you use our website</li>
              <li>Send you newsletters and promotional materials (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Prevent fraudulent or illegal activities</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              3. Cookies and Tracking Technologies
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect and track information about your
              browsing activities. Cookies are small data files stored on your device.
            </p>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Types of Cookies We Use
            </h3>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site (if enabled)</li>
              <li><strong>Advertising Cookies:</strong> May be used to show you relevant ads (if enabled)</li>
            </ul>

            <p className="text-neutral-700 leading-relaxed mb-4">
              You can control cookies through your browser settings. However, disabling cookies may affect
              your ability to use certain features of our website.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              4. Third-Party Services
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may use third-party services to help us operate our website and understand our audience.
              These services may include:
            </p>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Hosting Services
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Our website is hosted on Vercel (Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA).
              Vercel may collect technical information such as IP addresses and browser information for
              security and performance purposes.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Learn more: {' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-primary underline"
              >
                Vercel Privacy Policy
              </a>
            </p>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              Content Management
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Our blog content is managed through WordPress hosted by Hostinger (HOSTINGER INTERNATIONAL LTD,
              61 Lordou Vironos Street, 6023 Larnaca, Cyprus).
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Learn more: {' '}
              <a
                href="https://www.hostinger.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-primary underline"
              >
                Hostinger Privacy Policy
              </a>
            </p>

            <div className="opacity-60 border-l-4 border-accent pl-6 mt-6">
              <h3 className="font-montserrat text-lg font-semibold text-stone-800 mb-3">
                Analytics Services (If Enabled)
              </h3>
              <p className="text-neutral-700 leading-relaxed mb-4 italic">
                Note: The following services are only active if configured via environment variables.
              </p>
              <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
                <li>
                  <strong>Google Analytics:</strong> Tracks website usage and visitor behavior.
                  View {' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary underline"
                  >
                    Google Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Pinterest Analytics:</strong> Tracks Pinterest-related activity.
                  View {' '}
                  <a
                    href="https://policy.pinterest.com/en/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary underline"
                  >
                    Pinterest Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Meta (Facebook) Pixel:</strong> Tracks conversions and visitor behavior.
                  View {' '}
                  <a
                    href="https://www.facebook.com/privacy/policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary underline"
                  >
                    Meta Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              5. How We Share Your Information
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share
              information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li><strong>Service Providers:</strong> With trusted third-party service providers who help us operate our website</li>
              <li><strong>Legal Requirements:</strong> If required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              6. Data Security
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. Our website uses SSL/TLS
              encryption to secure data transmission.
            </p>
            <p className="text-neutral-700 leading-relaxed mb-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect
              your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              7. Your Privacy Rights
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-neutral-700 space-y-2 mb-4 pl-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt-out of marketing communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data (EU/UK)</li>
              <li><strong>Restrict Processing:</strong> Request restriction of processing (EU/UK)</li>
            </ul>
            <p className="text-neutral-700 leading-relaxed mb-4">
              To exercise these rights, please contact us at:{' '}
              <a href={`mailto:${siteConfig.legal.contactEmail}`} className="text-accent hover:text-primary underline">
                {siteConfig.legal.contactEmail}
              </a>
            </p>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              California Residents (CCPA)
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA),
              including the right to know what personal information we collect and the right to opt-out of the sale of
              personal information. We do not sell personal information.
            </p>

            <h3 className="font-montserrat text-lg font-semibold text-stone-800 mt-6 mb-3">
              European Residents (GDPR)
            </h3>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you are a resident of the European Economic Area (EEA) or UK, you have rights under the General Data
              Protection Regulation (GDPR), including the right to access, correct, and delete your data.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Our website is not intended for children under 13 years of age. We do not knowingly collect
              personal information from children under 13. If you believe we have collected information from
              a child under 13, please contact us immediately.
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your country of residence.
              These countries may have different data protection laws. We take appropriate safeguards to ensure your
              personal information remains protected.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting
              the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            <p className="text-neutral-700 leading-relaxed">
              We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="font-playfair text-2xl font-bold text-stone-900 mb-4">
              11. Contact Us
            </h2>
            <p className="text-neutral-700 leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="text-neutral-700 space-y-2 pl-4">
              <p>
                <strong>Company:</strong> {siteConfig.legal.companyName}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${siteConfig.legal.contactEmail}`} className="text-accent hover:text-primary underline">
                  {siteConfig.legal.contactEmail}
                </a>
              </p>
              <p><strong>Website:</strong> {siteConfig.site.url.replace('https://', '').replace('http://', '')}</p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-neutral-500">
          <p>This Privacy Policy is effective as of January 2025</p>
        </div>
      </div>
    </main>
  );
}

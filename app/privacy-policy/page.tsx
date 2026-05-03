import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | DineBD",
  description:
    "Read the DineBD privacy policy. Learn how we collect, use, and protect your personal data when using our food delivery services.",
};

export default function privacy() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-b from-orange-50 to-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Dinebd – Privacy Policy
            </h1>
            <p className="text-gray-600">
              Last Updated: December 2024 | We take your privacy seriously. This
              Privacy Policy explains how we collect, use, store, and protect
              your personal information when you use Dinebd. By using our
              service, you agree to the practices described in this Privacy
              Policy.
            </p>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-orange-100 py-8 px-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <a
                href="#information-collect"
                className="text-[#FF6B35] hover:underline"
              >
                Information We Collect
              </a>
              <a href="#how-use" className="text-[#FF6B35] hover:underline">
                How We Use Your Information
              </a>
              <a href="#sharing" className="text-[#FF6B35] hover:underline">
                Sharing of Information
              </a>
              <a href="#security" className="text-[#FF6B35] hover:underline">
                Data Security
              </a>
              <a href="#user-rights" className="text-[#FF6B35] hover:underline">
                User Rights
              </a>
              <a href="#children" className="text-[#FF6B35] hover:underline">
                Children's Privacy
              </a>
              <a href="#cookies" className="text-[#FF6B35] hover:underline">
                Cookies & Tracking Technologies
              </a>
              <a href="#third-party" className="text-[#FF6B35] hover:underline">
                Third-Party Links
              </a>
              <a href="#retention" className="text-[#FF6B35] hover:underline">
                Data Retention
              </a>
              <a href="#marketing" className="text-[#FF6B35] hover:underline">
                Marketing Communications
              </a>
              <a href="#changes" className="text-[#FF6B35] hover:underline">
                Changes to This Privacy Policy
              </a>
              <a href="#contact" className="text-[#FF6B35] hover:underline">
                Contact Information
              </a>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="max-w-4xl mx-auto px-4 py-8 space-y-12">
          {/* Information We Collect */}
          <div id="information-collect">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Information We Collect
            </h3>
            <div className="space-y-3 text-gray-700">
              <div>
                <h4 className="font-semibold text-[#FF6B35] mb-1">
                  a) Personal Information
                </h4>
                <p className="text-sm">
                  We only collect the following information that you voluntarily
                  provide:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-2">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Delivery or billing addresses</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#FF6B35] mb-1">
                  b) Automatically Collected Data
                </h4>
                <p className="text-sm">
                  When you use our app or website, we automatically collect:
                </p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-2">
                  <li>Device information (device type, OS, app version)</li>
                  <li>Usage data (pages visited, time spent, clicks)</li>
                  <li>Location data (if enabled)</li>
                  <li>IP address</li>
                  <li>Browser history and cookies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-[#FF6B35] mb-1">
                  c) From Third-Party Services
                </h4>
                <p className="text-sm">We may receive limited data from:</p>
                <ul className="list-disc list-inside text-sm mt-2 space-y-1 ml-2">
                  <li>Payment processors (payment method, transaction ID)</li>
                  <li>
                    Social login providers (if you choose to sign up via social
                    media)
                  </li>
                  <li>Location data (if enabled)</li>
                  <li>Delivery partners (delivery confirmation data)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div id="how-use">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              How We Use Your Information
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              We use your personal information to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>Create and manage your Dinebd account</li>
              <li>Process your orders and payments</li>
              <li>Send you order updates and delivery status</li>
              <li>Improve your experience and app performance</li>
              <li>Analyze usage patterns and user preferences</li>
              <li>Detect fraud and maintain security</li>
              <li>
                Send promotional content and special offers (with your consent)
              </li>
            </ul>
          </div>

          {/* Sharing of Information */}
          <div id="sharing">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Sharing of Information
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>
                <span className="font-semibold">Restaurants & Merchants:</span>{" "}
                Your name, phone number, address
              </li>
              <li>
                <span className="font-semibold">Delivery Partners:</span> Your
                contact info and delivery location
              </li>
              <li>
                <span className="font-semibold">Payment Processors:</span> Card
                number, payment status (We do not store card in banking details)
              </li>
              <li>
                <span className="font-semibold">Analytics Partners:</span>{" "}
                Aggregated, anonymized usage data
              </li>
              <li>
                <span className="font-semibold">Legal Authorities:</span> If
                required by law, court order, or government regulations
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div id="security">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Data Security
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              We implement industry-standard measures to protect your data,
              including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure password storage (hashed and salted)</li>
              <li>Regular security audits</li>
              <li>Restricted access to personal data</li>
              <li>Employee confidentiality agreements</li>
            </ul>
            <p className="text-sm text-gray-700 mt-4">
              However, no method of transmission over the internet is 100%
              secure. We cannot guarantee absolute security, but we take all
              reasonable steps to protect your information.
            </p>
          </div>

          {/* User Rights */}
          <div id="user-rights">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              User Rights
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              As a user, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion of your information</li>
              <li>Opt-out of promotional communications anytime</li>
              <li>Disable cookies in your browser settings</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div id="children">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Children's Privacy
            </h3>
            <p className="text-gray-700 text-sm">
              Dinebd does not knowingly collect data from children under 18. If
              we become aware that we have inadvertently collected information
              from a child under 18, we will promptly delete it. Parents or
              guardians can contact us if they believe their child's data has
              been collected.
            </p>
          </div>

          {/* Cookies & Tracking Technologies */}
          <div id="cookies">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Cookies & Tracking Technologies
            </h3>
            <p className="text-gray-700 text-sm mb-4">We use cookies to:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>Maintain your login session</li>
              <li>Remember your preferences</li>
              <li>Analyze user behavior and trends</li>
              <li>Deliver personalized content</li>
              <li>Prevent fraud and improve security</li>
            </ul>
            <p className="text-sm text-gray-700 mt-4">
              You can disable cookies in your browser settings, but this may
              affect your experience on Dinebd.
            </p>
          </div>

          {/* Third-Party Links */}
          <div id="third-party">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Third-Party Links
            </h3>
            <p className="text-gray-700 text-sm">
              Our app may include links to external websites. Dinebd is not
              responsible for their privacy policies or practices. We encourage
              you to review their Privacy Policy before sharing your
              information.
            </p>
          </div>

          {/* Data Retention */}
          <div id="retention">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Data Retention
            </h3>
            <p className="text-gray-700 text-sm">
              We retain your personal information as long as:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>Your account is active</li>
              <li>It is necessary for business purposes</li>
              <li>It is required by law or for accounting purposes</li>
              <li>After deletion, your data is permanently removed securely</li>
            </ul>
          </div>

          {/* Marketing Communications */}
          <div id="marketing">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Marketing Communications
            </h3>
            <p className="text-gray-700 text-sm mb-4">We may send you:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 ml-2">
              <li>Promotional emails about new restaurants and offers</li>
              <li>Push notifications about special deals</li>
              <li>SMS messages (with your consent)</li>
              <li>In-app notifications</li>
            </ul>
            <p className="text-sm text-gray-700 mt-4">
              You can unsubscribe from marketing communications anytime using
              the link in our emails or notification settings.
            </p>
          </div>

          {/* Changes to This Privacy Policy */}
          <div id="changes">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Changes to This Privacy Policy
            </h3>
            <p className="text-gray-700 text-sm">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated "Last Updated" date.
              Continued use of Dinebd after changes indicates your acceptance of
              the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div id="contact">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Contact Information
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              If you have questions or concerns about our Privacy Policy, please
              contact us:
            </p>
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Email:</span> info@dinebd.com ||
                support@dinebd.com
              </p>
              <p>
                <span className="font-semibold">Address:</span> Dinebd Support
                Team, Dhaka, Bangladesh
              </p>
              <p>
                <span className="font-semibold">Phone:</span> +8801333158929
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#FF6B35] text-white py-12 px-4 my-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-sm mb-6">
              Our privacy and support team is here to help you anytime
            </p>
            <Link href="/contact-us">
              <Button className="bg-white text-[#FF6B35] hover:bg-gray-100">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

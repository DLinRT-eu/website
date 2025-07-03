
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Privacy Policy"
      description="DLinRT.eu Privacy Policy: Information about how we handle personal data and protect your privacy."
      canonical="https://dlinrt.eu/privacy-policy"
    />
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        <strong>Last updated: December 17, 2024</strong>
      </p>
      
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-3">Overview</h2>
        <p className="mb-4">
          This website (<strong>DLinRT.eu</strong>) is committed to protecting your privacy. By default, we do <strong>not</strong> collect, store, or process any personal data from visitors browsing our website. You can explore all content anonymously without providing any personal information.
        </p>
        <p className="mb-4">
          Personal data is <strong>only</strong> collected when you explicitly provide it and consent to its collection through specific actions such as subscribing to our newsletter or contacting us through our contact form.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">When We Collect Personal Data</h2>
        <p className="mb-4">
          We collect personal information only in the following circumstances:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li><strong>Newsletter Subscription:</strong> When you voluntarily subscribe to our newsletter by providing your first name, last name, email address, and explicit consent</li>
          <li><strong>Contact Forms:</strong> When you use our contact form to send us a message, providing your name, email address, and message content</li>
        </ul>
        <p className="mb-4">
          In all cases, data collection requires your explicit consent and voluntary action. We do not collect any personal data from passive website browsing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">What Data We Collect</h2>
        <p className="mb-4">
          When you explicitly consent to data collection, we may collect:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>First name and last name</li>
          <li>Email address</li>
          <li>Message content (for contact form submissions)</li>
          <li>Timestamp of submission</li>
          <li>Consent records</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Data</h2>
        <p className="mb-4">
          Personal data collected with your consent is used exclusively for:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Sending newsletter updates about deep learning solutions in radiotherapy (newsletter subscribers only)</li>
          <li>Responding to your inquiries and providing support (contact form submissions only)</li>
          <li>Maintaining records of consent for compliance purposes</li>
        </ul>
        <p className="mb-4">
          We do <strong>not</strong> share, sell, or transfer your personal data to third parties except as required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Data Retention</h2>
        <p className="mb-4">
          We retain your personal data only as long as necessary for the purposes outlined above:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li><strong>Newsletter subscriptions:</strong> Until you unsubscribe or request deletion</li>
          <li><strong>Contact form submissions:</strong> For a reasonable period to respond to your inquiry, typically not exceeding 2 years</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Your Rights</h2>
        <p className="mb-4">
          You have the following rights regarding your personal data:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
          <li><strong>Rectification:</strong> Request correction of inaccurate personal data</li>
          <li><strong>Erasure:</strong> Request deletion of your personal data</li>
          <li><strong>Unsubscribe:</strong> Unsubscribe from our newsletter at any time by contacting info@dlinrt.eu</li>
          <li><strong>Withdraw consent:</strong> Withdraw your consent for data processing at any time</li>
        </ul>
        <p className="mb-4">
          To exercise any of these rights, please contact us at info@dlinrt.eu.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Cookies and Analytics</h2>
        <p className="mb-4">
          This website uses analytics cookies <strong>only with your explicit consent</strong>. When you consent to analytics cookies, we collect:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Anonymous visitor statistics (page views, session duration)</li>
          <li>Popular pages and user navigation patterns</li>
          <li>Basic browser and device information</li>
        </ul>
        <p className="mb-4">
          <strong>Data retention:</strong> Analytics data is automatically deleted after 1 year.<br/>
          <strong>Cookie duration:</strong> Analytics cookies expire after 2 years.<br/>
          <strong>Third parties:</strong> No third-party analytics services are used - all data stays on your device or our secure servers.
        </p>
        <p className="mb-4">
          Essential cookies (for basic website functionality) are used regardless of consent and do not track or profile users.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
        <p className="mb-4">
          We use minimal third-party services for essential functionality:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li><strong>Newsletter service:</strong> ml.kundenserver.de (Germany) - GDPR compliant email list management with explicit consent</li>
          <li><strong>Email delivery:</strong> We use a secure email service provider to respond to contact form submissions</li>
          <li><strong>Data storage:</strong> Supabase (EU-hosted) - Personal data is stored securely using industry-standard encryption</li>
        </ul>
        <p className="mb-4">
          All third-party services are bound by strict data protection agreements and GDPR compliance requirements. Data processing agreements are in place where required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">GDPR Compliance</h2>
        <p className="mb-4">
          This website is fully compliant with the General Data Protection Regulation (GDPR). We ensure:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Explicit consent is obtained before collecting any personal data</li>
          <li>Clear information is provided about data collection and use</li>
          <li>Users can easily exercise their rights regarding their personal data</li>
          <li>Data is processed lawfully, fairly, and transparently</li>
          <li>Personal data is kept secure and confidential</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure data transmission, and regular security assessments.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time to reflect changes in our practices or legal requirements. Any material changes will be clearly indicated by updating the "Last updated" date at the top of this policy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this privacy policy, your personal data, or wish to exercise your rights, please contact us at info@dlinrt.eu.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Legal Disclaimer</h2>
        <p className="mb-4">
          Content on this website is revised periodically, but the website and its maintainers do not assume any liability for possible incorrect information. All content is provided for informational purposes only. No copyright is infringed; if you believe your rights are affected, please contact us for prompt resolution.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;

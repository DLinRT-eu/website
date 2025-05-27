
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";

const TermsOfUse = () => (
  <div className="min-h-screen bg-white">
    <SEO
      title="Terms of Use"
      description="DLinRT.eu Terms of Use: Legal terms and conditions for using our deep learning in radiotherapy product database."
      canonical="https://dlinrt.eu/terms-of-use"
    />
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">
        <strong>Last updated: December 17, 2024</strong>
      </p>
      
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold mt-6 mb-3">Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using this website (<strong>DLinRT.eu</strong>), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Content Disclaimer</h2>
        <p className="mb-4">
          This website's content is revised periodically, but the website and its maintainers do not assume any liability for possible incorrect information. All content is provided for informational purposes only and is intended for general use.
        </p>
        <p className="mb-4">
          The information on this website about deep learning products and solutions in radiotherapy is compiled from various sources and is subject to change without notice. While we strive to keep the information accurate and up-to-date, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Limitation of Liability</h2>
        <p className="mb-4">
          The maintainers of this website assume <strong>no liability</strong> for any inaccuracies, errors, or omissions in the content. Users access and use this information at their own risk.
        </p>
        <p className="mb-4">
          In no event shall DLinRT.eu, its maintainers, contributors, or affiliates be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your use of, or inability to use, this website or its content.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Intellectual Property Rights</h2>
        <p className="mb-4">
          No copyright is infringed in the compilation and presentation of information on this website. If you believe your intellectual property rights are affected, please contact us immediately for prompt resolution.
        </p>
        <p className="mb-4">
          Product names, company logos, and trademarks mentioned on this website are the property of their respective owners and are used for identification purposes only. Their inclusion does not imply endorsement by DLinRT.eu.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">User Responsibilities</h2>
        <p className="mb-4">
          Users are responsible for:
        </p>
        <ul className="mb-4 ml-6 list-disc">
          <li>Verifying the accuracy and suitability of any information before making decisions based on it</li>
          <li>Conducting their own due diligence regarding products and services listed</li>
          <li>Understanding that product information may change without notice</li>
          <li>Respecting intellectual property rights of third parties</li>
          <li>Using the website in compliance with applicable laws and regulations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-3">Medical and Professional Advice Disclaimer</h2>
        <p className="mb-4">
          The information provided on this website is <strong>not</strong> intended as medical advice, clinical guidance, or professional consultation. Healthcare professionals should conduct their own evaluation of products and consult appropriate regulatory authorities before implementation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">External Links</h2>
        <p className="mb-4">
          This website may contain links to external sites. We are not responsible for the content, privacy policies, or practices of external websites. Users access external links at their own discretion and risk.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Website Availability</h2>
        <p className="mb-4">
          We strive to keep the website accessible, but we do not guarantee uninterrupted availability. The website may be temporarily unavailable due to maintenance, updates, or technical issues.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Data Accuracy and Currency</h2>
        <p className="mb-4">
          Product information, pricing, availability, and specifications are subject to change without notice. Users should verify current information directly with manufacturers or authorized distributors before making purchasing decisions.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Modifications to Terms</h2>
        <p className="mb-4">
          We reserve the right to modify these terms of use at any time. Changes will be effective immediately upon posting. Continued use of the website after changes constitutes acceptance of the modified terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Governing Law</h2>
        <p className="mb-4">
          These terms of use are governed by and construed in accordance with applicable laws. Any disputes arising from the use of this website shall be subject to the jurisdiction of competent courts.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Community Contributions</h2>
        <p className="mb-4">
          This website operates as a community-driven initiative. Contributors provide information on a voluntary basis, and we appreciate their efforts to maintain accuracy. However, community contributions do not create any warranty or guarantee of information accuracy.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Information</h2>
        <p className="mb-4">
          If you have questions about these terms of use, believe your intellectual property rights are affected, or need to report inaccuracies, please contact us at info@dlinrt.eu.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-3">Severability</h2>
        <p className="mb-4">
          If any provision of these terms is found to be unenforceable or invalid, the remaining provisions shall continue in full force and effect.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default TermsOfUse;


import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-sportbet-gray rounded-lg p-8 border border-sportbet-light-gray">
          <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              Last updated: May 11, 2025
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Introduction</h2>
            <p className="text-gray-300 mb-4">
              SportBet AI ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Information We Collect</h2>
            <p className="text-gray-300 mb-4">
              We collect several types of information from and about users of our platform, including:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Personal information (email address, username, and profile picture)</li>
              <li>Account credentials</li>
              <li>Solana wallet address (when connected)</li>
              <li>Prediction history and usage data</li>
              <li>Transaction history related to SBET tokens</li>
              <li>Technical data including IP address, browser type, and operating system</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Provide, operate, and maintain our platform</li>
              <li>Improve and personalize your experience</li>
              <li>Process transactions and manage your account</li>
              <li>Send you important notifications related to your account</li>
              <li>Monitor and analyze usage patterns and trends</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Data Security</h2>
            <p className="text-gray-300 mb-4">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet or electronic storage is 100% secure, 
              so we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Third-Party Services</h2>
            <p className="text-gray-300 mb-4">
              We use third-party services that may collect information used to identify you:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>Supabase - For authentication and data storage</li>
              <li>Solana - For blockchain transactions</li>
              <li>Stripe - For payment processing (where applicable)</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Your Data Protection Rights</h2>
            <p className="text-gray-300 mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to restrict processing of your personal data</li>
              <li>The right to data portability</li>
              <li>The right to object to processing of your personal data</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-300 mb-4">
              Email: privacy@sportbet-ai.com
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Privacy;

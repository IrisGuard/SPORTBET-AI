
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-sportbet-gray rounded-lg p-8 border border-sportbet-light-gray">
          <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-4">
              Last updated: May 11, 2025
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Introduction</h2>
            <p className="text-gray-300 mb-4">
              Welcome to SportBet AI. These Terms of Service govern your use of our platform, including 
              any content, functionality, and services offered on or through sportbet-ai.com.
            </p>
            <p className="text-gray-300 mb-4">
              By registering with or using our platform, you accept and agree to be bound by these Terms. 
              If you do not agree to these terms, you must not use our platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. User Accounts</h2>
            <p className="text-gray-300 mb-4">
              When you create an account with us, you must provide accurate and complete information. You are 
              responsible for maintaining the confidentiality of your account and password, and for restricting 
              access to your computer or device.
            </p>
            <p className="text-gray-300 mb-4">
              You agree to accept responsibility for all activities that occur under your account or password. 
              If you believe someone has accessed your account without authorization, please notify us immediately.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. SBET Tokens</h2>
            <p className="text-gray-300 mb-4">
              SBET tokens are the utility tokens used within our platform. They can be purchased, earned through 
              accurate predictions, or received through referrals.
            </p>
            <p className="text-gray-300 mb-4">
              Tokens may be subject to a lock period in certain circumstances. SBET tokens have no cash value 
              and are not redeemable for fiat currency from SportBet AI directly.
            </p>
            <p className="text-gray-300 mb-4">
              You understand that token values may fluctuate and that purchases are final and non-refundable.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Predictions and Content</h2>
            <p className="text-gray-300 mb-4">
              Our AI-generated predictions are for entertainment purposes only and should not be considered 
              financial advice. We make no guarantees about the accuracy of predictions.
            </p>
            <p className="text-gray-300 mb-4">
              You acknowledge that past performance is not indicative of future results, and you use our 
              predictions at your own risk.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Prohibited Uses</h2>
            <p className="text-gray-300 mb-4">
              You may not use our platform:
            </p>
            <ul className="list-disc pl-6 text-gray-300 mb-6 space-y-2">
              <li>In any way that violates applicable laws or regulations</li>
              <li>To impersonate or attempt to impersonate SportBet AI, our employees, or other users</li>
              <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the platform</li>
              <li>To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the platform</li>
              <li>To use the platform in jurisdictions where sports predictions or token transactions are prohibited</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Intellectual Property Rights</h2>
            <p className="text-gray-300 mb-4">
              The platform and its entire contents, features, and functionality are owned by SportBet AI and 
              are protected by international copyright, trademark, patent, trade secret, and other intellectual 
              property or proprietary rights laws.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Termination</h2>
            <p className="text-gray-300 mb-4">
              We may terminate or suspend your account and access to the platform immediately, without prior 
              notice or liability, for any reason, including but not limited to a breach of the Terms.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-300 mb-4">
              The platform is provided "as is" and "as available" without any warranties of any kind, either 
              express or implied. We do not guarantee that the platform will be secure or free from errors or viruses.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300 mb-4">
              To the fullest extent permitted by law, SportBet AI shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to loss of profits, data, 
              or use, arising out of or in connection with your use of the platform.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-300 mb-4">
              We may revise these Terms from time to time. The most current version will always be on this page. 
              We encourage you to review the Terms periodically for any changes.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-8 mb-4">11. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-300 mb-4">
              Email: terms@sportbet-ai.com
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Terms;

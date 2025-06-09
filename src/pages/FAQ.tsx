
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-sportbet-gray rounded-lg p-8 border border-sportbet-light-gray">
          <h1 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h1>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-sportbet-light-gray">
              <AccordionTrigger className="text-white hover:text-sportbet-blue">
                What is SportBet AI?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                SportBet AI is a platform that uses advanced artificial intelligence to provide 
                high-accuracy sports predictions. The platform analyzes vast amounts of data to 
                create personalized predictions with confidence percentages for various sporting events.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-sportbet-light-gray">
              <AccordionTrigger className="text-white hover:text-sportbet-blue">
                How does the SBET token system work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                SBET tokens are our platform's digital currency. You can purchase tokens with a credit card 
                or cryptocurrencies and use them to unlock predictions. You also earn additional 
                tokens when your purchased predictions are verified correct. Bonus tokens remain locked for 
                a period of 1 year from the date they were acquired.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-sportbet-light-gray">
              <AccordionTrigger className="text-white hover:text-sportbet-blue">
                How accurate are the predictions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Our AI is designed to offer predictions with a high percentage of accuracy, 
                but it's important to understand that no prediction can be guaranteed. We only display 
                predictions with a minimum confidence percentage of 85% to maximize the chance of success. 
                The system's overall accuracy is transparently displayed on the home page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-sportbet-light-gray">
              <AccordionTrigger className="text-white hover:text-sportbet-blue">
                How do I connect my Solana wallet?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                Once you've logged into your account, you can go to your profile page and select 
                "Connect wallet". We support Phantom and Backpack wallets. After connecting your 
                wallet, you'll be able to withdraw your unlocked SBET tokens to your own Solana wallet.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-sportbet-light-gray">
              <AccordionTrigger className="text-white hover:text-sportbet-blue">
                How does the referral program work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                When you invite friends to SportBet AI using your unique referral link, 
                you earn 5% of the SBET tokens they purchase as a reward. Additionally, your friends 
                receive a 50 SBET token bonus when they sign up. You can find your unique referral link 
                in the "Referrals" section of your dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-8 bg-sportbet-dark p-4 rounded-lg">
            <p className="text-center text-gray-400 text-sm">
              Can't find an answer to your question? Contact us at <a href="mailto:support@sportbet-ai.com" className="text-sportbet-blue hover:underline">support@sportbet-ai.com</a>
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default FAQ;

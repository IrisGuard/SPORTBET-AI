
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github } from 'lucide-react';

const FooterWithPrivacy = () => {
  return (
    <footer className="bg-sportbet-gray border-t border-sportbet-light-gray py-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/f099b3fb-7f27-428b-a9b4-d0953f4b144f.png" 
                alt="SportBet AI Logo" 
                className="h-10 w-10" 
              />
              <span className="text-xl font-bold">
                <span className="text-sportbet-blue">Sport</span>
                <span className="text-sportbet-blue">Bet</span>
                <span className="text-sportbet-green">AI</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm">
              AI-powered sports predictions with blockchain rewards. 
              Never miss a winning prediction again.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/predictions" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Predictions
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-sportbet-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter to get the latest updates and predictions.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-sportbet-dark border border-sportbet-light-gray rounded-l px-4 py-2 text-white focus:outline-none focus:border-sportbet-blue flex-grow"
              />
              <button 
                type="submit" 
                className="bg-sportbet-blue hover:bg-sportbet-blue/80 text-white px-4 py-2 rounded-r"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-sportbet-light-gray flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SportBet AI. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            <span className="font-medium">Disclaimer:</span> Predictions are for entertainment purposes only. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterWithPrivacy;

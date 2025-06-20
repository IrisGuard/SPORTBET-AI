
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sportbet-dark border-t border-sportbet-gray">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered sports predictions with crypto rewards for accurate forecasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sportbet-blue">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sportbet-blue">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sportbet-blue">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link to="/predictions" className="text-gray-400 hover:text-sportbet-blue">Predictions</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-sportbet-blue">Leaderboard</Link></li>
              <li><Link to="/wallet" className="text-gray-400 hover:text-sportbet-blue">Wallet</Link></li>
              <li><Link to="/api-docs" className="text-gray-400 hover:text-sportbet-blue">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Sports</h3>
            <ul className="space-y-3">
              <li><Link to="/football" className="text-gray-400 hover:text-sportbet-blue">Football</Link></li>
              <li><Link to="/basketball" className="text-gray-400 hover:text-sportbet-blue">Basketball</Link></li>
              <li><Link to="/tennis" className="text-gray-400 hover:text-sportbet-blue">Tennis</Link></li>
              <li><Link to="/volleyball" className="text-gray-400 hover:text-sportbet-blue">Volleyball</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-sportbet-blue">About</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-sportbet-blue">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-sportbet-blue">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-sportbet-blue">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-sportbet-gray mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 SportBet AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-sportbet-blue">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-sportbet-blue">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 text-sm hover:text-sportbet-blue">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

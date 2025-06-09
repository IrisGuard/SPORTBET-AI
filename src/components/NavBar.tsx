import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Logo from './navigation/Logo';
import DesktopMenu from './navigation/DesktopMenu';
import MobileMenu from './navigation/MobileMenu';
import UserProfile from './navigation/UserProfile';

interface NavBarProps {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const NavBar = ({ onLoginClick, onRegisterClick }: NavBarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // We'll keep these functions but they won't be used anymore
  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/auth');
    }
  };

  const handleRegister = () => {
    if (onRegisterClick) {
      onRegisterClick();
    } else {
      navigate('/auth', { state: { tab: 'register' } });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-sportbet-dark/80 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop Menu */}
        <DesktopMenu />
        
        {/* User Profile (Desktop) */}
        <UserProfile onLoginClick={handleLogin} onRegisterClick={handleRegister} />

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        onLoginClick={handleLogin}
        onRegisterClick={handleRegister}
      />
    </header>
  );
};

export default NavBar;

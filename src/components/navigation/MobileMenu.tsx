
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Shield, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { systemProtection } from '@/services/systemProtectionService';
import { toast } from "sonner";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const MobileMenu = ({ isOpen, onClose, onLoginClick, onRegisterClick }: MobileMenuProps) => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { label: 'Home', path: '/', public: true },
    { label: 'Dashboard', path: '/dashboard', public: false },
    { label: 'Predictions', path: '/predictions', public: true },
    { label: 'Leaderboard', path: '/leaderboard', public: true },
    { label: 'Wallet', path: '/wallet', public: false },
    { label: 'Changes', path: '/changes', public: false },
    { label: 'FAQ', path: '/faq', public: true },
    { label: 'Support', path: '/support', public: true },
  ];

  // Admin-only menu items
  const adminItems = [
    { label: 'Key Vault', path: '/key-vault', public: false }
  ];
  
  const handleCreateBackup = async () => {
    try {
      await systemProtection.createManualBackup('Manual backup from menu');
      toast.success('System backup created successfully');
    } catch (error) {
      console.error('Failed to create backup:', error);
    }
  };
  
  const handleEmergencyRecovery = () => {
    systemProtection.forceSystemRecovery();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div 
        className="absolute right-0 top-0 h-screen w-64 bg-sportbet-dark p-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}  
      >
        <div className="flex justify-end">
          <button 
            className="text-white hover:text-gray-300"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mt-8 flex flex-col space-y-4">
          {menuItems.map((item) => (
            ((item.public || user) && (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-base font-medium transition-colors hover:text-primary py-2",
                  isActive(item.path) 
                    ? "text-white border-l-4 border-sportbet-green pl-2" 
                    : "text-muted-foreground"
                )}
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))
          ))}
          
          {isAdmin && adminItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-base font-medium transition-colors hover:text-primary py-2",
                isActive(item.path) 
                  ? "text-white border-l-4 border-sportbet-green pl-2" 
                  : "text-muted-foreground"
              )}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}

          {/* System Protection Items */}
          <div className="pt-4 border-t border-gray-700">
            <div className="flex items-center text-sportbet-green mb-2">
              <Shield className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">System Protection</span>
            </div>
            
            <button
              className="w-full text-left text-sm text-muted-foreground py-2 hover:text-white"
              onClick={handleCreateBackup}
            >
              Create System Backup
            </button>
            
            <button
              className="w-full text-left text-sm text-muted-foreground py-2 hover:text-white"
              onClick={handleEmergencyRecovery}
            >
              Emergency Recovery
            </button>
          </div>

          {!user && (
            <div className="pt-4 space-y-2">
              <button
                className="w-full px-4 py-2 text-sm font-medium text-white bg-sportbet-green rounded-md hover:bg-opacity-90"
                onClick={() => {
                  if (onLoginClick) onLoginClick();
                  onClose();
                }}
              >
                Login
              </button>
              <button
                className="w-full px-4 py-2 text-sm font-medium text-sportbet-green border border-sportbet-green rounded-md hover:bg-sportbet-dark-gray"
                onClick={() => {
                  if (onRegisterClick) onRegisterClick();
                  onClose();
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

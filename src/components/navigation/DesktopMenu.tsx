
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const DesktopMenu = () => {
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

  return (
    <div className="hidden md:flex items-center space-x-4">
      {menuItems.map((item) => (
        ((item.public || user) && (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(item.path) 
                ? "text-white" 
                : "text-muted-foreground"
            )}
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
            "text-sm font-medium transition-colors hover:text-primary",
            isActive(item.path) 
              ? "text-white" 
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default DesktopMenu;

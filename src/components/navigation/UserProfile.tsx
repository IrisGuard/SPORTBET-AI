
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Wallet, ChevronDown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserProfileProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const UserProfile = ({ onLoginClick, onRegisterClick }: UserProfileProps) => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const navigate = useNavigate();

  // We'll just return an empty div instead of the login/register buttons
  if (!user) {
    return <div className="hidden md:flex"></div>;
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!profile?.username) return 'U';
    return profile.username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="hidden md:flex items-center gap-4">
      <div className="flex items-center gap-2 mr-2 px-3 py-1 bg-sportbet-gray rounded-full">
        <Wallet size={16} className="text-sportbet-green" />
        {profileLoading ? (
          <Skeleton className="h-4 w-16 bg-sportbet-light-gray" />
        ) : (
          <span className="text-sm text-white font-medium">{profile?.token_balance || 0} SBET</span>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-sportbet-gray/50">
            <Avatar className="w-8 h-8 border border-sportbet-light-gray/30">
              {profile?.avatar_url ? (
                <AvatarImage src={profile.avatar_url} alt={profile.username || 'User'} />
              ) : null}
              <AvatarFallback className="bg-sportbet-blue text-white text-xs font-medium">
                {profileLoading ? '...' : getInitials()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden lg:inline">{profileLoading ? 'Loading...' : profile?.username || 'User'}</span>
            <ChevronDown size={16} className="opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-sportbet-gray border-sportbet-light-gray">
          <DropdownMenuItem 
            className="text-white hover:bg-sportbet-light-gray/20 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white hover:bg-sportbet-light-gray/20 cursor-pointer"
            onClick={() => navigate('/wallet')}
          >
            <Wallet className="mr-2 h-4 w-4" />
            <span>Wallet</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-white hover:bg-sportbet-light-gray/20 cursor-pointer"
            onClick={() => navigate('/profile')}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-sportbet-light-gray/50" />
          <DropdownMenuItem 
            className="text-white hover:bg-sportbet-light-gray/20 cursor-pointer"
            onClick={() => navigate('/security')}
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-sportbet-light-gray/50" />
          <DropdownMenuItem 
            className="text-white hover:bg-sportbet-light-gray/20 cursor-pointer"
            onClick={signOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;

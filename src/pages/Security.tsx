
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import { Shield, Key, Smartphone, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function Security() {
  const { user, loading } = useAuth();
  
  // Redirect to auth page if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  const handleEnableTwoFactor = () => {
    toast.info("Coming soon", {
      description: "Two-factor authentication will be available soon"
    });
  };
  
  const handleChangePassword = () => {
    toast.info("Coming soon", {
      description: "Password reset functionality will be available soon"
    });
  };
  
  const handleSessionManagement = () => {
    toast.info("Coming soon", {
      description: "Session management will be available soon"
    });
  };

  return (
    <div className="min-h-screen bg-sportbet-dark">
      <NavBar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Account Security</h1>
          
          <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray overflow-hidden mb-8">
            <div className="p-6 border-b border-sportbet-light-gray">
              <div className="flex items-center gap-3">
                <Shield className="text-sportbet-blue" />
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>
              </div>
              <p className="text-gray-400 mt-2">Manage your account security preferences</p>
            </div>
            
            <div className="p-6 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full bg-sportbet-dark" />
                  <Skeleton className="h-12 w-full bg-sportbet-dark" />
                  <Skeleton className="h-12 w-full bg-sportbet-dark" />
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between p-4 bg-sportbet-dark rounded-lg">
                    <div className="flex items-start gap-3">
                      <Key className="text-sportbet-blue mt-1" />
                      <div>
                        <h3 className="font-medium text-white">Change Password</h3>
                        <p className="text-sm text-gray-400">Update your account password</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleChangePassword} 
                      variant="outline" 
                      className="border-sportbet-blue text-sportbet-blue hover:bg-sportbet-blue/10"
                    >
                      Change
                    </Button>
                  </div>
                  
                  <div className="flex items-start justify-between p-4 bg-sportbet-dark rounded-lg">
                    <div className="flex items-start gap-3">
                      <Smartphone className="text-sportbet-blue mt-1" />
                      <div>
                        <h3 className="font-medium text-white">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleEnableTwoFactor} 
                      variant="outline" 
                      className="border-sportbet-blue text-sportbet-blue hover:bg-sportbet-blue/10"
                    >
                      Enable
                    </Button>
                  </div>
                  
                  <div className="flex items-start justify-between p-4 bg-sportbet-dark rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lock className="text-sportbet-blue mt-1" />
                      <div>
                        <h3 className="font-medium text-white">Active Sessions</h3>
                        <p className="text-sm text-gray-400">Manage your active sessions and devices</p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSessionManagement} 
                      variant="outline" 
                      className="border-sportbet-blue text-sportbet-blue hover:bg-sportbet-blue/10"
                    >
                      Manage
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Security Tips</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-sportbet-green font-bold">•</span>
                <span>Use a strong, unique password that you don't use elsewhere.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sportbet-green font-bold">•</span>
                <span>Enable two-factor authentication for an additional layer of security.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sportbet-green font-bold">•</span>
                <span>Be cautious of phishing attempts. We'll never ask for your password via email.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sportbet-green font-bold">•</span>
                <span>Always log out when using shared or public devices.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

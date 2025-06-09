
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, Bell, Shield, History, Eye, EyeOff, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Profile() {
  const { profile, loading } = useProfile();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    }, 1000);
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed."
      });
    }, 1000);
  };
  
  const handleDeleteAccount = () => {
    toast({
      variant: "destructive",
      title: "Delete account",
      description: "Please contact support to delete your account."
    });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Profile Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid grid-cols-3 sm:grid-cols-4 bg-sportbet-dark mx-6 mt-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="wallet">Wallet</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="p-6">
                  <form onSubmit={handleSaveProfile}>
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 bg-sportbet-blue rounded-full flex items-center justify-center text-xl text-white font-semibold">
                          {loading ? "..." : profile?.username?.substring(0, 2).toUpperCase() || "U"}
                        </div>
                        <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-sportbet-blue hover:bg-sportbet-blue/80">
                          <Settings size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white mb-2 block">Username</Label>
                          <Input 
                            defaultValue={loading ? "" : profile?.username || ""} 
                            className="bg-sportbet-dark border-sportbet-light-gray text-white"
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <Label className="text-white mb-2 block">Email</Label>
                          <Input 
                            defaultValue={user?.email || ""}
                            className="bg-sportbet-dark border-sportbet-light-gray text-white"
                            disabled
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white mb-2 block">Bio</Label>
                        <Textarea 
                          placeholder="Tell us about yourself..."
                          className="bg-sportbet-dark border-sportbet-light-gray text-white min-h-[100px]"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white mb-2 block">Country</Label>
                          <Input 
                            placeholder="Your country"
                            className="bg-sportbet-dark border-sportbet-light-gray text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white mb-2 block">Timezone</Label>
                          <Input 
                            placeholder="Your timezone"
                            className="bg-sportbet-dark border-sportbet-light-gray text-white"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Profile"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="security" className="p-6">
                  <form onSubmit={handleChangePassword} className="mb-6">
                    <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white mb-2 block">Current Password</Label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-sportbet-dark border-sportbet-light-gray text-white pr-10"
                          />
                          <button 
                            type="button" 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white mb-2 block">New Password</Label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-sportbet-dark border-sportbet-light-gray text-white pr-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-white mb-2 block">Confirm New Password</Label>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="bg-sportbet-dark border-sportbet-light-gray text-white pr-10"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80 text-white"
                        disabled={isLoading}
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </form>
                  
                  <div className="pt-6 border-t border-sportbet-light-gray">
                    <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-white font-medium">Enable 2FA</p>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Button variant="outline" className="w-full border-sportbet-light-gray text-white hover:bg-sportbet-dark/70">
                      Setup Two-Factor Authentication
                    </Button>
                  </div>
                  
                  <div className="pt-6 mt-6 border-t border-sportbet-light-gray">
                    <h3 className="text-lg font-medium text-red-500 mb-4">Danger Zone</h3>
                    
                    <Button 
                      variant="destructive" 
                      className="w-full" 
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="notifications" className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive emails about your account activity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">New Prediction Alerts</p>
                        <p className="text-sm text-gray-400">Get notified when new high-confidence predictions are available</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Prediction Results</p>
                        <p className="text-sm text-gray-400">Get notified when your purchased predictions are completed</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Token Transactions</p>
                        <p className="text-sm text-gray-400">Get notified about SBET token transactions</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Marketing Emails</p>
                        <p className="text-sm text-gray-400">Receive emails about promotions and new features</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <Button className="w-full bg-sportbet-blue hover:bg-sportbet-blue/80 text-white">
                      Save Preferences
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="wallet" className="p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Wallet Connections</h3>
                  
                  <div className="p-4 mb-6 bg-sportbet-dark rounded-lg border border-sportbet-light-gray">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-white font-medium">Solana Wallet</p>
                        <p className="text-sm text-gray-400">Connect for withdrawals and NFT badges</p>
                      </div>
                      <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:opacity-90 text-white">
                        Connect
                      </Button>
                    </div>
                    
                    <p className="text-xs text-gray-500">
                      Connecting a wallet allows you to withdraw SBET tokens and receive NFT badges for achievements.
                    </p>
                  </div>
                  
                  <h3 className="text-lg font-medium text-white mb-4">Payment Methods</h3>
                  
                  <div className="p-4 mb-6 bg-sportbet-dark rounded-lg border border-sportbet-light-gray">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-gray-400">Add a card for token purchases</p>
                      </div>
                      <Button variant="outline" className="border-sportbet-light-gray text-white hover:bg-sportbet-dark/70">
                        Add Card
                      </Button>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full border-sportbet-blue text-sportbet-blue hover:bg-sportbet-blue/10">
                    View Transaction History
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
              <div className="p-6 border-b border-sportbet-light-gray">
                <h3 className="text-lg font-medium text-white">Account Overview</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Username:</span>
                    <span className="text-white font-medium">
                      {loading ? <Skeleton className="h-4 w-20 bg-sportbet-dark inline-block" /> : profile?.username || "User"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-white font-medium">
                      {loading ? <Skeleton className="h-4 w-32 bg-sportbet-dark inline-block" /> : user?.email || "email@example.com"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Member Since:</span>
                    <span className="text-white font-medium">
                      {loading ? <Skeleton className="h-4 w-24 bg-sportbet-dark inline-block" /> : new Date(user?.created_at || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Login:</span>
                    <span className="text-white font-medium">
                      {loading ? <Skeleton className="h-4 w-24 bg-sportbet-dark inline-block" /> : "Today"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
              <div className="p-6 border-b border-sportbet-light-gray">
                <h3 className="text-lg font-medium text-white">Quick Actions</h3>
              </div>
              
              <div className="p-3">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-sportbet-dark/50 h-auto py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sportbet-blue/20 rounded-full flex items-center justify-center">
                      <User size={16} className="text-sportbet-blue" />
                    </div>
                    <span>Edit Profile</span>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-sportbet-dark/50 h-auto py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sportbet-green/20 rounded-full flex items-center justify-center">
                      <Shield size={16} className="text-sportbet-green" />
                    </div>
                    <span>Security Settings</span>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-sportbet-dark/50 h-auto py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sportbet-orange/20 rounded-full flex items-center justify-center">
                      <Bell size={16} className="text-sportbet-orange" />
                    </div>
                    <span>Notification Preferences</span>
                  </div>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-white hover:bg-sportbet-dark/50 h-auto py-3"
                  onClick={signOut}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Lock size={16} className="text-red-500" />
                    </div>
                    <span>Logout</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

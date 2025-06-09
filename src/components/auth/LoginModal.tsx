
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const LoginModal = ({ isOpen, onClose, defaultTab = 'login' }: LoginModalProps) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-sportbet-dark border-sportbet-light-gray">
        <DialogHeader>
          <DialogTitle className="text-center text-white mb-4">
            <span className="text-sportbet-blue">Sport</span>
            <span className="text-sportbet-blue">Bet</span>
            <span className="text-sportbet-green">AI</span>
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm onSuccess={onClose} />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm onSuccess={() => setActiveTab('login')} />
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-xs text-gray-400 mt-4">
          Predictions are for entertainment purposes only. Not financial advice.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;

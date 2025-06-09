
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { LinkCard } from './LinkCard';
import { 
  Activity, Book, DollarSign, LineChart, 
  MessageCircle, Shield, User, Users, HelpCircle,
  Key, Database, Wallet, ListChecks
} from 'lucide-react';

export function AllLinks() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <LinkCard 
        icon={<Book />}
        title="Quick Start Guide" 
        href="#" 
        description="Learn the basics of SportBet AI and get started in 5 minutes"
      />
      
      <LinkCard 
        icon={<HelpCircle />}
        title="FAQs" 
        href="/faq" 
        description="Find answers to commonly asked questions"
      />
      
      <LinkCard 
        icon={<LineChart />}
        title="Sports Predictions" 
        href="/predictions" 
        description="View AI-generated predictions with confidence levels"
      />
      
      <LinkCard 
        icon={<DollarSign />}
        title="SBET Token Guide" 
        href="#" 
        description="Learn how SBET tokens work and how to earn them"
      />
      
      <LinkCard 
        icon={<User />}
        title="Account Settings" 
        href="/profile" 
        description="Manage your profile, preferences and security settings"
      />
      
      <LinkCard 
        icon={<Wallet />}
        title="Wallet Guide" 
        href="/wallet" 
        description="How to manage your SBET tokens and connect your Solana wallet"
      />
      
      <LinkCard 
        icon={<Shield />}
        title="System Protection & Recovery" 
        href="/?recovery=true" 
        description="How our automated backup and recovery system works to protect your experience"
        badge={<Badge className="bg-green-600 text-white">New</Badge>}
      />
      
      <LinkCard 
        icon={<Users />}
        title="Referral Program" 
        href="#" 
        description="Invite friends to earn SBET tokens"
      />
      
      <LinkCard 
        icon={<Activity />}
        title="AI Accuracy Statistics" 
        href="#" 
        description="Learn about our AI's prediction accuracy over time"
      />
      
      <LinkCard 
        icon={<ListChecks />}
        title="Change Requests" 
        href="/changes" 
        description="View and manage pending changes"
      />
      
      <LinkCard 
        icon={<Key />}
        title="API Key Management" 
        href="/key-vault" 
        description="For admins: Manage platform API keys securely"
      />
      
      <LinkCard 
        icon={<Database />}
        title="Data Privacy" 
        href="/privacy" 
        description="Learn how we protect your data"
      />
      
      <LinkCard 
        icon={<MessageCircle />}
        title="Contact Support" 
        href="/support" 
        description="Get help with any issues or questions"
      />
    </div>
  );
}

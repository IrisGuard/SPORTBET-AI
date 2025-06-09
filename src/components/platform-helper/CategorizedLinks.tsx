
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { LinkCard } from './LinkCard';
import { CategoryIcon } from './CategoryIcon';
import {
  Book, DollarSign, LineChart, MessageCircle, Shield,
  User, Users, HelpCircle, Key, Database, Wallet, ListChecks
} from 'lucide-react';

export function CategorizedLinks() {
  const categories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: <Book className="h-5 w-5" />,
      links: [
        {
          icon: <Book size={16} />,
          title: 'Quick Start Guide',
          href: '#',
          description: 'Learn the basics of SportBet AI and get started in 5 minutes'
        },
        {
          icon: <HelpCircle size={16} />,
          title: 'FAQs',
          href: '/faq',
          description: 'Find answers to commonly asked questions'
        }
      ]
    },
    {
      id: 'predictions',
      name: 'Predictions & Analysis',
      icon: <LineChart className="h-5 w-5" />,
      links: [
        {
          icon: <LineChart size={16} />,
          title: 'Sports Predictions',
          href: '/predictions',
          description: 'View AI-generated predictions with confidence levels'
        }
      ]
    },
    {
      id: 'account',
      name: 'Account Management',
      icon: <User className="h-5 w-5" />,
      links: [
        {
          icon: <User size={16} />,
          title: 'Account Settings',
          href: '/profile',
          description: 'Manage your profile, preferences and security settings'
        },
        {
          icon: <Wallet size={16} />,
          title: 'Wallet Guide',
          href: '/wallet',
          description: 'How to manage your SBET tokens and connect your Solana wallet'
        },
        {
          icon: <Users size={16} />,
          title: 'Referral Program',
          href: '#',
          description: 'Invite friends to earn SBET tokens'
        }
      ]
    },
    {
      id: 'system',
      name: 'System & Security',
      icon: <Shield className="h-5 w-5" />,
      links: [
        {
          icon: <Shield size={16} />,
          title: 'System Protection & Recovery',
          href: '/?recovery=true',
          description: 'How our automated backup and recovery system works',
          badge: <Badge className="bg-green-600 text-white">New</Badge>
        },
        {
          icon: <Database size={16} />,
          title: 'Data Privacy',
          href: '/privacy',
          description: 'Learn how we protect your data'
        },
        {
          icon: <ListChecks size={16} />,
          title: 'Change Requests',
          href: '/changes',
          description: 'View and manage pending changes'
        },
        {
          icon: <Key size={16} />,
          title: 'API Key Management',
          href: '/key-vault',
          description: 'For admins: Manage platform API keys securely'
        }
      ]
    },
    {
      id: 'support',
      name: 'Support & Help',
      icon: <MessageCircle className="h-5 w-5" />,
      links: [
        {
          icon: <MessageCircle size={16} />,
          title: 'Contact Support',
          href: '/support',
          description: 'Get help with any issues or questions'
        }
      ]
    }
  ];

  return (
    <Accordion type="multiple" className="w-full">
      {categories.map((category) => (
        <AccordionItem key={category.id} value={category.id}>
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <CategoryIcon>{category.icon}</CategoryIcon>
              <span>{category.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-2 pb-4 space-y-2">
              {category.links.map((link, index) => (
                <LinkCard 
                  key={index}
                  icon={link.icon}
                  title={link.title}
                  href={link.href}
                  description={link.description}
                  badge={link.badge}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

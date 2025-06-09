import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Trophy, 
  Wallet, 
  UserCircle, 
  HelpCircle, 
  MessageSquare,
  BarChart3,
  FileText,
  LogOut,
  Shield,
  Plus,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/navigation/Logo";

export default function Sidebar() {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const navigation = [
    { name: "Αρχική", href: "/dashboard", icon: Home },
    { name: "Προβλέψεις", href: "/predictions", icon: BarChart3 },
    { name: "Κατάταξη", href: "/leaderboard", icon: Trophy },
    { name: "Πορτοφόλι", href: "/wallet", icon: Wallet },
    { name: "Αγορά Tokens", href: "/buy-token", icon: Plus },
    { name: "Staking", href: "/staking", icon: Lock },
    { name: "Προφίλ", href: "/profile", icon: UserCircle },
    { name: "Ασφάλεια", href: "/security", icon: Shield },
    { name: "Συχνές Ερωτήσεις", href: "/faq", icon: HelpCircle },
    { name: "Υποστήριξη", href: "/support", icon: MessageSquare },
    { name: "Όροι Χρήσης", href: "/terms", icon: FileText },
  ];

  return (
    <div className="flex h-full flex-col bg-sportbet-dark border-r border-sportbet-light-gray/20">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <div className="px-4 mb-8">
          <Logo />
        </div>
        <nav className="flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                location.pathname === item.href
                  ? "bg-sportbet-blue/10 text-sportbet-blue"
                  : "text-sportbet-secondary-text hover:bg-sportbet-dark-gray hover:text-sportbet-text",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
              )}
            >
              <item.icon
                className={cn(
                  location.pathname === item.href
                    ? "text-sportbet-blue"
                    : "text-sportbet-light-gray group-hover:text-sportbet-text",
                  "mr-3 flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-2 py-4 border-t border-sportbet-light-gray/20">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sportbet-secondary-text hover:bg-sportbet-dark-gray hover:text-sportbet-text"
          onClick={signOut}
        >
          <LogOut className="mr-3 h-5 w-5 text-sportbet-light-gray" />
          Αποσύνδεση
        </Button>
      </div>
    </div>
  );
}

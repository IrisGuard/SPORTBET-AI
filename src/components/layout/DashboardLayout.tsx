
import { ReactNode } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-sportbet-dark flex flex-col">
      <NavBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardLayout;

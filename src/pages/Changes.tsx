
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ChangeApprovalProvider } from '@/context/ChangeApprovalContext';
import { PendingChangesList } from '@/components/change-approval/PendingChangesList';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Changes = () => {
  const { user } = useAuth();

  // Redirect if not authenticated
  if (!user) return <Navigate to="/auth" />;

  return (
    <ChangeApprovalProvider>
      <div className="min-h-screen bg-sportbet-dark">
        <NavBar />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">Changes</h1>
          </div>
          
          <div className="mb-8 p-4 bg-sportbet-gray rounded-lg border border-sportbet-light-gray">
            <h2 className="text-xl font-semibold text-white mb-2">Change Approval System</h2>
            <p className="text-gray-300">
              This page allows you to view and manage changes that require approval before being applied to the system.
              All modifications to key data go through an approval process to ensure data integrity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PendingChangesList />
          </div>
        </div>
        
        <Footer />
      </div>
    </ChangeApprovalProvider>
  );
};

export default Changes;

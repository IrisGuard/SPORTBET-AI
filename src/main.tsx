
// Import Buffer polyfill first
import './polyfill/buffer-polyfill';

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from './context/AuthContext'
import { SolanaWalletProvider } from './context/SolanaWalletContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary, setupGlobalErrorHandlers } from './services/errorTrackingService'

// Set up global error handlers
setupGlobalErrorHandlers();

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <SolanaWalletProvider>
              <App />
              <Toaster position="bottom-right" />
            </SolanaWalletProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)

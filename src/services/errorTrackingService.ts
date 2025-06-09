
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

export interface ErrorLog {
  id?: string;
  message: string;
  stack?: string;
  component?: string;
  user_id?: string | null;
  browser_info?: string;
  timestamp?: Date;
  status?: 'new' | 'in_progress' | 'resolved';
}

/**
 * Logs errors to Supabase, console, and shows a toast notification
 */
export const captureError = async (error: Error, componentName?: string): Promise<void> => {
  const errorLog: ErrorLog = {
    message: error.message,
    stack: error.stack,
    component: componentName,
    browser_info: getBrowserInfo(),
    timestamp: new Date(),
    status: 'new',
  };

  // Log to console
  console.error(`[ERROR TRACKER] ${componentName ? `[${componentName}] ` : ''}`, error);

  try {
    // Get current user id if available
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      errorLog.user_id = user.id;
    }

    // Store in Supabase - using any type to bypass type checking since we've manually created the table
    const { error: supabaseError } = await supabase
      .from('error_logs' as any)
      .insert(errorLog as any);

    if (supabaseError) {
      console.error('Failed to log error to Supabase:', supabaseError);
    }

    // Show toast notification using sonner toast
    toast.error('An error occurred', {
      description: 'Click the chat icon to get help with this issue.'
    });

  } catch (loggingError) {
    console.error('Failed to process error logging:', loggingError);
  }
};

/**
 * Get browser and system information
 */
function getBrowserInfo(): string {
  const { userAgent, language, platform } = navigator;
  const { width, height } = window.screen;
  
  return JSON.stringify({
    userAgent,
    language,
    platform,
    screenSize: `${width}x${height}`,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Global error boundary for React
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    captureError(error, info.componentStack || 'Error Boundary');
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || React.createElement('div', { className: "p-4 text-red-500" }, "Something went wrong");
    }
    return this.props.children;
  }
}

/**
 * Global error handler for non-React errors
 */
export function setupGlobalErrorHandlers() {
  // Handle uncaught exceptions
  window.addEventListener('error', (event) => {
    captureError(event.error || new Error(event.message), 'Global Handler');
    return false; // Let other error handlers run
  });

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason instanceof Error 
      ? event.reason 
      : new Error(String(event.reason));
    captureError(error, 'Unhandled Promise');
    return false; // Let other error handlers run
  });
}

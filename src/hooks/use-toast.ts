
import { toast as sonnerToast } from "sonner";
import { useState, useCallback } from "react";

// Define toast types
export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  // Function to add a toast
  const toast = useCallback(({ title, description, variant, action, id: providedId }: ToastProps) => {
    const id = providedId || Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, variant, action };
    
    setToasts((current) => [...current, newToast]);
    
    // Use sonner toast based on variant
    if (variant === "destructive") {
      sonnerToast.error(title, { description });
    } else {
      sonnerToast.success(title, { description });
    }
    
    return {
      id,
      dismiss: () => setToasts((current) => current.filter((t) => t.id !== id)),
      update: (props: ToastProps) => {
        setToasts((current) =>
          current.map((t) => (t.id === id ? { ...t, ...props } : t))
        );
      },
    };
  }, []);

  return {
    toast,
    toasts,
    dismiss: (toastId?: string) => {
      if (toastId) {
        setToasts((current) => current.filter((t) => t.id !== toastId));
      } else {
        setToasts([]);
      }
    },
  };
}

// Export sonner's toast function directly for simpler use cases
export { sonnerToast as toast };

import { useEffect } from "react";
import { toast } from "sonner";

/**
 * Custom hook for handling errors with toast notifications
 * Provides a centralized way to handle error display
 */
export function useErrorHandler(error: Error | null, message?: string) {
  useEffect(() => {
    if (error) {
      const errorMessage = message || error.message || "Ha ocurrido un error inesperado";
      toast.error(errorMessage);
    }
  }, [error, message]);
}

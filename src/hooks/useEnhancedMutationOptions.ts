import { useMemo } from "react";
import { useApiErrorHandler } from "../utils/errorHandler";

interface EnhancedMutationOptions {
  onError?: (error: any) => void;
  successMessage?: string;
  defaultErrorMessage?: string;
}

export const useEnhancedMutationOptions = ({
  onError,
  successMessage,
  defaultErrorMessage,
}: EnhancedMutationOptions = {}) => {
  const { handleApiError } = useApiErrorHandler();

  return useMemo(
    () => ({
      onError: (error: any) => {
        // Handle API error first
        handleApiError(error, defaultErrorMessage);

        // Call custom onError if provided
        if (onError) {
          onError(error);
        }
      },
      onSuccess: successMessage
        ? () => {
            // You can add success notification here if needed
          }
        : undefined,
    }),
    [handleApiError, onError, defaultErrorMessage, successMessage],
  );
};

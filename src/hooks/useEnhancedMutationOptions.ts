import { useMemo } from "react";
import { useNotify } from "react-admin";

interface EnhancedMutationOptions {
  handleApiError: (error: any, defaultMessage?: string) => void;
  onError?: (error: any) => void;
  onSuccess?: (data?: any) => void;
  onSettled?: (data?: any, error?: any) => void;
  successMessage?: string;
  defaultErrorMessage?: string;
}

export const useEnhancedMutationOptions = ({
  handleApiError,
  onError,
  onSuccess,
  onSettled,
  successMessage,
  defaultErrorMessage,
}: EnhancedMutationOptions) => {
  const notify = useNotify();

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
      onSuccess: (data?: any) => {
        // Show success message if provided
        if (successMessage) {
          notify(successMessage, { type: "success" });
        }

        // Call custom onSuccess if provided
        if (onSuccess) {
          onSuccess(data);
        }
      },
      onSettled: (data?: any, error?: any) => {
        // Call custom onSettled if provided
        if (onSettled) {
          onSettled(data, error);
        }
      },
    }),
    [
      handleApiError,
      notify,
      onError,
      onSuccess,
      onSettled,
      defaultErrorMessage,
      successMessage,
    ],
  );
};

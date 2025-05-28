import { useMemo } from "react";

interface EnhancedMutationOptions {
  handleApiError: (error: any, defaultMessage?: string) => void;
  onError?: (error: any) => void;
  defaultErrorMessage?: string;
}

export const useEnhancedMutationOptions = ({
  handleApiError,
  onError,
  defaultErrorMessage,
}: EnhancedMutationOptions) => {
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
      // Không override onSuccess và onSettled để giữ nguyên hành vi mặc định của react-admin
    }),
    [handleApiError, onError, defaultErrorMessage],
  );
};

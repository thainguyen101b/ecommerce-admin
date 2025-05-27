import { useNotify } from "react-admin";
import { useCallback, useState } from "react";
import { ApiError, ValidationError, FieldError } from "../types/errors";

// Utility to check if error is validation error
export const isValidationError = (
  error: ApiError,
): error is ValidationError => {
  return error.code === "VALIDATION_FAILED" && "fieldErrors" in error;
};

// Hook for handling API errors
export const useApiErrorHandler = () => {
  const notify = useNotify();
  const [validationErrors, setValidationErrors] = useState<FieldError[]>([]);
  const [showValidationDialog, setShowValidationDialog] = useState(false);

  const showValidationErrorDialog = useCallback((fieldErrors: FieldError[]) => {
    setValidationErrors(fieldErrors);
    setShowValidationDialog(true);
  }, []);

  const hideValidationDialog = useCallback(() => {
    setShowValidationDialog(false);
    setValidationErrors([]);
  }, []);

  const handleApiError = useCallback(
    (error: any, defaultMessage?: string) => {
      try {
        // Parse error if it's from HTTP response
        const apiError: ApiError =
          error?.body || error?.response?.data || error;

        if (isValidationError(apiError)) {
          // Show detailed validation errors in custom dialog
          showValidationErrorDialog(apiError.fieldErrors);
        } else {
          // Show general server error message
          const errorMessage =
            apiError?.message || defaultMessage || "An error occurred";
          notify(errorMessage, { type: "error" });
        }
      } catch (parseError) {
        // Fallback for unparseable errors
        const fallbackMessage =
          defaultMessage || "An unexpected error occurred";
        notify(fallbackMessage, { type: "error" });
      }
    },
    [notify, showValidationErrorDialog],
  );

  return {
    handleApiError,
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
  };
};

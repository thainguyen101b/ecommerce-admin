import { useNotify } from "react-admin";
import { useCallback } from "react";
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

  const showValidationErrorDialog = useCallback(
    (fieldErrors: FieldError[]) => {
      // Create formatted error message for popup
      const errorMessages = fieldErrors
        .map((error) => `• ${error.property}: ${error.message}`)
        .join("\n");

      const fullMessage = `Validation Failed:\n\n${errorMessages}`;

      // Show as error notification with longer duration for popup-like effect
      notify(fullMessage, {
        type: "error",
        messageArgs: {
          multiline: true,
          autoHideDuration: 8000, // Longer duration for validation errors
        },
      });
    },
    [notify],
  );

  const handleApiError = useCallback(
    (error: any, defaultMessage?: string) => {
      console.log("error keys:", JSON.stringify(error));
      try {
        // Parse error if it's from HTTP response
        const apiError: ApiError =
          error?.body || error?.response?.data || error;

        if (isValidationError(apiError)) {
          // Show detailed validation errors in popup-style
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

  return { handleApiError };
};

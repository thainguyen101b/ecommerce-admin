import { Create, SimpleForm, TextInput } from "react-admin";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";

export const CategoryCreate = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not create category",
    successMessage: "Category created successfully",
  });

  return (
    <>
      <Create title="Category Creation" mutationOptions={mutationOptions}>
        <SimpleForm>
          <TextInput source="name" />
          <TextInput
            source="description"
            multiline={true}
            label="Short description"
          />
        </SimpleForm>
      </Create>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Category Creation Failed"
      />
    </>
  );
};

import { Create, SimpleForm, TextInput } from "react-admin";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";
import { validateStr } from "../../utils/commonValidator.ts";

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
  });

  return (
    <>
      <Create title="Category Creation" mutationOptions={mutationOptions}>
        <SimpleForm>
          <TextInput
            source="name"
            validate={validateStr({
              fieldName: "Name",
              minLen: 2,
              maxLen: 100,
            })}
          />
          <TextInput
            source="description"
            multiline={true}
            label="Short description"
            validate={validateStr({
              fieldName: "Description",
              maxLen: 500,
              isRequired: false,
            })}
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

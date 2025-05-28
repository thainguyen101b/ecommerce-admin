import { Edit, SimpleForm, TextInput } from "react-admin";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { validateStr } from "../../utils/commonValidator.ts";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";

export const CategoryEdit = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not edit category",
  });

  return (
    <>
      <Edit title="Category Edit" mutationOptions={mutationOptions}>
        <SimpleForm>
          <TextInput disabled label="Id" source="id" />
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
          <TextInput disabled label="Created At" source="createdAt" />
          <TextInput disabled label="Updated At" source="updatedAt" />
        </SimpleForm>
      </Edit>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Category Edit Failed"
      />
    </>
  );
};

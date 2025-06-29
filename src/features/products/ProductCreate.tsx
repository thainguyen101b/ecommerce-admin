import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { validateRequired, validateStr } from "../../utils/commonValidator.ts";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";

export const ProductCreate = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not create product",
  });

  return (
    <>
      <Create title="Product Creation" mutationOptions={mutationOptions}>
        <SimpleForm>
          <TextInput
            source="name"
            validate={validateStr({
              fieldName: "Name",
              minLen: 2,
              maxLen: 200,
            })}
          />
          <ReferenceInput
            source="subcategoryId"
            reference="subcategories"
            label="Subcategory"
          >
            <AutocompleteInput
              optionText="name"
              helperText="Type to search subcategory"
              validate={validateRequired({ fieldName: "Subcategory" })}
            />
          </ReferenceInput>
          <TextInput
            source="summary"
            multiline
            label="Short summary"
            validate={validateStr({
              fieldName: "Summary",
              maxLen: 500,
              isRequired: false,
            })}
          />
          <TextInput
            source="description"
            multiline
            label="Short description"
            validate={validateStr({
              fieldName: "Description",
              maxLen: 1000,
              isRequired: false,
            })}
          />

          {/* images */}
        </SimpleForm>
      </Create>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Product Create Failed"
      />
    </>
  );
};

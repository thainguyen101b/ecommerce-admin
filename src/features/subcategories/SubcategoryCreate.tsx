import {
  AutocompleteInput,
  Create,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { validateRequired, validateStr } from "../../utils/commonValidator.ts";

export const SubcategoryCreate = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not create subcategory",
  });

  return (
    <>
      <Create title="Subcategory Creation" mutationOptions={mutationOptions}>
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
          <ReferenceInput
            source="categoryId"
            reference="categories"
            label="Parent Category"
          >
            <AutocompleteInput
              optionText="name"
              helperText="Type to search category"
              validate={validateRequired({ fieldName: "Category" })}
            />
          </ReferenceInput>
        </SimpleForm>
      </Create>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Subcategory Create Failed"
      />
    </>
  );
};

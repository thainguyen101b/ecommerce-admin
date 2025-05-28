import {
  AutocompleteInput,
  Edit,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { validateRequired, validateStr } from "../../utils/commonValidator.ts";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";

export const SubcategoryEdit = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not edit subcategory",
  });

  return (
    <>
      <Edit title="Subcategory Edit" mutationOptions={mutationOptions}>
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

          <TextInput disabled label="Created At" source="createdAt" />
          <TextInput disabled label="Updated At" source="updatedAt" />
        </SimpleForm>
      </Edit>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Subcategory Update Failed"
      />
    </>
  );
};

import {
  AutocompleteInput,
  Edit,
  ImageField,
  ImageInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { validateRequired, validateStr } from "../../utils/commonValidator.ts";
import { ValidationErrorDialog } from "../../components/ValidationErrorDialog.tsx";
import { useEnhancedMutationOptions } from "../../hooks/useEnhancedMutationOptions.ts";
import { useApiErrorHandler } from "../../utils/errorHandler.ts";

export const ProductEdit = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not edit product",
  });

  return (
    <>
      <Edit
        title="Product Edit"
        mutationOptions={mutationOptions}
      >
        <SimpleForm>
          <TextInput disabled label="Id" source="id" />
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
            validate={validateStr({
              fieldName: "Summary",
              maxLen: 225,
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

          <ImageInput
            source="pictures"
            accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp"] }}
            maxSize={5000000}
            multiple
            label="Product Pictures"
            helperText="Upload multiple images (max 5MB each, PNG/JPG/JPEG/WebP only)"
          >
            <ImageField source="src" title="title" />
          </ImageInput>

          <TextInput disabled label="Created At" source="createdAt" />
          <TextInput disabled label="Updated At" source="updatedAt" />
        </SimpleForm>
      </Edit>
      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Product Update Failed"
      />
    </>
  );
};

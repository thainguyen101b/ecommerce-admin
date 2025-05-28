import {
  Edit,
  RadioButtonGroupInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useApiErrorHandler } from "../../../utils/errorHandler.ts";
import { useEnhancedMutationOptions } from "../../../hooks/useEnhancedMutationOptions.ts";
import { validateStr } from "../../../utils/commonValidator.ts";
import { ValidationErrorDialog } from "../../../components/ValidationErrorDialog.tsx";

const attributeTypeChoices = [
  { id: "COLOR", name: "Color" },
  { id: "SIZE", name: "Size" },
];

export const ProductAttributeEdit = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not edit product attribute",
  });

  return (
    <>
      <Edit title="Product Attribute Edit" mutationOptions={mutationOptions}>
        <SimpleForm>
          <RadioButtonGroupInput
            source="type"
            choices={attributeTypeChoices}
            disabled
          />
          <TextInput
            source="value"
            validate={validateStr({
              fieldName: "Value",
              minLen: 2,
              maxLen: 100,
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
        title="Product Attribute Update Failed"
      />
    </>
  );
};

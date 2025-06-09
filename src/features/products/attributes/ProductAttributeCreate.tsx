import {
  choices,
  Create,
  RadioButtonGroupInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useEnhancedMutationOptions } from "../../../hooks/useEnhancedMutationOptions.ts";
import { useApiErrorHandler } from "../../../utils/errorHandler.ts";
import { ValidationErrorDialog } from "../../../components/ValidationErrorDialog.tsx";
import { validateStr } from "../../../utils/commonValidator.ts";

const attributeTypeChoices = [
  { id: "COLOR", name: "Color" },
  { id: "SIZE", name: "Size" },
];

const validateAttributeType = [
  required("Type is required"),
  choices(
    attributeTypeChoices.map((c) => c.id),
    "Must select a valid attribute type",
  ),
];

export const ProductAttributeCreate = () => {
  const {
    validationErrors,
    showValidationDialog,
    hideValidationDialog,
    handleApiError,
  } = useApiErrorHandler();

  const mutationOptions = useEnhancedMutationOptions({
    handleApiError,
    defaultErrorMessage: "Could not create product attribute",
  });

  return (
    <>
      <Create title="Attribute Creation" mutationOptions={mutationOptions}>
        <SimpleForm>
          <RadioButtonGroupInput
            source="type"
            choices={attributeTypeChoices}
            validate={validateAttributeType}
          />
          <TextInput
            source="value"
            validate={validateStr({
              fieldName: "Value",
              minLen: 1,
              maxLen: 100,
            })}
          />
        </SimpleForm>
      </Create>
      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Product Attribute Create Failed"
      />
    </>
  );
};

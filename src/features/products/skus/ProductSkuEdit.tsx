import {
  AutocompleteInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useEnhancedMutationOptions } from "../../../hooks/useEnhancedMutationOptions.ts";
import { useApiErrorHandler } from "../../../utils/errorHandler.ts";
import {
  validatePrice,
  validateQuantity,
  validateRequired,
} from "../../../utils/commonValidator.ts";
import { ValidationErrorDialog } from "../../../components/ValidationErrorDialog.tsx";

export const ProductSkuEdit = () => {
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
      <Edit title="Product Sku Edit" mutationOptions={mutationOptions}>
        <SimpleForm>
          <TextInput disabled source="id" label="Id" />
          <TextInput disabled source="sku" label="SKU" />
          <NumberInput source="price" validate={validatePrice} />
          <NumberInput source="quantity" validate={validateQuantity} />
          <ReferenceInput
            source="productId"
            reference="products"
            label="Product"
            disabled
          >
            <AutocompleteInput optionText="name" disabled />
          </ReferenceInput>

          <ReferenceInput
            source="sizeAttributeId"
            reference="products/attributes"
            label="Size"
            filter={{ type: "SIZE" }}
          >
            <AutocompleteInput
              optionText="value"
              helperText="Type to search size attribute"
              validate={validateRequired({ fieldName: "Size Attribute" })}
            />
          </ReferenceInput>

          <ReferenceInput
            source="colorAttributeId"
            reference="products/attributes"
            label="Color"
            filter={{ type: "COLOR" }}
          >
            <AutocompleteInput
              optionText="value"
              helperText="Type to search color attribute"
              validate={validateRequired({ fieldName: "Color Attribute" })}
            />
          </ReferenceInput>
          <TextInput source="covers" />

          <DateInput disabled label="Created At" source="createdAt" />
          <DateInput disabled label="Updated At" source="updatedAt" />
        </SimpleForm>
      </Edit>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Product SKU Update Failed"
      />
    </>
  );
};

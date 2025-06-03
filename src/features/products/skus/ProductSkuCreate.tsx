import {
  AutocompleteInput,
  Create,
  NumberInput,
  ReferenceInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useApiErrorHandler } from "../../../utils/errorHandler.ts";
import { useEnhancedMutationOptions } from "../../../hooks/useEnhancedMutationOptions.ts";
import {
  validatePrice,
  validateQuantity,
  validateRequired,
  validateSkuCode,
} from "../../../utils/commonValidator.ts";
import { ValidationErrorDialog } from "../../../components/ValidationErrorDialog.tsx";

export const ProductSkuCreate = () => {
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
      <Create title="Product Sku Creation" mutationOptions={mutationOptions}>
        <SimpleForm>
          <TextInput source="sku" label="SKU" validate={validateSkuCode} />
          <NumberInput source="price" validate={validatePrice} />
          <NumberInput source="quantity" validate={validateQuantity} />
          <ReferenceInput
            source="productId"
            reference="products"
            label="Product"
          >
            <AutocompleteInput
              optionText="name"
              helperText="Type to search product"
              validate={validateRequired({ fieldName: "Product" })}
            />
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

          {/* images */}
        </SimpleForm>
      </Create>

      <ValidationErrorDialog
        open={showValidationDialog}
        onClose={hideValidationDialog}
        fieldErrors={validationErrors}
        title="Product SKU Create Failed"
      />
    </>
  );
};

import {
  AutocompleteInput,
  DateInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const ProductSkuEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" label="Id" />
      <TextInput source="sku" disabled label="SKU" />
      <NumberInput
        source="price"
        min={0}
        validate={[required("Product Sku price is required")]}
      />
      <NumberInput
        source="quantity"
        min={1}
        validate={[required("Product Sku quantity is required")]}
      />
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
        />
      </ReferenceInput>
      <TextInput source="covers" />

      <DateInput disabled label="Created At" source="createdAt" />
      <DateInput disabled label="Updated At" source="updatedAt" />
    </SimpleForm>
  </Edit>
);

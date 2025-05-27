import {
  AutocompleteInput,
  DateInput,
  Edit,
  minValue,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { InstructionAside } from "../../../components/InstructionAside.tsx";

const SKU_REQUIRED = "ProductSku sku is required.";
const SKU_MAX_LENGTH = "ProductSku sku length must less than 255.";
const PRICE_REQUIRED = "ProductSku price is required.";
const PRICE_NEGATIVE = "Price cannot be negative.";
const QUANTITY_REQUIRED = "ProductSku quantity is required.";
const QUANTITY_MIN = "ProductSku quantity is must greater or equal than 1";

export const ProductSkuEdit = () => {
  const instructions = [
    SKU_REQUIRED,
    SKU_MAX_LENGTH,
    PRICE_REQUIRED,
    PRICE_NEGATIVE,
    QUANTITY_REQUIRED,
    QUANTITY_MIN,
  ];

  return (
    <Edit
      title="Product Sku Edit"
      aside={
        <InstructionAside
          title="Product Sku Edit instruction"
          instructions={instructions}
        />
      }
    >
      <SimpleForm>
        <TextInput disabled source="id" label="Id" />
        <TextInput source="sku" disabled label="SKU" />
        <NumberInput
          source="price"
          min={0}
          validate={[required(PRICE_REQUIRED), minValue(0, PRICE_NEGATIVE)]}
        />
        <NumberInput
          source="quantity"
          min={1}
          validate={[required(QUANTITY_REQUIRED), minValue(1, QUANTITY_MIN)]}
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
};

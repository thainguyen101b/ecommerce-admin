import {
  AutocompleteInput,
  Create,
  maxLength,
  minValue,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";
import { InstructionAside } from "../../components/InstructionAside";

const SKU_REQUIRED = "ProductSku sku is required.";
const SKU_MAX_LENGTH = "ProductSku sku length must less than 255.";
const PRICE_REQUIRED = "ProductSku price is required.";
const PRICE_NEGATIVE = "Price cannot be negative.";
const QUANTITY_REQUIRED = "ProductSku quantity is required.";
const QUANTITY_MIN = "ProductSku quantity is must greater or equal than 1";

export const ProductSkuCreate = () => {
  const instructions = [
    SKU_REQUIRED,
    SKU_MAX_LENGTH,
    PRICE_REQUIRED,
    PRICE_NEGATIVE,
    QUANTITY_REQUIRED,
    QUANTITY_MIN,
  ];

  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create product attribute: ${error.message}`);
  };

  return (
    <Create
      title="Product Sku Creation"
      aside={
        <InstructionAside
          title="Product sku instructions"
          instructions={instructions}
        />
      }
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput
          source="sku"
          label="SKU"
          validate={[required(SKU_REQUIRED), maxLength(255, SKU_MAX_LENGTH)]}
        />
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
        <ReferenceInput source="productId" reference="products" label="Product">
          <AutocompleteInput
            optionText="name"
            helperText="Type to search product"
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
      </SimpleForm>
    </Create>
  );
};

import { Box, Typography } from "@mui/material";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useNotify,
} from "react-admin";

const Aside = () => (
  <Box sx={{ width: "200px", margin: "1em" }}>
    <Typography variant="h6">Instructions</Typography>
    <Typography variant="body2">foo</Typography>
  </Box>
);

export const ProductSkuCreate = () => {
  const notify = useNotify();

  const onError = (error: any) => {
    notify(`Could not create product attribute: ${error.message}`);
  };

  return (
    <Create
      title="Product Sku Creation"
      aside={<Aside />}
      mutationOptions={{ onError }}
    >
      <SimpleForm>
        <TextInput
          source="sku"
          label="SKU"
          validate={[required("Product Sku sku is required")]}
        />
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

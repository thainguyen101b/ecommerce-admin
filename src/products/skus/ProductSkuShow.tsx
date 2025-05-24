import {
  DateField,
  NumberField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const ProductSkuShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="sku" />
      <NumberField source="price" />
      <NumberField source="quantity" />
      <ReferenceField source="productId" reference="products">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField
        source="sizeAttributeId"
        reference="products/attributes"
        label="Size"
      >
        <TextField source="value" />
      </ReferenceField>
      <ReferenceField
        source="colorAttributeId"
        reference="products/attributes"
        label="Color"
      >
        <TextField source="value" />
      </ReferenceField>

      <TextField source="covers" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

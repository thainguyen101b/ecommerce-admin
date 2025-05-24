import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const ProductSkuList = () => (
  <List>
    <Datagrid>
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
    </Datagrid>
  </List>
);

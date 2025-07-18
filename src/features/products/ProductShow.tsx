import {
  DateField,
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const ProductShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField source="subcategoryId" reference="subcategories">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="summary" />
      <TextField source="description" />
      {/* images */}
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

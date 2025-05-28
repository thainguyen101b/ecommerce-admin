import {
  DateField,
  ImageField,
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
      <TextField source="description" />
      <TextField source="summary" />
      <ImageField source="pictures" src="src" title="title" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

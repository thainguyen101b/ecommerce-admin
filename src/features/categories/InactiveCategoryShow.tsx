import { DateField, SimpleShowLayout, TextField } from "react-admin";
import { InactiveShow } from "../../components/InactiveShow";

export const InactiveCategoryShow = () => (
  <InactiveShow
    resource="categories/inactive"
    title="Inactive Category Details"
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

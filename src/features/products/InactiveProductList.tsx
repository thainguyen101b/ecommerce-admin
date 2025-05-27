import { DateField, ReferenceField, TextField } from "react-admin";
import { InactiveList } from "../../components/InactiveList.tsx";

export const InactiveProductList = () => (
  <InactiveList resource="products/inactive" title="Inactive Products">
    <TextField source="id" />
    <TextField source="name" />
    <ReferenceField source="subcategoryId" reference="subcategories">
      <TextField source="name" />
    </ReferenceField>
    <TextField source="description" />
    <TextField source="summary" />
    <TextField source="covers" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

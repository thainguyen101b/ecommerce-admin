import { DateField, ImageField, ReferenceField, TextField } from "react-admin";
import { InactiveList } from "../../components/InactiveList.tsx";

export const InactiveProductList = () => (
  <InactiveList resource="products/inactive" title="Inactive Products">
    <TextField source="id" />
    <ImageField
      source="images"
      src="secureUrl"
      title="displayName"
      sortable={false}
    />
    <TextField source="name" />
    <ReferenceField source="subcategoryId" reference="subcategories">
      <TextField source="name" />
    </ReferenceField>
    <TextField source="description" />
    <TextField source="summary" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

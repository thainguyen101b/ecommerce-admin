import { DateField, ReferenceField, TextField } from "react-admin";
import { InactiveList } from "../../components/InactiveList.tsx";
import { getShowPageLink } from "../../utils/inactiveHelper.ts";

export const InactiveProductList = () => (
  <InactiveList resource="products/inactive" title="Inactive Products">
    <TextField source="id" />
    <TextField source="name" />
    <ReferenceField
      source="subcategoryId"
      reference="subcategories"
      link={getShowPageLink}
    >
      <TextField source="name" />
    </ReferenceField>
    <TextField source="description" />
    <TextField source="summary" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

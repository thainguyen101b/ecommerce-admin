import { DateField, ReferenceField, TextField } from "react-admin";
import { InactiveList } from "../../components/InactiveList.tsx";
import { getShowPageLink } from "../../utils/inactiveHelper.ts";

export const InactiveSubcategoryList = () => (
  <InactiveList
    resource="subcategories/inactive"
    title="Inactive Subcategories"
  >
    <TextField source="id" />
    <TextField source="name" />
    <TextField source="description" />
    <ReferenceField
      source="categoryId"
      reference="categories"
      link={getShowPageLink}
    >
      <TextField source="name" />
    </ReferenceField>
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

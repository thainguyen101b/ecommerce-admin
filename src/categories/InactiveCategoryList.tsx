import { DateField, TextField } from "react-admin";
import { InactiveList } from "../components/InactiveList";

export const InactiveCategoryList = () => (
  <InactiveList resource="categories/inactive" title="Inactive Categories">
    <TextField source="id" />
    <TextField source="name" />
    <TextField source="description" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

import { DateField, TextField } from "react-admin";
import { InactiveList } from "../../components/InactiveList";

export const InactiveProductAttributeList = () => (
  <InactiveList
    resource="products/attributes/inactive"
    title="Inactive Product Attributes"
  >
    <TextField source="id" />
    <TextField source="type" />
    <TextField source="value" />
    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

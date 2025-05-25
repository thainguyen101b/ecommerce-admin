import { Datagrid, DateField, List, TextField } from "react-admin";

export const ProductAttributeList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="value" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </Datagrid>
  </List>
);

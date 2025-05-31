import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  List,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

const ProductAttributeListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const productAttributeFilters = [<SearchInput source="q" alwaysOn />];

export const ProductAttributeList = () => (
  <List
    title="Product Attributes"
    actions={<ProductAttributeListActions />}
    filters={productAttributeFilters}
  >
    <DatagridConfigurable>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="value" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </DatagridConfigurable>
  </List>
);

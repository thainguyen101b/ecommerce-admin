import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  FilterButton,
  ImageField,
  List,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

const ProductListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const productFilters = [<SearchInput source="q" alwaysOn />];

export const ProductList = () => (
  <List actions={<ProductListActions />} filters={productFilters}>
    <DatagridConfigurable>
      <TextField source="id" />
      <TextField source="name" />
      <ImageField
        source="images"
        src="secureUrl"
        title="displayName"
        sortable={false}
      />
      <ReferenceField source="subcategoryId" reference="subcategories">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="description" />
      <TextField source="summary" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </DatagridConfigurable>
  </List>
);

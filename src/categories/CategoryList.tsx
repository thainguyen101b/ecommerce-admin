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

const CategoriesListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const categoriesFilters = [<SearchInput source="q" alwaysOn />];

export const CategoryList = () => (
  <List actions={<CategoriesListActions />} filters={categoriesFilters}>
    <DatagridConfigurable>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </DatagridConfigurable>
  </List>
);

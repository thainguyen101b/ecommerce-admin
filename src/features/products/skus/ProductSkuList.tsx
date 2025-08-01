import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberField,
  Pagination,
  ReferenceField,
  SearchInput,
  SelectColumnsButton,
  TextField,
  TopToolbar,
} from "react-admin";

const PostPagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);

const ProductSkuListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

const productSkuFilters = [<SearchInput source="q" alwaysOn />];

export const ProductSkuList = () => (
  <List
    pagination={<PostPagination />}
    title="Product SKUs"
    actions={<ProductSkuListActions />}
    filters={productSkuFilters}
  >
    <DatagridConfigurable>
      <TextField source="id" />
      <TextField source="sku" />
      <NumberField source="price" />
      <NumberField source="quantity" />

      <ReferenceField source="productId" reference="products">
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField
        source="sizeAttributeId"
        reference="products/attributes"
        label="Size"
      >
        <TextField source="value" />
      </ReferenceField>

      <ReferenceField
        source="colorAttributeId"
        reference="products/attributes"
        label="Color"
      >
        <TextField source="value" />
      </ReferenceField>

      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </DatagridConfigurable>
  </List>
);

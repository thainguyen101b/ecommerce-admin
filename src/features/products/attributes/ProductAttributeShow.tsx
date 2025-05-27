import {
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";

const ProductAttributeTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      {record
        ? `Product Attribute ${record.type}: ${record.value}`
        : "Product Attribute"}
    </span>
  );
};

export const ProductAttributeShow = () => (
  <Show title={<ProductAttributeTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="value" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);

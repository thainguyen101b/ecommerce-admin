import {
  DateField,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { InactiveShow } from "../../../components/InactiveShow";

const InactiveProductAttributeTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      {record
        ? `Inactive Product Attribute ${record.type}: ${record.value}`
        : "Inactive Product Attribute Details"}
    </span>
  );
};

export const InactiveProductAttributeShow = () => (
  <InactiveShow
    resource="products/attributes/inactive"
    title={<InactiveProductAttributeTitle />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="value" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

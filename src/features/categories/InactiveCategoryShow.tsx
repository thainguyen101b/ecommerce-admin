import {
  DateField,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { InactiveShow } from "../../components/InactiveShow";

const InactiveCategoryTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      {record
        ? `Inactive Category ${record.name}`
        : "Inactive Category Details"}
    </span>
  );
};

export const InactiveCategoryShow = () => (
  <InactiveShow
    resource="categories/inactive"
    title={<InactiveCategoryTitle />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

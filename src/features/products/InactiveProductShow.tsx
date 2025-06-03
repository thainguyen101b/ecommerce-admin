import {
  DateField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { InactiveShow } from "../../components/InactiveShow.tsx";
import { getShowPageLink } from "../../utils/inactiveHelper.ts";

const InactiveProductTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      {record ? `Inactive Product ${record.name}` : "Inactive Product Details"}
    </span>
  );
};

export const InactiveProductShow = () => (
  <InactiveShow resource="products/inactive" title={<InactiveProductTitle />}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceField
        source="subcategoryId"
        reference="subcategories"
        link={getShowPageLink}
      >
        <TextField source="name" />
      </ReferenceField>

      <TextField source="summary" />
      <TextField source="description" />
      {/* images */}

      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

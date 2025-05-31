import {
  DateField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { InactiveShow } from "../../components/InactiveShow";
import { getShowPageLink } from "../../utils/inactiveHelper";

const InactiveSubcategoryTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      {record
        ? `Inactive Subcategory ${record.name}`
        : "Inactive Subcategory Details"}
    </span>
  );
};

export const InactiveSubcategoryShow = () => (
  <InactiveShow
    resource="subcategories/inactive"
    title={<InactiveSubcategoryTitle />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <ReferenceField
        source="categoryId"
        reference="categories"
        link={getShowPageLink}
      >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

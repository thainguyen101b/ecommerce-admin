import {
  DateField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { InactiveShow } from "../../components/InactiveShow";
import { getShowPageLink } from "../../utils/inactiveHelper";

export const InactiveSubcategoryShow = () => (
  <InactiveShow
    resource="subcategories/inactive"
    title="Inactive Subcategory Details"
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

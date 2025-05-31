import {
  DateField,
  ImageField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { InactiveShow } from "../../components/InactiveShow.tsx";
import { getShowPageLink } from "../../utils/inactiveHelper.ts";

export const InactiveProductShow = () => (
  <InactiveShow resource="products/inactive" title="Inactive Product Details">
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
      <ImageField source="images" src="url" title="displayName" />

      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

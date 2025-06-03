import {
  DateField,
  NumberField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { InactiveShow } from "../../../components/InactiveShow";
import { getShowPageLink } from "../../../utils/inactiveHelper";

const InactiveProductSkuTitle = () => {
  const record = useRecordContext();
  return (
    <span>
      {record
        ? `Inactive Product SKU ${record.sku}`
        : "Inactive Product SKU Details"}
    </span>
  );
};

export const InactiveProductSkuShow = () => (
  <InactiveShow
    resource="products/skus/inactive"
    title={<InactiveProductSkuTitle />}
  >
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="sku" />
      <NumberField source="price" />
      <NumberField source="quantity" />

      <ReferenceField
        source="productId"
        reference="products"
        link={getShowPageLink}
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceField
        source="sizeAttributeId"
        reference="products/attributes"
        label="Size"
        link={getShowPageLink}
      >
        <TextField source="value" />
      </ReferenceField>

      <ReferenceField
        source="colorAttributeId"
        reference="products/attributes"
        label="Color"
        link={getShowPageLink}
      >
        <TextField source="value" />
      </ReferenceField>

      {/* images */}

      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <DateField source="deletedAt" />
    </SimpleShowLayout>
  </InactiveShow>
);

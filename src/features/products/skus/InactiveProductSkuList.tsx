import { DateField, NumberField, ReferenceField, TextField } from "react-admin";
import { InactiveList } from "../../../components/InactiveList.tsx";
import { getShowPageLink } from "../../../utils/inactiveHelper.ts";

export const InactiveProductSkuList = () => (
  <InactiveList resource="products/skus/inactive" title="Inactive Product SKUs">
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

    <DateField source="createdAt" />
    <DateField source="updatedAt" />
    <DateField source="deletedAt" />
  </InactiveList>
);

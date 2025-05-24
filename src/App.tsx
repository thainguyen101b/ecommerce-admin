import {
  Admin,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { keycloakAuthProvider } from "ra-keycloak";
import { keycloak, keycloakInitOptions } from "./keycloakConfig";

import CategoryIcon from "@mui/icons-material/Category";
import ProductIcon from "@mui/icons-material/Inventory";
import { Dashboard } from "./Dashboard";
import { CategoryCreate } from "./categories/CategoryCreate";
import { CategoryEdit } from "./categories/CategoryEdit";
import { ProductCreate } from "./products/ProductCreate";
import { SubcategoryCreate } from "./subcategories/SubcategoryCreate";
import { SubcategoryEdit } from "./subcategories/SubcategoryEdit";
import { ProductEdit } from "./products/ProductEdit";
import { AttributeCreate } from "./products/attributes/AttributeCreate";
import { AttributeEdit } from "./products/attributes/AttributeEdit";
import { ProductSkuList } from "./products/skus/ProductSkuList";
import { ProductSkuShow } from "./products/skus/ProductSkuShow";

const authProvider = keycloakAuthProvider(keycloak, {
  initOptions: keycloakInitOptions,
});

export const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    title="Ecommerce Admin"
    basename="/"
  >
    <Resource
      name="categories"
      list={ListGuesser}
      create={CategoryCreate}
      edit={CategoryEdit}
      show={ShowGuesser}
      icon={CategoryIcon}
    />

    <Resource
      name="subcategories"
      list={ListGuesser}
      create={SubcategoryCreate}
      edit={SubcategoryEdit}
      show={ShowGuesser}
    />

    {/* Products Resource */}
    <Resource
      name="products"
      list={ListGuesser}
      create={ProductCreate}
      edit={ProductEdit}
      show={ShowGuesser}
      icon={ProductIcon}
    />

    {/* Product SKUs Resource */}
    <Resource
      name="products/skus"
      list={ProductSkuList}
      edit={EditGuesser}
      show={ProductSkuShow}
      recordRepresentation="sku"
    />

    <Resource
      name="products/attributes"
      list={ListGuesser}
      create={AttributeCreate}
      edit={AttributeEdit}
      show={ShowGuesser}
      recordRepresentation={(record) => `${record.type}: ${record.value}`}
    />
  </Admin>
);

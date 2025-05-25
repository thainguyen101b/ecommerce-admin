import { Admin, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { keycloakAuthProvider } from "ra-keycloak";
import { keycloak, keycloakInitOptions } from "./keycloakConfig";

import CategoryIcon from "@mui/icons-material/Category";
import ProductIcon from "@mui/icons-material/Inventory";

import {
  SubcategoryCreate,
  SubcategoryEdit,
  SubcategoryList,
  SubcategoryShow,
} from "./subcategories";
import {
  ProductAttributeCreate,
  ProductAttributeEdit,
  ProductAttributeList,
  ProductAttributeShow,
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
  ProductSkuCreate,
  ProductSkuEdit,
  ProductSkuList,
  ProductSkuShow,
} from "./products";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./categories";
import { Dashboard } from "./dashboard";

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
      list={CategoryList}
      create={CategoryCreate}
      edit={CategoryEdit}
      show={CategoryShow}
      icon={CategoryIcon}
    />

    <Resource
      name="subcategories"
      list={SubcategoryList}
      create={SubcategoryCreate}
      edit={SubcategoryEdit}
      show={SubcategoryShow}
    />

    {/* Products Resource */}
    <Resource
      name="products"
      list={ProductList}
      create={ProductCreate}
      edit={ProductEdit}
      show={ProductShow}
      icon={ProductIcon}
    />

    {/* Product SKUs Resource */}
    <Resource
      name="products/skus"
      list={ProductSkuList}
      create={ProductSkuCreate}
      edit={ProductSkuEdit}
      show={ProductSkuShow}
      recordRepresentation="sku"
    />

    <Resource
      name="products/attributes"
      list={ProductAttributeList}
      create={ProductAttributeCreate}
      edit={ProductAttributeEdit}
      show={ProductAttributeShow}
      recordRepresentation={(record) => `${record.type}: ${record.value}`}
    />
  </Admin>
);

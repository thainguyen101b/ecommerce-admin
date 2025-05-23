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
import { SubcategoryCreate } from "./subcategories/SubCategoryCreate";
import { SubcategoryEdit } from "./subcategories/SubCategoryEdit";

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
      edit={EditGuesser}
      show={ShowGuesser}
      icon={ProductIcon}
    />

    {/* Product SKUs Resource */}
    <Resource
      name="products/skus"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />

    <Resource
      name="products/attributes"
      list={ListGuesser}
      edit={EditGuesser}
      show={ShowGuesser}
    />
  </Admin>
);

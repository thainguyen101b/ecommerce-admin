import { Admin, Loading, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { keycloakAuthProvider } from "ra-keycloak";
import {
  initKeycloak,
  keycloak,
  keycloakInitOptions,
  TokenManager,
} from "./keycloakConfig";

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
import { useEffect, useState } from "react";

const authProvider = keycloakAuthProvider(keycloak, {
  initOptions: keycloakInitOptions,
});

export const App = () => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initKeycloak()
      .then(() => setReady(true))
      .catch((e) => setError("Auth failed: " + e.message));

    return () => TokenManager.getInstance().stopAutoRefresh();
  }, []);

  if (error) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Error: {error}</h2>
        <button onClick={() => location.reload()}>Reload</button>
      </div>
    );
  }

  if (!ready) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <Loading />
        <p>Initializing authentication...</p>
      </div>
    );
  }

  return (
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
      />

      <Resource
        name="products/attributes"
        list={ProductAttributeList}
        create={ProductAttributeCreate}
        edit={ProductAttributeEdit}
        show={ProductAttributeShow}
      />
    </Admin>
  );
};

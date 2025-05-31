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
import DeleteIcon from "@mui/icons-material/Delete";

import {
  InactiveSubcategoryList,
  SubcategoryCreate,
  SubcategoryEdit,
  SubcategoryList,
  SubcategoryShow,
} from "./features/subcategories";
import {
  InactiveProductAttributeList,
  InactiveProductList,
  InactiveProductSkuList,
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
} from "./features/products";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
  InactiveCategoryList,
} from "./features/categories";
import { Dashboard } from "./features/dashboard";
import { useEffect, useState } from "react";
import { InactiveProductShow } from "./features/products/InactiveProductShow";
import { InactiveCategoryShow } from "./features/categories/InactiveCategoryShow";
import { InactiveSubcategoryShow } from "./features/subcategories/InactiveSubcategoryShow";
import { InactiveProductSkuShow } from "./features/products/skus/InactiveProductSkuShow";
import { InactiveProductAttributeShow } from "./features/products/attributes/InactiveProductAttributeShow";

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
        name="categories/inactive"
        list={InactiveCategoryList}
        show={InactiveCategoryShow}
        icon={DeleteIcon}
        options={{ label: "Inactive Categories" }}
      />

      <Resource
        name="subcategories"
        list={SubcategoryList}
        create={SubcategoryCreate}
        edit={SubcategoryEdit}
        show={SubcategoryShow}
      />

      <Resource
        name="subcategories/inactive"
        list={InactiveSubcategoryList}
        show={InactiveSubcategoryShow}
        icon={DeleteIcon}
        options={{ label: "Inactive Subcategories" }}
      />

      <Resource
        name="products"
        list={ProductList}
        create={ProductCreate}
        edit={ProductEdit}
        show={ProductShow}
        icon={ProductIcon}
      />

      <Resource
        name="products/inactive"
        list={InactiveProductList}
        show={InactiveProductShow}
        icon={DeleteIcon}
        options={{ label: "Inactive Products" }}
      />

      <Resource
        name="products/skus"
        list={ProductSkuList}
        create={ProductSkuCreate}
        edit={ProductSkuEdit}
        show={ProductSkuShow}
        options={{ label: "Product SKUs" }}
      />

      <Resource
        name="products/skus/inactive"
        list={InactiveProductSkuList}
        show={InactiveProductSkuShow}
        icon={DeleteIcon}
        options={{ label: "Inactive Product SKUs" }}
      />

      <Resource
        name="products/attributes"
        list={ProductAttributeList}
        create={ProductAttributeCreate}
        edit={ProductAttributeEdit}
        show={ProductAttributeShow}
        options={{ label: "Product Attributes" }}
      />

      <Resource
        name="products/attributes/inactive"
        list={InactiveProductAttributeList}
        show={InactiveProductAttributeShow}
        icon={DeleteIcon}
        options={{ label: "Inactive Product Attributes" }}
      />
    </Admin>
  );
};

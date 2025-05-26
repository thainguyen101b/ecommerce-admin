import { Admin, Loading, Resource } from "react-admin";
import { dataProvider } from "./dataProvider";
import { keycloakAuthProvider } from "ra-keycloak";
import {
  initializeKeycloak,
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
  const [isKeycloakReady, setIsKeycloakReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("Initializing Keycloak...");
        await initializeKeycloak();
        setIsKeycloakReady(true);
        console.log("Keycloak initialized successfully");
      } catch (error) {
        console.error("Failed to initialize Keycloak:", error);
        setAuthError(
          "Failed to initialize authentication. Please refresh the page.",
        );
      }
    };

    initAuth();

    // Cleanup token refresh timer on unmount
    return () => {
      const tokenManager = TokenManager.getInstance();
      tokenManager.stopTokenRefreshTimer();
    };
  }, []);

  // Show loading screen while Keycloak is initializing
  if (!isKeycloakReady) {
    if (authError) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h2>Authentication Error</h2>
          <p>{authError}</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Loading />
        <h3>Initializing authentication...</h3>
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

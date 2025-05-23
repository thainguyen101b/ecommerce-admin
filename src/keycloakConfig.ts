import Keycloak, { KeycloakInitOptions } from "keycloak-js";

export const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: "ecommerce",
  clientId: "js-client",
};

export const keycloak = new Keycloak(keycloakConfig);

// Keycloak initialization options
export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required" as const,
  checkLoginIframe: false,
  pkceMethod: "S256" as const,
};

import Keycloak, { KeycloakInitOptions } from "keycloak-js";

export const keycloak = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: "ecommerce",
  clientId: "js-client",
});

export const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: "login-required",
  checkLoginIframe: false,
  pkceMethod: "S256",
};

export class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<boolean> | null = null;
  private timer: NodeJS.Timeout | null = null;

  static getInstance() {
    if (!this.instance) this.instance = new TokenManager();
    return this.instance;
  }

  async getValidToken(): Promise<string> {
    if (!keycloak.authenticated) throw new Error("User not authenticated");

    if (this.refreshPromise) await this.refreshPromise;

    try {
      this.refreshPromise = keycloak.updateToken(60);
      await this.refreshPromise;
      return keycloak.token!;
    } catch (error) {
      keycloak.logout();
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  startAuthRefresh() {
    this.stopAutoRefresh();
    this.timer = setInterval(async () => {
      if (keycloak.authenticated) {
        try {
          await this.getValidToken();
        } catch (e) {
          console.warn("Auto refresh failed:", e);
        }
      }
    }, 30000);
  }

  stopAutoRefresh() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

// Initialize Keycloak and setup token management
let initPromise: Promise<boolean> | null = null;

export const initKeycloak = async (): Promise<boolean> => {
  if (initPromise) return initPromise;

  initPromise = keycloak.init(keycloakInitOptions).then((authenticated) => {
    if (authenticated) {
      TokenManager.getInstance().startAuthRefresh();
    }
    return authenticated;
  });

  return initPromise;
};

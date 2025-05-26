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

export const TOKEN_REFRESH_CONFIG = {
  minValidity: 60,
  checkInterval: 30000,
  maxRetries: 3,
  retryDelay: 1000,
};

export class TokenManager {
  private static instance: TokenManager;
  private refreshPromise: Promise<boolean> | null = null;
  private refreshInterval: NodeJS.Timeout | null = null;
  private retryCount = 0;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }

    return TokenManager.instance;
  }

  async ensureValidToken(
    minValidity: number = TOKEN_REFRESH_CONFIG.minValidity,
  ): Promise<string | null> {
    if (!keycloak.authenticated) {
      throw new Error("User not authenticated");
    }

    // If there's already a refresh in progress, wait for it
    if (this.refreshPromise) {
      await this.refreshPromise;
      return keycloak.token || null;
    }

    try {
      this.refreshPromise = keycloak.updateToken(minValidity);
      const refreshed = await this.refreshPromise;

      if (refreshed) {
        console.log("Token refreshed successfully");
        this.retryCount = 0; // Reset retry count on success
      }

      return keycloak.token || null;
    } catch (error) {
      this.retryCount++;
      console.error(
        `Token refresh failed (attempt ${this.retryCount}): `,
        error,
      );

      if (this.retryCount >= TOKEN_REFRESH_CONFIG.maxRetries) {
        console.error("Max retry attempts reached, logging out user");
        keycloak.logout();
        throw new Error("Authentication failed after maximum retries");
      }

      const delay =
        TOKEN_REFRESH_CONFIG.retryDelay * Math.pow(2, this.retryCount - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  getTokenExpirationTime(): number | null {
    if (!keycloak.tokenParsed?.exp) return null;
    return keycloak.tokenParsed.exp * 1000;
  }

  getTimeUntilExpiration(): number | null {
    const expTime = this.getTokenExpirationTime();
    if (!expTime) return null;
    return expTime - Date.now();
  }

  isTokenExpiringSoon(
    thresholdSeconds: number = TOKEN_REFRESH_CONFIG.minValidity,
  ): boolean {
    const timeUntilExp = this.getTimeUntilExpiration();
    if (!timeUntilExp) return true;
    return timeUntilExp < thresholdSeconds * 1000;
  }

  startTokenRefreshTimer(): () => void {
    this.stopTokenRefreshTimer();

    this.refreshInterval = setInterval(() => {
      this.handleScheduledTokenRefresh();
    }, TOKEN_REFRESH_CONFIG.checkInterval);

    return () => this.stopTokenRefreshTimer();
  }

  private async handleScheduledTokenRefresh() {
    try {
      if (keycloak.authenticated && this.isTokenExpiringSoon()) {
        await this.ensureValidToken();
      }
    } catch (error) {
      console.log("Scheduled token refresh failed: ", error);
    }
  }

  stopTokenRefreshTimer(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }

  getTokenInfo(): {
    isValid: boolean;
    expiresAt: Date | null;
    timeUntilExpiration: number | null;
    isExpiringSoon: boolean;
  } {
    const expTime = this.getTokenExpirationTime();
    const timeUntilExp = this.getTimeUntilExpiration();

    return {
      isValid: keycloak.authenticated || false,
      expiresAt: expTime ? new Date(expTime) : null,
      timeUntilExpiration: timeUntilExp,
      isExpiringSoon: this.isTokenExpiringSoon(),
    };
  }
}

// Setup Keycloak event listeners
export const setupKeycloakEventListeners = (): void => {
  const tokenManager = TokenManager.getInstance();
  keycloak.onTokenExpired = () => {
    console.log("Token expired, attempting refresh...");
    tokenManager
      .ensureValidToken(0) // force refresh
      .then(() => console.log("Token refreshed after expiration"))
      .catch((error) => {
        console.error("Failed to refresh expired token: ", error);
        keycloak.logout();
      });
  };

  keycloak.onAuthRefreshSuccess = () => {
    console.log("Auth refresh successful");
  };

  keycloak.onAuthRefreshError = () => {
    console.error("Auth refresh failed");
    keycloak.logout();
  };

  keycloak.onAuthLogout = () => {
    console.log("User logged out! Goodbye");
    tokenManager.stopTokenRefreshTimer();
  };

  keycloak.onAuthSuccess = () => {
    console.log("Authentication successful");
    tokenManager.startTokenRefreshTimer();
  };

  keycloak.onReady = (authenticated) => {
    console.log(`Keycloak ready. Authenticated: ${authenticated}`);
    if (authenticated) {
      const tokenInfo = tokenManager.getTokenInfo();
      console.log("Token info:", tokenInfo);
      tokenManager.startTokenRefreshTimer();
    }
  };
};

// Initialize Keycloak and setup token management
let initPromise: Promise<boolean> | null = null;
export const initializeKeycloak = async (): Promise<boolean> => {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    try {
      const authenticated = await keycloak.init(keycloakInitOptions);
      setupKeycloakEventListeners();

      if (authenticated) {
        console.log("Keycloak initialized successfully");
        const tokenManager = TokenManager.getInstance();
        const tokenInfo = tokenManager.getTokenInfo();
        console.log("Initial token info: ", tokenInfo);
      }

      return authenticated;
    } catch (error) {
      console.error("Failed to initialize Keycloak:", error);
      throw error;
    }
  })();

  return initPromise;
};

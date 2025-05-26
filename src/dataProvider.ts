import { DataProvider, fetchUtils } from "react-admin";
import { keycloak, TokenManager } from "./keycloakConfig";

const API_URL = import.meta.env.VITE_API_URL;

// Custom httpClient to add Token header instead of Bearer
const httpClient = async (
  url: string,
  options: fetchUtils.Options = {},
): Promise<{ status: number; headers: Headers; body: string; json: any }> => {
  const tokenManager = TokenManager.getInstance();

  // setup headers
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // ensure we have a valid token before making the request
  try {
    if (keycloak.authenticated) {
      const token = await tokenManager.ensureValidToken();
      if (token) {
        (options.headers as Headers).set("Authorization", `Token ${token}`);
      }
    } else {
      throw new Error("User not authenticated");
    }
  } catch (error) {
    console.error("Token validation failed before request: ", error);
    throw new Error("Authentication required");
  }

  // making the initial request
  try {
    return fetchUtils.fetchJson(url, options);
  } catch (error: any) {
    if (error.status === 401) {
      console.log("Received 401, attempting token refresh and retry...");

      try {
        // Force refresh the token
        const refreshedToken = await tokenManager.ensureValidToken(0);

        if (refreshedToken) {
          (options.headers as Headers).set(
            "Authorization",
            `Token ${refreshedToken}`,
          );

          console.log("Retrying request with refreshed token ...");
          return await fetchUtils.fetchJson(url, options);
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (refreshError) {
        console.error("Token refresh failed on 401 retry: ", refreshError);
        // If refresh fails, logout the user
        keycloak.logout();
        throw new Error("Session expired. Please login again.");
      }
    }
    throw error;
  }
};

// Custom data provider for Spring Boot pagination format
export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { pagination, sort, filter } = params;
    const page = pagination?.page ?? 1;
    const perPage = pagination?.perPage ?? 10;
    const field = sort?.field ?? "id";
    const order = sort?.order ?? "ASC";
    const query = {
      page: page - 1,
      size: perPage,
      sort: `${field},${order.toLowerCase()}`,
      ...filter,
    };

    try {
      const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
      const { json } = await httpClient(url);

      // handle different response structures
      if (json.content !== undefined) {
        // Spring Boot pagination: { content: [], totalElements: number }
        return {
          data: json.content,
          total: json.page?.totalElements ?? json.totalElements ?? 0,
        };
      } else if (Array.isArray(json)) {
        // simple array format
        return {
          data: json,
          total: json.length,
        };
      } else {
        // fallback
        return {
          data: [],
          total: 0,
        };
      }
    } catch (error) {
      console.error(`Error fetching ${resource} list: `, error);
      throw error;
    }
  },

  getOne: async (resource, params) => {
    try {
      const url = `${API_URL}/${resource}/${params.id}`;
      const { json } = await httpClient(url);
      return { data: json };
    } catch (error) {
      console.error(`Error fetching ${resource} with id ${params.id}: `, error);
      throw error;
    }
  },

  getMany: async (resource, params) => {
    try {
      const query = {
        id: params.ids,
      };

      const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
      const { json } = await httpClient(url);
      return { data: json.content || json || [] };
    } catch (error: any) {
      console.error(`Error fetching multiple ${resource}:`, error);
      throw error;
    }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      page: page - 1,
      size: perPage,
      sort: `${field},${order.toLowerCase()}`,
      [params.target]: params.id,
      ...params.filter,
    };

    try {
      const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
      const { json } = await httpClient(url);

      return {
        data: json.content || [],
        total: json.page?.totalElements ?? json.totalElements ?? 0,
      };
    } catch (error) {
      console.error(`Error fetching ${resource} references:`, error);
      throw error;
    }
  },

  create: async (resource, params) => {
    try {
      const { json } = await httpClient(`${API_URL}/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      });
      console.log(`Created ${resource}:`, json);
      return { data: json };
    } catch (error: any) {
      console.error(`Error creating ${resource}:`, error);
      throw error;
    }
  },

  update: async (resource, params) => {
    try {
      const url = `${API_URL}/${resource}/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      console.log(`Updated ${resource} with id ${params.id}:`, json);
      return { data: json };
    } catch (error: any) {
      console.error(`Error updating ${resource} with id ${params.id}:`, error);
      throw error;
    }
  },

  updateMany: async (resource, params) => {
    try {
      const query = {
        id: params.ids,
      };
      const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
      await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
      });
      console.log(`Updated multiple ${resource}:`, params.ids);
      return { data: params.ids };
    } catch (error: any) {
      console.error(`Error updating multiple ${resource}:`, error);
      throw error;
    }
  },

  delete: async (resource, params) => {
    try {
      const url = `${API_URL}/${resource}/${params.id}`;
      await httpClient(url, {
        method: "DELETE",
      });
      console.log(`Deleted resource ${resource} with id ${params.id}`);
      return { data: params.previousData as any };
    } catch (error: any) {
      console.error(`Error deleting resource ${resource} with id ${params.id}`);
      throw error;
    }
  },

  deleteMany: async (resource, params) => {
    try {
      const query = {
        id: params.ids,
      };
      const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
      await httpClient(url, {
        method: "DELETE",
      });
      console.log(`Deleted multiple ${resource}: `, params.ids);
      return { data: params.ids };
    } catch (error) {
      console.error(`Error deleting multiple ${resource}: `, error);
      throw error;
    }
  },
};

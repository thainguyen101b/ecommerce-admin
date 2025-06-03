import { DataProvider, fetchUtils } from "react-admin";
import { TokenManager } from "./keycloakConfig";

const API_URL = import.meta.env.VITE_API_URL;

// Custom httpClient to add Token header instead of Bearer
const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  // Add token
  const token = await TokenManager.getInstance().getValidToken();
  (options.headers as Headers).set("Authorization", `Token ${token}`);

  try {
    return fetchUtils.fetchJson(url, options);
  } catch (error: any) {
    // Retry on 401
    if (error.status === 401) {
      const newToken = await TokenManager.getInstance().getValidToken();
      (options.headers as Headers).set("Authorization", `Token ${newToken}`);
      return await fetchUtils.fetchJson(url, options);
    }
    throw error;
  }
};

// Extended DataProvider interface with custom methods
export interface ExtendedDataProvider extends DataProvider {
  restoreOne: (resource: string, params: { id: any }) => Promise<{ data: any }>;
  restoreMany: (
    resource: string,
    params: { ids: any[] },
  ) => Promise<{ data: any[] }>;
}

// Custom data provider for Spring Boot pagination format
export const dataProvider: ExtendedDataProvider = {
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

    const { json } = await httpClient(
      `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`,
    );

    // Spring Boot pagination: { content: [], totalElements: number }
    return {
      data: json.content,
      total: json.page.totalElements,
    };
  },

  getOne: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const { json } = await httpClient(
      `${API_URL}/${resource}?${fetchUtils.queryParameters({ id: params.ids })}`,
    );
    return { data: json.content || json };
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

    const { json } = await httpClient(
      `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`,
    );

    return {
      data: json.content || [],
      total: json.page.totalElements || 0,
    };
  },

  create: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  update: async (resource, params) => {
    const { json } = await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: json };
  },

  updateMany: async (resource, params) => {
    await httpClient(
      `${API_URL}/${resource}?${fetchUtils.queryParameters({ id: params.ids })}`,
      {
        method: "PUT",
        body: JSON.stringify(params.data),
      },
    );
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    await httpClient(`${API_URL}/${resource}/${params.id}`, {
      method: "DELETE",
    });
    return { data: params.previousData as any };
  },

  deleteMany: async (resource, params) => {
    const url = `${API_URL}/${resource}?${fetchUtils.queryParameters({ id: params.ids })}`;
    await httpClient(url, { method: "DELETE" });
    return { data: params.ids };
  },

  // Custom restore methods
  restoreOne: async (resource, params) => {
    const { json } = await httpClient(
      `${API_URL}/${resource}/${params.id}/restore`,
      {
        method: "POST",
      },
    );
    return { data: json || { id: params.id, restored: true } };
  },

  restoreMany: async (resource, params) => {
    const queryParams = params.ids.map((id) => `id=${id}`).join("&");
    const { json } = await httpClient(
      `${API_URL}/${resource}/restore?${queryParams}`,
      {
        method: "POST",
      },
    );
    return { data: json || params.ids.map((id) => ({ id, restored: true })) };
  }
};

import {
  DataProvider,
  fetchUtils,
} from "react-admin";
import { keycloak } from "./keycloakConfig";

const API_URL = import.meta.env.VITE_API_URL;

// Custom httpClient to add Token header instead of Bearer
const httpClient = (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  const token = keycloak.token;
  if (token) {
    (options.headers as Headers).set("Authorization", `Token ${token}`);
  }

  return fetchUtils.fetchJson(url, options);
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

    const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);

    // Spring Boot pagination: { content: [], totalElements: number }
    return {
      data: json.content,
      total: json.page.totalElements,
    };
  },

  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const { json } = await httpClient(url);
    return { data: json };
  },

  getMany: async (resource, params) => {
    const query = {
      id: params.ids,
    };

    const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);
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

    const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
    const { json } = await httpClient(url);

    return {
      data: json.content,
      total: json.page.totalElements,
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
    const url = `${API_URL}/${resource}/${params.id}`;
    const { json } = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });

    return { data: json };
  },

  updateMany: async (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
    await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: params.ids };
  },

  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    await httpClient(url, {
      method: "DELETE",
    });
    return { data: params.previousData as any };
  },

  deleteMany: async (resource, params) => {
    const query = {
      id: params.ids,
    };
    const url = `${API_URL}/${resource}?${fetchUtils.queryParameters(query)}`;
    await httpClient(url, {
      method: "DELETE",
    });
    return { data: params.ids };
  },
};

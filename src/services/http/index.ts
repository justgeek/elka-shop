import { QOGITA_API_URL } from "src/config/endpoints";

// Can be extended later to add further functionalities like token handling, intercepting requests, and responses .. etc
export class HttpService {
  public async get<T>(url: string, params?: any) {
    try {
      const response = await fetch(url + "?" + new URLSearchParams(params), { method: "GET" });
      return response.json();
    } catch (e) {
      console.error("error", e);
    }
  }

  // add POST, PUT, PATCH, DELETE later on
}

export const httpService = new HttpService();

import { IProduct, IQueryParams } from "@/types";
import api from "@/utils/api";

export async function getProducts(params: IQueryParams, tokenAuth?: string) {
  const config = {
    params: params,
    headers: {
      Authorization: `Bearer ${tokenAuth}`,
    },
  };
  try {
    const response = await api.get("products", config);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Other authentication-related functions can be added here
export async function postProduct(data: IProduct, tokenAuth?: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${tokenAuth}`,
    },
  };
  try {
    const response = await api.post("products", data, config);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

import { IProduct, IQueryParams } from "@/types";
import api from "@/utils/api";
import axios, { AxiosError } from "axios";

export async function handleError(error:any) {
  if (axios.isAxiosError(error)) {
    const axiosError: AxiosError = error;
    const errorData = axiosError.response?.data || 'An error occurred';
    const customError = {
      message: 'Request failed',
      statusCode: axiosError.response?.status || 500,
      data: errorData
    };
    return customError; // Return the custom error object
  } else {
    // If it's not an Axios error, handle other types of errors here
    return {
      message: 'An unknown error occurred',
      statusCode: 500,
      data: 'Unknown error'
    };
  }
}

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
   handleError(error)

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
   throw new Error(error)
  }
}

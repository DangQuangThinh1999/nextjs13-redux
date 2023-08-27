import { ICredentials, IRegisterUser } from "@/types";
import api, { setAuthToken } from "@/utils/api";

export async function loginUI(data: ICredentials) {
  try {
    const response = await api.post("auth/users", data);
    setAuthToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error: any) {
    throw new Error(error);
  }
}

// Other authentication-related functions can be added here
export async function registerUI(data: IRegisterUser) {
  try {
    const response = await api.post("users", data);

    return response;
  } catch (error: any) {
    throw new Error(error);
  }
}

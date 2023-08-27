import { ICredentials } from "@/types";

// src/features/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthContextData {
  tokenAuth?: string;
  user?: ICredentials | null;
  isAuthenticated?: boolean;
}

const initialState: IAuthContextData = {
  tokenAuth: "",
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state: IAuthContextData,
      action: PayloadAction<IAuthContextData>
    ) => {
      state.user = action.payload.user;
      state.tokenAuth = action.payload.tokenAuth;
      if (state.tokenAuth) {
        state.isAuthenticated = true;
        document.cookie = `access_token=${state.tokenAuth}; path=/;`;
      }
    },
    logout: (state: IAuthContextData) => {
      document.cookie = "access_token=; path=/;";
      state.user = null;
      state.tokenAuth = "";
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

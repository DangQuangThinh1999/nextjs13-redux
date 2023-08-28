import { ICredentials } from "@/types";
import { delete_cookie } from "@/utils/api";

// src/features/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface IAuthContextData {
  tokenAuth?: string;
  user?: ICredentials | null;

}

const initialState: IAuthContextData = {
  tokenAuth: "",
  user: null,

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
        document.cookie = `access_token=${state.tokenAuth}; path=/;`;
      }
    },
    logout: (state: IAuthContextData) => {
      delete_cookie('access_token')
      state.user = null;
      state.tokenAuth = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

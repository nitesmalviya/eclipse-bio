

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthState, SigninPayload } from "@/types/auth-type";

const access_token = Cookies.get("access_token") ?? ""
const refresh_token = Cookies.get("refresh_token") ?? ""
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null

const initialState: AuthState = {
  access_token: access_token,
  refresh_token: refresh_token,
  user: user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<SigninPayload>) => {

      Cookies.set("access_token", action.payload.access_token);
      Cookies.set("refresh_token", action.payload.refresh_token);
      Cookies.set("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token;
      state.access_token = action.payload.access_token;
    },
    logout: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("user");
      localStorage.clear();
      state.refresh_token = "";
      state.access_token = "";
      state.user = null;
    },

  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

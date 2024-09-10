import { configureStore } from "@reduxjs/toolkit";
import { IUserInfoV2 } from "@/models";
import { userSlice } from "../../states/v2/user";

export interface AppStore {
  user: IUserInfoV2
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer
  }
})
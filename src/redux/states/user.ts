import { createSlice } from "@reduxjs/toolkit";
import { Roles, UserInfo } from "@/models";
import { clearLocalStorage, persistLocalStorage } from "@/utils";

export const userKey = 'user'

export const userData: UserInfo = JSON.parse(localStorage.getItem('user') as string)

export const EmptyUserState: UserInfo = {
  token: null,
  datos: {
    Usuario: '',
    EstaActivo: false,
    IDPerfil: Roles.NA,
  }

}

export const userSlice = createSlice({
  name: 'user',
  initialState: localStorage.getItem('user') ? userData : EmptyUserState,
  reducers: {
    createUser: (_state, action) => {
      persistLocalStorage<UserInfo>(userKey, action.payload)
      return action.payload
    },
    updateUser: (state, action) => {
      const result = { ...state, ...action.payload }
      persistLocalStorage(userKey, result)
      return result
    },
    resetUser: () => {
      clearLocalStorage(userKey)
      return EmptyUserState
    }
  }
})

export const { createUser, updateUser, resetUser } = userSlice.actions

export default userSlice.reducer
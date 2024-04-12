import { authHeather } from "@/utils"
import { IUserEncrypt } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const usersUrl = baseURL + 'v1/userEncryptRoutes/getAllUsers'
const AllUsersAppXUrl = baseURL + 'v1/userEncryptRoutes/getAllUsersAppX'
const AllUsersPCSUrl = baseURL + 'v1/userEncryptRoutes/getAllUsersPCS'
const TipoUsuarioUrl = baseURL + 'v1/userEncryptRoutes/getTipoUsuario'
const updateUsersUrl = baseURL + 'v1/userEncryptRoutes/updateUser'
const insertUsersUrl = baseURL + 'v1/userEncryptRoutes/insertUser'
const decryptPassUrl = baseURL + 'v1/userEncryptRoutes/decryptPass'

export const getAllUsers = async () => {
  return await fetch(usersUrl, { headers: authHeather() })
}

export const getAllUsersAppXUrl = async () => {
  return await fetch(AllUsersAppXUrl, { headers: authHeather() })
}

export const getTipoUsuarioUrl = async () => {
  return await fetch(TipoUsuarioUrl, { headers: authHeather() })
}

export const getAllUsersPCSUrl = async () => {
  return await fetch(AllUsersPCSUrl, { headers: authHeather() })
}

export const postInsertUser = async (user: IUserEncrypt) => {
  const response = await fetch(insertUsersUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      usuario: user.Usuario,
      pwd: user.PwdEncryted,
      gestor: user.Gestor,
      aplicacion: user.DireccionApp,
      appx: user.AppX,
      tipousuario: user.TipoUsuario
    })
  })

  return response
}

export const putUpdateUser = async (user: IUserEncrypt) => {
  console.log(user)
  const response = await fetch(updateUsersUrl, {
    method: 'put',
    headers: authHeather(),
    body: JSON.stringify({
      id: user.Id,
      pwd: user.PwdEncryted,
      aplicacion: user.DireccionApp,
      appx: user.AppX,
      tipousuario: user.TipoUsuario,
      gestor: user.Gestor,
      isEnable: user.isEnable
    })
  })

  return response
}

export const postDecryptPass = async (Id: number) => {
  const response = await fetch(decryptPassUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      Id
    })
  })

  return response
}
import { authHeather } from "@/utils"
import { IUserEncryptV2 } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const usersUrl = baseURL + 'v2/userEncryptRoutes/getAllUsers'
const AllUsersAppXUrl = baseURL + 'v2/userEncryptRoutes/getAllUsersAppX'
const AllUsersPCSUrl = baseURL + 'v2/userEncryptRoutes/getAllUsersPCS'
const TipoUsuarioUrl = baseURL + 'v2/userEncryptRoutes/getTipoUsuario'
const updateUsersUrl = baseURL + 'v2/userEncryptRoutes/updateUser'
const insertUsersUrl = baseURL + 'v2/userEncryptRoutes/insertUser'
const decryptPassUrl = baseURL + 'v2/userEncryptRoutes/decryptPass'

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

export const postInsertUser = async (user: IUserEncryptV2) => {
  const response = await fetch(insertUsersUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      usuario: user.Usuario,
      pwd: user.PwdEncryted,
      gestor: user.Gestor,
      aplicacion: user.DireccionApp,
      appx: user.AppX,
      tipousuario: user.TipoUsuario,
      Puestos: user.Puestos
    })
  })

  return response
}

export const putUpdateUser = async (user: IUserEncryptV2) => {
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
      isEnable: user.isEnable,
      Puestos: user.Puestos
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
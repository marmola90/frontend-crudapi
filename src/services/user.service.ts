import { authHeather } from "@/utils"
import { IUser, IUserAsignado } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const usersUrl = baseURL + 'v1/userRoutes/getAllUsers'
const usersRolesUrl = baseURL + 'v1/userRoutes/getAllUsersRoles'
const usersRolesCantidadUrl = baseURL + 'v1/userRoutes/getAllUsersRolesCantidad'
const insertarUsersUrl = baseURL + 'v1/userRoutes/insertUser'
const updateUsersUrl = baseURL + 'v1/userRoutes/updateUser'
const deleteUsersUrl = baseURL + 'v1/userRoutes/deleteUser'

const asignarUserUrl = baseURL + 'v1/userRoutes/asignarUser'
const getUsersAsignadosUrl = baseURL + 'v1/userRoutes/getUsersAsignado'


export const getAllUsers = async () => {
  return await fetch(usersUrl, { headers: authHeather() })
}

export const getAllUsersRoles = async () => {
  return await fetch(usersRolesUrl, { headers: authHeather() })
}


export const getAllUsersRolesCantidad = async () => {
  return await fetch(usersRolesCantidadUrl, { headers: authHeather() })
}

export const insertUser = async (user: IUser) => {

  const { Usuario, EstaActivo, IDPerfil } = user
  const response = await fetch(insertarUsersUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      Usuario, EstaActivo, IDPerfil
    })
  })

  return response
}

export const updateUser = async (user: IUser) => {
  const {
    Id, Usuario, EstaActivo, IDPerfil
  } = user

  const response = await fetch(updateUsersUrl, {
    method: 'put',
    headers: authHeather(),
    body: JSON.stringify({
      Id, Usuario, EstaActivo, IDPerfil
    })
  })

  return response
}

export const deleteUser = async (ID: number) => {
  console.log(ID)
  const response = await fetch(deleteUsersUrl, {
    method: 'delete',
    headers: authHeather(),
    body: JSON.stringify({
      ID
    })
  })

  return response
}

export const asignarUser = async (user: IUserAsignado[]) => {

  console.log(user)
  const response = await fetch(asignarUserUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify(
      user
    )
  })

  return response
}

export const getUserAsignados = async (IDPerfil: number) => {
  console.log(IDPerfil)
  const response = await fetch(getUsersAsignadosUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify(
      { IDPerfil }
    )
  })

  return response
}

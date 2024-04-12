import { authHeather } from "@/utils"
import { IPerfil } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const perfilUrl = baseURL + 'v1/perfilRoutes/getAllPerfil'
const rolesCantidadUrl = baseURL + 'v1/perfilRoutes/getAllRolesModulesCantidad'
const insertarPerfilUrl = baseURL + 'v1/perfilRoutes/insertPerfil'
const updatePerfilUrl = baseURL + 'v1/perfilRoutes/updatePerfil'
const deletePerfilUrl = baseURL + 'v1/perfilRoutes/deletePerfil'

export const getAllPerfil = async () => {
  return await fetch(perfilUrl, { headers: authHeather() })
}

export const getAllRolesModulosCantidad = async () => {
  return await fetch(rolesCantidadUrl, { headers: authHeather() })
}

export const insertPerfil = async (perfil: IPerfil) => {

  const { Descripcion } = perfil
  const response = await fetch(insertarPerfilUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      Descripcion
    })
  })

  return response
}

export const updatePerfil = async (perfil: IPerfil) => {
  const {
    IDPerfil, Descripcion
  } = perfil

  const response = await fetch(updatePerfilUrl, {
    method: 'put',
    headers: authHeather(),
    body: JSON.stringify({
      IDPerfil, Descripcion
    })
  })

  return response
}

export const deletePerfil = async (IDPerfil: number) => {
  const response = await fetch(deletePerfilUrl, {
    method: 'delete',
    headers: authHeather(),
    body: JSON.stringify({
      IDPerfil
    })
  })

  return response
}
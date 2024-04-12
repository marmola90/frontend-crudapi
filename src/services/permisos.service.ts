import { authHeather } from "@/utils"
import { IPermisos, IPermisosAsignados } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const permisosUrl = baseURL + 'v1/permisosRoutes/getAllPermisos'
const insertarPermisosUrl = baseURL + 'v1/permisosRoutes/insertPermiso'
const updatePermisosUrl = baseURL + 'v1/permisosRoutes/updatePermiso'
const asignarPermisosUrl = baseURL + 'v1/permisosRoutes/asignarPermiso'
const permisosAsignadosUrl = baseURL + 'v1/permisosRoutes/getPermisoAsignado'
const deletePermisosAsignadosUrl = baseURL + 'v1/permisosRoutes/deletePermisosAsignados'

export const getAllPermisos = async () => {
  return await fetch(permisosUrl, { headers: authHeather() })
}

export const insertPermiso = async (permiso: IPermisos) => {

  const { Descripcion } = permiso
  const response = await fetch(insertarPermisosUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      Descripcion
    })
  })

  return response
}

export const updatePermiso = async (permiso: IPermisos) => {
  const {
    IDPermisos, Descripcion
  } = permiso

  const response = await fetch(updatePermisosUrl, {
    method: 'put',
    headers: authHeather(),
    body: JSON.stringify({
      IDPermisos, Descripcion
    })
  })

  return response
}

export const asignarPermiso = async (permisosAsignados: IPermisosAsignados[]) => {

  //console.log(permisosAsignados)
  const response = await fetch(asignarPermisosUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify(
      permisosAsignados
    )
  })

  return response
}

export const deletePermisoAsignado = async (permisosAsignados: IPermisosAsignados[]) => {

  //console.log(permisosAsignados)
  const response = await fetch(deletePermisosAsignadosUrl, {
    method: 'delete',
    headers: authHeather(),
    body: JSON.stringify(
      permisosAsignados
    )
  })

  return response
}

export const permisosAsignados = async (IDPerfil: number | undefined) => {

  const response = await fetch(permisosAsignadosUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      IDPerfil
    })
  })

  return response
}
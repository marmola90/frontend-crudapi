import { authHeather } from "@/utils"
import { IModulos, IModulosAsignados } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const modulosUrl = baseURL + 'v1/modulos/getAllModulos'
const insertarModulosUrl = baseURL + 'v1/modulos/insertModulo'
const updateModulosUrl = baseURL + 'v1/modulos/updateModulo'
const deleteModulosUrl = baseURL + 'v1/modulos/deletetModulo'

const asignarModuloUrl = baseURL + 'v1/modulos/asignarModulo'
const getModulosAsignadosUrl = baseURL + 'v1/modulos/getModulosAsignados'
const deleteModulosAsignadosUrl = baseURL + 'v1/modulos/deleteModulosAsignados'

export const getAllModulos = async () => {
  return await fetch(modulosUrl, { headers: authHeather() })
}

export const insertModulo = async (modulo: IModulos) => {

  const { Descripcion, BDAsociada } = modulo
  const response = await fetch(insertarModulosUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      Descripcion, BDAsociada
    })
  })

  return response
}

export const updateModulo = async (modulo: IModulos) => {
  const {
    IdModulo, Descripcion, BDAsociada
  } = modulo

  const response = await fetch(updateModulosUrl, {
    method: 'put',
    headers: authHeather(),
    body: JSON.stringify({
      IdModulo, Descripcion, BDAsociada
    })
  })

  return response
}

export const deleteModulo = async (IdModulo: number) => {
  const response = await fetch(deleteModulosUrl, {
    method: 'delete',
    headers: authHeather(),
    body: JSON.stringify({
      IdModulo
    })
  })

  return response
}

export const asignarModulos = async (modulosAsignados: IModulosAsignados[]) => {

  //console.log(modulosAsignados)
  const response = await fetch(asignarModuloUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify(
      modulosAsignados
    )
  })

  return response
}

export const deleteModulosAsignado = async (modulosAsignados: IModulosAsignados[]) => {

  // console.log(modulosAsignados)
  const response = await fetch(deleteModulosAsignadosUrl, {
    method: 'delete',
    headers: authHeather(),
    body: JSON.stringify(
      modulosAsignados
    )
  })

  return response
}

export const getModulosAsignados = async (IDPerfil: number) => {
  const response = await fetch(getModulosAsignadosUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      IDPerfil
    })
  })

  return response
}
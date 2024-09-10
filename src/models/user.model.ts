import { IPerfil, Roles, puestos } from "."

export interface UserInfo {
  token: string | null
  datos: {
    Usuario: string | null,
    EstaActivo: boolean | null | string,
    IDPerfil: Roles,
  }
}

export interface IUser extends Pick<IPerfil, 'IDPerfil'> {
  Id: number
  Usuario: string
  EstaActivo: boolean
}

export interface IUserAsignado {
  ID: number
  IDPerfil: number | null
}

export interface IRolesCantidadAsignados {
  Descripcion: string
  Cantidad: number
}

export interface IUserInfoV2 {
  token: string | null
  datos: {
    Usuario: string | null,
    EstaActivo: boolean | null | string,
    IDPerfil: Roles,
    IDPuestos: puestos
  }
}
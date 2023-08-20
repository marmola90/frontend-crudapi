import { Roles } from "."

export interface UserInfo {
  token: string | null
  datos: {
    Usuario: string | null,
    EstaActivo: boolean | null | string,
    IDPerfil: Roles,
  }
}
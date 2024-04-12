export interface ITipoUsuario {
  IdTipo: number
  TipoUsuario: string
}

export interface IUserEncrypt {
  Id?: number
  Usuario?: string
  Gestor?: string
  DireccionApp: string
  AppX: boolean
  TipoUsuario: number
  FechaModificacion?: Date | string
  PwdEncryted: unknown
  isEnable?: boolean
}

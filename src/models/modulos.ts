export interface IModulos {
  IdModulo: number
  Descripcion: string
  BDAsociada: string
}

export interface IPermisos {
  IDPermisos: number
  Descripcion: string
}

export interface IPerfil {
  IDPerfil: number
  Descripcion: string
}

export interface IPermisosAsignados extends Omit<IPermisos, 'Descripcion'> {
  IDPerfil: number
}

export interface IModulosAsignados extends Pick<IModulos, 'IdModulo'> {
  IDPerfil: number
}

export interface IItems {
  Id: number
  Descripcion: string
}

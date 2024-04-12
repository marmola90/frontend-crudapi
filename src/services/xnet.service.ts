import { authHeather } from "@/utils"
import { TablasVersion } from "@/models"
import { API } from "@/config/constants"

const baseURL = API
const versionCapturadoresUrl = baseURL + 'v1/xnetRoutes/getAllVersionCapturadores'
const insertversionCapturadoresUrl = baseURL + 'v1/xnetRoutes/insertVersionCapturador'
const updateversionCapturadoresUrl = baseURL + 'v1/xnetRoutes/updateVersionCapturadores'

export const getVersionCapturadores = async () => {
  return await fetch(versionCapturadoresUrl, { headers: authHeather() })
}

export const insertVersionCapturador = async (tablaXnet: TablasVersion) => {

  const {
    TABLA, CODIGO, DESCRIPCION, VERSION, ACTIVO, LINK, SIGLAS, LoginPorInstitucion,
    Imagen, ReportaDatos, AccesoAInstituciones, DescripcionHTML, AccesoTipoInstitucion
  } = tablaXnet

  const response = await fetch(insertversionCapturadoresUrl, {
    method: 'post',
    headers: authHeather(),
    body: JSON.stringify({
      TABLA, CODIGO, DESCRIPCION, VERSION, ACTIVO, LINK, SIGLAS, LoginPorInstitucion,
      Imagen, ReportaDatos, AccesoAInstituciones, DescripcionHTML, AccesoTipoInstitucion
    })
  })

  return response
}

export const updateVersionCapturador = async (tablaXnet: TablasVersion) => {
  const {
    TABLA, CODIGO, DESCRIPCION, VERSION, ACTIVO, LINK, SIGLAS, LoginPorInstitucion,
    Imagen, ReportaDatos, AccesoAInstituciones, DescripcionHTML, AccesoTipoInstitucion
  } = tablaXnet

  const response = await fetch(updateversionCapturadoresUrl, {
    method: 'put',
    headers: authHeather(),
    body: JSON.stringify({
      TABLA, CODIGO, DESCRIPCION, VERSION, ACTIVO, LINK, SIGLAS, LoginPorInstitucion,
      Imagen, ReportaDatos, AccesoAInstituciones, DescripcionHTML, AccesoTipoInstitucion
    })
  })

  return response

}
import { authHeather } from "@/utils"
import { API } from "@/config/constants"

const baseURL = API
const logEventoUrl = baseURL + 'v1/logEventoRoutes/getAllLogEvento'

/*export const getAllLogEvento = async (perPage: number, currentePage: number) => {
  return await fetch(logEventoUrl + perPage + `/` + currentePage, { headers: authHeather() })
}*/

export const getAllLogEvento = async () => {
  return await fetch(logEventoUrl, { headers: authHeather() })
}
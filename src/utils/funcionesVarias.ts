//import { getAllUsers, getAllUsersAppXUrl, getAllUsersPCSUrl } from "@/services/userEncrypt.service";
import { getAllUsers, getAllUsersAppXUrl, getAllUsersPCSUrl } from "@/services/v2/userEncrypt.service";

type Opciones = {
  [valor: number]: () => Promise<Response>
}

export const getOpcionesID: Opciones = {
  1: getAllUsers,
  5: getAllUsersPCSUrl,
  6: getAllUsersAppXUrl
}

export const getOpcionesDefault = getAllUsers
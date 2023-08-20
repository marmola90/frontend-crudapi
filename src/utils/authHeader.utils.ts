import { userKey } from "../redux/states/user"

export const authHeather = () => {
  const user = JSON.parse(localStorage.getItem(userKey) as string)
  if (user && user.token) {
    return { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + user.token } as HeadersInit
  } else
    return {}
}
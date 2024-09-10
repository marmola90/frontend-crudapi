import { API } from "@/config/constants"

const baseURL = API
const login = baseURL + 'v2/auth/login'

export const postLogin = async (username: string, password: string) => {
  const data = await fetch(login, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password
    })
  }).then(res => res.json())
    .catch(err => err)
  return data
}
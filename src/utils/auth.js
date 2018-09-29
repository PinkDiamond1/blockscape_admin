import Cookies from 'js-cookie'

const TokenKey = 'GEC-Admin-Token'

export function getToken() {
  // return sessionStorage.getItem(TokenKey)
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
  // return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  // return sessionStorage.removeItem(TokenKey)
  return Cookies.remove(TokenKey)
}

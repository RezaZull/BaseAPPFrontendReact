import encryptService from './encryptService'

const localStorageKey = {
  authData: 'auth',
  jwtToken: 'jwt',
}

const localStorageService = {
  getData: (key) => {
    return JSON.parse(encryptService.decrypt(localStorage.getItem(key)))
  },
  setData: (key, data) => {
    return localStorage.setItem(key, encryptService.encrypt(JSON.stringify(data)))
  },
}

export { localStorageKey, localStorageService }

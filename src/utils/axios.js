import axios from 'axios'
import envEndpoint from './envEndpoint'
import { localStorageKey, localStorageService } from './localStorageService'

const BASEAPI = `${envEndpoint.baseAPi}/${envEndpoint.prefixApi}`
const apiClient = axios.create({
  baseURL: BASEAPI,
  headers: {
    'Content-Type': 'application/json',
  },
})
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API call failed:', error)
    // Handle specific error cases
    if (error.response.status === 401) {
      // Unauthorized
    } else if (error.response.status === 404) {
      // Not found
    }
    return Promise.reject(error)
  },
)
const ApiService = {
  getData: async (endpoints) => {
    try {
      const response = await apiClient.get(BASEAPI + endpoints)
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  },
  postData: async (endpoints, data) => {
    try {
      return await axios.post(BASEAPI + endpoints, data)
    } catch (error) {
      console.error(error)
      return error
    }
  },
  updateData: async (endpoints, data) => {
    try {
      return await axios.put(BASEAPI + endpoints, data)
    } catch (error) {
      console.error(error)
      return error
    }
  },
  getDataJWT: async (endpoints) => {
    try {
      const response = await apiClient.get(BASEAPI + endpoints, {
        headers: { Authorization: localStorageService.getData(localStorageKey.jwtToken) },
      })
      return response
    } catch (error) {
      console.error(error)
      return error
    }
  },
  postDataJWT: async (endpoints, data) => {
    try {
      return await axios.post(BASEAPI + endpoints, data, {
        headers: { Authorization: localStorageService.getData(localStorageKey.jwtToken) },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  },
  updateDataJWT: async (endpoints, data) => {
    try {
      return await axios.put(BASEAPI + endpoints, data, {
        headers: { Authorization: localStorageService.getData(localStorageKey.jwtToken) },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  },
}

export default ApiService

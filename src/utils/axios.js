import axios from 'axios'
import envEndpoint from './envEndpoint'
import { localStorageKey, localStorageService } from './localStorageService'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useNavigation } from 'react-router-dom'

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
      localStorageService.removeData(localStorageKey.jwtToken)
      localStorageService.removeData(localStorageKey.authData)
      Swal.fire({
        title: 'error',
        text: 'Unauthorized, return to login page',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'continue',
      }).then((res) => {
        if (res.isConfirmed) {
          useNavigation().location('/login')
        }
      })
    } else if (error.response.status === 404) {
      Swal.fire({
        title: 'error',
        text: 'Page not found',
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'continue',
      })
    } else if (error.response.status === 409) {
      Swal.fire({
        title: 'error',
        text: error.response.data.message,
        icon: 'error',
        showConfirmButton: true,
        confirmButtonText: 'continue',
      })
    } else if (error.response.status === 442) {
      let validateErr = error.response.data.error
      Object.keys(validateErr).forEach((key) => {
        validateErr[key].forEach((errMsg) => {
          toast.error(errMsg)
        })
      })
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
      return await apiClient.post(BASEAPI + endpoints, data)
    } catch (error) {
      console.error(error)
      return error
    }
  },
  updateData: async (endpoints, data) => {
    try {
      return await apiClient.put(BASEAPI + endpoints, data)
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
      return await apiClient.post(BASEAPI + endpoints, data, {
        headers: { Authorization: localStorageService.getData(localStorageKey.jwtToken) },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  },
  updateDataJWT: async (endpoints, data) => {
    try {
      return await apiClient.put(BASEAPI + endpoints, data, {
        headers: { Authorization: localStorageService.getData(localStorageKey.jwtToken) },
      })
    } catch (error) {
      console.error(error)
      return error
    }
  },
}

export default ApiService

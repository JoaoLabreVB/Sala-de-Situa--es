import axios from 'axios'
import { authKey } from '@context/AuthContext'
import { ModelAdminDTO } from '@dtos/AuthDTO'



export const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})

API.interceptors.request.use(function (config) {
    const storageUserData = localStorage.getItem(authKey)

    if (storageUserData) {
        const data: ModelAdminDTO = JSON.parse(storageUserData)
        config.headers.Authorization = data.token
            ? `Bearer ${data.token}`
            : ''
    }

    return config
})
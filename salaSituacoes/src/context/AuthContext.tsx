import { ILoginDTO, ModelAdminDTO } from "@dtos/AuthDTO"
import { API } from "@services/api"
import React, { createContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"


interface AuthContextProviderProps {
    children: React.ReactNode
}


interface AuthContextData {
    user: ModelAdminDTO | null
    isAuthenticated: boolean
    signIn(email: string, password: string): Promise<void>
    signOut(): void
}
interface AuthContextProviderProps {
    children: React.ReactNode
}
export const AuthContext = createContext({} as AuthContextData)

export const authKey = '@salaSituacao:auth'
const authRemember = '@salaSituacao:remember'
export const localStorageToken = '1bee3168c1325891b15aa7bdd852ebdea4e26e5b'

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const [user, setUser] = useState<ModelAdminDTO | null>(null)

    const navigation = useNavigate()
    const { pathname } = useLocation()


    async function signIn(
        email: string, password: string
    ): Promise<void> {
        try {
            const { data } = await API.post<ModelAdminDTO>('/login', { email: email, password: password },
                { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
            )
            localStorage.setItem(authKey, JSON.stringify(data))

            // if (isRemember) {
            //     const userInfo = { login: email, password }
            //     const encryptedPassword = encryptData(userInfo, localStorageToken)
            //     localStorage.setItem(authRemember, JSON.stringify(encryptedPassword))
            // } else {
            //     localStorage.removeItem(authRemember)
            // }
            API.defaults.headers.common.Authorization = `Bearer ${data.token}`

            setUser(data)
            navigation('/meus-dispositivos')

        } catch (error: any) {
            throw new Error(error.response.status)
        }

    }

    const isAuthenticated = Boolean(
        localStorage.getItem(authKey) || null,
    )

    function signOut() {
        localStorage.removeItem(authKey)
        delete API.defaults.headers.common.Authorization

        setUser(null)
        navigation('/')

    }
    // Verificação global de resposta da api
    API.interceptors.response.use(
        function (response: any) {
            return response
        },
        function (error: any) {
            if (error.response.status === 401) {
                signOut()
                // alert("Desconectado")
            }
            return Promise.reject(error)
        },
    )

    useEffect(() => {
        async function loadStorageUserData() {
            const storageUserData = localStorage.getItem(authKey)

            if (storageUserData) {
                const data: ModelAdminDTO = JSON.parse(storageUserData)
                API.defaults.headers.common.Authorization = `Bearer ${data.token}`

                setUser(data)

                const pathnameFormatted = pathname.split('/')[1]

                if (!!storageUserData && (pathname === '/' || pathname === '/meus-dispositivos')) {
                    console.log("🚀 ~ loadStorageUserData ~ pathname:", pathname)
                    console.log("🚀 ~ loadStorageUserData ~ storageUserData:", storageUserData)
                    navigation('/meus-dispositivos')
                } else if (
                    pathnameFormatted === 'esqueceu-senha'
                ) {
                    signOut()

                    setTimeout(() => {
                        navigation(pathname)
                    }, 200)
                } else {
                    navigation('/')
                }
            }
        }

        loadStorageUserData()
    }, [])
    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    )
}
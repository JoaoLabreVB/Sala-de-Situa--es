export interface ModelAdminDTO {
    token: string
    // user: { email: string, name: string, role: string, tenants: string[] }

}
export interface ILoginDTO {
    login: string
    password: string
    isRemember: boolean
}
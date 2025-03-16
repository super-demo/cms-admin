import { UserProfile } from "../user/types"
import { Role, roleConst } from "./constants"

export interface SiteUser {
    site_user_id: number
    site_id: number
    user_id: number
    user: UserProfile
    is_active: boolean
    created_at: string
    created_by: number
    updated_at: string
    updated_by: number
}

export interface AddUserForm {
    site_id: number
    email: string
    user_level_id: number
}

export interface AddUserTableForm {
    id: string
    email: string
    role: Role
}
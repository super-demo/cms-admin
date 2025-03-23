import { PeopleRole } from "../people-role/types"
import { UserProfile } from "../user/types"
import { Role } from "./constants"

export interface SiteUser {
  site_user_id: number
  site_id: number
  user_id: number
  user: UserProfile
  site_user_level_id: number
  is_active: boolean
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at: string
}

export interface SiteUserWithRole extends SiteUser {
  role: Role
  sub_role: Role
}

export interface AddUserForm {
  site_id: number
  email: string
  site_user_level_id: number
}

export interface AddUserTableForm {
  id: string
  email: string
  role: Role
}

export interface AddPeopleTableForm {
  id: string
  email: string
  role: PeopleRole
}

export interface UpdateSiteUserPayload {
  site_user_id: number
  site_id?: number
  user_id: number
  site_user_level_id: number
  is_active?: boolean
  created_by: number
  updated_by: number
}

export interface DeleteSiteUserPayload {
  site_user_id: number
  site_id: number
  user_id: number
}

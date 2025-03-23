import { PeopleRole } from "../people-role/types"
import { UserProfile } from "../user/types"

export interface SitePeople {
  site_people_id: number
  site_id: number
  user_id: number
  user: UserProfile
  is_active: boolean
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at: string
}

export interface AddPeopleForm {
  site_id: number
  email: string
  sub_role_id: number
}

export interface AddPeopleTableForm {
  id: string
  email: string
  sub_role: PeopleRole
}

export interface UpdateSitePeoplePayload {
  site_people_id: number
  site_id?: number
  user_id: number
  is_active?: boolean
  created_by: number
  updated_by: number
}

export interface DeleteSitePeoplePayload {
  site_people_id: number
  site_id: number
  user_id: number
}

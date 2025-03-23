import { roleConst } from "../site-user/constants"

export interface UserProfile {
  user_id: number
  user_level_id: number
  sub_role_id: number
  google_token: string
  avatar_url: string
  name: string
  nickname: string
  role: string
  email: string
  phone_number: string
  birthday: string
  created_at: string
  updated_at: string
}

export interface SiteUsersProfileWithRole extends UserProfile {
  site_user_id: number | undefined
  role: roleConst
}

export interface SitePeopleProfileWithRole extends UserProfile {
  site_people_id: number | undefined
  role: roleConst
}

export interface GoogleSignInToken {
  access_token: string
  expires_at: number
}

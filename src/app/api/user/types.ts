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

export interface UserProfileWithRole extends UserProfile {
  site_people_id: number | undefined
  role: "Root" | "Developer" | "Super Admin" | "Admin" | "Viewer" | "People"
}

export interface GoogleSignInToken {
  access_token: string
  expires_at: number
}

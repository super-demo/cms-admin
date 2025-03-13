import { UserProfile } from "../user/types"

export interface  MiniApp {
    mini_app_id: number
    slug: string
    description?: string
    short_description?: string
    link_url: string
    image_url: string
    is_active: boolean
    created_at: string
    created_by: UserProfile
    updated_at: string
    updated_by: UserProfile
}

export interface CreateMiniAppForm {
    site_id: number
    slug: string
    description?: string
    link_url: string
    image_url?: string
}
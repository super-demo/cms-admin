export interface Announcement {
  announcement_id: number
  site_id: number
  title: string
  short_description: string
  image_url: string
  link_url: string
  is_pin: boolean
  created_at: string
  created_by: number
  deleted_at: string
}

export interface CreateAnnouncementPayload {
  site_id: number
  title: string
  short_description?: string
  image_url: string
  link_url?: string
}

export interface UpdateAnnouncementPayload {
  announcement_id: number
  site_id: number
  title: string
  short_description?: string
  image_url: string
  link_url?: string
  is_pin: boolean
}

export interface DeleteAnnouncementPayload {
  announcement_id: number
}

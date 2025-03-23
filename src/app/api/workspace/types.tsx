export interface Site {
  site_id: number
  site_type_id: number
  name: string
  description: string
  short_description: string
  url: string
  image_url: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at: string | null
}

export type DeleteSiteWorkspacePayload = {
  site_id: number
}

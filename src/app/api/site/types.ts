import { UserProfile } from "../user/types"

export interface Site {
  site_id: number
  site_type_id: number
  name: string
  description?: string
  short_description?: string
  url: string
  image_url: string
  created_at: string
  created_by: UserProfile
  updated_at: string
  updated_by: UserProfile
}

export interface Workspace {
  site_id: number
  site_type_id: number
  name: string
  description?: string
  short_description?: string
  url?: string
  image_url?: string
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  site_parent_id: number
  site_parent_name: string
  depth: number
  path: number[] 
}

export interface CreateWorkspaceForm {
  name: string
  description?: string
  short_description?: string
  image_url?: string
}

export interface WorkspaceCardProps {
    name: string
    description: string
    location: string
    icon: string
  }
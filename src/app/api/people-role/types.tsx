/**
 * Represents a people role in the system
 */
export interface PeopleRole {
  people_role_id: number
  slug: string
  description: string
  site_id: number
  created_at: string
  created_by: number
  updated_at: string
  updated_by: number
  deleted_at: string
}

/**
 * Form data for adding a new people role
 */
export interface AddPeopleRoleForm {
  slug: string
  description: string
  site_id: number
}

/**
 * Form data for updating an existing people role
 */
export interface UpdatePeopleRoleForm {
  people_role_id: number
  slug: string
  description: string
  site_id: number
}

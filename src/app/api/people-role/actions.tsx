"use server"

import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"
import { AddPeopleRoleForm, PeopleRole } from "./types"

/**
 * Creates one or more people roles for a site
 * @param payload Array of role data to create
 * @returns The created people role
 */
export async function AddPeopleRole(
  payload: AddPeopleRoleForm[]
): Promise<PeopleRole> {
  try {
    const response = await FetchInstance(`/sites/create/people-role`, {
      method: "POST",
      body: JSON.stringify(payload[0]) // Note: Go API expects a single object, not an array
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error adding people role to site:", error)
    throw error
  }
}

/**
 * Gets list of people roles for a site
 * @param site_id The site ID to get roles for
 * @returns Array of people roles
 */
export async function GetListPeopleRole(
  site_id: number
): Promise<PeopleRole[]> {
  try {
    const response = await FetchInstance(`/sites/list/people-role/${site_id}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error fetching people role list:", error)
    throw error
  }
}

/**
 * Updates a people role
 * @param payload The role data to update
 * @returns The updated people role
 */
export async function UpdatePeopleRole(
  payload: PeopleRole
): Promise<PeopleRole> {
  try {
    const response = await FetchInstance(`/sites/update/people-role`, {
      method: "PUT",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error updating people role:", error)
    throw error
  }
}

/**
 * Deletes a people role
 * @param payload The role data to delete
 * @returns void
 */
export async function DeletePeopleRole(payload: PeopleRole): Promise<void> {
  try {
    const response = await FetchInstance(`/sites/delete/people-role`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)
  } catch (error) {
    console.error("Error deleting people role:", error)
    throw error
  }
}

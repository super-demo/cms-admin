// src/app/api/workspace/actions.ts
"use server"

import { Workspace } from "@/app/api/site/types"
import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

// Type definition for updating a workspace
export type UpdateSiteWorkspacePayload = {
  site_id: number
  name?: string
  description?: string
  short_description?: string
  image_url?: string
}

// Type definition for deleting a workspace
export type DeleteSiteWorkspacePayload = {
  site_id: number
}

/**
 * Updates a site workspace
 * @param payload The workspace data to update
 * @returns The updated workspace
 */
export async function UpdateSiteWorkspace(
  payload: UpdateSiteWorkspacePayload
): Promise<Workspace> {
  try {
    // Create a copy of the payload without site_type_id
    // We'll only send the fields we want to update
    const { site_id, name, description, short_description, image_url } = payload
    const updatePayload = {
      site_id,
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(short_description !== undefined && { short_description }),
      ...(image_url !== undefined && { image_url })
    }

    const response = await FetchInstance(`/sites/update/workspace`, {
      method: "PUT",
      body: JSON.stringify(updatePayload)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new HttpError(
        result.status?.message || "Failed to update site workspace",
        result.status?.code || response.status
      )
    }

    return result.data
  } catch (error) {
    console.error("Error updating site workspace:", error)
    throw error
  }
}

/**
 * Deletes a site workspace
 * @param payload The site_id to delete
 * @returns The response data
 */
export async function DeleteSiteWorkspace(
  payload: DeleteSiteWorkspacePayload
): Promise<void> {
  try {
    const response = await FetchInstance(`/sites/delete/workspace`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok) {
      throw new HttpError(
        result.status?.message || "Failed to delete site workspace",
        result.status?.code || response.status
      )
    }

    return result
  } catch (error) {
    console.error("Error deleting site workspace:", error)
    throw error
  }
}

/**
 * Uploads an image to Google Drive
 * @param file The file to upload
 * @returns The image URL
 */
export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Failed to upload image: ${error}`)
    }

    const result = await response.json()
    return result.imageUrl
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

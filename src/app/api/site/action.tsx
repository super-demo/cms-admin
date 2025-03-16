"use server"

import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"
import { CreateWorkspaceForm, Site, Workspace } from "./types"

export async function GetSite(id: number): Promise<Site> {
  try {
    const response = await FetchInstance(`/sites/${id}`, {
      method: "GET"
    })

    const result = await response.json()

    console.log("Site:", result.data)

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error fetching site:", error)
    throw error
  }
}

export async function GetWorkspace(id: number): Promise<Workspace> {
  try {
    const response = await FetchInstance(`/sites/workspace/${id}`, {
      method: "GET"
    })

    const result = await response.json()

    console.log("Workspace:", result.data)

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error fetching workspace:", error)
    throw error
  }
}

export async function GetListWorkspace(id: number): Promise<Workspace[]> {
  try {
    const response = await FetchInstance(`/site-trees/list/${id}`, {
      method: "GET"
    })

    const result = await response.json()

    console.log("Site list:", id)
    console.log("Site list:", result.data)

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error fetching site list:", error)
    throw error
  }
}

export async function CreateWorkspace(
  data: CreateWorkspaceForm,
  parent_id: number
): Promise<CreateWorkspaceForm> {
  try {
    const payload = {
      site: data,
      site_parent_id: parent_id
    }

    console.log("Create workspace payload:", payload)

    const response = await FetchInstance(`/sites/create/workspace`, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    console.log("Create workspace:", result)

    return result
  } catch (error) {
    console.error("Error creating workspace:", error)
    throw error
  }
}

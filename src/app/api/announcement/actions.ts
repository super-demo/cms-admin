"use server"

import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"
import {
  Announcement,
  CreateAnnouncementPayload,
  UpdateAnnouncementPayload
} from "./types"

export async function GetAnnouncement(id: number): Promise<Announcement> {
  try {
    const response = await FetchInstance(`/announcements/${id}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error fetching announcement:", error)
    throw error
  }
}

export async function GetListAnnouncementBySiteId(
  siteId: number
): Promise<Announcement[]> {
  try {
    const response = await FetchInstance(`/announcements/list/${siteId}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error fetching announcements:", error)
    throw error
  }
}

export async function CreateAnnouncement(
  payload: CreateAnnouncementPayload
): Promise<CreateAnnouncementPayload> {
  try {
    const response = await FetchInstance(`/announcements/create`, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error creating announcement:", error)
    throw error
  }
}

export async function UpdateAnnouncement(
  id: number,
  payload: UpdateAnnouncementPayload
): Promise<UpdateAnnouncementPayload> {
  try {
    const response = await FetchInstance(`/announcements/update`, {
      method: "PUT",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result.data
  } catch (error) {
    console.error("Error updating announcement:", error)
    throw error
  }
}

export async function DeleteAnnouncement(id: number): Promise<void> {
  try {
    const response = await FetchInstance(`/announcements/delete/${id}`, {
      method: "DELETE"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)
  } catch (error) {
    console.error("Error deleting announcement:", error)
    throw error
  }
}

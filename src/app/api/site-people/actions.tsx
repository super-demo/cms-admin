"use server"

import FetchInstance from "../../../lib/fetch-instance"
import { HttpError } from "../../../lib/http-error"
import { UserProfile, UserProfileWithRole } from "../user/types"
import { AddPeopleForm, DeleteSitePeoplePayload, SitePeople } from "./types"

export async function AddPeopleToSite(
  payload: AddPeopleForm[]
): Promise<SitePeople[]> {
  try {
    const response = await FetchInstance(`/site-people/create`, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    console.error("Error adding people to site:", error)
    throw error
  }
}

export async function GetListSitePeople(
  site_id: number,
  roleFilter?: number[]
): Promise<UserProfileWithRole[]> {
  try {
    const response = await FetchInstance(`/site-people/list/${site_id}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    const site_people_list: SitePeople[] = result.data

    const userProfileList = roleFilter
      ? site_people_list
          .map((userEntry) => userEntry.user)
          .filter((user) => !roleFilter.includes(user.user_level_id))
      : site_people_list.map((userEntry) => userEntry.user)

    const userProfileWithRoleList = userProfileList.map(
      (userProfile: UserProfile) => transformUserProfile(userProfile)
    )

    return userProfileWithRoleList
  } catch (error) {
    console.error("Error fetching site user list:", error)
    throw error
  }
}

export async function DeleteSitePeople(
  payload: DeleteSitePeoplePayload
): Promise<void> {
  try {
    const response = await FetchInstance(`/site-people/delete`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)
  } catch (error) {
    console.error("Error deleting site people:", error)
    throw error
  }
}

const getRoleFromUserLevel = (
  user_level_id: number
): UserProfileWithRole["role"] => {
  const roleMap: Record<number, UserProfileWithRole["role"]> = {
    1: "Root",
    2: "Developer",
    3: "Super Admin",
    4: "Admin",
    5: "Viewer",
    6: "People"
  }

  return roleMap[user_level_id] || ""
}

const transformUserProfile = (user: UserProfile): UserProfileWithRole => {
  return {
    ...user,
    role: getRoleFromUserLevel(user.user_level_id)
  }
}

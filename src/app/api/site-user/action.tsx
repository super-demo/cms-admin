"use server"

import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"
import { AddUserForm, SiteUser } from "./types"
import { UserProfile, UserProfileWithRole } from "../user/types"

export async function AddUserToSite(
  payload: AddUserForm[]
): Promise<SiteUser[]> {
  try {
    const response = await FetchInstance(`/site-users/create/without/sign`, {
      method: "POST",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    console.error("Error adding user to site:", error)
    throw error
  }
}

export async function GetListSiteUser(
  id: number,
  roleFilter?: number[]
): Promise<UserProfileWithRole[]> {
  try {
    const response = await FetchInstance(`/site-users/list/${id}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    const site_user_list: SiteUser[] = result.data

    const userProfileList = roleFilter
      ? site_user_list
          .map((userEntry) => userEntry.user)
          .filter((user) => !roleFilter.includes(user.user_level_id))
      : site_user_list.map((userEntry) => userEntry.user)

    const userProfileWithRoleList = userProfileList.map((userProfile) =>
      transformUserProfile(userProfile)
    )

    return userProfileWithRoleList
  } catch (error) {
    console.error("Error fetching site user list:", error)
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

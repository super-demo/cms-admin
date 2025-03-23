"use server"

import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"
import { SiteUsersProfileWithRole } from "../user/types"
import {
  AddUserForm,
  DeleteSiteUserPayload,
  SiteUser,
  SiteUserWithRole,
  UpdateSiteUserPayload
} from "./types"
import { roleConst } from "./constants"

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
): Promise<SiteUserWithRole[]> {
  try {
    const response = await FetchInstance(`/site-users/list/${id}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    const siteUserList: SiteUser[] = result.data

    const siteUserListFiltered = roleFilter
      ? siteUserList.filter((user) =>
          roleFilter.includes(user.user.user_level_id)
        )
      : siteUserList

    const siteUserWithRoleList = siteUserListFiltered.map((site_user) => {
      return {
        ...site_user,
        role: getRoleFromUserLevel(site_user.user.user_level_id),
        sub_role: getRoleFromUserLevel(site_user.site_user_level_id)
      }
    })

    return siteUserWithRoleList
  } catch (error) {
    console.error("Error fetching site user list:", error)
    throw error
  }
}

export async function UpdateSiteUser(
  payload: UpdateSiteUserPayload
): Promise<UpdateSiteUserPayload> {
  try {
    const response = await FetchInstance(`/site-users/update`, {
      method: "PUT",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    console.error("Error updating site user:", error)
    throw error
  }
}

export async function DeleteSiteUser(
  payload: DeleteSiteUserPayload
): Promise<DeleteSiteUserPayload> {
  try {
    const response = await FetchInstance(`/site-users/delete`, {
      method: "DELETE",
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    return result
  } catch (error) {
    console.error("Error deleting site user:", error)
    throw error
  }
}

const getRoleFromUserLevel = (
  user_level_id: number
): SiteUsersProfileWithRole["role"] => {
  const roleMap: Record<number, SiteUsersProfileWithRole["role"]> = {
    1: roleConst.Root,
    2: roleConst.Developer,
    3: roleConst.SuperAdmin,
    4: roleConst.Admin,
    5: roleConst.Viewer,
    6: roleConst.People
  }

  return roleMap[user_level_id] || ""
}

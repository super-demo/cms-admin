"use server"

import { MAIN_SITE_ID } from "@/constants"
import FetchInstance from "../../../lib/fetch-instance"
import { HttpError } from "../../../lib/http-error"
import { GetListPeopleRole } from "../people-role/actions"
import { roleConst } from "../site-user/constants"
import { SiteUserWithRole } from "../site-user/types"

import {
  AddPeopleForm,
  DeleteSitePeoplePayload,
  SitePeople,
  SitePeopleWithRole
} from "./types"

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
): Promise<SitePeopleWithRole[]> {
  try {
    const response = await FetchInstance(`/site-people/list/${site_id}`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    const sitePeopleList: SitePeople[] = result.data
    const peopleRoles = await GetListPeopleRole(MAIN_SITE_ID)

    const sitePeopleListFiltered = roleFilter
      ? sitePeopleList.filter((user) =>
          roleFilter.includes(user.user.user_level_id)
        )
      : sitePeopleList

    const sitePeopleWithRoleList = sitePeopleListFiltered.map((site_user) => {
      return {
        ...site_user,
        role: getRoleFromUserLevel(site_user.user.user_level_id),
        sub_role: peopleRoles.find(
          (role) => role.people_role_id === site_user.user.sub_role_id
        )!
      }
    })

    return sitePeopleWithRoleList
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
): SiteUserWithRole["role"] => {
  const roleMap: Record<number, SiteUserWithRole["role"]> = {
    1: roleConst.Root,
    2: roleConst.Developer,
    3: roleConst.SuperAdmin,
    4: roleConst.Admin,
    5: roleConst.Viewer,
    6: roleConst.People
  }

  return roleMap[user_level_id] || ""
}

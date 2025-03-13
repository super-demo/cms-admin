import FetchInstance from "@/lib/fetch-instance"
import { HttpError } from "@/lib/http-error"

export async function GetListSiteUser() {
  try {
    const response = await FetchInstance(`/site-users/list/0`, {
      method: "GET"
    })

    const result = await response.json()

    if (!response.ok)
      throw new HttpError(result.status.message, result.status.code)

    console.log("Site user list:", result)

    return result
  } catch (error) {
    console.error("Error fetching site user list:", error)
    throw error
  }
}

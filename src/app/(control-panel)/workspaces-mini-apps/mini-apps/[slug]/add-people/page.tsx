import { GetListSiteUser } from "@/app/api/site-user/action"
import AddPeopleClient from "./_components/add-people-client"
import { MAIN_SITE_ID } from "@/constants"
import { Role } from "@/app/api/site-user/constants"

export default async function AddPeople() {
  const siteUserList = await GetListSiteUser(MAIN_SITE_ID)

  const userEmailsWithRole = siteUserList.map((user) => {
    return {
      id: user.user_id.toLocaleString(),
      email: user.email,
      role: user.role as Role
    }
  })

  return <AddPeopleClient siteUserList={userEmailsWithRole} />
}

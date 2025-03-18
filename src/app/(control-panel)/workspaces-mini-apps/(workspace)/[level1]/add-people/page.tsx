import { GetListSiteUser } from "@/app/api/site-user/action"
import { MAIN_SITE_ID } from "@/constants"
import { Role } from "@/app/api/site-user/constants"
import AddPeopleTable from "@/components/add-people-table"

export default async function AddPeople() {
  const siteUserList = await GetListSiteUser(MAIN_SITE_ID)

  const userEmailsWithRole = siteUserList.map((user) => {
    return {
      id: user.user_id.toLocaleString(),
      email: user.email,
      role: user.role as Role
    }
  })

  return <AddPeopleTable siteUserList={userEmailsWithRole} />
}

import { MAIN_SITE_ID } from "@/constants"
import AddPeopleWorkspaceTable from "@/components/users-people/add-people-table"
import { GetListPeopleRole } from "@/app/api/people-role/actions"
import { GetListSitePeople } from "@/app/api/site-people/actions"
import { PeopleRole } from "@/app/api/people-role/types"

export default async function AddTeam({
  params
}: {
  params: Promise<{
    level1: string
  }>
}) {
  const role = [3, 4, 5, 6]
  const siteUserList = await GetListSitePeople(MAIN_SITE_ID, role)
  const peopleRoles = await GetListPeopleRole(MAIN_SITE_ID)

  const param = await params

  const workspaceId = param.level1

  console.log(siteUserList)

  const userEmailsWithRole = siteUserList.map((user) => {
    return {
      id: user.user_id.toLocaleString(),
      email: user.user.email,
      role: user.sub_role as PeopleRole
    }
  })

  return (
    <AddPeopleWorkspaceTable
      sitePeopleList={userEmailsWithRole}
      workspaceId={workspaceId}
      peopleRoles={peopleRoles}
    />
  )
}

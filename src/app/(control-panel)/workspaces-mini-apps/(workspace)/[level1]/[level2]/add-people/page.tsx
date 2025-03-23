import { MAIN_SITE_ID } from "@/constants"
import AddPeopleWorkspaceTable from "@/components/users-people/add-people-table"
import { GetListPeopleRole } from "@/app/api/people-role/actions"
import { PeopleRole } from "@/app/api/people-role/types"
import { GetListSitePeople } from "@/app/api/site-people/actions"

export default async function AddTeam({
  params
}: {
  params: Promise<{
    level1: string
    level2: string
  }>
}) {
  const workspaceId = (await params).level2

  const siteUserList = await GetListSitePeople(MAIN_SITE_ID)
  const peopleRoles = await GetListPeopleRole(MAIN_SITE_ID)

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

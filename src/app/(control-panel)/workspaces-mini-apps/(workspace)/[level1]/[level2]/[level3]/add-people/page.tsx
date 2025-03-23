import { GetListPeopleRole } from "@/app/api/people-role/actions"
import { GetListSitePeople } from "@/app/api/site-people/actions"
import AddPeopleWorkspaceTable from "@/components/users-people/add-people-table"
import { MAIN_SITE_ID } from "@/constants"

export default async function AddTeam({
  params
}: {
  params: Promise<{
    level1: string
    level2: string
    level3: string
  }>
}) {
  const workspaceId = (await params).level3
  const siteUserList = await GetListSitePeople(MAIN_SITE_ID)
  const peopleRoles = await GetListPeopleRole(MAIN_SITE_ID)

  const userEmailsWithRole = siteUserList.map((user) => {
    return {
      id: user.user_id.toLocaleString(),
      email: user.email,
      sub_role:
        peopleRoles.find((role) => role.people_role_id === user.sub_role_id) ??
        peopleRoles[0]
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

import { GetListSiteUser } from "@/app/api/site-user/action"
import { Role } from "@/app/api/site-user/constants"
import AddTeamWorkspaceTable from "@/components/users-people/add-team-table"
import { MAIN_SITE_ID } from "@/constants"

export default async function AddTeam({
  params
}: {
  params: Promise<{
    level1: string
  }>
}) {
  const role = [3, 4, 5, 6]
  const siteUserList = await GetListSiteUser(MAIN_SITE_ID, role)

  const param = await params

  const workspaceId = param.level1

  const userEmailsWithRole = siteUserList.map((user) => {
    return {
      id: user.user_id.toLocaleString(),
      email: user.email,
      role: user.role as Role // Ensure the role is cast to the correct type
    }
  })

  return (
    <AddTeamWorkspaceTable
      siteUserList={userEmailsWithRole}
      workspaceId={workspaceId}
    />
  )
}

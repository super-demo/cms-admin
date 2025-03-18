import { GetListSiteUser } from "@/app/api/site-user/action"
import { PeopleTable } from "./people-table"
import { columns } from "@/app/(control-panel)/people/_components/columns"

interface PeopleProps {
  miniAppId: string
  workspaceIds: string[]
}

export default async function People({ miniAppId, workspaceIds }: PeopleProps) {
  const excludedRole = [1, 2]

  const teamList = await GetListSiteUser(Number(miniAppId), excludedRole)

  return (
    <PeopleTable
      columns={columns}
      data={teamList}
      miniAppSlug={miniAppId}
      workspaceIds={workspaceIds}
    />
  )
}

import { GetListSiteUser } from "@/app/api/site-user/action"
import { MAIN_SITE_ID } from "@/constants"
import { PeopleTable } from "./people-table"
import { columns } from "@/app/(control-panel)/people/_components/columns"

interface PeopleProps {
  miniAppSlug: string
}

export default async function People({ miniAppSlug }: PeopleProps) {
  const excludedRole = [1, 2]

  const teamList = await GetListSiteUser(MAIN_SITE_ID, excludedRole)
  console.log(teamList)
  //   const peopleList = await GetListSiteUser(MAIN_SITE_ID, peopleRole)

  return (
    <PeopleTable columns={columns} data={teamList} miniAppSlug={miniAppSlug} />
  )
}

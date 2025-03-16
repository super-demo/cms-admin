import { GetListSiteUser } from "@/app/api/site-user/action"
import { MAIN_SITE_ID } from "@/constants"
import { PeopleTable } from "./people-table"
import { columns } from "@/app/(control-panel)/people/_components/columns"

interface PeopleProps {
  miniAppSlug: string
}

export default async function People({ miniAppSlug }: PeopleProps) {
  //   const peopleRole = [1, 2, 3, 4, 5]

  const teamList = await GetListSiteUser(MAIN_SITE_ID)
  //   const peopleList = await GetListSiteUser(MAIN_SITE_ID, peopleRole)

  return (
    <PeopleTable columns={columns} data={teamList} miniAppSlug={miniAppSlug} />
  )
}

import { GetListSiteUser } from "@/app/api/site-user/action"
import { MAIN_SITE_ID } from "@/constants"
import TeamClient from "./_components/team-client"

export default async function Page() {
  const teamRole = [1, 2, 6]

  const teamList = await GetListSiteUser(MAIN_SITE_ID, teamRole)

  return <TeamClient teamList={teamList} siteId={1} />
}

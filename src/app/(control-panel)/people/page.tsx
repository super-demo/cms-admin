import { GetListSiteUser } from "@/app/api/site-user/action"
import PeopleClient from "./_components/people-client"
import { MAIN_SITE_ID } from "@/constants"

export default async function Page() {
  const teamRole = [1, 2, 6]
  const peopleRole = [1, 2, 3, 4, 5]

  const teamList = await GetListSiteUser(MAIN_SITE_ID, teamRole)
  const peopleList = await GetListSiteUser(MAIN_SITE_ID, peopleRole)

  return <PeopleClient teamList={teamList} peopleList={peopleList} />
}

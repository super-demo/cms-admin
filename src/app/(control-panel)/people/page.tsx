import { GetListSiteUser } from "@/app/api/site-user/action"
import PeopleClient from "./_components/people-client"

export default async function Page() {
  const site_user_list = await GetListSiteUser()

  console.log(site_user_list)

  return <PeopleClient />
}

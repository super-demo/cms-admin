import { GetSite } from "@/app/api/site/action"
import { MAIN_SITE_ID } from "@/constants"
import SettingsClient from "./_components/settings-client"

export default async function Settings() {
  const siteData = await GetSite(MAIN_SITE_ID)

  return <SettingsClient siteData={siteData} />
}

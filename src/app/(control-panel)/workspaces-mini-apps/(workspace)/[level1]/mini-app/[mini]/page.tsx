import { GetMiniApp } from "@/app/api/site-mini-apps/action"
import HomeMiniAppLayout from "@/components/mini-app-layout/home"

export default async function Page({
  params
}: {
  params: Promise<{ level1: string; mini: string }>
}) {
  const miniAppId = (await params).mini

  const miniApp = await GetMiniApp(Number(miniAppId))

  return <HomeMiniAppLayout miniApp={miniApp} />
}

import { GetMiniApp } from "@/app/api/site-mini-apps/action"
import HomeMiniAppLayout from "@/components/mini-app-layout/home"

export default async function Page({
  params
}: {
  params: Promise<{ level1: string; mini: string }>
}) {
  const param = await params

  const miniAppId = param.mini

  const workspaceIdList = [param.level1]

  const miniApp = await GetMiniApp(Number(miniAppId))

  return (
    <HomeMiniAppLayout miniApp={miniApp} workspaceIdList={workspaceIdList} />
  )
}

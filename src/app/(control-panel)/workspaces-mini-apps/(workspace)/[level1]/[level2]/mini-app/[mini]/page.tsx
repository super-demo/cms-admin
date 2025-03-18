import { GetMiniApp } from "@/app/api/site-mini-apps/action"
import HomeMiniAppLayout from "@/components/mini-app-layout/home"

export default async function Page({
  params
}: {
  params: Promise<{ level1: string; level2: string; mini: string }>
}) {
  const param = await params

  const workspaceIdList = [param.level1, param.level2]

  const miniAppId = param.mini

  const miniApp = await GetMiniApp(Number(miniAppId))

  return (
    <HomeMiniAppLayout miniApp={miniApp} workspaceIdList={workspaceIdList} />
  )
}

import { GetMiniApp } from "@/app/api/site-mini-apps/action"
import HomeMiniAppLayout from "@/components/mini-app-layout/home"

export function parseSlug(slug: string) {
  return decodeURIComponent(slug)
}

export default async function Page({
  params
}: {
  params: Promise<{ mini: string }>
}) {
  // const { slug: params } = useParams<{ slug: string }>()
  // const miniApp = await GetMiniApp(params)
  const miniAppId = (await params).mini

  const miniApp = await GetMiniApp(Number(miniAppId))

  return <HomeMiniAppLayout miniApp={miniApp} workspaceIdList={[]} />
}

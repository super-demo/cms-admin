"use client"

import { MiniApp } from "@/app/api/site-mini-apps/type"
import { CreateMiniAppCard } from "@/components/cards/create-mini-app-card"
import MiniAppCard from "@/components/cards/mini-app-card"
import { path, pathWithSlug } from "@/constants/path"
import { useRouter } from "next/navigation"

interface MiniAppThreadProps {
  miniApps: MiniApp[]
  workspaceIdList: string[]
}

export default function MiniAppThread({
  miniApps,
  workspaceIdList
}: MiniAppThreadProps) {
  const router = useRouter()

  console.log("workspaceList", workspaceIdList)

  return (
    <div className="my-6 flex space-x-5">
      {
        <CreateMiniAppCard
          handleClick={() =>
            workspaceIdList.length === 1
              ? router.push(
                  pathWithSlug.CREATE_MINI_APP_LV_1(workspaceIdList[0])
                )
              : workspaceIdList.length === 2
                ? router.push(
                    pathWithSlug.CREATE_MINI_APP_LV_2(
                      workspaceIdList[0],
                      workspaceIdList[1]
                    )
                  )
                : workspaceIdList.length === 3
                  ? router.push(
                      pathWithSlug.CREATE_MINI_APP_LV_3(
                        workspaceIdList[0],
                        workspaceIdList[1],
                        workspaceIdList[2]
                      )
                    )
                  : router.push(path.CREATE_MINI_APP)
          }
        />
      }

      {miniApps.map((mini_app) => (
        <MiniAppCard
          key={mini_app.site_mini_app_id}
          mini_app_id={mini_app.site_mini_app_id}
          slug={mini_app.slug}
          image_url={mini_app.image_url}
          handleClick={() => {
            router.push(
              `${path.WORKSPACES_MINI_APPS}/${workspaceIdList.join("/")}/mini-app/${mini_app.site_mini_app_id}`
            )
          }}
        />
      ))}
    </div>
  )
}

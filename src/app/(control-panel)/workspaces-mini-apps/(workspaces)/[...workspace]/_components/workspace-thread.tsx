"use client"

import { useRouter } from "next/navigation"
import { path, pathWithSlug } from "@/constants/path"
import { CreateWorkspaceCard } from "@/components/cards/create-workspace-card"
import { Workspace } from "@/app/api/site/types"
import WorkspaceCard from "@/components/cards/workspace-card"

interface WorkspaceThreadProps {
  workspaceIdList: string[]
  workspaces: Workspace[]
}

export default function WorkspaceThread({
  workspaceIdList,
  workspaces
}: WorkspaceThreadProps) {
  const router = useRouter()

  return (
    <div className="my-5 w-full px-1">
      <div className="grid grid-cols-4 gap-5">
        {workspaceIdList.length < 3 && (
          <CreateWorkspaceCard
            handleClick={() =>
              workspaceIdList.length === 1
                ? router.push(
                    pathWithSlug.CREATE_WORKSPACE_LV_1(workspaceIdList[0])
                  )
                : workspaceIdList.length === 2
                  ? router.push(
                      pathWithSlug.CREATE_WORKSPACE_LV_2(
                        workspaceIdList[0],
                        workspaceIdList[1]
                      )
                    )
                  : workspaceIdList.length === 3
                    ? router.push(
                        pathWithSlug.CREATE_WORKSPACE_LV_3(
                          workspaceIdList[0],
                          workspaceIdList[1],
                          workspaceIdList[2]
                        )
                      )
                    : router.push(path.CREATE_WORKSPACE)
            }
          />
        )}

        {workspaces
          ? workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace.site_id}
                name={workspace.name}
                short_description={workspace.short_description}
                image_url={workspace.image_url}
                parent_name={workspace.site_parent_name}
                handleClick={() => {
                  router.push(
                    `${path.WORKSPACES_MINI_APPS}/${workspaceIdList.join("/")}/${workspace.site_id}`
                  )
                }}
              />
            ))
          : ""}
      </div>
    </div>
  )
}

"use client"

import { Workspace } from "@/app/api/site/types"
import { CreateWorkspaceCard } from "@/components/cards/create-workspace-card"
import WorkspaceCard from "@/components/cards/workspace-card"
import { path, pathWithSlug } from "@/constants/path"
import { useRouter } from "next/navigation"

export default function Workspaces({
  workspaces
}: {
  workspaces: Workspace[]
}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(path.CREATE_WORKSPACE)
  }

  return (
    <div className="my-5 w-full px-1">
      <div className="grid grid-cols-4 gap-5">
        <CreateWorkspaceCard handleClick={handleClick} />

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
                    pathWithSlug.WORKSPACE_SLUG(
                      workspace.site_id.toLocaleString()
                    )
                  )
                }}
              />
            ))
          : ""}
      </div>
    </div>
  )
}

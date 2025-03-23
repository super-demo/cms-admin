"use client"

import { columns } from "@/components/table/_components/columns"
import { UserListTable } from "@/components/table/user-table"
import { Button } from "@/components/ui/button"
import { FolderDown, Plus, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import { pathWithSlug } from "@/constants/path"
import { SiteUserWithRole } from "@/app/api/site-user/types"

interface TeamWorkspaceProps {
  teamList: SiteUserWithRole[] // Changed from UserProfile to UserProfileWithRole
  siteId: number // Added siteId prop
  workspaceIds: string[]
}

export const value = "add"

export default function TeamWorkspace({
  teamList,
  siteId,
  workspaceIds
}: TeamWorkspaceProps) {
  const router = useRouter()

  function handleAddPeople() {
    if (workspaceIds.length === 1) {
      router.push(pathWithSlug.WORKSPACE_ADD_TEAM_LV_1(workspaceIds[0]))
    } else if (workspaceIds.length === 2) {
      router.push(
        pathWithSlug.WORKSPACE_ADD_TEAM_LV_2(workspaceIds[0], workspaceIds[1])
      )
    } else if (workspaceIds.length === 3) {
      router.push(
        pathWithSlug.WORKSPACE_ADD_TEAM_LV_3(
          workspaceIds[0],
          workspaceIds[1],
          workspaceIds[2]
        )
      )
    } else {
      router.push(pathWithSlug.WORKSPACE_ADD_TEAM_LV_1(workspaceIds[0]))
    }
  }

  return (
    <div>
      <div className="mb-8 mt-8 flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          <ul className="list-inside list-disc space-y-1">
            <li>Admin: Can manage workspace and mini apps.</li>
            <li>Viewer: Can only view content but cannot make any changes.</li>
          </ul>
        </div>
        <div className="space-x-2">
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={handleAddPeople}
          >
            <Plus />
            Add
          </Button>
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={() => {}}
            disabled
          >
            <FolderDown />
            Bulk Import
          </Button>
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={() => {}}
            disabled
          >
            <QrCode />
            QR Code
          </Button>
        </div>
      </div>
      <UserListTable columns={columns(siteId)} data={teamList} />
    </div>
  )
}

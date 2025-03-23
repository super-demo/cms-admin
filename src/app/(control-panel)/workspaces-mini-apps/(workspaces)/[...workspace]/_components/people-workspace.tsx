"use client"

import { Button } from "@/components/ui/button"
import { pathWithSlug } from "@/constants/path"
import { FolderDown, Plus, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { UserProfileWithRole } from "../../../../../api/site-user/types"
import { UserProfile } from "../../../../../api/user/types"
import { peopleColumns } from "../../../../people/_components/data-table-row-action"
import { PeopleListTable } from "../../../../people/_components/people-list-table"

interface PeopleWorkspaceProps {
  peopleList: UserProfileWithRole[] // Changed from UserProfile to UserProfileWithRole
  siteId: number // Added siteId prop
  workspaceIds: string[]
}

export const value = "add"

export default function PeopleWorkspace({
  peopleList,
  siteId,
  workspaceIds
}: PeopleWorkspaceProps) {
  const router = useRouter()

  const transformedPeopleList = useMemo(() => {
    // Check if the data is already of type UserProfileWithRole
    if (peopleList.length > 0 && "role" in peopleList[0]) {
      return peopleList as UserProfileWithRole[]
    }

    // Transform UserProfile to UserProfileWithRole
    return (peopleList as UserProfile[]).map((user) => {
      // Simple mapping from user_level_id to role
      const getRoleFromLevelId = (levelId: number): string => {
        const roleMap: Record<number, string> = {
          1: "Root",
          2: "Developer",
          3: "Super Admin",
          4: "Admin",
          5: "Viewer",
          6: "People"
        }
        return roleMap[levelId] || "Unknown"
      }

      return {
        ...user,
        role: getRoleFromLevelId(user.user_level_id)
      } as UserProfileWithRole
    })
  }, [peopleList])

  function handleAddPeople() {
    if (workspaceIds.length === 1) {
      router.push(pathWithSlug.WORKSPACE_ADD_PEOPLE_LV_1(workspaceIds[0]))
    } else if (workspaceIds.length === 2) {
      router.push(
        pathWithSlug.WORKSPACE_ADD_PEOPLE_LV_2(workspaceIds[0], workspaceIds[1])
      )
    } else if (workspaceIds.length === 3) {
      router.push(
        pathWithSlug.WORKSPACE_ADD_PEOPLE_LV_3(
          workspaceIds[0],
          workspaceIds[1],
          workspaceIds[2]
        )
      )
    } else {
      router.push(pathWithSlug.WORKSPACE_ADD_PEOPLE_LV_1(workspaceIds[0]))
    }
  }

  return (
    <div>
      <div className="mb-8 mt-8 flex items-baseline justify-between">
        <div className="text-xs text-neutral-500">
          <ul className="list-inside list-disc space-y-1">
            <li>
              {" "}
              General user who can access the Super App with limited
              permissions.
            </li>
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
      {/* <UserListTable columns={columns(siteId)} data={transformedPeopleList} /> */}
      <PeopleListTable
        columns={peopleColumns(siteId)}
        data={transformedPeopleList}
        siteId={1}
      />
    </div>
  )
}

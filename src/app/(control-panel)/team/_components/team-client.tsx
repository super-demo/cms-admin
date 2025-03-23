"use client"
import { UserProfileWithRole } from "@/app/api/user/types" // Make sure this is imported
import { columns } from "@/components/table/_components/columns"
import { UserListTable } from "@/components/table/user-table"
import { Button } from "@/components/ui/button"
import { FolderDown, Plus } from "lucide-react"
import { useState } from "react"
import AddTeam from "./add-team"

interface TeamClientProps {
  teamList: UserProfileWithRole[] // Changed from UserProfile to UserProfileWithRole
  siteId: number // Added siteId prop
}

export const value = "add"
//TODO: Implement Bulk Import, and filter by role, search, and pagination
export default function TeamClient({ teamList, siteId }: TeamClientProps) {
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>(
    undefined
  )

  function handleOpenAccordion() {
    if (accordionOpen == value) {
      setAccordionOpen(undefined)
      return
    }
    setAccordionOpen(value)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="my-2 text-xl font-bold">Team Management</h1>
        <div className="space-x-2">
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={handleOpenAccordion}
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
        </div>
      </div>
      <AddTeam
        accordionValue={accordionOpen}
        setAccordionValue={setAccordionOpen}
      />
      <UserListTable columns={columns(siteId)} data={teamList} />
    </div>
  )
}

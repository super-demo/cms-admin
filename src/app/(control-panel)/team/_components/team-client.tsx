"use client"

import { Button } from "@/components/ui/button"
import { FolderDown, Plus } from "lucide-react"
import { UserProfile } from "@/app/api/user/types"
import AddTeam from "./add-team"
import { useState } from "react"
import { UserListTable } from "@/components/table/user-table"
import { columns } from "@/components/table/_components/columns"

interface TeamClientProps {
  teamList: UserProfile[]
}

export const value = "add"

export default function TeamClient({ teamList }: TeamClientProps) {
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
          {/* <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={handleAddPeople}
            disabled
          >
            <QrCode />
            QR Code
          </Button> */}
        </div>
      </div>
      <AddTeam
        accordionValue={accordionOpen}
        setAccordionValue={setAccordionOpen}
      />
      <UserListTable columns={columns} data={teamList} />
    </div>
  )
}

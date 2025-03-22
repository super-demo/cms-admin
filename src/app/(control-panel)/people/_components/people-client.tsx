"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FolderDown, Plus } from "lucide-react"
import { UserProfile } from "@/app/api/user/types"
import AddPeople from "./add-people"
import { value } from "../../team/_components/team-client"
import { useState } from "react"
import { UserListTable } from "@/components/table/user-table"
import { columns } from "@/components/table/_components/columns"
import RoleManagement from "./role-management"

interface PeopleClientProps {
  teamList: UserProfile[]
  peopleList: UserProfile[]
}

export default function PeopleClient({ teamList }: PeopleClientProps) {
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
      <div>
        <Tabs defaultValue="people" className="w-full">
          <TabsList>
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
          </TabsList>
          <TabsContent value="people">
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="mb-1 mt-4 pl-1 text-xl font-bold">People</h1>
                  <div className="pl-1.5 text-xs text-neutral-500">
                    <ul className="list-inside list-disc space-y-1">
                      <li>
                        General user who can access the Super App with limited
                        permissions.
                      </li>
                    </ul>
                  </div>
                </div>
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
              <AddPeople
                accordionValue={accordionOpen}
                setAccordionValue={handleOpenAccordion}
              />
              <UserListTable columns={columns} data={teamList} />
            </div>
          </TabsContent>
          <TabsContent value="roles">
            <RoleManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

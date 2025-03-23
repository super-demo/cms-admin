"use client"
import { UserProfile } from "@/app/api/user/types"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FolderDown, Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { value } from "../../team/_components/team-client"
import AddPeople from "./add-people"
import { peopleColumns } from "./data-table-row-action"
import { PeopleListTable } from "./people-list-table"
import RoleManagement from "./role-management"
import { SiteUserWithRole } from "@/app/api/site-user/types"
import { roleConst } from "@/app/api/site-user/constants"

interface PeopleClientProps {
  teamList: UserProfile[] | SiteUserWithRole[]
  peopleList: UserProfile[] | SiteUserWithRole[]
  siteId: number
}

export default function PeopleClient({
  teamList,
  peopleList,
  siteId
}: PeopleClientProps) {
  const [accordionOpen, setAccordionOpen] = useState<string | undefined>(
    undefined
  )

  // Convert UserProfile[] to UserProfileWithRole[] if needed
  const transformedPeopleList = useMemo(() => {
    // Check if the data is already of type UserProfileWithRole
    if (peopleList.length > 0 && "role" in peopleList[0]) {
      return peopleList as SiteUserWithRole[]
    }

    // Transform UserProfile to UserProfileWithRole
    return (peopleList as SiteUserWithRole[]).map((user) => {
      // Simple mapping from user_level_id to role
      const getRoleFromLevelId = (levelId: number): string => {
        const roleMap: Record<number, string> = {
          1: roleConst.Root,
          2: roleConst.Developer,
          3: roleConst.SuperAdmin,
          4: roleConst.Admin,
          5: roleConst.Viewer,
          6: roleConst.People
        }
        return roleMap[levelId] || "Unknown"
      }

      return {
        ...user,
        role: getRoleFromLevelId(user.user.user_level_id),
        sub_role: getRoleFromLevelId(user.site_user_level_id)
      } as SiteUserWithRole
    })
  }, [peopleList])

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
              <PeopleListTable
                columns={peopleColumns(siteId)}
                data={transformedPeopleList}
                siteId={siteId}
              />
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

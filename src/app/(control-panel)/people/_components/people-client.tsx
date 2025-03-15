"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FolderDown, Plus, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"
import { path } from "@/constants/path"
import { PeopleTable } from "./people-table"
import { columns } from "./columns"
import { UserTable } from "./team-table"
import { UserProfile } from "@/app/api/user/types"

interface PeopleClientProps {
  teamList: UserProfile[]
  peopleList: UserProfile[]
}

export default function PeopleClient({
  teamList,
  peopleList
}: PeopleClientProps) {
  const router = useRouter()

  function handleAddPeople() {
    router.push(path.PEOPLE_ADD)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="my-2 text-xl font-bold">People & Permissions</h1>
        <div className="space-x-2">
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={handleAddPeople}
          >
            <Plus />
            Add People
          </Button>
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={handleAddPeople}
          >
            <FolderDown />
            Bulk Import
          </Button>
          <Button
            variant={"secondary"}
            className="pt-2.5"
            onClick={handleAddPeople}
          >
            <QrCode />
            QR Code
          </Button>
        </div>
      </div>
      <div>
        <Tabs defaultValue="teams" className="w-full">
          <TabsList>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="people">People</TabsTrigger>
          </TabsList>
          <TabsContent value="teams">
            {/* <UserTableExample /> */}
            <UserTable columns={columns} data={teamList} />
          </TabsContent>
          <TabsContent value="people">
            <PeopleTable columns={columns} data={peopleList} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

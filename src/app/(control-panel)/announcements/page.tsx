"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import AnnouncementCard from "./_components/announcement-card"
import { useRouter } from "next/navigation"
import { path } from "@/constants/path"

export default function Announcements() {
  const router = useRouter()

  function handleAddAnnouncement() {
    router.push(path.CREATE_ANNOUNCEMENT)
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="my-2 text-xl font-bold">Announcements</h1>
        <Button
          variant={"secondary"}
          className="pt-2.5"
          onClick={handleAddAnnouncement}
        >
          <Plus />
          Add
        </Button>
      </div>
      <div className="">
        <Tabs defaultValue="published" className="w-full">
          <TabsList>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
          </TabsList>
          <TabsContent value="published">
            <AnnouncementCard />
          </TabsContent>
          <TabsContent value="unpublished">
            <AnnouncementCard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

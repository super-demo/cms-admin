"use client"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { path } from "@/constants/path"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AnnouncementCard from "./_components/announcement-card"

import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { GetListAnnouncementBySiteId } from "../../api/announcement/actions"
import { Announcement } from "../../api/announcement/types"

export default function Announcements() {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSiteId, setCurrentSiteId] = useState(1) // Default site ID, replace with actual site ID from your context

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        setLoading(true)
        const data = await GetListAnnouncementBySiteId(currentSiteId)
        setAnnouncements(data)
      } catch (error) {
        toast.error("Failed to load announcements", {
          description: "Please try again later"
        })
        console.error("Error loading announcements:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [currentSiteId])

  function handleAddAnnouncement() {
    router.push(path.CREATE_ANNOUNCEMENT)
  }

  // Filter announcements based on published status
  const publishedAnnouncements = announcements.filter(
    (announcement) => announcement.is_pin
  )
  const unpublishedAnnouncements = announcements.filter(
    (announcement) => !announcement.is_pin
  )

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
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Tabs defaultValue="published" className="w-full">
            <TabsList>
              <TabsTrigger value="published">
                Published ({publishedAnnouncements.length})
              </TabsTrigger>
              <TabsTrigger value="unpublished">
                Unpublished ({unpublishedAnnouncements.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="published">
              {publishedAnnouncements.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No published announcements found
                </div>
              ) : (
                <div className="divide-y">
                  {publishedAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.announcement_id}
                      announcement={announcement}
                      onStatusChange={() => {
                        // Refresh the list after status change
                        GetListAnnouncementBySiteId(currentSiteId).then(
                          setAnnouncements
                        )
                      }}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="unpublished">
              {unpublishedAnnouncements.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No unpublished announcements found
                </div>
              ) : (
                <div className="divide-y">
                  {unpublishedAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.announcement_id}
                      announcement={announcement}
                      onStatusChange={() => {
                        // Refresh the list after status change
                        GetListAnnouncementBySiteId(currentSiteId).then(
                          setAnnouncements
                        )
                      }}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

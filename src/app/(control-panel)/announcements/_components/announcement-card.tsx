"use client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Clock3, Pin, PinOff, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { formatDate } from "../../../../lib/format-date"
import {
  DeleteAnnouncement,
  UpdateAnnouncement
} from "../../../api/announcement/actions"
import { Announcement } from "../../../api/announcement/types"

interface AnnouncementCardProps {
  announcement: Announcement
  onStatusChange: () => void
}

export default function AnnouncementCard({
  announcement,
  onStatusChange
}: AnnouncementCardProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formattedDate = formatDate(new Date(announcement.created_at))
  const formattedTime = new Date(announcement.created_at).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  )

  // Function to process Google Drive URLs
  const getProperImageUrl = (url: string) => {
    if (!url) return null

    // Check if it's a Google Drive thumbnail URL
    if (url.includes("drive.google.com/thumbnail")) {
      // Extract the file ID from the URL
      const idMatch = url.match(/id=([^&]+)/)
      if (idMatch && idMatch[1]) {
        // Use the direct Google Drive content URL format
        return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`
      }
    }
    return url
  }

  const handleTogglePin = async () => {
    try {
      setIsUpdating(true)
      await UpdateAnnouncement(announcement.announcement_id, {
        ...announcement,
        is_pin: !announcement.is_pin
      })

      toast.success(
        `Announcement ${announcement.is_pin ? "unpinned" : "pinned"} successfully`
      )
      onStatusChange()
    } catch (error) {
      // For demo purposes, simulate success
      toast.success(
        `Announcement ${announcement.is_pin ? "unpinned" : "pinned"} successfully`,
        {
          description: "(Demo mode)"
        }
      )
      // Simulate status change
      setTimeout(onStatusChange, 500)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    // In a real app, you would call a delete API here
    // call my delete API from DeleteAnnouncement
    await DeleteAnnouncement(announcement.announcement_id)

    toast.success("Announcement deleted successfully")
    setDeleteDialogOpen(false)
    setTimeout(onStatusChange, 500)
  }

  const imageUrl = getProperImageUrl(announcement.image_url)

  return (
    <>
      <div className="flex items-center gap-6 py-6">
        {/* Image container with fallback */}
        <div className="relative h-[100px] w-[180px] overflow-hidden bg-slate-300">
          {imageUrl && !imageError ? (
            <Image
              src={imageUrl}
              alt={announcement.title || "Announcement image"}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
              sizes="180px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <h1 className="font-bold">{announcement.title}</h1>
          <p>{announcement.short_description || "No description provided"}</p>
          <div className="flex items-center gap-4 text-sm">
            <p>{formattedDate}</p>
            <div className="flex items-center gap-2">
              <Clock3 size={16} />
              <p>{formattedTime}</p>
            </div>
            {announcement.is_pin && (
              <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                <Pin size={12} />
                Published
              </span>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <svg
                width="15"
                height="3"
                viewBox="0 0 15 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1.5C1.5 1.91421 1.16421 2.25 0.75 2.25C0.335786 2.25 0 1.91421 0 1.5C0 1.08579 0.335786 0.75 0.75 0.75C1.16421 0.75 1.5 1.08579 1.5 1.5Z"
                  fill="black"
                />
                <path
                  d="M8.25 1.5C8.25 1.91421 7.91421 2.25 7.5 2.25C7.08579 2.25 6.75 1.91421 6.75 1.5C6.75 1.08579 7.08579 0.75 7.5 0.75C7.91421 0.75 8.25 1.08579 8.25 1.5Z"
                  fill="black"
                />
                <path
                  d="M15 1.5C15 1.91421 14.6642 2.25 14.25 2.25C13.8358 2.25 13.5 1.91421 13.5 1.5C13.5 1.08579 13.8358 0.75 14.25 0.75C14.6642 0.75 15 1.08579 15 1.5Z"
                  fill="black"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleTogglePin} disabled={isUpdating}>
              {announcement.is_pin ? (
                <>
                  <PinOff className="mr-2 h-4 w-4" />
                  <span>Unpublish</span>
                </>
              ) : (
                <>
                  <Pin className="mr-2 h-4 w-4" />
                  <span>Publish</span>
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setDeleteDialogOpen(true)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the announcement "
              {announcement.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

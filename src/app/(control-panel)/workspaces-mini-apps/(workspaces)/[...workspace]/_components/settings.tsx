"use client"

import { Workspace } from "@/app/api/site/types"
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
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner" // Assuming you're using sonner for toast notifications
import { DeleteSiteWorkspace } from "../../../../../api/workspace/actions"

interface SettingsWorkspaceProps {
  workspace: Workspace
}

export default function SettingsWorkspace({
  workspace
}: SettingsWorkspaceProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      // Call the DeleteSiteWorkspace action with the workspace site ID
      await DeleteSiteWorkspace({
        site_id: workspace.site_id
      })

      toast.success("Workspace deleted", {
        description: "The workspace has been successfully deleted."
      })

      // Navigate back to the workspaces list page
      router.push("/workspaces-mini-apps")
      router.refresh()
    } catch (error) {
      console.error("Error deleting workspace:", error)
      toast.error("Delete failed", {
        description:
          "There was an error deleting the workspace. Please try again."
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Information</h1>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace ID</h2>
        <h3 className="text-neutral-700">{workspace.site_id}</h3>
      </div>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace Icon</h2>
        <Avatar>
          <AvatarImage
            src={workspace.image_url}
            alt="workspace_icon"
            className="size-32 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace Name</h2>
        <h3 className="text-neutral-700">{workspace.name}</h3>
      </div>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace Short Description</h2>
        <h3 className="text-neutral-700">
          {workspace.short_description ?? "-"}
        </h3>
      </div>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace Description</h2>
        <h3 className="text-neutral-700">{workspace.description ?? "-"}</h3>
      </div>
      <Separator className="my-10" />
      <div className="my-5 space-y-1">
        <h1 className="text-lg font-bold">Delete</h1>
        <h3 className="text-xs text-neutral-700">
          Only an Super Admin can delete a workspace, and only when the
          workspace has no mini app.
        </h3>
      </div>
      <Button
        variant="destructive"
        className="font-bold"
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete workspace"}
      </Button>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this workspace?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              workspace "{workspace.name}" and all associated data.
              <span className="mt-2 font-semibold text-destructive">
                Remember: You can only delete a workspace when it has no mini
                apps.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Workspace"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

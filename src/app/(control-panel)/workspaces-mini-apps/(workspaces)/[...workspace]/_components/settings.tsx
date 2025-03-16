import { Workspace } from "@/app/api/site/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

interface SettingsWorkspaceProps {
  workspace: Workspace
}

export default function SettingsWorkspace({
  workspace
}: SettingsWorkspaceProps) {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">Information</h1>

      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace ID</h2>
        <p className="text-neutral-700">{workspace.site_id}</p>
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
        <p className="text-neutral-700">{workspace.name}</p>
      </div>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace Short Description</h2>
        <p className="text-neutral-700">{workspace.short_description ?? "-"}</p>
      </div>
      <div className="mt-6 flex space-x-10">
        <h2 className="font-bold">Workspace Description</h2>
        <p className="text-neutral-700">{workspace.description ?? "-"}</p>
      </div>

      <Separator className="my-10" />

      <div className="my-5 space-y-1">
        <h1 className="text-lg font-bold">Delete</h1>
        <p className="text-xs text-neutral-700">
          Only an Super Admin can delete a workspace, and only when the
          workspace has no mini app.
        </p>
      </div>
      <Button variant={"destructive"} className="font-bold">
        Delete workspace
      </Button>
    </div>
  )
}

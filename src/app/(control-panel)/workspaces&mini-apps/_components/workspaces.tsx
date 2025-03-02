import { CreateWorkspaceCard } from "@/components/cards/create-workspace-card"
import WorkspaceCard from "@/components/cards/workspace-card"

export default function Workspaces() {
  return (
    <div className="my-5 flex space-x-5">
      <CreateWorkspaceCard />
      <WorkspaceCard />

      {/* <div className="flex w-[236px] flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6">
        <div className="w-full text-end text-xs text-neutral-500">1st</div>
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/k.png"
              alt="workspace_icon"
              className="size-16 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center space-y-1 text-sm">
          <h1 className="text-base font-bold">Kasetsart Bangkhen</h1>
          <h1 className="text-center">มหาวิทยาลัยเกษตรศาสตร์ บางเขน</h1>
        </div>
      </div> */}
    </div>
  )
}

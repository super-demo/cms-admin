import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { GetListWorkspace, GetWorkspace } from "@/app/api/site/action"
import { People } from "./_components/people"
import SettingsWorkspace from "./_components/settings"
import WorkspaceThread from "./_components/workspace-thread"
import MiniAppThread from "./_components/mini-app-thread"
import { GetListMiniApp } from "@/app/api/site-mini-apps/action"

export default async function WorkspaceClient({
  params
}: {
  params: Promise<{ workspace: string[] }>
}) {
  const workspaceIdList = (await params).workspace

  console.log("params", workspaceIdList)

  const workspaceId = workspaceIdList[workspaceIdList.length - 1]

  const workspace = await GetWorkspace(Number(workspaceId))

  const workspaceList = await GetListWorkspace(Number(workspaceId))

  const miniAppList = await GetListMiniApp(Number(workspaceId))

  const isMaxLevel = workspaceIdList.length >= 3

  return (
    <div>
      <div className="mb-7 mt-4 flex items-center space-x-5">
        <Avatar>
          <AvatarImage
            src={workspace.image_url}
            alt="workspace_icon"
            className="size-16 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">{workspace.name}</h1>
          <p className="text-sm">{workspace.short_description}</p>
        </div>
      </div>

      <Tabs
        defaultValue={!isMaxLevel ? "workspace" : "mini-app"}
        className="w-full"
      >
        <TabsList>
          {!isMaxLevel && (
            <TabsTrigger value="workspace">Workspaces</TabsTrigger>
          )}
          <TabsTrigger value="mini-app">Mini Apps</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="workspace">
          <WorkspaceThread
            workspaces={workspaceList}
            workspaceIdList={workspaceIdList}
          />
        </TabsContent>
        <TabsContent value="mini-app">
          <MiniAppThread
            miniApps={miniAppList}
            workspaceIdList={workspaceIdList}
          />
        </TabsContent>
        <TabsContent value="people">
          <People />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsWorkspace workspace={workspace} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

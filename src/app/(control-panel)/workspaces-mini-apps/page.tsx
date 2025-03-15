"use server"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Workspaces from "./_components/workspaces"
import MiniApps from "./_components/mini-apps"
import { GetListWorkspace } from "@/app/api/site/action"
import { GetListMiniApp } from "@/app/api/site-mini-apps/action"
import { MAIN_SITE_ID } from "@/constants"

export default async function WorkspacesMiniApps() {
  const workspaces = await GetListWorkspace(MAIN_SITE_ID)
  const mini_apps = await GetListMiniApp(MAIN_SITE_ID)

  return (
    <div className="">
      <Tabs defaultValue="workspace" className="w-full">
        <TabsList>
          <TabsTrigger value="workspace">Workspaces</TabsTrigger>
          <TabsTrigger value="mini-app">Mini Apps</TabsTrigger>
        </TabsList>
        <TabsContent value="workspace">
          <Workspaces workspaces={workspaces} />
        </TabsContent>
        <TabsContent value="mini-app">
          <MiniApps mini_apps={mini_apps} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

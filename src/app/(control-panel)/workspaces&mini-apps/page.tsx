import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Workspaces from "./_components/workspaces"
import MiniApps from "./_components/mini-apps"

export default function WorkspacesMiniApps() {
  return (
    <div className="">
      <Tabs defaultValue="workspace" className="w-full">
        <TabsList>
          <TabsTrigger value="workspace">Workspaces</TabsTrigger>
          <TabsTrigger value="mini-app">Mini Apps</TabsTrigger>
        </TabsList>
        <TabsContent value="workspace">
          <Workspaces />
        </TabsContent>
        <TabsContent value="mini-app">
          <MiniApps />
        </TabsContent>
      </Tabs>
    </div>
  )
}

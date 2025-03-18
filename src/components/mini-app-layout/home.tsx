import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { MiniApp } from "@/app/api/site-mini-apps/type"
import BasicSettings from "./_components/basic-settings"
import People from "./_components/people"

interface HomeMiniAppLayoutProps {
  miniApp: MiniApp
  workspaceIdList: string[]
}

export default function HomeMiniAppLayout({
  miniApp,
  workspaceIdList
}: HomeMiniAppLayoutProps) {
  return (
    <div>
      <div className="mb-7 mt-4 flex items-center space-x-5">
        <Avatar>
          <AvatarImage
            src={miniApp.image_url}
            alt="workspace_icon"
            className="size-16 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">{miniApp.slug}</h1>
          <p className="text-sm">
            {miniApp.description == "" ? "-" : miniApp.description}
          </p>
          <Badge>active</Badge>
        </div>
      </div>

      <Tabs defaultValue="basic-settings" className="w-full">
        <TabsList>
          <TabsTrigger value="basic-settings">Basic settings</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-settings">
          <BasicSettings miniAppData={miniApp} />
        </TabsContent>
        <TabsContent value="people">
          <People
            miniAppId={miniApp.site_mini_app_id.toLocaleString()}
            workspaceIds={workspaceIdList}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

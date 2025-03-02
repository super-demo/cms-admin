import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Settings } from "lucide-react"
import People from "../../people/page"
import MiniApps from "../_components/mini-apps"
import TempCard from "./_components/temp-wrksp"

export default async function Page({
  params
}: {
  params: Promise<{ workspace: string }>
}) {
  const slug = (await params).workspace

  console.log(slug)

  return (
    <div>
      <div className="mb-7 mt-4 flex items-center space-x-5">
        <Avatar>
          <AvatarImage
            src="https://github.com/thyms-c.png"
            alt="workspace_icon"
            className="size-16 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">{slug[slug.length - 1]}</h1>
          <p className="text-sm">เกษตรศาสตร์ ศรีราชา</p>
        </div>
      </div>

      <Tabs defaultValue="workspace" className="w-full">
        <TabsList>
          <TabsTrigger value="workspace">Workspaces</TabsTrigger>
          <TabsTrigger value="mini-app">Mini Apps</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="workspace">
          <TempCard
            name="kaset-sriracha"
            description="Faculty of Science"
            location="Kaset Sriracha"
            icon="https://github.com/thyc.png"
          />
        </TabsContent>
        <TabsContent value="mini-app">
          <MiniApps />
        </TabsContent>
        <TabsContent value="people">
          <People />
        </TabsContent>
        <TabsContent value="settings">
          <Settings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

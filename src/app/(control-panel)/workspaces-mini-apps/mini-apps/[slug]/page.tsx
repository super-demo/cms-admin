import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import People from "../../../people/page"
import { Badge } from "@/components/ui/badge"
import BasicSettings from "./_components/basic-settings"

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
            src="https://github.com/tg.png"
            alt="workspace_icon"
            className="size-16 rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-bold">Library</h1>
          <p className="text-sm">ห้องสมุดเกษตร</p>
          <Badge>active</Badge>
        </div>
      </div>

      <Tabs defaultValue="basic-settings" className="w-full">
        <TabsList>
          <TabsTrigger value="basic-settings">Basic settings</TabsTrigger>
          <TabsTrigger value="people">People</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-settings">
          <BasicSettings />
        </TabsContent>
        <TabsContent value="people">
          <People />
        </TabsContent>
      </Tabs>
    </div>
  )
}

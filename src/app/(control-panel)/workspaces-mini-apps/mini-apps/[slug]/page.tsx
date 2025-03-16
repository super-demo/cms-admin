import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import { Badge } from "@/components/ui/badge"
import BasicSettings from "./_components/basic-settings"
import { GetMiniApp } from "@/app/api/site-mini-apps/action"
import People from "./_components/people"

export function parseSlug(slug: string) {
  return decodeURIComponent(slug)
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // const { slug: params } = useParams<{ slug: string }>()
  // const miniApp = await GetMiniApp(params)
  const slug = (await params).slug

  const miniApp = await GetMiniApp(Number(slug))

  return (
    <div>
      <div className="mb-7 mt-4 flex items-center space-x-5">
        <Avatar>
          <AvatarImage
            // src="https://github.com/chayakorn2002.png"
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
          <People miniAppSlug={slug} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Site } from "@/app/api/site/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookText, Bot } from "lucide-react"

export default function SettingsClient({ siteData }: { siteData: Site }) {
  return (
    <div>
      <h1 className="my-2 text-xl font-bold">Site Information</h1>

      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Site ID</p>
        <p>{siteData.site_id}</p>
      </div>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Site name</p>
        <p>{siteData.name}</p>
      </div>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Site description</p>
        <p>{siteData.description ?? "-"}</p>
      </div>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Site type</p>
        <p>University</p>
      </div>

      <Separator className="my-10" />

      <div className="space-x-4">
        <Button variant={"outline"}>
          <BookText /> Document
        </Button>
        <Button variant={"outline"}>
          <Bot /> Support
        </Button>
      </div>
    </div>
  )
}

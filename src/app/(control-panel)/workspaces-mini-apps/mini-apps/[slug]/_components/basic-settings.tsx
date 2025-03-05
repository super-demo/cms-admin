import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const information = {
  infos: [
    {
      key: "miniAppId",
      label: "Mini app ID",
      value: "6542233"
    },
    {
      key: "miniAppIcon",
      label: "Mini app Icon",
      value: "[Image of a circle with 'CN' inside]"
    },
    {
      key: "miniAppName",
      label: "Mini app Name",
      value: "Office 1"
    },
    {
      key: "miniAppDescription",
      label: "Mini app Description",
      value: "-"
    },
    {
      key: "miniAppSecret",
      label: "Mini app Secret",
      value: "uasd2j34523dusfksdfu8"
    }
  ],
  settings: [
    {
      key: "webhookUrl",
      label: "Webhook URL",
      value: "https://48893495.lcal"
    }
  ]
}

export default function BasicSettings() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Information</h1>
      {information.infos.map((info) => (
        <div className="mt-8 flex space-x-8" key={info.key}>
          <p className="text-base font-bold">{info.label}</p>
          <p>{info.value}</p>
        </div>
      ))}

      <Separator className="my-10" />

      <h1 className="text-xl font-bold">Webhook Settings</h1>
      {information.settings.map((info) => (
        <div className="mt-8 flex space-x-8" key={info.key}>
          <p className="text-base font-bold">{info.label}</p>
          <p>{info.value}</p>
        </div>
      ))}

      <Separator className="my-10" />

      <h1 className="mb-5 text-xl font-bold">Mini App Status</h1>
      <div className="flex items-center space-x-3">
        <Switch id="airplane-mode" />
        <h1>Active</h1>
      </div>

      <Separator className="my-10" />

      <h1 className="mb-5 text-xl font-bold">Delete</h1>
      <Button variant={"destructive"} className="font-bold">
        Delete Service
      </Button>
    </div>
  )
}

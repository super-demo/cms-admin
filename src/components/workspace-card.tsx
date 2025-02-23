import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"

export default function WorkspaceCard() {
  return (
    <div className="my-4 flex space-x-5">
      <div className="flex w-[236px] flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6">
        <div className="w-full text-end text-sm text-neutral-500">2nd</div>
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/thyms-c.png"
              alt="workspace_icon"
              className="size-16 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold">Science</h1>
          <h1>Faculty of Science</h1>
        </div>
        <Badge>Kasetsart Bangkhen</Badge>
      </div>

      <div className="flex w-[236px] flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6">
        <div className="w-full text-end text-sm text-neutral-500">2nd</div>
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage
              src="https://github.com/thyms.png"
              alt="workspace_icon"
              className="size-16 rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-bold">สำนักคอมพิวเตอร์</h1>
          <h1>สำนักคอมพิวเตอร์ บางเขน</h1>
        </div>
        <Badge>Kasetsart Bangkhen</Badge>
      </div>
    </div>
  )
}

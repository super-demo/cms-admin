import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"

export default function MiniAppCard() {
  return (
    <div className="my-4 flex space-x-5">
      <div className="h-20 w-[256px] rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/ms.png"
                alt="workspace_icon"
                className="size-12 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">Library</h1>
          </div>
          <Badge className="max-w-20 truncate text-left">
            Kasetsart Bangkhen
          </Badge>
        </div>
      </div>
    </div>
  )
}

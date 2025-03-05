"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "../ui/badge"
import { useRouter } from "next/navigation"
import { pathWithSlug } from "@/constants/path"

export default function MiniAppCard() {
  const router = useRouter()

  const handleClick = () => {
    router.push(pathWithSlug.MINI_APP_SLUG("library"))
  }

  return (
    <div className="flex space-x-5">
      <div
        className="hover-card h-20 w-[256px] rounded-2xl border border-gray-200 p-4"
        onClick={handleClick}
      >
        <div className="hover-card-content flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage
                src="https://github.com/ms.png"
                alt="workspace_icon"
                className="size-12 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm font-bold">Library</h1>
          </div>
          <Badge className="max-w-20 truncate text-left">
            Kasetsart Bangkhen
          </Badge>
        </div>
      </div>
    </div>
  )
}

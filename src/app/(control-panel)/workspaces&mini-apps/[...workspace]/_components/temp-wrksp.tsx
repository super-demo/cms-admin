"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

import { useRouter } from "next/navigation"
import { pathWithSlug } from "@/constants/path"
import { Badge } from "@/components/ui/badge"
import { CreateWorkspaceCard } from "@/components/cards/create-workspace-card"
import { WorkspaceCardProps } from "@/app/api/workspace/types"

export default function TempCard({
  name,
  description,
  location,
  icon
}: WorkspaceCardProps) {
  const router = useRouter()

  const handleClick = (url: string) => {
    router.push(pathWithSlug.SECOND_LEVEL(name, url))
  }

  return (
    <div className="my-6 flex space-x-5">
      <CreateWorkspaceCard />

      <div className="hover-card h-[268px] w-[236px] rounded-2xl border border-gray-200 p-6">
        <div
          className="hover-card-content flex h-full w-full flex-col items-center justify-center space-y-5"
          onClick={() => handleClick("Science")}
        >
          {/* <div className="w-full text-end text-xs text-neutral-500"></div> */}
          <div className="flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src="https://github.com/thyc.png"
                alt="workspace_icon"
                className="size-16 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center space-y-1 text-sm">
            <h1 className="text-base font-bold">Science</h1>
            <h1>Faculty of Science</h1>
          </div>
          <Badge>Kaset Sriracha</Badge>
        </div>
      </div>

      {/* <div className="hover-card w-[236px] rounded-2xl border border-gray-200 p-6">
        <div className="hover-card-content flex w-full flex-col items-center space-y-4">
          <div className="w-full text-end text-xs text-neutral-500">2nd</div>
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
          <div className="flex flex-col items-center text-sm">
            <h1 className="text-base font-bold">สำนักคอมพิวเตอร์</h1>
            <h1>สำนักคอมพิวเตอร์ บางเขน</h1>
          </div>
          <Badge>Kasetsart Bangkhen</Badge>
        </div>
      </div> */}
    </div>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "../ui/badge"
import { useRouter } from "next/navigation"
import { pathWithSlug } from "@/constants/path"

export default function WorkspaceCard() {
  const router = useRouter()

  const handleClick = (url: string) => {
    const formattedUrl = url.replace(/\s+/g, "-").toLowerCase()
    router.push(pathWithSlug.WORKSPACE_SLUG(formattedUrl))
  }

  return (
    <div className="flex space-x-5">
      <div className="hover-card h-[268px] w-[236px] rounded-2xl border border-gray-200 p-6">
        <div
          className="hover-card-content flex h-full w-full flex-col items-center justify-center space-y-5"
          onClick={() => handleClick("Kaset Sriracha")}
        >
          {/* <div className="w-full text-end text-xs text-neutral-500"></div> */}
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
          <div className="flex flex-col items-center space-y-1 text-sm">
            <h1 className="text-base font-bold">Kaset Sriracha</h1>
            <h1>เกษตรศาสตร์ วิทยาเขต ศรีราชา</h1>
          </div>
          <Badge>Kasetsart University</Badge>
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

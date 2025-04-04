"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "../ui/badge"

interface WorkspaceCardProps {
  name: string
  short_description?: string
  parent_name: string
  image_url?: string
  handleClick: () => void
}

export default function WorkspaceCard({
  name,
  short_description,
  parent_name,
  image_url,
  handleClick
}: WorkspaceCardProps) {
  return (
    <div>
      <div className="hover-card h-[268px] w-[236px] rounded-2xl border border-gray-200 p-6">
        <div
          className="hover-card-content flex h-full w-full flex-col items-center justify-center space-y-5"
          onClick={handleClick}
        >
          {/* <div className="w-full text-end text-xs text-neutral-500"></div> */}
          <div className="flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src={image_url}
                alt="workspace_icon"
                className="size-16 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center space-y-1 text-sm">
            <h1 className="text-center text-base font-bold">{name}</h1>
            <h1>{short_description ?? "-"}</h1>
          </div>
          <Badge>{parent_name}</Badge>
        </div>
      </div>
    </div>
  )
}

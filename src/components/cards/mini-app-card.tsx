"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

interface MiniAppCardProps {
  mini_app_id: number
  slug: string
  image_url: string
  handleClick?: () => void
}

export default function MiniAppCard({
  slug,
  image_url,
  handleClick
}: MiniAppCardProps) {
  // const router = useRouter()

  // const handleClick = () => {
  //   console.log("mini_app_id", mini_app_id)
  //   const id = mini_app_id.toLocaleString()

  //   router.push(pathWithSlug.MINI_APP_SLUG(id))
  // }

  return (
    <div className="flex space-x-5">
      <div
        className="hover-card h-20 w-[256px] rounded-2xl border border-gray-200 p-4"
        onClick={handleClick}
      >
        <div className="hover-card-content flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={image_url}
                alt="workspace_icon"
                className="size-12 rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-sm font-bold">{slug}</h1>
          </div>
          {/* <Badge className="max-w-20 truncate text-left">
            Kasetsart Bangkhen
          </Badge> */}
        </div>
      </div>
    </div>
  )
}

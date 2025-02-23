import { Bot, Frame, LifeBuoy, Send, SquareTerminal } from "lucide-react"

import { path } from "@/constants/path"

export const NavMockData = {
  navMain: [
    {
      title: "Sites",
      url: path.SITE,
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create",
          url: path.SITE_CREATE
        },
        {
          title: "Type",
          url: path.SITE_TYPE
        },
        {
          title: "Logs",
          url: path.SITE_LOG
        }
      ]
    },
    {
      title: "Users",
      url: path.USER,
      icon: Bot,
      items: [
        {
          title: "Logs",
          url: "#"
        }
      ]
    }
  ],
  navSecondary: [
    {
      name: "Settings",
      url: "#",
      icon: Frame
    }
  ],
  navSupport: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send
    }
  ]
}

import { House, Building, UsersRound, Megaphone, Settings2 } from "lucide-react"

import { path } from "@/constants/path"

export const sidebarItems = {
  main: [
    {
      title: "Home",
      url: path.HOME,
      icon: House,
      isActive: true
    },
    {
      title: "Workspaces & Mini Apps",
      url: path.WORKSPACES,
      icon: Building
    },
    {
      title: "People & Permissions",
      url: path.PEOPLE,
      icon: UsersRound
    },
    {
      title: "Announcements",
      url: path.ANNOUNCEMENTS,
      icon: Megaphone
    },
    {
      title: "Settings",
      url: path.SETTINGS,
      icon: Settings2
    }
  ]
}

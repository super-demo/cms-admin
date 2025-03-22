import {
  Building,
  UsersRound,
  Megaphone,
  Settings2,
  UserRoundCog
} from "lucide-react"

import { path } from "@/constants/path"

export const sidebarItems = {
  main: [
    // {
    //   title: "Home",
    //   url: path.HOME,
    //   icon: House,
    //   isActive: true
    // },
    {
      title: "Team",
      url: path.TEAM,
      icon: UserRoundCog
    },
    {
      title: "People & Roles",
      url: path.PEOPLE,
      icon: UsersRound
    },
    {
      title: "Workspaces & Mini Apps",
      url: path.WORKSPACES_MINI_APPS,
      icon: Building
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

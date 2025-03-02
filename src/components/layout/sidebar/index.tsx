"use client"

import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { ComponentProps } from "react"

import { Main } from "@/components/layout/sidebar/main"
import { sidebarItems } from "@/components/layout/sidebar/items"
import { NavUser } from "@/components/layout/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail
} from "@/components/ui/sidebar"

import packageJson from "../../../../package.json"
import { UserProfile } from "@/app/api/user/types"

interface SidebarLayoutProps extends ComponentProps<typeof Sidebar> {
  userData: UserProfile
}

export default function SidebarLayout({
  userData,
  ...props
}: SidebarLayoutProps) {
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Kasetsart University</span>
              <span className="text-xs">v{packageJson.version}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        {/* FYI: This is mock components */}
        {/* TODO: Implement with navigation */}
        <Main items={sidebarItems.main} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userData={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

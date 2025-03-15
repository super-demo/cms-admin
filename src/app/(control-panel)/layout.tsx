import ContainerSidebarLayout from "@/components/layout/container-sidebar"
import SidebarLayout from "@/components/layout/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getServerSession } from "next-auth"
import { GetUserProfile } from "../api/user/actions"
import authOption from "../api/auth/[...nextauth]/auth-option"
import { GetSite } from "../api/site/action"

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOption)
  const { data: userData } = await GetUserProfile(
    session?.user.jwt.userId as number,
    session?.user.jwt.accessToken as string
  )
  const site = await GetSite(1)

  return (
    <SidebarProvider>
      <SidebarLayout userData={userData} site={site} />
      <SidebarInset>
        <ContainerSidebarLayout>{children}</ContainerSidebarLayout>
      </SidebarInset>
    </SidebarProvider>
  )
}

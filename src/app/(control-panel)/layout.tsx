import ContainerSidebarLayout from "@/components/layout/container-sidebar"
import SidebarLayout from "@/components/layout/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  // const session = await getServerSession(authOption)
  // const { data: userData } = await GetUserProfile(
  //   session?.user.jwt.userId as number,
  //   session?.user.jwt.accessToken as string
  // )

  const userData = {
    user_id: 1,
    user_level_id: 1,
    google_token: "google_token",
    avatar_url: "avatar_url",
    name: "name",
    nickname: "nickname",
    role: "role",
    email: "email",
    phone_number: "phone_number",
    birthday: "birthday",
    created_at: "created_at",
    updated_at: "updated_at"
  }

  return (
    <SidebarProvider>
      <SidebarLayout userData={userData} />
      <SidebarInset>
        <ContainerSidebarLayout>{children}</ContainerSidebarLayout>
      </SidebarInset>
    </SidebarProvider>
  )
}

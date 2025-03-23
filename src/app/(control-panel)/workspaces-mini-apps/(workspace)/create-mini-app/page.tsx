"use client"

import CreateMiniAppForm from "@/components/forms/create-mini-app-form"
import { MAIN_SITE_ID_STR } from "@/constants"
import { path } from "@/constants/path"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  function handlePush() {
    router.push(path.WORKSPACES_MINI_APPS)
  }
  return (
    <CreateMiniAppForm parentId={MAIN_SITE_ID_STR} handlePush={handlePush} />
  )
}

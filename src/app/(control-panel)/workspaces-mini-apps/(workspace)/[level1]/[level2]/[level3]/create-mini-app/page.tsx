"use client"

import CreateMiniAppForm from "@/components/forms/create-mini-app-form"
import { pathWithSlug } from "@/constants/path"
import { useParams, useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  const {
    level1: grandParentId,
    level2: parentId,
    level3: childId
  } = useParams<{
    level1: string
    level2: string
    level3: string
  }>()

  function handlePush() {
    router.push(
      pathWithSlug.WORKSPACE_THIRD_LEVEL(grandParentId, parentId, childId)
    )
  }

  return <CreateMiniAppForm parentId={childId} handlePush={handlePush} />
}

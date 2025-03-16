"use client"

import CreateWorkspaceForm from "@/components/forms/create-workspace-form"
import { pathWithSlug } from "@/constants/path"
import { useParams, useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  const { level1: grandParentId, level2: parentId } = useParams<{
    level1: string
    level2: string
  }>()

  function handlePush() {
    console.log(pathWithSlug.WORKSPACE_SECOND_LEVEL(grandParentId, parentId))
    router.push(pathWithSlug.WORKSPACE_SECOND_LEVEL(grandParentId, parentId))
  }

  return <CreateWorkspaceForm parentId={parentId} handlePush={handlePush} />
}

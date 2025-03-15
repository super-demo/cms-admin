"use client"

import { path } from "@/constants/path"
import { useRouter } from "next/navigation"

import { HiOutlinePlus } from "react-icons/hi2"

export function CreateWorkspaceCard() {
  const router = useRouter()

  const handleClick = () => {
    router.push(path.CREATE_WORKSPACE)
  }

  return (
    <div
      className="hover-card flex h-[268px] w-[236px] flex-col items-center justify-center space-y-4 rounded-2xl border border-gray-200 p-6"
      onClick={handleClick}
    >
      <div className="hover-card-content flex flex-col items-center justify-center space-y-2 stroke-neutral-500 text-sm text-neutral-500">
        <HiOutlinePlus size={24} />
        <h1>Create a new workspace </h1>
      </div>
    </div>
  )
}

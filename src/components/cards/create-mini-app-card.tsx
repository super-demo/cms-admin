"use client"

import { HiOutlinePlus } from "react-icons/hi2"
import { CreateCardProps } from "./create-workspace-card"

export function CreateMiniAppCard({ handleClick }: CreateCardProps) {
  return (
    <div
      className="hover-card flex w-[236px] flex-col items-center justify-center space-y-4 rounded-2xl border border-gray-200 p-6"
      onClick={handleClick}
    >
      <div className="hover-card-content flex items-center justify-center space-x-2 stroke-neutral-500 text-sm text-neutral-500">
        <HiOutlinePlus size={24} />
        <h1>Create a new mini app </h1>
      </div>
    </div>
  )
}

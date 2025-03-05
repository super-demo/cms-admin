import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { FiSearch } from "react-icons/fi"
import { UsersTable } from "./users-table"
import { HiOutlinePlus } from "react-icons/hi2"

export function People() {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2 py-4">
          <Input placeholder="Search..." />
          <Button type="submit">
            <FiSearch />
          </Button>
        </div>
        <Button variant={"secondary"}>
          <HiOutlinePlus size={24} className="stroke-2" />
          Add people
        </Button>
      </div>
      <UsersTable />

      <div className="my-5 space-y-1">
        <h1 className="text-base font-bold">People</h1>
        <p className="text-xs text-neutral-700">
          People that can access this service on super app.
        </p>
      </div>
      <UsersTable />
    </div>
  )
}

"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserProfile } from "@/app/api/user/types"
import ShortnameImage from "@/lib/shortname-image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export const columns: ColumnDef<UserProfile>[] = [
  // {
  //   accessorKey: "id",
  //   header: "No."
  // },
  // {
  //   accessorKey: "avatar",
  //   header: "",
  //   cell: ({ row }) => {
  //     const user = row.original
  //     return (
  //       <Avatar className="h-8 w-8">
  //         <AvatarImage src={user.avatar_url} alt={user.name} />
  //         <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
  //       </Avatar>
  //     )
  //   }
  // },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex items-center">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar_url} alt={user.name} />
            <AvatarFallback className="rounded-lg">
              {ShortnameImage(user.name.charAt(0))}
            </AvatarFallback>
          </Avatar>
          <span className="ml-4">{user.name == "" ? "-" : user.name}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  // {
  //   accessorKey: "phone_number",
  //   header: "Phone",
  //   cell: ({ row }) => {
  //     const user = row.original

  //     return <span>{user.phone_number ? "" : "-"}</span>
  //   }
  // },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original

      return (
        <div className="flex items-center">
          <span>{user.role}</span>
        </div>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(user.user_id.toLocaleString())
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

"use client"

import { UserProfileWithRole } from "@/app/api/user/types"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import ShortnameImage from "@/lib/shortname-image"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { GetListPeopleRole } from "../../../api/people-role/actions"
import { PeopleRole } from "../../../api/people-role/types"
import { DeleteSitePeople } from "../../../api/site-people/actions"

interface DataTableRowActionsProps {
  row: UserProfileWithRole
  siteId: number
  sitePeopleId?: number
}

const DataTableRowActions = ({
  row,
  siteId,
  sitePeopleId
}: DataTableRowActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsSubmitting(true)

      const payload = {
        site_people_id: sitePeopleId || 0,
        site_id: siteId,
        user_id: row.user_id
      }

      await DeleteSitePeople(payload)
      toast.success("Person deleted successfully")
      router.refresh()
    } catch (error) {
      console.error("Failed to delete person:", error)
      toast.error("Failed to delete person")
    } finally {
      setIsSubmitting(false)
      setShowDeleteDialog(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-red-500 hover:!text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-1 text-xl">
              Confirm delete person?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              person from this site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export const peopleColumns = (
  siteId: number
): ColumnDef<UserProfileWithRole>[] => {
  const RoleCell = ({ row }: { row: any }) => {
    const person = row.original
    const [roleName, setRoleName] = useState<string>("Loading...")
    const [peopleRoles, setPeopleRoles] = useState<PeopleRole[]>([])

    useEffect(() => {
      const fetchRoles = async () => {
        try {
          const roles = await GetListPeopleRole(siteId)
          setPeopleRoles(roles)

          // Find the role that matches this person's sub_role_id
          const role = roles.find(
            (r) => r.people_role_id === person.sub_role_id
          )
          setRoleName(role ? role.slug : "Unknown Role")
        } catch (error) {
          console.error("Failed to fetch role information", error)
          setRoleName("Unknown Role")
        }
      }

      fetchRoles()
    }, [person.sub_role_id, siteId])

    return (
      <div className="flex items-center">
        <span>{roleName}</span>
      </div>
    )
  }

  return [
    {
      accessorKey: "id",
      header: () => {
        return <h1 className="pl-2">No.</h1>
      },
      cell: ({ row }) => {
        return <span className="pl-2">{row.index + 1}.</span>
      }
    },
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
        const person = row.original

        return (
          <div className="flex items-center">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={person.avatar_url} alt={person.name} />
              <AvatarFallback className="rounded-lg">
                {ShortnameImage(person.name.charAt(0))}
              </AvatarFallback>
            </Avatar>
            <span className="ml-4">
              {person.name === "" ? "-" : person.name}
            </span>
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
    {
      accessorKey: "sub_role_id",
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
      cell: ({ row }) => <RoleCell row={row} />
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const person = row.original

        return (
          <div className="flex justify-end pr-4">
            <DataTableRowActions
              row={person}
              siteId={siteId}
              sitePeopleId={person.site_people_id}
            />
          </div>
        )
      }
    }
  ]
}

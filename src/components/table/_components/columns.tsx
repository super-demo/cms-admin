"use client"

import { roleConst, roleList } from "@/app/api/site-user/constants"
import { DeleteSiteUserPayload } from "@/app/api/site-user/types"
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
import { zodResolver } from "@hookform/resolvers/zod"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { DeleteSiteUser } from "../../../app/api/site-user/action"

interface DataTableRowActionsProps {
  row: UserProfileWithRole
  siteId: number
  siteUserId?: number // Add this if available
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.nativeEnum(roleConst, {
    required_error: "Please select a role"
  })
})

type FormValues = z.infer<typeof formSchema>

const DataTableRowActions = ({
  row,
  siteId,
  siteUserId
}: DataTableRowActionsProps) => {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: row.email,
      role: roleConst[row.role as keyof typeof roleConst]
    }
  })

  const getUserLevelIdFromRole = (role: string): number => {
    const roleEntry = roleList.find((r) => r.role === role)
    return roleEntry ? roleEntry.id : 5 // Default to Viewer if not found
  }

  // const onSubmit = async (data: FormValues) => {
  //   try {
  //     setIsSubmitting(true)

  //     const payload: UpdateSiteUserPayload = {
  //       site_user_id: siteUserId || 0, // If you have it
  //       user_id: row.user_id,
  //       site_id: siteId,
  //       site_user_level_id: getUserLevelIdFromRole(data.role),
  //       is_active: true,
  //       created_by: 1, // Hardcoded for now
  //       updated_by: 1 // Hardcoded for now
  //     }

  //     await UpdateSiteUser(payload)
  //     toast.success("User updated successfully")
  //     setShowEditDialog(false)
  //     router.refresh()
  //   } catch (error) {
  //     console.error("Failed to update user:", error)
  //     toast.error("Failed to update user")
  //   } finally {
  //     setIsSubmitting(false)
  //   }
  // }

  const handleEditClick = () => {
    setShowEditDialog(true)
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleConfirmDelete = async () => {
    try {
      setIsSubmitting(true)

      const payload: DeleteSiteUserPayload = {
        site_user_id: siteUserId || 0, // If you have it
        site_id: siteId,
        user_id: row.user_id
      }

      await DeleteSiteUser(payload)
      toast.success("User deleted successfully")
      router.refresh()
    } catch (error) {
      console.error("Failed to delete user:", error)
      toast.error("Failed to delete user")
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
          {/* <DropdownMenuItem
            onClick={handleEditClick}
            disabled={row.google_token !== ""}
          >
            <PencilLine className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem> */}
          <DropdownMenuItem
            onClick={handleDeleteClick}
            className="text-red-500 hover:!text-red-500"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit User Dialog */}
      {/* <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[50px_1fr] items-baseline gap-4">
                    <FormLabel className="text-right">Email</FormLabel>
                    <div className="flex flex-col">
                      <FormControl>
                        <Input placeholder="email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-[50px_1fr] items-center gap-4">
                    <FormLabel className="text-right">Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleList
                          .filter((role) => ![1, 2, 6].includes(role.id)) // Exclude Root (1), Developer (2), People (6)
                          .map((role) => (
                            <SelectItem key={role.id} value={role.role}>
                              {role.role}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <DialogFooter className="mt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog> */}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-1 text-xl">
              Confirm delete user?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              user account and remove their data from our servers.
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

export const columns = (siteId: number): ColumnDef<UserProfileWithRole>[] => [
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
        <div className="flex justify-end pr-4">
          <DataTableRowActions row={user} siteId={siteId} />
        </div>
      )
    }
  }
]

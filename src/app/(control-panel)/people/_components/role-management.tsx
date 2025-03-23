"use client"

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
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, PencilLine, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import {
  AddPeopleRole,
  DeletePeopleRole,
  GetListPeopleRole,
  UpdatePeopleRole
} from "../../../api/people-role/actions"
import { PeopleRole } from "../../../api/people-role/types"

export default function RoleManagement() {
  const router = useRouter()
  const [roles, setRoles] = useState<PeopleRole[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // For creating a new role
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")
  const [newRoleDescription, setNewRoleDescription] = useState("")

  // For editing a role
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editRoleId, setEditRoleId] = useState<number | null>(null)
  const [editRoleName, setEditRoleName] = useState("")
  const [editRoleDescription, setEditRoleDescription] = useState("")

  // For deleting a role
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<PeopleRole | null>(null)

  const siteId = Number(process.env.NEXT_PUBLIC_SITE_ID || 1)

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles()
  }, [])

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      setIsLoading(true)
      const data = await GetListPeopleRole(siteId)
      setRoles(data)
    } catch (error) {
      console.error("Failed to fetch roles:", error)
      toast.error("Failed to load roles")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle creating a new role
  const handleCreateRole = async () => {
    if (!newRoleName.trim()) {
      toast.error("Role name is required")
      return
    }

    try {
      setIsSubmitting(true)

      // The API expects an array with a single object
      await AddPeopleRole([
        {
          slug: newRoleName.trim(),
          description: newRoleDescription.trim(),
          site_id: siteId
        }
      ])

      setNewRoleName("")
      setNewRoleDescription("")
      setIsCreateDialogOpen(false)
      toast.success("Role created successfully")
      fetchRoles() // Refresh the roles list
    } catch (error) {
      console.error("Failed to create role:", error)
      toast.error("Failed to create role")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open edit dialog and populate with role data
  const openEditDialog = (role: PeopleRole) => {
    setEditRoleId(role.people_role_id)
    setEditRoleName(role.slug)
    setEditRoleDescription(role.description)
    setIsEditDialogOpen(true)
  }

  // Handle updating a role
  ;("use client")

  // Only showing the updated function to fix the time parsing error
  // The rest of the component remains the same

  // Handle updating a role
  const handleUpdateRole = async () => {
    if (!editRoleName.trim() || !editRoleId) {
      toast.error("Role name is required")
      return
    }

    try {
      setIsSubmitting(true)

      // Find the original role to preserve its timestamps
      const originalRole = roles.find(
        (role) => role.people_role_id === editRoleId
      )

      if (!originalRole) {
        toast.error("Role not found")
        return
      }

      // Prepare the payload with timestamps from the original role
      const payload: PeopleRole = {
        people_role_id: editRoleId,
        slug: editRoleName.trim(),
        description: editRoleDescription.trim(),
        site_id: siteId,
        created_at: originalRole.created_at, // Keep original timestamp
        created_by: originalRole.created_by, // Keep original creator
        updated_at: originalRole.updated_at, // Server will update this
        updated_by: originalRole.updated_by, // Server will update this
        deleted_at: originalRole.deleted_at // Keep original value
      }

      await UpdatePeopleRole(payload)
      setIsEditDialogOpen(false)
      toast.success("Role updated successfully")
      fetchRoles() // Refresh the roles list
    } catch (error) {
      console.error("Failed to update role:", error)
      toast.error("Failed to update role")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open delete confirmation dialog
  const openDeleteDialog = (role: PeopleRole) => {
    setRoleToDelete(role)
    setIsDeleteDialogOpen(true)
  }

  // Handle deleting a role
  const handleDeleteRole = async () => {
    if (!roleToDelete) return

    try {
      setIsSubmitting(true)
      await DeletePeopleRole(roleToDelete)
      setIsDeleteDialogOpen(false)
      toast.success("Role deleted successfully")
      fetchRoles() // Refresh the roles list
    } catch (error) {
      console.error("Failed to delete role:", error)
      toast.error("Failed to delete role")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Format date function
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="container mx-auto space-y-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 pl-1 text-xl font-bold">Roles</h1>
          <div className="pl-1.5 text-xs text-neutral-500">
            <p>Manage roles for your people</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-muted px-3 py-1">
            <span className="text-sm font-medium tracking-wider">
              Total: {roles.length}
            </span>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl">Create a new role</DialogTitle>
                <DialogDescription>
                  Add a new role for your people. Roles help you manage
                  permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Role name"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Role description"
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleCreateRole}
                  disabled={!newRoleName.trim() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Role"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Loader2 className="mb-2 h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Loading roles...
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ) : roles.length > 0 ? (
              roles.map((role) => (
                <TableRow key={role.people_role_id}>
                  <TableCell className="pl-4 font-medium">
                    {role.slug}
                  </TableCell>
                  <TableCell className="max-w-sm truncate">
                    {role.description || "No description"}
                  </TableCell>
                  <TableCell>{formatDate(role.created_at)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(role)}
                      >
                        <PencilLine className="h-4 w-4" />
                        <span className="sr-only">Edit {role.slug}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => openDeleteDialog(role)}
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete {role.slug}</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-6 text-center text-muted-foreground"
                >
                  No roles found. Create your first role to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Edit role</DialogTitle>
            <DialogDescription>Update the role details.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name" className="text-sm font-medium">
                Name
              </label>
              <Input
                id="edit-name"
                placeholder="Role name"
                value={editRoleName}
                onChange={(e) => setEditRoleName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="edit-description"
                placeholder="Role description"
                value={editRoleDescription}
                onChange={(e) => setEditRoleDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleUpdateRole}
              disabled={!editRoleName.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Role"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{roleToDelete?.slug}" role?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRole}
              disabled={isSubmitting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

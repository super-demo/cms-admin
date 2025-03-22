"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Trash, Plus, PencilLine } from "lucide-react"

interface Role {
  id: string
  name: string
  createdAt: string
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([
    { id: "1", name: "Admin", createdAt: "2023-06-19T18:27:19Z" },
    { id: "2", name: "Editor", createdAt: "2023-06-20T10:15:30Z" },
    { id: "3", name: "Viewer", createdAt: "2023-06-21T09:45:12Z" }
  ])

  const [newRoleName, setNewRoleName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const addRole = () => {
    if (newRoleName.trim()) {
      const newRole: Role = {
        id: Date.now().toString(),
        name: newRoleName.trim(),
        createdAt: new Date().toISOString()
      }
      setRoles([...roles, newRole])
      setNewRoleName("")
      setIsDialogOpen(false)
    }
  }

  const deleteRole = (id: string) => {
    setRoles(roles.filter((role) => role.id !== id))
  }

  const formatDate = (dateString: string) => {
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

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Create New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xl">Create a new role</DialogTitle>
              </DialogHeader>
              <div className="pt-2">
                <Input
                  placeholder="Role name"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  className="mb-4"
                />
              </div>
              <DialogFooter>
                <Button onClick={addRole} disabled={!newRoleName.trim()}>
                  Create Role
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
              <TableHead>Created at</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length > 0 ? (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="pl-4 font-medium">
                    {role.name}
                  </TableCell>
                  <TableCell>{formatDate(role.createdAt)}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <PencilLine />
                          <span className="sr-only">Edit {role.name}</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="text-xl">
                            Edit a name
                          </DialogTitle>
                        </DialogHeader>
                        <div className="pt-2">
                          <Input
                            placeholder="Role name"
                            value={newRoleName}
                            onChange={(e) => setNewRoleName(e.target.value)}
                            className="mb-4"
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={addRole}
                            disabled={!newRoleName.trim()}
                          >
                            Edit Role
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete {role.name}</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Role</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the "{role.name}"
                            role? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteRole(role.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="py-6 text-center text-muted-foreground"
                >
                  No roles found. Create your first role to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

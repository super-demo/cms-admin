"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { PlusCircle, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
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
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { roleConst, roleList } from "@/app/api/site-user/constants"
import { AddUserTableForm } from "@/app/api/site-user/types"
import { AddUserToSite } from "@/app/api/site-user/action"

interface User {
  id: string
  email: string
  role: roleConst
}

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.nativeEnum(roleConst, {
    required_error: "Please select a role"
  })
})

type FormValues = z.infer<typeof formSchema>

interface AddPeopleClientProps {
  siteUserList: AddUserTableForm[]
  workspaceId: string
}

export default function AddTeamWorkspaceTable({
  siteUserList,
  workspaceId
}: AddPeopleClientProps) {
  const router = useRouter()

  const userList = siteUserList.filter(
    (user) =>
      ![
        roleConst.Root,
        roleConst.Developer,
        roleConst.SuperAdmin,
        roleConst.Admin
      ].includes(user.role)
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: roleConst.Viewer
    }
  })

  const [users, setUsers] = useState<User[]>([])

  const [existingUsers, setExistingUsers] =
    useState<AddUserTableForm[]>(siteUserList)

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  // Function to check if a user is already added
  const isUserAdded = (email: string) => {
    return users.some((user) => user.email === email)
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)

  const onConfirm = async () => {
    if (users.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one user",
        variant: "destructive"
      })
      return
    }
    toast({
      title: "Success",
      description: "Team members created successfully"
    })

    const addedUsers = users.map((user) => ({
      site_id: Number(workspaceId),
      email: user.email,
      site_user_level_id:
        roleList.find((role) => role.role === user.role)?.id ?? 5
    }))

    console.log(addedUsers)
    await AddUserToSite(addedUsers)

    router.back()
  }

  const onSubmit = (values: FormValues) => {
    // Add the new user to the list
    const newUser: User = {
      id: Date.now().toString(),
      email: values.email,
      role: values.role
    }

    setUsers([...users, newUser])

    form.reset({ email: "", role: roleConst.People })

    toast({
      title: "Success",
      description: "User added successfully"
    })
  }

  // Handle role change
  const handleRoleChange = (userId: string, newRole: roleConst) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    )
    toast({
      title: "Success",
      description: "User role updated"
    })
  }

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    setUserToDelete(userId)
    setIsDialogOpen(true)
  }

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setUserToDelete(null)
      setIsDialogOpen(false)

      toast({
        title: "Success",
        description: "User removed successfully"
      })
    }
  }

  // Add selected users to the users list
  const addSelectedUsers = () => {
    const usersToAdd = existingUsers
      .filter(
        (user) => selectedUsers.includes(user.id) && !isUserAdded(user.email)
      )
      .map((user) => ({
        id: Date.now() + user.id,
        email: user.email,
        role: user.role
      }))

    if (usersToAdd.length === 0) {
      toast({
        title: "No users to add",
        description: "Selected users are already added or none were selected",
        variant: "destructive"
      })
      return
    }

    setUsers((prev) => [...prev, ...usersToAdd])
    setSelectedUsers([])

    toast({
      title: "Success",
      description: `${usersToAdd.length} users added successfully`
    })
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="container mx-auto">
      <div>
        <div>
          <h1 className="my-2 text-xl font-bold">Add workspace team</h1>
          <div className="mt-4 text-xs text-neutral-500">
            <ul className="list-inside list-disc space-y-1">
              <li>Admin: Can manage workspace and mini apps.</li>
              <li>
                Viewer: Can only view content but cannot make any changes.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mb-10 space-y-4 md:flex md:items-end md:space-x-4 md:space-y-0"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1 space-y-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="w-full space-y-2 md:w-[200px]">
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleList
                          .filter((role) => ![1, 2, 3, 6].includes(role.id)) // Exclude Root (1) & Developer (2)
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
              <Button type="submit" className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Email
              </Button>
            </form>
          </Form>

          <div className="mb-8 mt-10">
            <h2 className="mb-4 text-lg font-semibold">
              Select from existing users
            </h2>

            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase()
                    if (searchTerm === "") {
                      setExistingUsers(userList)
                    } else {
                      const filtered = userList.filter(
                        (user) =>
                          user.email.toLowerCase().includes(searchTerm) ||
                          user.role.toLowerCase().includes(searchTerm)
                      )
                      setExistingUsers(filtered)
                    }
                  }}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          existingUsers.length > 0 &&
                          existingUsers.every(
                            (user) =>
                              selectedUsers.includes(user.id) ||
                              isUserAdded(user.email)
                          )
                        }
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            // Select all users that aren't already added
                            const notAddedUsers = existingUsers
                              .filter((user) => !isUserAdded(user.email))
                              .map((user) => user.id)
                            setSelectedUsers(notAddedUsers)
                          } else {
                            // Deselect all
                            setSelectedUsers([])
                          }
                        }}
                        aria-label="Select all"
                      />
                    </TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {existingUsers.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="py-6 text-center text-muted-foreground"
                      >
                        No existing users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    existingUsers.map((user) => {
                      const isAdded = isUserAdded(user.email)
                      return (
                        <TableRow
                          key={user.id}
                          className={isAdded ? "bg-muted/50" : ""}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked: boolean) => {
                                if (checked) {
                                  setSelectedUsers((prev) => [...prev, user.id])
                                } else {
                                  setSelectedUsers((prev) =>
                                    prev.filter((id) => id !== user.id)
                                  )
                                }
                              }}
                              disabled={isAdded}
                              aria-label={`Select ${user.email}`}
                            />
                          </TableCell>
                          <TableCell
                            className={isAdded ? "text-muted-foreground" : ""}
                          >
                            {user.email} {isAdded}
                          </TableCell>
                          <TableCell
                            className={isAdded ? "text-muted-foreground" : ""}
                          >
                            {user.role}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {selectedUsers.length} of{" "}
                {
                  existingUsers.filter((user) => !isUserAdded(user.email))
                    .length
                }{" "}
                users selected
              </div>
              <Button
                onClick={addSelectedUsers}
                disabled={selectedUsers.length === 0}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Selected Users
              </Button>
            </div>
          </div>

          <h2 className="mb-4 text-lg font-semibold">Users to be added</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No users added yet
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={
                            user.role == roleConst.SuperAdmin
                              ? roleConst.Admin
                              : user.role
                          }
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value as roleConst)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roleList
                              .filter((role) => ![1, 2, 3, 6].includes(role.id)) // Exclude Root (1) & Developer (2)
                              .map((role) => (
                                <SelectItem key={role.id} value={role.role}>
                                  {role.role}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="space-x-3 pt-10">
            <Button
              type="submit"
              onClick={() => {
                onConfirm()
              }}
            >
              Confirm
            </Button>
            <Button
              variant={"ghost"}
              className="text-red-500 hover:text-red-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              user from your team.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

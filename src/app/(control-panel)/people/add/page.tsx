"use client"

import { AddUserToSite } from "@/app/api/site-user/action"
import { roleConst, roleList } from "@/app/api/site-user/constants"
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
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
import { MAIN_SITE_ID } from "@/constants"
import { path } from "@/constants/path"
import { toast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define the user type
type User = {
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

export default function Page() {
  const router = useRouter()

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: roleConst.People
    }
  })

  const [users, setUsers] = useState<User[]>([])

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
      site_id: MAIN_SITE_ID,
      email: user.email,
      user_level_id: roleList.find((role) => role.role === user.role)?.id ?? 6
    }))

    console.log(addedUsers)
    await AddUserToSite(addedUsers)

    router.push(path.PEOPLE)
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

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="container mx-auto">
      <div>
        <div>
          <h1 className="my-2 text-xl font-bold">Add people</h1>
          <div className="text-xs text-neutral-500">
            <ul className="list-inside list-disc space-y-1">
              <li>
                Super Admin: Can add Admins and others, manage all
                workspaces/mini apps, and edit site information.
              </li>
              <li>
                Admin: Can add others except Admins, and manage all
                workspaces/mini apps.
              </li>
              <li>
                Viewer: Can only view content but cannot make any changes.
              </li>
              <li>
                People: A general user who can access the Super App with limited
                permissions.
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
                          .filter((role) => ![1, 2].includes(role.id)) // Exclude Root (1) & Developer (2)
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
                          value={user.role}
                          onValueChange={(value) =>
                            handleRoleChange(user.id, value as roleConst)
                          }
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {roleList
                              .filter((role) => ![1, 2].includes(role.id)) // Exclude Root (1) & Developer (2)
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
                // if (users.length === 0) {
                //   toast({
                //     title: "Error",
                //     description: "Please add at least one user",
                //     variant: "destructive"
                //   })
                //   return
                // }
                // toast({
                //   title: "Success",
                //   description: "Team members created successfully"
                // })
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

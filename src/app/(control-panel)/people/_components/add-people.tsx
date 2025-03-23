import {
  Accordion,
  AccordionContent,
  AccordionItem
} from "@/components/ui/accordion"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, PlusCircle, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { GetListPeopleRole } from "../../../api/people-role/actions"
import { PeopleRole } from "../../../api/people-role/types"
import { AddPeopleToSite } from "../../../api/site-people/actions"
import { value } from "../../team/_components/team-client"

// Define the user type
type User = {
  id: string
  email: string
  roleId: number
  roleName: string
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  roleId: z.number({
    required_error: "Please select a role",
    invalid_type_error: "Role must be a number"
  })
})

type FormValues = z.infer<typeof formSchema>

interface AddPeopleProps {
  accordionValue?: string
  setAccordionValue: (value: string | undefined) => void
}

export default function AddPeople({
  accordionValue,
  setAccordionValue
}: AddPeopleProps) {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const [peopleRoles, setPeopleRoles] = useState<PeopleRole[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = useState(true)

  const siteId = Number(process.env.NEXT_PUBLIC_SITE_ID || 1)

  // Fetch people roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoadingRoles(true)
        const data = await GetListPeopleRole(siteId)
        setPeopleRoles(data)
      } catch (error) {
        console.error("Failed to fetch people roles:", error)
        toast.error("Failed to load roles")
      } finally {
        setIsLoadingRoles(false)
      }
    }

    if (accordionValue === value) {
      fetchRoles()
    }
  }, [accordionValue, siteId])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      roleId: 0 // Will be set after roles are loaded
    }
  })

  // Set default role after roles are loaded
  useEffect(() => {
    if (peopleRoles.length > 0) {
      form.setValue("roleId", peopleRoles[0].people_role_id)
    }
  }, [peopleRoles, form])

  const handleAccordionChange = (value: string) => {
    setAccordionValue(value === accordionValue ? undefined : value)
  }

  function onSubmit(values: FormValues) {
    // Check if email already exists
    if (
      users.some(
        (user) => user.email.toLowerCase() === values.email.toLowerCase()
      )
    ) {
      toast.error("This email has already been added")
      return
    }

    // Find the selected role
    const selectedRole = peopleRoles.find(
      (role) => role.people_role_id === values.roleId
    )

    if (!selectedRole) {
      toast.error("Selected role not found")
      return
    }

    // Add the new user to the list
    const newUser: User = {
      id: Date.now().toString(),
      email: values.email,
      roleId: values.roleId,
      roleName: selectedRole.slug
    }

    setUsers([...users, newUser])
    form.reset({ ...form.getValues(), email: "" })
    toast.success("User added to list")
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
      toast.success("User removed from list")
    }
  }

  // Handle role change
  const handleRoleChange = (userId: string, newRoleId: number) => {
    const selectedRole = peopleRoles.find(
      (role) => role.people_role_id === newRoleId
    )

    if (!selectedRole) {
      toast.error("Selected role not found")
      return
    }

    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, roleId: newRoleId, roleName: selectedRole.slug }
          : user
      )
    )
  }

  // Submit all users
  const handleSubmitAll = async () => {
    if (users.length === 0) {
      toast.error("Please add at least one user")
      return
    }

    try {
      setIsSubmitting(true)

      const addedUsers = users.map((user) => ({
        site_id: siteId,
        email: user.email,
        sub_role_id: user.roleId
      }))

      await AddPeopleToSite(addedUsers)

      toast.success("People added successfully")
      setUsers([])
      setAccordionValue(undefined)
      router.refresh()
    } catch (error) {
      console.error("Error adding people:", error)
      toast.error("Failed to add people")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setUsers([])
    setAccordionValue(undefined)
  }

  return (
    <div className="mb-4 mt-8">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={accordionValue}
        onValueChange={handleAccordionChange}
      >
        <AccordionItem value={value}>
          <AccordionContent>
            <div className="space-y-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mb-6 space-y-4 pl-1 md:flex md:items-baseline md:space-x-4 md:space-y-0"
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
                    name="roleId"
                    render={({ field }) => (
                      <FormItem className="w-full space-y-2 md:w-[200px]">
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(parseInt(value))
                          }
                          value={
                            field.value ? field.value.toString() : undefined
                          }
                          disabled={isLoadingRoles || peopleRoles.length === 0}
                        >
                          <FormControl>
                            <SelectTrigger>
                              {isLoadingRoles ? (
                                <div className="flex items-center">
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Loading...
                                </div>
                              ) : (
                                <SelectValue placeholder="Select role" />
                              )}
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {peopleRoles.length > 0 ? (
                              peopleRoles.map((role) => (
                                <SelectItem
                                  key={role.people_role_id}
                                  value={role.people_role_id.toString()}
                                >
                                  {role.slug}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="0" disabled>
                                No roles available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col">
                    <div className="invisible mb-[7px]">
                      <span className="text-sm font-medium">Action</span>
                    </div>
                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isLoadingRoles || peopleRoles.length === 0}
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Email
                    </Button>
                  </div>
                </form>
              </Form>

              {/* User Table */}
              {users.length > 0 && (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-[80px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select
                              value={user.roleId.toString()}
                              onValueChange={(value) =>
                                handleRoleChange(user.id, parseInt(value))
                              }
                            >
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {peopleRoles.map((role) => (
                                  <SelectItem
                                    key={role.people_role_id}
                                    value={role.people_role_id.toString()}
                                  >
                                    {role.slug}
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {/* Actions */}
              {users.length > 0 && (
                <div className="flex justify-end space-x-3">
                  <Button onClick={handleSubmitAll} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add People"
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the user from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteUser}>
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

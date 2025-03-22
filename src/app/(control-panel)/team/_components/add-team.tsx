import { roleConst, roleList } from "@/app/api/site-user/constants"
import {
  Accordion,
  AccordionContent,
  AccordionItem
} from "@/components/ui/accordion"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRoundPlus } from "lucide-react"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { value } from "./team-client"
import { MAIN_SITE_ID } from "@/constants"
import { AddUserToSite } from "@/app/api/site-user/action"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.nativeEnum(roleConst, {
    required_error: "Please select a role"
  })
})

type FormValues = z.infer<typeof formSchema>

interface AddTeamProps {
  accordionValue?: string
  setAccordionValue?: (value: string | undefined) => void
}

export default function AddTeam({
  accordionValue,
  setAccordionValue
}: AddTeamProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: roleConst.Viewer
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = [
      {
        site_id: MAIN_SITE_ID,
        email: data.email,
        user_level_id: roleList.find((role) => role.role === data.role)?.id ?? 5
      }
    ]

    await AddUserToSite(payload)
  }

  const handleAccordionChange = (value: string) => {
    if (setAccordionValue) {
      setAccordionValue(value === accordionValue ? undefined : value)
    }
  }

  return (
    <div>
      <div>
        {/* <h1 className="my-2 mb-4 text-lg">Add people</h1> */}
        <div className="text-xs text-neutral-500">
          <ul className="list-inside list-disc space-y-1">
            <li>
              Super Admin: Can add Admins and others, manage all workspaces/mini
              apps, and edit site information.
            </li>
            <li>
              Admin: Can add others except Admins, and manage all
              workspaces/mini apps.
            </li>
            <li>Viewer: Can only view content but cannot make any changes.</li>
          </ul>
        </div>
      </div>
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
                              .filter((role) => ![1, 2, 6].includes(role.id)) // Exclude Root (1) & Developer (2) & People (6)
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

                  <div className="flex flex-col">
                    <div className="invisible mb-[7px]">
                      <span className="text-sm font-medium">Action</span>
                    </div>
                    <Button type="submit" className="w-full md:w-auto">
                      <UserRoundPlus />
                      Add Email
                    </Button>
                  </div>
                </form>
              </Form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

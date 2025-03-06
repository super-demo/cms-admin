"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
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

import { useRouter } from "next/navigation"
import IconUpload from "../../workspaces-mini-apps/create-mini-app/_components/icon-upload"
import BannerUpload from "../_components/banner-upload"

const FormSchema = z.object({
  workspaceName: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  description: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters."
    })
    .optional()
    .or(z.literal("")),
  shortDescription: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters."
    })
    .optional()
    .or(z.literal(""))
})

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: ""
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })

    console.log(data)
  }

  function handleCancel() {
    form.reset()

    router.back()
  }

  return (
    <>
      <div>
        <h1 className="my-2 text-xl font-bold">Add a new announcement</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <BannerUpload />

          <FormField
            control={form.control}
            name="workspaceName"
            render={({ field }) => (
              <FormItem className="flex items-baseline space-x-10">
                <FormLabel className="whitespace-nowrap">
                  Announcement title
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex items-baseline space-x-10">
                <FormLabel className="whitespace-nowrap">
                  Announcement short description
                  <p className="mt-1">(optional)</p>
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem className="flex items-baseline space-x-10">
                <FormLabel className="whitespace-nowrap">
                  Announcement link URL
                  <p className="mt-1">(optional)</p>
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Input placeholder="-" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="space-x-3 pt-4">
            <Button type="submit">Create</Button>
            <Button
              variant={"ghost"}
              className="text-red-500 hover:text-red-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

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
import IconUpload from "./_components/icon-upload"
import { useRouter } from "next/navigation"
import { CreateMiniApp } from "@/app/api/site-mini-apps/action"
import { path } from "@/constants/path"

const FormSchema = z.object({
  miniAppName: z.string().min(2, {
    message: "Username must be at least 2 characters."
  }),
  description: z.string().optional(),
  webhookUrl: z.string().min(2, {
    message: "Username must be at least 2 characters."
  })
})

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      miniAppName: "",
      webhookUrl: ""
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })

    console.log(data)

    const payload = {
      site_id: 1,
      slug: data.miniAppName,
      description: data.description,
      link_url: data.webhookUrl,
      image_url: "https:github.com/thyc.png"
    }

    await CreateMiniApp(payload)

    form.reset()
    router.push(path.WORKSPACES_MINI_APPS)
  }

  function handleCancel() {
    form.reset()

    router.back()
  }

  return (
    <>
      <div>
        <h1 className="my-2 text-xl font-bold">Create a new mini app</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <IconUpload />

          <FormField
            control={form.control}
            name="miniAppName"
            render={({ field }) => (
              <FormItem className="flex items-baseline space-x-10">
                <FormLabel className="whitespace-nowrap">
                  Mini app name
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
                  Mini app description
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
            name="webhookUrl"
            render={({ field }) => (
              <FormItem className="flex items-baseline space-x-10">
                <FormLabel className="whitespace-nowrap">Webhook URL</FormLabel>

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

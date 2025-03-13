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
import { toast } from "@/hooks/use-toast"
import { CreateWorkspace } from "@/app/api/site/action"
import { path } from "@/constants/path"

const FormSchema = z.object({
  name: z.string().nonempty("Workspace name is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional()
})

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ""
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      )
    })

    const payload = {
      name: data.name,
      description: data.description,
      short_description: data.shortDescription,
      image_url: "https://github.com/thyc.png"
    }
    console.log(payload)

    await CreateWorkspace(payload, 1)

    form.reset()
    router.push(path.WORKSPACES_MINI_APPS)
  }

  function handleCancel() {
    form.reset()
    router.back()
  }

  // const { imageUrl, setImageUrl } = useState<string | null>(null)

  return (
    <>
      <div>
        <h1 className="my-2 text-xl font-bold">Create a new workspace</h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <IconUpload />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex items-baseline space-x-10">
                <FormLabel className="whitespace-nowrap">
                  Workspace name
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
                  Workspace description
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
                  Workspace short description
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

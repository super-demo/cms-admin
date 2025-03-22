"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import { toast } from "@/components/hooks/use-toast"
import { CreateWorkspace } from "@/app/api/site/action"
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
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import IconUpload from "../icon-upload"

const FormSchema = z.object({
  name: z.string().nonempty("Workspace name is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional()
})

interface CreateWorkspaceFormProps {
  parentId: string
  handlePush: () => void
}

export default function CreateWorkspaceForm({
  parentId,
  handlePush
}: CreateWorkspaceFormProps) {
  const router = useRouter()
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: undefined,
      shortDescription: undefined
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
      image_url: uploadedImageUrl // Use the uploaded image URL from state
    }
    console.log(payload)

    await CreateWorkspace(payload, Number(parentId))

    form.reset()
    // router.push(path.WORKSPACES_MINI_APPS)
    handlePush()
  }

  function handleCancel() {
    form.reset()
    router.back()
  }

  // const { imageUrl, setImageUrl } = useState<string | null>(null)

  // Handle image upload completion
  const handleImageUploadComplete = (imageUrl: string) => {
    // Update the state with the uploaded image URL
    setUploadedImageUrl(imageUrl)
  }

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
          <IconUpload onUploadComplete={handleImageUploadComplete} />

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

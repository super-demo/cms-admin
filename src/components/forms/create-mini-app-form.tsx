"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { CreateMiniApp } from "@/app/api/site-mini-apps/action"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Loader2, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { toast } from "sonner"

const FormSchema = z.object({
  miniAppName: z.string().min(2, {
    message: "Mini app name must be at least 2 characters."
  }),
  description: z.string().optional(),
  webhookUrl: z.string().min(2, {
    message: "Webhook URL must be at least 2 characters."
  })
})

interface CreateMiniAppFormProps {
  parentId: string
  handlePush: () => void
}

export default function CreateMiniAppForm({
  parentId,
  handlePush
}: CreateMiniAppFormProps) {
  const router = useRouter()
  // State to track the uploaded image URL
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      miniAppName: "",
      description: undefined,
      webhookUrl: ""
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!uploadedImageUrl) {
      toast.error("Please upload an icon for your mini app")
      return
    }

    setIsSubmitting(true)

    try {
      // Create the payload with the uploaded image URL
      const payload = {
        site_id: Number(parentId),
        slug: data.miniAppName,
        description: data.description,
        link_url: data.webhookUrl,
        image_url: uploadedImageUrl // Use the uploaded image URL from state
      }

      // Call the create mini app action
      await CreateMiniApp(payload)

      toast.success("Mini app created successfully")

      // Reset form while preserving the image URL
      form.reset()

      // Only navigate after success
      handlePush()
    } catch (error) {
      console.error("Error creating mini app:", error)
      toast.error("Failed to create mini app")
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleCancel() {
    form.reset()
    // Clear the image URL when canceling
    setUploadedImageUrl("")
    router.back()
  }

  // Icon Upload functionality
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file."
      })
      return
    }

    // Create a preview URL for immediate feedback
    const previewUrl = URL.createObjectURL(file)
    setUploadedImageUrl(previewUrl)

    // Perform the actual upload
    await handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // Create FormData for the file upload
      const formData = new FormData()
      formData.append("file", file)

      // Send the file to our API endpoint
      const response = await fetch("/api/uploader", {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const data = await response.json()

      // Critical fix: Store the uploaded URL but don't remove the preview
      // Only update the URL - don't overwrite the existing preview
      if (data.imageUrl) {
        setUploadedImageUrl(data.imageUrl)
      }

      toast.success("Upload complete", {
        description: "Your mini app icon has been uploaded successfully."
      })
    } catch (error) {
      console.error("Error uploading image:", error)

      toast.error("Upload failed", {
        description:
          "There was an error uploading your image. Please try again."
      })

      // Don't clear the image URL on upload failure - keep showing the preview
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Debug console log to see what's in the URL state
  console.log("Current image URL:", uploadedImageUrl)

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
          {/* Icon Upload UI */}
          <div className="flex w-full">
            <div className="max-w-64 space-y-1">
              <FormLabel className="whitespace-nowrap">Mini app icon</FormLabel>
            </div>
            <CardContent className="flex flex-col items-center space-y-4 pt-3">
              <div className="group relative">
                {/* Force re-render of Avatar when URL changes by using a key */}
                <Avatar
                  key={uploadedImageUrl}
                  className="h-32 w-32 border-4 border-muted"
                >
                  {uploadedImageUrl ? (
                    <AvatarImage
                      src={uploadedImageUrl}
                      alt="Mini App Icon"
                      onError={() =>
                        console.error("Image failed to load:", uploadedImageUrl)
                      }
                    />
                  ) : (
                    <AvatarFallback className="bg-muted">
                      <User className="h-12 w-12 text-muted-foreground" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={triggerFileInput}
                >
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  ) : (
                    <Camera className="h-8 w-8 text-white" />
                  )}
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="profile-image" className="sr-only">
                  Choose mini app icon
                </Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </CardContent>
            <CardFooter className="items-end">
              <CardDescription className="mb-6 text-xs">
                Recommended size: 512x512 pixels (PNG, JPG, or SVG). <br /> and
                has a transparent background.
              </CardDescription>
            </CardFooter>
          </div>

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
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
            <Button
              variant={"ghost"}
              className="text-red-500 hover:text-red-600"
              onClick={handleCancel}
              disabled={isSubmitting || isUploading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}

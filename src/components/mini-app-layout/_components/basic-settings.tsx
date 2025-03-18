"use client"

import { MiniApp } from "@/app/api/site-mini-apps/type"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { User, Camera } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

interface BasicSettingsProps {
  miniAppData: MiniApp
  onUploadComplete?: (url: string) => void
}

export default function BasicSettings({
  miniAppData,
  onUploadComplete
}: BasicSettingsProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    miniAppData.image_url || null
  )
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  //   const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type", {
        description: "Please select an image file."
      })

      return
    }

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)

    // Simulate upload
    handleUpload(file, previewUrl)
  }

  const handleUpload = async (file: File, previewUrl: string) => {
    setIsUploading(true)

    try {
      // This is where you would implement your actual upload logic
      // For example, using a server action or API endpoint

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // If upload is successful, you would get a URL back from your server
      // For now, we'll just use the preview URL
      const uploadedUrl = previewUrl

      if (onUploadComplete) {
        onUploadComplete(uploadedUrl)
      }

      toast.success("Profile updated", {
        description: "Your profile picture has been updated successfully."
      })
    } catch (error) {
      toast.error("Upload failed", {
        description:
          "There was an error uploading your image. Please try again."
      })

      console.error(error)

      // Optionally revert the preview
      if (miniAppData.image_url) {
        setImageUrl(miniAppData.image_url)
      } else {
        setImageUrl(null)
      }
    } finally {
      setIsUploading(false)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Information</h1>

      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Mini app ID</p>
        <p>{miniAppData.site_mini_app_id}</p>
      </div>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Mini app Icon</p>
        <div className="group relative">
          <Avatar className="h-32 w-32 border-4 border-muted">
            <AvatarImage src={imageUrl || undefined} alt="Profile" />
            <AvatarFallback className="bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={triggerFileInput}
          >
            <Camera className="h-8 w-8 text-white" />
          </div>
          <div className="w-full">
            <Label htmlFor="profile-image" className="sr-only">
              Choose profile picture
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
        </div>
      </div>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Mini app Name</p>
        <p>{miniAppData.slug}</p>
      </div>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Mini app Description</p>
        <p>{miniAppData.description == "" ? "-" : miniAppData.description}</p>
      </div>

      <Separator className="my-10" />

      <h1 className="text-xl font-bold">Webhook Settings</h1>
      <div className="mt-8 flex space-x-8">
        <p className="text-base font-bold">Webhook URL</p>
        <p>{miniAppData.link_url}</p>
      </div>

      <Separator className="my-10" />

      <h1 className="mb-5 text-xl font-bold">Mini App Status</h1>
      <div className="flex items-center space-x-3">
        <Switch id="airplane-mode" />
        <h1>Active</h1>
      </div>

      <Separator className="my-10" />

      <h1 className="mb-5 text-xl font-bold">Delete</h1>
      <Button variant={"destructive"} className="font-bold">
        Delete Service
      </Button>
    </div>
  )
}

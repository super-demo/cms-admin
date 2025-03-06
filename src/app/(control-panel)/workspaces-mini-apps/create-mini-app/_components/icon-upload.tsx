"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useToast } from "@/components/ui/use-toast"
import { Camera, User } from "lucide-react"
import { FormLabel } from "@/components/ui/form"
import { toast } from "sonner"

interface ProfileUploadProps {
  initialImageUrl?: string
  onUploadComplete?: (url: string) => void
}

export default function IconUpload({
  initialImageUrl,
  onUploadComplete
}: ProfileUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialImageUrl || null
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
      if (initialImageUrl) {
        setImageUrl(initialImageUrl)
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
    <div className="flex w-full">
      <div className="max-w-64 space-y-1">
        <FormLabel className="whitespace-nowrap">Mini app icon</FormLabel>
        {/* <CardDescription className="text-xs">
          Recommended size: 512x512 pixels (PNG, JPG, or SVG). and has a
          transparent background.
        </CardDescription> */}
      </div>
      <CardContent className="flex flex-col items-center space-y-4 pt-3">
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
      </CardContent>
      <CardFooter className="items-end">
        <CardDescription className="mb-6 text-xs">
          Recommended size: 512x512 pixels (PNG, JPG, or SVG). <br /> and has a
          transparent background.
        </CardDescription>
      </CardFooter>
      {/* <CardFooter className="flex justify-center">
        <Button
          onClick={triggerFileInput}
          disabled={isUploading}
          className="w-full sm:w-auto"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {imageUrl ? "Change Picture" : "Upload Picture"}
            </>
          )}
        </Button>
      </CardFooter> */}
    </div>
  )
}

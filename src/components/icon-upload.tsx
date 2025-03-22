"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Loader2, User } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

interface IconUploadProps {
  onUploadComplete?: (url: string) => void
}

export default function IconUpload({ onUploadComplete }: IconUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    setImageUrl(previewUrl)

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
      const uploadedUrl = data.imageUrl

      // Update the image URL with the one returned from the server
      setImageUrl(uploadedUrl)

      // Notify parent component about the uploaded URL
      if (onUploadComplete) {
        onUploadComplete(uploadedUrl)
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
      </div>
      <CardContent className="flex flex-col items-center space-y-4 pt-3">
        <div className="group relative">
          <Avatar className="h-32 w-32 border-4 border-muted">
            <AvatarImage src={imageUrl || undefined} alt="Mini App Icon" />
            <AvatarFallback className="bg-muted">
              <User className="h-12 w-12 text-muted-foreground" />
            </AvatarFallback>
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
          Recommended size: 512x512 pixels (PNG, JPG, or SVG). <br /> and has a
          transparent background.
        </CardDescription>
      </CardFooter>
    </div>
  )
}

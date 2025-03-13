"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { useToast } from "@/components/ui/use-toast"
import { Camera, Loader2, Upload, User } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface ProfileUploadProps {
  userId: string
  initialImageUrl?: string
  onUploadComplete?: (url: string) => void
}

export default function SupabaseProfileUpload({
  userId,
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
      //   toast({
      //     title: "Invalid file type",
      //     description: "Please select an image file.",
      //     variant: "destructive"
      //   })
      return
    }

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file)
    setImageUrl(previewUrl)

    // Upload to Supabase
    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)

    try {
      // Create a unique file name
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

      const uploadedUrl = data.publicUrl

      if (onUploadComplete) {
        onUploadComplete(uploadedUrl)
      }

      //   toast({
      //     title: "Profile updated",
      //     description: "Your profile picture has been updated successfully."
      //   })
    } catch (error) {
      console.error("Error uploading image:", error)
      //   toast({
      //     title: "Upload failed",
      //     description:
      //       "There was an error uploading your image. Please try again.",
      //     variant: "destructive"
      //   })
      // Revert the preview
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
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
        <CardDescription>
          Upload a profile picture to personalize your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
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
      <CardFooter className="flex justify-center">
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
      </CardFooter>
    </Card>
  )
}

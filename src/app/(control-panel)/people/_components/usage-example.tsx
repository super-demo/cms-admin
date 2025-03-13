"use client"

import { Toaster } from "sonner"
import ProfileUpload from "./profile-upload"

export default function ProfilePage() {
  const handleProfileImageUpdate = (url: string) => {
    console.log("Profile image updated:", url)
    // Here you would typically update the user's profile in your database
  }

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-center text-2xl font-bold">Account Settings</h1>

      <ProfileUpload
        initialImageUrl="/placeholder.svg?height=128&width=128"
        onUploadComplete={handleProfileImageUpdate}
      />

      <Toaster />
    </div>
  )
}

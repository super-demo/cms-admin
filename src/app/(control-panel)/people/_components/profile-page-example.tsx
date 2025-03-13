import ProfilePage from "./profile-page"
import { Toaster } from "sonner"

export default function ProfilePageExample() {
  // This would typically come from your authentication system
  const userId = "user_123456"

  // This would typically be fetched from your database
  const initialData = {
    id: userId,
    name: "John Doe",
    description:
      "I'm a software developer with a passion for creating user-friendly applications.",
    type: "personal" as const // Type assertion to match the enum in the schema
  }

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-center text-2xl font-bold">Account Settings</h1>

      <ProfilePage userId={userId} initialData={initialData} />

      <Toaster />
    </div>
  )
}

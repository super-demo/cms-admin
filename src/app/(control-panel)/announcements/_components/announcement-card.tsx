import { Clock3 } from "lucide-react"

export default function AnnouncementCard() {
  return (
    <div className="flex items-center gap-6 py-6">
      <div className="h-[100px] w-[180px] bg-slate-300" />
      <div className="space-y-2">
        <h1 className="font-bold">Upcoming New Term Announcement</h1>
        <p>
          Get ready for the upcoming term! Stay informed about important dates,
          registration details, and key updates.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <p>Mon, 23 Feb 2025</p>
          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <p> 02:32</p>
          </div>
        </div>
      </div>
    </div>
  )
}

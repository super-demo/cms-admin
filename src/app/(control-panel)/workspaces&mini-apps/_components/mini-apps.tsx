import { CreateMiniAppCard } from "@/components/cards/create-mini-app-card"
import MiniAppCard from "@/components/cards/mini-app-card"

export default function MiniApps() {
  return (
    <div className="my-5 flex space-x-5">
      <CreateMiniAppCard />
      <MiniAppCard />
    </div>
  )
}

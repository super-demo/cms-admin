import { MiniApp } from "@/app/api/site-mini-apps/type"
import { CreateMiniAppCard } from "@/components/cards/create-mini-app-card"
import MiniAppCard from "@/components/cards/mini-app-card"

export default function MiniApps({ mini_apps }: { mini_apps: MiniApp[] }) {
  return (
    <div className="my-5 flex space-x-5">
      <CreateMiniAppCard />

      {mini_apps.map((mini_app) => (
        <MiniAppCard
          key={mini_app.site_mini_app_id}
          mini_app_id={mini_app.site_mini_app_id}
          slug={mini_app.slug}
          image_url={mini_app.image_url}
        />
      ))}
    </div>
  )
}

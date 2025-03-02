import MiniAppCard from "@/components/cards/mini-app-card"
import WorkspaceCard from "@/components/cards/workspace-card"
import { PeopleTable } from "./_components/people-table"

// const metadata = [
//   {
//     name: "Science",
//     description: "Faculty of Science",
//     parent: "Kasetsart Bangkhen",
//     level: 2
//   },
//   {
//     name: "สำนักบริการคอมพิวเตอร์",
//     description: "สำนักบริการคอมพิวเตอร์ บางเขน",
//     parent: "Kasetsart Bangkhen",
//     level: 2
//   }
// ]

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-5 text-lg font-semibold">
          Recently Visited Workspaces
        </h1>
        <WorkspaceCard />
      </div>
      <div>
        <h1 className="mb-5 text-lg font-semibold">
          Recently Visited Services
        </h1>
        <MiniAppCard />
      </div>
      <div>
        <h1 className="mb-5 text-lg font-semibold">People in site</h1>
        <PeopleTable />
      </div>
    </div>
  )
}

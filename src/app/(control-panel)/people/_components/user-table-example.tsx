import { columns } from "./columns"
import { UserTable } from "./user-table"

export const data = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    birthday: "1990-01-01",
    role: "admin"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    birthday: "1992-05-15",
    role: "user"
  }
  // Add more sample data here...
]

export default function UserTableExample() {
  return (
    <div className="container">
      <UserTable columns={columns} data={data} />
    </div>
  )
}

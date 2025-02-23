import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { FiSearch } from "react-icons/fi"

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin"
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor"
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Viewer"
  },
  {
    name: "Bob Williams",
    email: "bob.williams@example.com",
    role: "Admin"
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "Editor"
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Viewer"
  },
  {
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    role: "Admin"
  }
]

export function PeopleTable() {
  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2 py-4">
        <Input placeholder="Search..." />
        <Button type="submit">
          <FiSearch />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

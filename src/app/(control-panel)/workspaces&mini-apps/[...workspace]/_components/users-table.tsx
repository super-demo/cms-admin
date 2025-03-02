import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

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

export function UsersTable() {
  return (
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
  )
}

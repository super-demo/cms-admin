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
    phone: "+1-555-1234",
    birthday: "1985-04-23",
    role: "Super Admin"
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-5678",
    birthday: "1990-07-15",
    role: "Admin"
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1-555-8765",
    birthday: "1995-12-05",
    role: "Guest"
  },
  {
    name: "Bob Williams",
    email: "bob.williams@example.com",
    phone: "+1-555-4321",
    birthday: "1982-09-30",
    role: "Admin"
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "+1-555-6789",
    birthday: "1988-03-17",
    role: "General User" // Can access the main app but NOT the CMS
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1-555-2468",
    birthday: "1993-06-22",
    role: "Guest"
  },
  {
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1-555-1357",
    birthday: "1980-11-11",
    role: "Admin"
  },
  {
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "+1-555-9876",
    birthday: "1992-08-14",
    role: "General User"
  }
]

export function PeopleTable() {
  return (
    <div>
      <div className="mb-4 flex w-full max-w-sm items-center space-x-2">
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
            <TableHead>Phone</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.email}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.birthday}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

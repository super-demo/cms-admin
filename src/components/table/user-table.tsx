"use client"

import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import { roleList } from "@/app/api/site-user/constants"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function UserListTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState<string>("")
  const [roleFilter, setRoleFilter] = React.useState<string>("")

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: { pageSize: 10 } // Strictly limit rows
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, filterValue) => {
      const searchValue = (filterValue ?? "").toString().toLowerCase()
      const name = (row.getValue("name") ?? "").toString().toLowerCase()
      const email = (row.getValue("email") ?? "").toString().toLowerCase()
      const role = (row.getValue("role") ?? "").toString().toLowerCase()

      // Filter by search input (name/email) and role
      console.log(roleFilter)

      return (
        (name.includes(searchValue) || email.includes(searchValue)) &&
        (roleFilter ? role === roleFilter.toLowerCase() : true)
      )
    },
    state: {
      sorting,
      rowSelection,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search by name or email..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <Select
          onValueChange={(value) => {
            setRoleFilter(value)
            setGlobalFilter("")
          }}
          defaultValue={roleFilter == "" ? "all" : ""}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {roleList
              .filter((role) => ![1, 2, 6].includes(role.id)) // Exclude Root (1) & Developer (2) & People (6)
              .map((role) => (
                <SelectItem key={role.id} value={role.role}>
                  {role.role}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            1
          </Button>
          {table.getPageCount() > 3 &&
            table.getState().pagination.pageIndex > 1 && (
              <span className="text-muted-foreground">...</span>
            )}
          {table.getState().pagination.pageIndex > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
            >
              {table.getState().pagination.pageIndex}
            </Button>
          )}
          <Button variant="secondary" size="sm">
            {table.getState().pagination.pageIndex + 1}
          </Button>
          {table.getState().pagination.pageIndex < table.getPageCount() - 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
            >
              {table.getState().pagination.pageIndex + 2}
            </Button>
          )}
          {table.getPageCount() > 3 &&
            table.getState().pagination.pageIndex <
              table.getPageCount() - 2 && (
              <span className="text-muted-foreground">...</span>
            )}
          {table.getPageCount() > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {table.getPageCount()}
            </Button>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

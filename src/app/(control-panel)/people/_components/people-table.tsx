"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function PeopleTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter Role</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getColumn("role")
              ?.getFilterValue()
              ?.map((role: string) => (
                <DropdownMenuCheckboxItem
                  key={role}
                  className="capitalize"
                  checked={table
                    .getColumn("role")
                    ?.getFilterValue()
                    ?.includes(role)}
                  onCheckedChange={(value) =>
                    table
                      .getColumn("role")
                      ?.setFilterValue(
                        value
                          ? [
                              ...(table
                                .getColumn("role")
                                ?.getFilterValue() as string[]),
                              role
                            ]
                          : (
                              table
                                .getColumn("role")
                                ?.getFilterValue() as string[]
                            ).filter((r: string) => r !== role)
                      )
                  }
                >
                  {role}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a workspace" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Workspaces</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <Input
          placeholder="Search..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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

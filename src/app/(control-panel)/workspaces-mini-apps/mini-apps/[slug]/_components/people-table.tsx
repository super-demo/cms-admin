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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { pathWithSlug } from "@/constants/path"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  miniAppSlug: string
}

export function PeopleTable<TData, TValue>({
  columns,
  data,
  miniAppSlug
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [roleFilter, setRoleFilter] = React.useState<string>("all")

  // Ensure data is always an array
  const safeData = React.useMemo(
    () => (Array.isArray(data) ? data : []),
    [data]
  )

  // Filter data based on role selection
  const filteredData = React.useMemo(() => {
    if (roleFilter === "all") {
      return safeData
    } else if (roleFilter === "team") {
      return safeData.filter(
        (item: any) =>
          item?.role === "Super Admin" ||
          item?.role === "Admin" ||
          item?.role === "Viewer"
      )
    } else if (roleFilter === "people") {
      return safeData.filter((item: any) => item?.role === "People")
    }
    return safeData
  }, [safeData, roleFilter])

  // Ensure columns is always an array
  const safeColumns = React.useMemo(
    () => (Array.isArray(columns) ? columns : []),
    [columns]
  )

  const table = useReactTable({
    data: filteredData,
    columns: safeColumns,
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

  const router = useRouter()

  function handleAddPeople() {
    router.push(pathWithSlug.MINI_APP_ADD_PEOPLE(miniAppSlug))
  }

  // Safely get column
  const nameColumn = table.getColumn("name")

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex w-3/6 items-center gap-2">
          <Input
            placeholder="Search..."
            value={(nameColumn?.getFilterValue() as string) ?? ""}
            onChange={(event) => nameColumn?.setFilterValue(event.target.value)}
            className="max-w-lg"
          />
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type">
                {roleFilter === "all"
                  ? "All"
                  : roleFilter === "team"
                    ? "Team"
                    : "People"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="people">People</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant={"secondary"}
          className="pt-2.5"
          onClick={handleAddPeople}
        >
          <Plus />
          Add People
        </Button>
      </div>
      <div className="rounded-md border">
        <ScrollArea className="h-[calc(100vh-300px)]">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
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
                    colSpan={safeColumns.length}
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

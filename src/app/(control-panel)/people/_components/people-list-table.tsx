"use client"

import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react"

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
import { ChevronLeft, ChevronRight, Loader2, Search, X } from "lucide-react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../../../components/ui/select"
import { GetListPeopleRole } from "../../../api/people-role/actions"
import { PeopleRole } from "../../../api/people-role/types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  siteId: number
}

export function PeopleListTable<TData, TValue>({
  columns,
  data,
  siteId
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [peopleRoles, setPeopleRoles] = useState<PeopleRole[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = useState(true)

  // Fetch people roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoadingRoles(true)
        const data = await GetListPeopleRole(siteId)
        setPeopleRoles(data)
      } catch (error) {
        console.error("Failed to fetch people roles:", error)
        toast.error("Failed to load roles")
      } finally {
        setIsLoadingRoles(false)
      }
    }

    fetchRoles()
  }, [siteId])

  // Ensure data is an array
  const safeData = useMemo(() => {
    return Array.isArray(data) ? data : []
  }, [data])

  // Apply both global search and role filter
  const filteredData = useMemo(() => {
    if (!globalFilter && !roleFilter) return safeData

    return safeData.filter((row: any) => {
      // Role filter
      if (roleFilter) {
        try {
          // Check if sub_role_id or role_id property exists, depending on your data structure
          const roleId = row.sub_role_id || row.role_id
          if (String(roleId) !== roleFilter) {
            return false
          }
        } catch (e) {
          return false
        }
      }

      // Global search filter
      if (globalFilter) {
        const term = globalFilter.toLowerCase()
        try {
          const name = String(row.name || "").toLowerCase()
          const email = String(row.email || "").toLowerCase()
          return name.includes(term) || email.includes(term)
        } catch (e) {
          return false
        }
      }

      return true
    })
  }, [safeData, globalFilter, roleFilter])

  // Create the table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    initialState: {
      pagination: { pageSize: 10 }
    }
  })

  // Handle role filter change
  const handleRoleFilterChange = (value: string) => {
    setRoleFilter(value === "all" ? "" : value)
  }

  // Clear all filters
  const clearFilters = () => {
    setGlobalFilter("")
    setRoleFilter("")
  }

  // Get role name by ID
  const getRoleNameById = (roleId: number | string) => {
    const role = peopleRoles.find((r) => r.people_role_id === Number(roleId))
    return role ? role.slug : "Unknown"
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative flex w-full max-w-sm items-center">
          <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8 pr-10"
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter("")}
              className="absolute right-2 rounded-sm opacity-70 hover:opacity-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </button>
          )}
        </div>

        {/* Role filter */}
        <div className="flex items-center gap-2">
          <Select
            onValueChange={handleRoleFilterChange}
            value={roleFilter || "all"}
            disabled={isLoadingRoles}
          >
            <SelectTrigger className="w-[180px]">
              {isLoadingRoles ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading roles...
                </div>
              ) : (
                <SelectValue placeholder="Filter by role" />
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {peopleRoles.map((role) => (
                <SelectItem
                  key={role.people_role_id}
                  value={role.people_role_id.toString()}
                >
                  {role.slug}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters button */}
          {(globalFilter || roleFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-10"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Display active role filter if set */}
      {roleFilter && (
        <div className="mb-4 flex items-center">
          <span className="mr-2 rounded-md bg-muted px-2 py-1 text-sm">
            Role: {getRoleNameById(roleFilter)}
            <button
              onClick={() => handleRoleFilterChange("all")}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <X className="inline h-3 w-3" />
            </button>
          </span>
        </div>
      )}

      {/* Table */}
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
              {table.getRowModel().rows.length ? (
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
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}{" "}
          to{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} entries
        </div>

        <div className="flex items-center space-x-2">
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
            {table.getState().pagination.pageIndex <
              table.getPageCount() - 1 && (
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
    </div>
  )
}

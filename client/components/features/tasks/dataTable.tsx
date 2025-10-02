import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/ui/organisms/table"
  import { Button } from "@/ui/atoms/button"
  import { Input } from "@/ui/atoms/input"
  import { Search, ChevronLeft, ChevronRight } from "lucide-react"
  import { useState } from "react"
  
  interface DataTableProps<TData extends Record<string, any>, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    onDelete?: (id: string) => void
    onRowClick?: (row: TData) => void
  }
  
  export function DataTable<TData extends Record<string, any>, TValue>({
    columns,
    data,
    onDelete,
    onRowClick,
  }: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = useState("")
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: (row, columnId, filterValue) => {
        // Search in title and any other string columns
        return Object.values(row.original).some(value => 
          value?.toString().toLowerCase().includes(filterValue.toLowerCase())
        )
      },
      state: {
        globalFilter,
      },
      meta: {
        onDelete,
        onRowClick,
      },
    })
  
    return (
      <div className="space-y-4">
        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative w-full sm:w-64 lg:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <span className="text-xs sm:text-sm text-gray-500">
            {table.getFilteredRowModel().rows.length} tasks found
          </span>
        </div>
  
        {/* Table */}
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
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
                table.getRowModel().rows.map((row) => {
                  const task = row.original;
                  // Skip rows with invalid task data
                  if (!task || !task.title) return null;

                  return (
                    <TableRow
                      key={row.id}
                      className={`cursor-pointer hover:bg-gray-50 transition-colors ${onRowClick ? 'hover:bg-gray-50' : ''}`}
                      onClick={() => onRowClick?.(task)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-xs sm:text-sm">
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
  
        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
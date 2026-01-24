"use client";
import React, {useState} from "react";
import {
    AccessorColumnDef,
    ColumnFiltersState, DisplayColumnDef, flexRender,
    getCoreRowModel, getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, GroupColumnDef,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import type {Table as TableType} from "@tanstack/react-table";

export const TableShell = (
    {
        tableNameId,
        listData,
        columns,
        filters,
        orgRole,
    }: {
        tableNameId: string;
        listData: unknown[];
        columns: DisplayColumnDef<unknown> | GroupColumnDef<unknown> | AccessorColumnDef<unknown> [];
        filters?: string[];
        orgRole?: string;
    }
) => {
    const translateHeaderIdToLabel = (id: string) => {
        switch (id) {
            case "name":
            case "Property_name":
                return "Property Name";
            case "Address_state":
                return "State";
            case "Address_postalCode":
                return "Postal Code";
            case "Address_country":
                return "Country";
            case "Address_street2":
                return "Multi-Unit";
            case "holisticIcalComposition":
                return "Holistic ICal Composition";
            case "numAttachedICals":
                return "# Attached ICals";
            case "location":
                return "Full Address";
            case "UserImprint_fullName":
                return "File Owner";
            case "userImprint_fullName":
                return "User";
            case "UserImprint_appRole":
                return "Type";
            case "uec":
                return "Action Signature";
            case "actionsTaken":
                return "Actions Taken";
            case "icalFilename":
                return "Filename";
            case "importType":
                return "Sync Type";
            case "isMainSrc":
                return "Main Source";
            case "firstBlock_UserImprint_fullName":
            case "firstBookedBy":
                return "First Booked By";
            case "retainedDates":
                return "Retained Dates";
            case "purgedConflicts":
                return "Purged Conflicts";
            case "resolvedOn":
                return "Resolved On";
            case "conflictUploadedBy":
                return "Conflict Uploaded By";
            case "existingBookingDates":
                return "Existing Booking Dates";
            case "conflictBookingDates":
                return "Conflict Booking Dates";
            case "icalLimit":
                return "Limit";
            case "syncSchedule":
                return "Schedule";
            case "icalData":
                return "Attached ICals";
            case "lastRun":
                return "Last Run";
            case "nextRun":
                return "Next Run";
            case "jobBeganAt":
                return "Last Run Began At";
            case "jobEndedAt":
                return "Completed On";
            case "pcs":
                return "Notes";
            case "priority":
                return "Booking Priority";
            case "id":
                return "Log Id";
            case "createdAt":
                return "Created At";
            case "updatedAt":
                return "Updated At";
            default:
                break;
        }
        return id;
    };

    const buildTableFilters = (
        {
            filters,
            table
        }: {
            filters: string[];
            table: Partial<TableType<unknown>>;
        }
    ) => {
        const tableFilters: React.JSX.Element[] = filters.map((item, index) => {
            return (
                <Input
                    key={"filter-" + index}
                    placeholder={`Filter By ${translateHeaderIdToLabel(item)}`}
                    value={!!table.getColumn ? (table.getColumn(item)?.getFilterValue() as string) : ""}
                    onChange={(event) =>
                        !!table.getColumn ?
                            table.getColumn(item)?.setFilterValue(event.target.value) :
                            null
                    }
                    className="w-1/5"
                />
            );
        });
        return tableFilters;
    };

    const setClassNames = (header: { id: string }) => {
        if(
            header.id === "existingBookingDates" ||
            header.id === "conflictBookingDates" ||
            header.id === "conflictDetectedOn" ||
            header.id === "priority" ||
            header.id === "updatedAt" ||
            header.id === "createdAt" ||
            header.id === "nextRun" ||
            header.id === "lastRun" ||
            header.id === "uec" ||
            header.id === "path" ||
            header.id === "api"
        ) { return "text-right"; }
        return "";
    };

    const setClassNamesForRowCell = (header: { id: string }) => {
        if(
            header.id.includes("thumbnail")
        ) { return "w-1/5"; }
        return "";
    };

    const getColumnVisibilityRules = (orgRole: string) => {
        let columnVisibilityRules = {};
        const
            genericHiddenFields = {
                createdAt: false,
                updatedAt: false,
                id: false,
                uec: false
            };

        // Set Generic Hidden Fields
        columnVisibilityRules = { ...genericHiddenFields };

        if(
            orgRole.includes("PLA") ||
            orgRole.includes("ALA") ||
            orgRole.includes("IND")
        ) {
            columnVisibilityRules = {
                ...columnVisibilityRules,
                Address_state: false,
                Address_postalCode: false,
                Address_country: false,
            };
        }

        return columnVisibilityRules;
    }

    const // Table States & Data
        [sorting, setSorting] = useState<SortingState>([]),
        [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]),
        [columnVisibility, setColumnVisibility] = useState<VisibilityState>(getColumnVisibilityRules(orgRole as string)),
        [rowSelection, setRowSelection] = useState({}),
        table = useReactTable({
            data: listData,
            columns: columns as unknown as AccessorColumnDef<unknown>[],
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
                rowSelection,
            },
        }),
        tableFilters = !!filters && buildTableFilters({filters, table});

    return (
        <div id={`${tableNameId}`} className={"w-full"}>
            <div className="flex flex-col items-center py-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {translateHeaderIdToLabel(column.id)}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className={"w-full flex justify-around flex-wrap my-5"}>
                    {!!tableFilters && tableFilters}
                </div>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={setClassNames(header)}
                                        >
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
                        {
                            (
                                !!table &&
                                !!table.getRowModel()
                            ) && (
                                table.getRowModel()?.rows ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className={setClassNamesForRowCell(cell)}>
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
                                            //@ts-expect-error Columns do have lengths
                                            colSpan={columns.length ?? 0}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm pl-2">
                    {/*{table.getFilteredSelectedRowModel().rows.length} of{" "}*/}
                    {table.getFilteredRowModel().rows.length} row(s).
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};


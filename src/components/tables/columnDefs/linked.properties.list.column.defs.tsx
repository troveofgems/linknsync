import {AccessorColumnDef, DisplayColumnDef, GroupColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import {datetimeConversionTo_String} from "@/lib/utils/DateTime/date.utils";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {ICalEntry, Property, UserImprint} from "@prisma/client";
import {SubscribedIcalList} from "@/components/structural/tooltip/elements/Cron.elements";

export const LinkedPropertiesListColumnDefs: DisplayColumnDef<unknown> | GroupColumnDef<unknown> | AccessorColumnDef<unknown> [] = ([
    {
        accessorKey: "Property.name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Property Name
                    <ArrowUpDown/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const data = row.original as unknown as { Property: Partial<Property> };
            return (
                <div className="capitalize">{data.Property.name}</div>
            );
        },
    },
    {
        accessorKey: "icalLimit",
        header: () => {
            return (
                <h2 className={"font-extrabold"}>Limit</h2>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original as unknown as { icalFileUploadLimit: string; urlSources: Partial<ICalEntry>[] },
                limitLabel = data.icalFileUploadLimit === "THREE" ? "3" :
                    data.icalFileUploadLimit === "TEN" ? "10" : "UNLIMITED",
                finalLabel = `${data.urlSources.length} of ${limitLabel} max`;

            return (
                <div className="">{finalLabel}</div>
            )
        },
    },
    {
        accessorKey: "syncSchedule",
        header: () => {
            return (
                <h2 className={"font-extrabold"}>Schedule</h2>
            )
        },
        cell: ({ row }) => {
            const data = row.original as unknown as { scheduleType: string; };
            return (
                <div className="capitalize">{data.scheduleType}</div>
            )
        },
    },
    {
        accessorKey: "icalData",
        header: () => {
            return (
                <h2 className={"font-extrabold"}>Attached ICals</h2>
            )
        },
        cell: ({ row }) => {
            const data = row.original as unknown as { urlSources: Partial<SubscribedIcalList>[]; UserImprint: Partial<UserImprint>; id: string; };
            return (
                <div className="capitalize text-center">
                    <div className={"flex flex-col py-1"}>
                        {
                            data.urlSources.length === 0 ? (
                                <div key={`source_${data.id}`} className={"flex flex-col"}>
                                    <div className={"flex justify-start"}>
                                        <em className={"text-red-500"}>No Linked Sources Found!</em>
                                    </div>
                                </div>
                            ) : (
                                data.urlSources.map((source, index) => (
                                    <div key={"url_sources_" + index + "_" + source.icalFilename}>
                                        {
                                            data.urlSources.length > 0 && index === 0 ? (
                                                <div>
                                                    <div key={`source_${source.icalFilename}`} className={"flex flex-col"}>
                                                        <div className={"flex justify-start text-gray-500"}>
                                                            {source.UserImprint!.appRole} - {source.UserImprint!.fullName}
                                                        </div>
                                                        <div className={"flex justify-start ml-10"}>
                                                            {source.icalFilename}
                                                            <small className={`${source.importType === "link" ? "text-green-400 pl-1" : "text-red-500 pl-1"}`}>
                                                                {source.importType === "link" ? (
                                                                    <>
                                                                        URL Linked
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        Static File
                                                                    </>
                                                                )}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) :
                                                data.urlSources.length > 0 && index % 2 ? (
                                                    <div>
                                                        <DropdownMenuSeparator className={"my-2"} />
                                                        <div key={`source_${source.icalFilename}`} className={"flex flex-col"}>
                                                            <div className={"flex justify-start text-gray-500"}>
                                                                {source.UserImprint!.appRole} - {source.UserImprint!.fullName}
                                                            </div>
                                                            <div className={"flex justify-start ml-10"}>
                                                                {source.icalFilename}
                                                                <small className={`${source.importType === "link" ? "text-green-400 pl-1" : "text-red-500 pl-1"}`}>
                                                                    {source.importType === "link" ? (
                                                                        <>
                                                                            URL Linked
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            Static File
                                                                        </>
                                                                    )}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <DropdownMenuSeparator className={"my-2"} />
                                                        <div key={`source_${source.icalFilename}`} className={"flex flex-col"}>
                                                            <div className={"flex justify-start text-gray-500"}>
                                                                {source.UserImprint!.appRole} - {source.UserImprint!.fullName}
                                                            </div>
                                                            <div className={"flex justify-start ml-10"}>
                                                                {source.icalFilename}
                                                                <small className={`${source.importType === "link" ? "text-green-400 pl-1" : "text-red-500 pl-1"}`}>
                                                                    {source.importType === "link" ? (
                                                                        <>
                                                                            URL Linked
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            Static File
                                                                        </>
                                                                    )}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                        }
                                    </div>
                                ))
                            )
                        }
                    </div>
                </div>
            )
        },
    },
    {
        accessorKey: "lastRun",
        header: () => {
            return (
                <h2 className={"font-extrabold"}>Last Sync Run</h2>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original as unknown as { lastRun?: Date | string; urlSources: Partial<ICalEntry>[]; id: string; },
                lastRunIsNull = data.lastRun === null,
                finalLabel = lastRunIsNull ? "Not Yet Run" : datetimeConversionTo_String({ timestamp: data.lastRun as Date }),
                runValues = data.urlSources.map((source) => source.importType === "file"),
                runNotPossible = runValues.every((val: boolean) => val);

            return (
                <div className={`text-right ${lastRunIsNull && "text-red-500"}`}>
                    {
                        runNotPossible && (
                            <div className={"text-red-500"}>
                                No Schedule
                            </div>
                        )
                    }
                    {
                        !runNotPossible && (
                            <div>
                                {finalLabel}
                            </div>
                        )
                    }
                </div>
            )
        },
    },
    {
        accessorKey: "nextRun",
        header: () => {
            return (
                <h2 className={"font-extrabold"}>Next Sync Run</h2>
            )
        },
        cell: ({ row }) => {
            const
                data = row.original as { nextRun?: Date | string; urlSources: Partial<ICalEntry>[]; },
                convertedStartTime = datetimeConversionTo_String({ timestamp: data.nextRun as Date }),
                runValues = data.urlSources.map((source) => source.importType === "file"),
                runNotPossible = runValues.every((val: boolean) => val);

            return (
                <div className="text-right">
                    {
                        runNotPossible && (
                            <div className="text-red-500">
                                No URL Sources
                            </div>
                        )
                    }
                    {
                        !runNotPossible && (
                            <>
                                {convertedStartTime}
                            </>
                        )
                    }
                </div>
            )
        },
    }
]);
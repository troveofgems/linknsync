import React from "react";
import {DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import {
    FILE_STASIS_TRIGGER,
    LINKED_TO_CRON_TRIGGER,
    LOAD_ERROR_CONTENT
} from "@/components/structural/tooltip/elements/Cron.elements";
import {DateBlock} from "@prisma/client";
import {addEllipsis} from "@/lib/utils/misc/string.utils";

export type ICalSource = {
    id: string;
    icalFilename?: string | null;
    icalUrl?: string | null;
    importType: string;
    isMainSrc: boolean;
    dateBlocks: DateBlock[];
    UserImprint?: {
        id: string;
        fullName: string;
        appRole: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

export const CurrentSource = (
    passedICalSource: ICalSource,
    icalList?: ICalSource[],
    formKey?: string
) => {
    const
        showChangeMainSrc = formKey === "changeMain",
        mainSource = icalList?.filter((item: { id: string; isMainSrc: boolean; }) => item.isMainSrc)[0];

    const sourceShell = (
        source?: ICalSource,
    ) => (
            <div className={"w-full flex justify-between items-center flex-row-reverse"}>
                <div>
                    { source?.UserImprint?.appRole }
                </div>
                <div>
                    { source?.UserImprint?.fullName}
                </div>
                <div>
                    {
                        source?.importType === "link" ? (
                            LINKED_TO_CRON_TRIGGER()
                        ) : source?.importType === "file" ? ( // TODO: Fix Import Type for file upload
                            FILE_STASIS_TRIGGER()
                        ) : (
                            LOAD_ERROR_CONTENT()
                        )
                    }
                </div>
                <div>
                    { addEllipsis(source?.icalFilename as string, 20) }
                </div>
            </div>
        );

    const viewForUpdateOrDeleteICalSource = ()=> {
        return (
            <div>
                <p className={"py-3"}>ICal Source</p>
                <DropdownMenuSeparator className={"w-full mb-3"}/>
                <div className={"w-full px-5 flex flex-row flex-wrap justify-around pb-3"}>
                    {sourceShell(passedICalSource)}
                </div>
                <DropdownMenuSeparator className={"w-full mb-3"}/>
            </div>
        )
    };

    const viewForChangeMainICalSource = ()=> {
        return (
            <div>
                <p className={"py-3"}>From: {mainSource?.icalFilename}</p>
                <DropdownMenuSeparator className={"w-full"}/>
                <div className={"w-full px-5 flex flex-row flex-wrap justify-around mb-3"}>
                    {sourceShell(mainSource)}
                </div>
                <DropdownMenuSeparator className={"w-full"}/>
                <p className={"py-3"}>To: {passedICalSource.icalFilename}</p>
                <DropdownMenuSeparator className={"w-full"}/>
                <div className={"w-full px-5 flex flex-row flex-wrap justify-around pb-3"}>
                    {sourceShell(passedICalSource)}
                </div>
            </div>
        )
    };

    return (
        <div>
            {
                showChangeMainSrc ? viewForChangeMainICalSource() : viewForUpdateOrDeleteICalSource()
            }
        </div>
    )
};
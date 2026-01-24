import React from "react";

// Cron Connected ICal Source Icon
import { TbActivityHeartbeat } from "react-icons/tb";

// Static ICal Source Icon
import { GiCrystalGrowth } from "react-icons/gi";

// Mixed Types ICal Source Icon
import { BsTriangleHalf } from "react-icons/bs";

// Error ICal Source Icon
import {ClockAlert, TriangleAlert} from "lucide-react";

import TooltipShell from "@/components/structural/tooltip/Tooltip";
import {UserImprint} from "@prisma/client";

export interface SubscribedIcalList {
    id: string;
    isMainSrc: boolean;
    icalFilename: string;
    importType: string;
    cronSchedule: Date | null;
    fileOwnerName: string;
    ownerType: string;
    clerkId: string;
    icalUrl: string | null;
    dateBlocks: {
        id: string;
        eventOwner: string;
        startDate: Date;
        endDate: Date;
    }[],
    UserImprint: UserImprint;
}

export const LINKED_TO_CRON_TRIGGER = () => (
    <span className={"text-green-700 text-3xl"}>
        <TbActivityHeartbeat key={`dynamic_resource_clock_icon`} className={"m-[5px]"}/>
    </span>
);

export const FILE_STASIS_TRIGGER = () => (
    <span className={"text-red-500 text-3xl"}>
        <GiCrystalGrowth key={`static_resource_crystal_icon`} className={"m-[5px]"}/>
    </span>
);

export const LOAD_ERROR_TRIGGER = () => (
    <span className={"text-red-500 text-3xl"}>
        <TriangleAlert key={`static_resource_crystal_icon`} className={"m-[5px]"}/>
    </span>
);

export const ARCHIVED_TRIGGER = () => (
    <span className={"text-red-500 text-3xl"}>
        <ClockAlert key={`archived_resource_icon`} className={"m-[5px]"}/>
    </span>
);

export const ARCHIVED_CONTENT = () => (
    <h4 className={"text-[14px] linkedToCronContent"}>
        This property has been archived and is set to be deleted from the system.
    </h4>
);

export const MIXED_TYPES_TRIGGER = () => (
    <span className={"text-orange-700 text-3xl"}>
        <BsTriangleHalf key={`static_resource_crystal_icon`} className={"m-[5px]"}/>
    </span>
);

export const LINKED_TO_CRON_CONTENT = (cronScheduleType = "daily") => (
    <h4 className={"text-[14px] linkedToCronContent"}>
        This ICal is attached to the Link-N-Sync Service and will process updates {cronScheduleType}.
    </h4>
);

export const FILE_STASIS_CONTENT = () => (
    <p className={"w-fit wrap-break-word"}>
        This ical file does not synchronize its calendar using the LNS cron service.
        This means that any changes to the ical static file(s) must be re-uploaded to this application in order for
        the calendar collision detection feature to work across all users belonging to an organization.
    </p>
);

export const MIXED_TYPES_CONTENT = () => (
    <span className={"text-white w-1/2"}>
        Some ICal files linked to this property are processed by the LNS Service,
        while others are sitting in Stasis. This means that the property will only receive
        partial updates from the LNS service. The owner of the Static file will need
        to reupload their ICal file with the changes in place in order to reprocess changes
        for Collision Detection.
    </span>
);

export const LOAD_ERROR_CONTENT = () => (
    <span className={"text-white w-1/2 pl-2.5"}>
        Something Went Wrong! Unable To Load Any ICal Files!
    </span>
);

export const ALL_FILES_DYNAMIC_CONTENT = () => (
    <span className={"text-white w-1/2"}>
        You can rest easy, All ICal files linked to this property are processed by the LNS Service!
    </span>
);

export const ALL_FILES_STATIC_CONTENT = () => (
    <span className={"mx-3 text-white w-1/2"}>
        All ICal files linked to this property are NOT processed by the LNS Cron Service!
        PLAs & ALAs must reupload their calendars to manually reprocess changes for Collision Detection.
    </span>
);

export const HOLISTIC_ICAL_COMPOSITION = (icalList: SubscribedIcalList[]) => {
    const fileComposition = checkImportTypes(icalList);
    return (
        <>
            {
                fileComposition === "link" ? (
                    <div className={"flex flex-col"}>
                        {LINKED_TO_CRON_TRIGGER()}
                        <div>
                            All sources live.
                        </div>
                    </div>
                ) : fileComposition === "fileUpload" ? (
                    <div className={"flex flex-col"}>
                        {FILE_STASIS_TRIGGER()}
                        <div>
                            All sources static.
                        </div>
                    </div>
                ) : fileComposition === "mixedTypes" ? (
                    <div className={"flex flex-col"}>
                        {MIXED_TYPES_TRIGGER()}
                        <div>
                            Mixed sources detected.
                        </div>
                    </div>
                ) : (
                    <div className={"flex flex-col"}>
                        {LOAD_ERROR_TRIGGER()}
                        <div>
                            No sources detected.
                        </div>
                    </div>
                )
            }
        </>
    );
};

export const ARCHIVED_PROPERTY = () => {
    return (
        <TooltipShell
            tooltipTrigger={ARCHIVED_TRIGGER()}
            tooltipContent={ARCHIVED_CONTENT()}
        />
    );
};

function checkImportTypes(icalList: SubscribedIcalList[]) {
    // Handle empty array case
    if (icalList.length === 0) {
        return "empty";
    }

    // Count occurrences of each type
    const linkCount = icalList.filter(item => item.importType === "link").length;
    const fileUploadCount = icalList.filter(item => item.importType === "fileUpload").length;

    // Return appropriate status
    if (linkCount === icalList.length) {
        return "link";
    } else if (fileUploadCount === icalList.length) {
        return "fileUpload";
    } else {
        return "mixedTypes";
    }
}
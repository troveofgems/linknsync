import React, {useState} from "react";
import {GenericTextInput} from "@/components/forms/_elements/Inputs/GenericTextInput";
import {getCurrentTS, getTSModifier, modifyTSBy} from "@/lib/utils/misc/date.utils";

export const ArchivePropertyActionComponent = (
    {
        markedAsArchived = false,
        archivalDate,
        showPreviousArchival = false,
    }:
    {
        markedAsArchived?: boolean;
        archivalDate?: Date;
        showPreviousArchival?: boolean;
    }
) => {
    const
        deletionMessageStr = (dd: Date) => `${dd.toLocaleDateString()} around ${dd.toLocaleTimeString()}`,
        [hasBeenArchived, setHasBeenArchived] = useState(markedAsArchived),
        [deletionTimestampStr, setDeletionTimestampStr] = useState<string | undefined>(!!archivalDate ? deletionMessageStr(archivalDate) : undefined);

    const handleArchiveClick = (
        event: React.MouseEventHandler<HTMLInputElement>
    ) => {
        const extraction: { target?: { checked?: boolean; } } = {
            ...event
        };
        const
            currentTS = getCurrentTS(),
            intendedDeletionDate = modifyTSBy({
                days: 7,
                ts: getTSModifier(currentTS)
            });

        setDeletionTimestampStr(deletionMessageStr(intendedDeletionDate));
        setHasBeenArchived(extraction?.target?.checked as boolean);
    };

    return (
        <div className={"flex flex-col w-full justify-end-safe"}>
            <div className={"flex flex-row justify-end"}>
                <div key={"archivePropertyAction"}>
                    <GenericTextInput
                        setAsCheckbox={true}
                        showAsRequired={false}
                        id={"property.hasBeenArchived"}
                        name={"property.hasBeenArchived"}
                        defaultChecked={markedAsArchived}
                        handleOnClick={handleArchiveClick}
                        containerClassnames={"flex flex-row mt-2 alignContentCenter"}
                        labelClassnames={"formLabel formCheckboxLabel alignContentCenter"}
                        inputFieldClassnames={"formInput formCheckbox"}
                        label={"Archive My Property"}
                        readOnly={showPreviousArchival}
                    />
                </div>
            </div>
            <div>
                {
                    (hasBeenArchived) && (
                        <div>
                            Data deletion will occur on {showPreviousArchival ? deletionTimestampStr?.replace("around", "on") : deletionTimestampStr}
                        </div>
                    )
                }
                {
                    hasBeenArchived && (
                        <div key={"archiveExplanation"} className={"text-red-500 p-5"}>
                            <em>
                                {
                                    !showPreviousArchival && (
                                        <p>
                                            Warning!! You are about to perform a DELAYED destructive action that cannot
                                            be undone once this form is submitted and processed.
                                        </p>
                                    )
                                }
                                {
                                    showPreviousArchival && (
                                        <p>
                                           This property has been marked as archived and will soon be deleted from the system.
                                        </p>
                                    )
                                }
                            </em>
                            {
                                !showPreviousArchival && (
                                    <>
                                        <p className={"text-red-500 mt-4"}>
                                            By choosing to mark this property as <em>Archived</em>, your property will be removed from
                                            the view of any associated ALAs and RLAs tied to your organization. You will still
                                            be able to view this property for a limited amount of time.
                                        </p>
                                        <p className={"text-red-500 mt-4"}>
                                            Link-N-Sync&#39;s paradigm regarding data retention is currently defined as only
                                            retaining data that is actively used by you and our system. Marking your property as
                                            archived indicates to us that any data associated to your property or processed
                                            ical sources attached to the archived property are no longer needed and should be
                                            deleted within a specified timeframe. Once we delete this data, it is gone. This
                                            protects you and it protects us. Your live, archived, and deleted data will not be
                                            sold, or, shared with any third parties or the Government.
                                        </p>
                                        <p className={"text-red-500 mt-4"}>
                                            You WILL NOT receive a reminder nor notice prior to, or, post-removal of this
                                            archived data.
                                        </p>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}
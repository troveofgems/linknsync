"use client";
import React, {Dispatch, SetStateAction} from "react";

import {UpdateICalForPropertyForm} from "@/components/forms/property/ical/UpdateICal.ForProperty.Form";
import {ExportLNSICSForPropertyForm} from "@/components/forms/property/ical/ExportICal.ForProperty.Form";
import {ChangeMainICalForPropertyForm} from "@/components/forms/property/ical/ChangeMainICal.For.Property";
import {ShowDialog} from "@/components/structural/dialog/Dialog";
import {DeleteICalFromPropertyForm} from "@/components/forms/property/ical/DeleteICal.FromProperty.Form";
import {DeletePropertyForm} from "@/components/forms/property/DeleteProperty.Form";
import {SessionDataState} from "@/store/userStore";
import {JobOpportunityForm} from "@/components/forms/jobOpp/JobOpportunityForm";
import {ICalSource} from "@/components/forms/property/elements/CurrentSource";
import {SubscribedIcalList} from "@/components/structural/tooltip/elements/Cron.elements";

export const DialogShell = (
    {
        user,
        options
    }: {
        user?: SessionDataState;
        options: {
            // Edit ICal
            implementEditICalDialog?: boolean;
            openEditICalDialog?: boolean;
            setOpenEditICalDialog?: Dispatch<SetStateAction<boolean>>;

            // Delete ICal
            implementDeleteICalDialog?: boolean;
            openDeleteICalDialog?: boolean;
            setOpenDeleteICalDialog?: Dispatch<SetStateAction<boolean>>;

            // Change Main ICal
            implementChangeMainICalPropertyDialog?: boolean;
            openChangeICalDialog?: boolean;
            setOpenChangeICalDialog?: Dispatch<SetStateAction<boolean>>;

            // Export ICals From LNS
            implementExportICalDialog?: boolean;
            openExportICalDialog?: boolean;
            setOpenExportICalDialog?: Dispatch<SetStateAction<boolean>>;

            // Delete Property Modal Form
            implementDeletePropertyDialog?: boolean;
            openDeletePropertyDialog?: boolean;
            setOpenDeletePropertyDialog?: Dispatch<SetStateAction<boolean>>;

            // Job Opportunity Modal Form
            implementJobOpportunityDialog?: boolean;
            openJobOpportunityDialog?: boolean;
            setOpenJobOpportunityDialog?: Dispatch<SetStateAction<boolean>>;

            // Pseudo Global Extras
            icalList?: Partial<SubscribedIcalList>[];
            icalId?: string;
            propertyId?: string;
        };
    }) => {
    const // Dialog View Controllers
        dialogs: React.JSX.Element[] = [];

    if(options.implementExportICalDialog) {
        const { openExportICalDialog, setOpenExportICalDialog, icalList, icalId } = options;
        dialogs.push(exportICalDialog(
            user as SessionDataState,
            openExportICalDialog as boolean,
            setOpenExportICalDialog as Dispatch<SetStateAction<boolean>>,
            icalList as SubscribedIcalList[],
            icalId as string
        ));
    }

    if(options.implementEditICalDialog) {
        const { openEditICalDialog, setOpenEditICalDialog, icalList, icalId } = options;
        dialogs.push(editICalDialog(
            user as SessionDataState,
            openEditICalDialog as boolean,
            setOpenEditICalDialog as Dispatch<SetStateAction<boolean>>,
            icalList as SubscribedIcalList[],
            icalId as string
        ));
    }

    if(options.implementDeleteICalDialog) {
        const { openDeleteICalDialog, setOpenDeleteICalDialog, icalList, icalId } = options;
        dialogs.push(deleteICalDialog(
            user as SessionDataState,
            openDeleteICalDialog as boolean,
            setOpenDeleteICalDialog as Dispatch<SetStateAction<boolean>>,
            icalList as SubscribedIcalList[],
            icalId as string
        ));
    }

    if(options.implementDeletePropertyDialog) {
        const { openDeletePropertyDialog, setOpenDeletePropertyDialog, propertyId } = options;
        dialogs.push(deletePropertyDialog(
            user as SessionDataState,
            openDeletePropertyDialog as boolean,
            setOpenDeletePropertyDialog as Dispatch<SetStateAction<boolean>>,
            propertyId as string
        ));
    }

    if(options.implementChangeMainICalPropertyDialog) {
        const { openChangeICalDialog, setOpenChangeICalDialog, icalList, icalId } = options;
        dialogs.push(changeICalDialog(
            user as SessionDataState,
            openChangeICalDialog as boolean,
            setOpenChangeICalDialog as Dispatch<SetStateAction<boolean>>,
            icalList as SubscribedIcalList[],
            icalId as string
        ));
    }

    if(options.implementJobOpportunityDialog) {
        const { openJobOpportunityDialog, setOpenJobOpportunityDialog } = options;
        dialogs.push(jobOpportunityDialog(
            openJobOpportunityDialog as boolean,
            setOpenJobOpportunityDialog as Dispatch<SetStateAction<boolean>>,
        ));
    }

    return dialogs;
}

/** ICAL Dialogs */
const exportICalDialog = (
    user: SessionDataState,
    openExportICalDialog: boolean,
    setOpenExportICalDialog: Dispatch<SetStateAction<boolean>>,
    icalList: ICalSource[] | SubscribedIcalList[],
    icalId: string
) => {
    return (
        <ShowDialog
            key={"export-ical-dialog"}
            dialogTitle={"Export LNS ICal Source"}
            dialogDescription={"Use this form to export and download a consolidated or partial .ics file from LNS."}
            dialogOpened={openExportICalDialog}
            handleDialogClose={setOpenExportICalDialog}
        >
            <ExportLNSICSForPropertyForm
                user={user}
                icalList={icalList as ICalSource[]}
                icalId={icalId}
                handleDialogClose={setOpenExportICalDialog}
            />
        </ShowDialog>
    )
};

const editICalDialog = (
    user: SessionDataState,
    openEditICalDialog: boolean,
    setOpenEditICalDialog: Dispatch<SetStateAction<boolean>>,
    icalList: ICalSource[] | SubscribedIcalList[],
    icalId: string
) => {
    return (
        <ShowDialog
            key={"update-ical-dialog"}
            dialogTitle={"Update ICal Source"}
            dialogDescription={"Use this form to update the target ICal Source."}
            dialogOpened={openEditICalDialog}
            handleDialogClose={setOpenEditICalDialog}
        >
            <UpdateICalForPropertyForm
                user={user}
                icalList={icalList as ICalSource[]}
                icalId={icalId}
                handleDialogClose={setOpenEditICalDialog}
            />
        </ShowDialog>
    )
};

const deleteICalDialog = (
    user: SessionDataState,
    openDeleteICalDialog: boolean,
    setOpenDeleteICalDialog: Dispatch<SetStateAction<boolean>>,
    icalList: SubscribedIcalList[],
    icalId: string
) => {
    return (
        <ShowDialog
            key={"delete-ical-dialog"}
            dialogTitle={"Delete ICal Source"}
            dialogDescription={"Use this form to remove the target ICal Source. This action cannot be undone. This will remove the ICal source from the application's databases and delete all associated events with the ICal in our systems."}
            dialogOpened={openDeleteICalDialog}
            handleDialogClose={setOpenDeleteICalDialog}
        >
            <DeleteICalFromPropertyForm
                user={user}
                icalList={icalList as SubscribedIcalList[]}
                icalId={icalId}
                handleDialogClose={setOpenDeleteICalDialog}
            />
        </ShowDialog>
    )
};

const changeICalDialog = (
    user: SessionDataState,
    openChangeICalDialog: boolean,
    setOpenChangeICalDialog: Dispatch<SetStateAction<boolean>>,
    icalList: ICalSource[] | SubscribedIcalList[],
    icalId: string
) => {
    return (
        <ShowDialog
            key={"change-main-ical-dialog"}
            dialogTitle={"Change Main ICal Source"}
            dialogDescription={"Use this form to change the target ICal Source."}
            dialogOpened={openChangeICalDialog}
            handleDialogClose={setOpenChangeICalDialog}
        >
            <ChangeMainICalForPropertyForm
                user={user}
                icalList={icalList as ICalSource[]}
                icalId={icalId}
                closeDialogAction={setOpenChangeICalDialog}
            />
        </ShowDialog>
    )
};

/** Property Dialogs */
const deletePropertyDialog = (
    user: SessionDataState,
    openDeletePropertyDialog: boolean,
    setOpenDeletePropertyDialog: Dispatch<SetStateAction<boolean>>,
    propertyId: string,
) => {
    return (
        <ShowDialog
            key={"delete-property-dialog"}
            dialogTitle={"Delete Property"}
            dialogDescription={"Use this form to remove the property from the system. This action cannot be undone. This will remove all artifacts from the application's databases and delete all associated events with the icals in our systems."}
            dialogOpened={openDeletePropertyDialog}
            handleDialogClose={setOpenDeletePropertyDialog}
        >
            <DeletePropertyForm
                user={user}
                propertyId={propertyId}
                handleDialogClose={setOpenDeletePropertyDialog}
            />
        </ShowDialog>
    )
};

/** Misc Dialogs */
const jobOpportunityDialog = (
    openJobOppDialog: boolean,
    setOpenJobOpportunityDialog: Dispatch<SetStateAction<boolean>>,
) => {
    return (
        <ShowDialog
            key={"jobOpp-dialog"}
            dialogTitle={"Send A Job Opportunity To Dustin Greco"}
            dialogDescription={"Use this form to send the creator of this web-app a job opportunity interest. I look forward to hearing from you!"}
            dialogOpened={openJobOppDialog}
            handleDialogClose={setOpenJobOpportunityDialog}
        >
            <JobOpportunityForm
                handleDialogClose={setOpenJobOpportunityDialog}
            />
        </ShowDialog>
    )
};
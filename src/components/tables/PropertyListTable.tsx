"use client";
import React, {useEffect, useState} from "react";

// Stores and Types
import {SessionDataState} from "@/store/userStore";

// Components
import {fetchPropertyList} from "@/components/lists/PropertyList";
import {TableShell} from "@/components/tables/TableShell";
import {propertyListColumnDefs} from "@/components/tables/columnDefs/property.list.column.defs";
import {DialogShell} from "@/components/dialogs/DialogShell";
import {LoaderSkeleton} from "@/components/structural/loader/Custom.Loader";
import {propertyListColumnDefsRLA} from "@/components/tables/columnDefs/property.list.column.defs.rla";
import {Property} from "@prisma/client";
import {ReadPropertyActionState} from "@/actions/property/read.action";
import {SubscribedIcalList} from "@/components/structural/tooltip/elements/Cron.elements";
import {AccessorColumnDef} from "@tanstack/react-table";

export const PropertyListTable = (
    {
        user,
        updatePropertyCount
    } :
    {
        user: SessionDataState;
        updatePropertyCount: (c: number) => void;
    }) => {
    const // Component States
        [propertyList, setPropertyList] = useState<Partial<Property>[]>([]),
        [loadingPropertyList, setLoadingPropertyList] = useState<boolean>(true),
        [icalId, setICalId] = useState<string>(""),
        [icalList, setICalList] = useState<SubscribedIcalList[]>([]),
        [propertyId, setPropertyId] = useState<string>(""),
        [openDeletePropertyDialog, setOpenDeletePropertyDialog] = useState(false),
        [openEditICalDialog, setOpenEditICalDialog] = useState(false),
        [openDeleteICalDialog, setOpenDeleteICalDialog] = useState(false),
        [openExportICalDialog, setOpenExportICalDialog] = useState(false);

    const
        columns = user.loggedInUser?.orgRole === "RLA" ?
            propertyListColumnDefsRLA() :
            propertyListColumnDefs({
                user,
                controls: {
                    setICalId,
                    setICalList,
                    setPropertyId,
                    setOpenEditICalDialog,
                    setOpenDeleteICalDialog,
                    setOpenDeletePropertyDialog,
                    setOpenExportICalDialog
                }}),
        filters = user.loggedInUser?.orgRole === "RLA" ?
            ['name', 'Address_state', 'Address_postalCode', 'Address_country'] :
            ['name', 'Address_state', 'Address_postalCode', 'Address_country'];

    useEffect(() => {
        if(
            loadingPropertyList &&
            !!user
        ) {
            fetchPropertyList(user)
                .then((result)=> {
                    const { response } = result as Partial<ReadPropertyActionState>;
                    const { propertyList } = response as {
                        propertyList?: Property[]
                        propertyById?: Property
                    };
                    if(!!propertyList) {
                        setPropertyList(propertyList);
                        updatePropertyCount(propertyList.length);
                    }
                    setLoadingPropertyList(false);
                });
        }
    }, [user, loadingPropertyList, propertyList, updatePropertyCount]);

    return (
        <>
            {
                loadingPropertyList && (
                    <LoaderSkeleton loadingMessage={"Loading Property List"} additionalClassNames={""} />
                )
            }
            {
                !loadingPropertyList &&
                !!user && (
                    <>
                        <TableShell
                            tableNameId={"propertyList"}
                            listData={propertyList}
                            columns={columns as AccessorColumnDef<unknown>[]}
                            filters={filters}
                            orgRole={user.loggedInUser?.orgRole as string}
                        />
                        {/* Dialog Layers */}
                        <DialogShell
                            user={user}
                            options={{
                                implementEditICalDialog: true,
                                openEditICalDialog,
                                setOpenEditICalDialog,
                                implementDeleteICalDialog: true,
                                openDeleteICalDialog,
                                setOpenDeleteICalDialog,
                                implementDeletePropertyDialog: true,
                                openDeletePropertyDialog,
                                setOpenDeletePropertyDialog,
                                implementExportICalDialog: true,
                                openExportICalDialog,
                                setOpenExportICalDialog,
                                icalList,
                                icalId,
                                propertyId
                            }}
                        />
                    </>
                )
            }
        </>
    );
};
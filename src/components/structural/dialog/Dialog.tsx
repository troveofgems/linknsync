import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import React, {Dispatch, SetStateAction} from "react";

export const ShowDialog = (
    {
        children,
        dialogDescription,
        dialogOpened,
        dialogTitle,
        handleDialogClose
    } :
    {
        children: React.ReactNode | null,
        dialogDescription: string,
        dialogOpened: boolean,
        dialogTitle: string,
        handleDialogClose: Dispatch<SetStateAction<boolean>>
    }
) => {
    return (
        <Dialog open={dialogOpened} onOpenChange={handleDialogClose}>
            <DialogContent className={"bg-gray-900 lightDarkFormBG"}>
                <DialogHeader>
                    <DialogTitle className={"lightDarkFormText"}>{dialogTitle}</DialogTitle>
                    <DialogDescription>
                        {dialogDescription}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}